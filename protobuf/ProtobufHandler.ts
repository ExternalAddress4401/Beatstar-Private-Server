import { CMSField } from "./interfaces/CMSField";
import { chunk, pad } from "./utils";
import zlib from "zlib";
import { promisify } from "util";

type ReadWrite = "READ" | "WRITE";

export class ProtobufHandler {
  buffer: Buffer;
  index: number = 0;
  bytes: any;

  constructor(type: ReadWrite, buffer?: Buffer) {
    if (type === "READ" && buffer) {
      this.buffer = buffer;
    } else {
      this.buffer = Buffer.alloc(100000);
    }
  }
  async decompress() {
    const gunzipAsync = promisify(zlib.gunzip);
    this.buffer = await gunzipAsync(this.buffer);
  }
  process() {
    const keysList: number[] = [];
    const dict: Record<string, any> = {};
    while (this.index < this.buffer.length) {
      const v = Number(this.readVarint());
      const key = v >> 3;
      const wire = v & 7;
      if (!keysList.includes(key)) {
        keysList.push(key);
      }
      switch (wire) {
        case 0:
          dict[key] = this.readVarint();
          break;
        case 1:
          dict[key] = this.readDouble();
          break;
        case 2:
          if (!Array.isArray(dict[key])) {
            dict[key] = [];
          }
          dict[key].push(this.slice(Number(this.readVarint())));
          break;
        case 5:
          dict[key] = this.readFloat();
          break;
        default:
          console.log("Unknown wire: " + wire);
          console.log(this.buffer);
          process.exit();
      }
    }

    this.bytes = dict;

    return { dict, keysList };
  }
  parseProto(proto: Map<number, CMSField>, data?: any) {
    const protoData = data ?? this.bytes;

    const dict: Record<string, any> = {};

    for (const index in protoData) {
      const key = Number(index);
      const cmsRow = proto.get(key);

      if (!cmsRow) {
        dict[key] = protoData[key];
      } else {
        switch (cmsRow.type) {
          case "varint":
          case "float":
            // this could be a buffer if it was read from a group
            if (Array.isArray(protoData[key])) {
              dict[cmsRow.name] = new ProtobufHandler(
                "READ",
                protoData[key][0]
              ).readVarint();
            } else {
              dict[cmsRow.name] = protoData[key];
            }
            break;
          case "signed-varint":
            dict[cmsRow.name] = this.toInt64(protoData[key]);
            break;
          case "varint-repeat":
            const varints = [];
            const varintBuffer = new ProtobufHandler("READ", protoData[key][0]);
            while (varintBuffer.hasMore()) {
              varints.push(varintBuffer.readVarint());
            }
            dict[cmsRow.name] = varints;
            break;
          case "string":
            dict[cmsRow.name] = protoData[key].map((el: string) =>
              el.toString()
            );
            if (dict[cmsRow.name].length === 1) {
              dict[cmsRow.name] = dict[cmsRow.name][0];
            }
            break;
          case "hex-string":
            dict[cmsRow.name] = protoData[key][0].toString("hex");
            break;
          case "string-repeat":
            dict[cmsRow.name] = [];
            const stringHandler = new ProtobufHandler(
              "READ",
              protoData[key][0]
            );
            while (stringHandler.hasMore()) {
              dict[cmsRow.name].push(
                stringHandler
                  .slice(Number(stringHandler.readVarint()))
                  .toString()
              );
            }
            break;
          case "group":
            dict[cmsRow.name] = [];
            for (const row of protoData[key]) {
              const groupHandler = new ProtobufHandler("READ", row);
              const subDict = groupHandler.process();
              dict[cmsRow.name].push(
                groupHandler.parseProto(cmsRow.fields, subDict.dict)
              );
            }

            if (dict[cmsRow.name].length === 1) {
              dict[cmsRow.name] = dict[cmsRow.name][0];
            }
            break;
          case "packed":
            dict[cmsRow.name] = [];
            const groupHandler = new ProtobufHandler("READ", protoData[key][0]);
            while (groupHandler.hasMore()) {
              const subBuffer = new ProtobufHandler(
                "READ",
                groupHandler.slice(Number(groupHandler.readVarint()))
              );

              const subDict = subBuffer.process();

              dict[cmsRow.name].push(
                groupHandler.parseProto(cmsRow.fields, subDict.dict)
              );
            }
            break;
          case "boolean":
            dict[cmsRow.name] = Boolean(protoData[key]);
            break;
          case "enum":
            dict[cmsRow.name] = protoData[key];
            const enumRow = cmsRow.enums[dict.type];
            if (!enumRow) {
              console.error(`Missing enum for ${dict.type}`);
              continue;
            }

            delete protoData["1"]; //remove the type

            Object.assign(dict, this.parseProto(enumRow, protoData));

            for (const key in dict) {
              if (Number.isInteger(parseInt(key))) {
                delete dict[key];
              }
            }

            delete protoData["2"];

            break;
        }
      }
    }

    return dict;
  }
  writeProto(json: any, proto: Map<number, CMSField>) {
    for (const [index] of proto.entries()) {
      const key = Number(index);
      const subProto = proto.get(key);
      if (!subProto) {
        console.log("No proto found for this index.");
        process.exit();
      }
      const data = json[subProto.name];
      if (data === null) {
        console.log(`Missing data for key ${key}`);
        process.exit();
      }

      if (!(subProto.name in json)) {
        continue;
      }

      switch (subProto.type) {
        case "varint":
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeVarint(json[subProto.name]);
          break;
        case "signed-varint":
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeInt64Varint(json[subProto.name]);
          break;
        case "varint-repeat":
          const varintBuffer = new ProtobufHandler("WRITE");
          for (const varint of json[subProto.name]) {
            varintBuffer.writeVarint(Number(varint));
          }
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeVarint(varintBuffer.getUsed().length);
          this.writeBuffer(varintBuffer.getUsed());
          break;
        case "boolean":
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeVarint(json[subProto.name] === false ? 0 : 1);
          break;
        case "string":
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeString(json[subProto.name]);
          break;
        case "string-repeat":
          const handler = new ProtobufHandler("WRITE");
          for (const str of json[subProto.name]) {
            handler.writeString(str);
          }
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeVarint(handler.getUsed().length);
          this.writeBuffer(handler.getUsed());
          break;
        case "float":
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeFloat(json[subProto.name]);
          break;
        case "group":
          if (json[subProto.name]) {
            if (!Array.isArray(json[subProto.name])) {
              json[subProto.name] = [json[subProto.name]];
            }
            for (const group of json[subProto.name]) {
              const subHandler = new ProtobufHandler("WRITE");
              const used = subHandler.writeProto(group, subProto.fields);
              this.writeKey(key, this.typeToWire(subProto.type));
              this.writeVarint(used.length);
              this.writeBuffer(used);
            }
          }
          break;
        case "packed":
          const packedBuffer = new ProtobufHandler("WRITE");
          for (const group of json[subProto.name]) {
            const subBuffer = new ProtobufHandler("WRITE").writeProto(
              group,
              subProto.fields
            );
            packedBuffer.writeVarint(subBuffer.length);
            packedBuffer.writeBuffer(subBuffer);
          }
          this.writeKey(key, this.typeToWire(subProto.type));
          this.writeVarint(packedBuffer.getUsed().length);
          this.writeBuffer(packedBuffer.getUsed());
          // TODO: handle packed and ensure tests pass
          break;
        case "enum":
          const enumRow = subProto.enums[json.type];
          if (!enumRow) {
            console.error(`Missing enum for ${json.type}`);
            continue;
          }
          this.writeKey(key, 0);
          this.writeVarint(json.type);
          this.writeBuffer(
            new ProtobufHandler("WRITE").writeProto(json, enumRow)
          );
          break;
      }
    }

    return this.getUsed();
  }
  slice(length: number) {
    const s = this.buffer.subarray(this.index, this.index + length);
    this.index += length;
    return s;
  }
  readByte() {
    return this.buffer.readUInt8(this.index++);
  }
  writeByte(b: number) {
    this.checkSize(1);
    this.buffer.writeUInt8(b, this.index++);
  }
  readShort() {
    const s = this.buffer.readUInt16LE(this.index);
    this.index += 2;
    return s;
  }
  writeShort(s: number) {
    this.checkSize(2);
    this.buffer.writeUInt16LE(s, this.index);
    this.index += 2;
  }
  readFloat() {
    const f = this.buffer.readFloatLE(this.index);
    this.index += 4;
    return f;
  }
  writeFloat(f: number) {
    this.checkSize(4);
    this.buffer.writeFloatLE(f, this.index);
    this.index += 4;
  }
  readInt() {
    const i = this.buffer.readUInt32LE(this.index);
    this.index += 4;
    return i;
  }
  readIntBE() {
    const i = this.buffer.readUInt32BE(this.index);
    this.index += 4;
    return i;
  }
  writeIntBE(i: number) {
    this.checkSize(4);
    this.buffer.writeUInt32BE(i, this.index);
    this.index += 4;
  }
  writeInt(i: number) {
    this.checkSize(4);
    this.buffer.writeUInt32LE(i, this.index);
    this.index += 4;
  }
  readDouble() {
    const d = this.buffer.readBigInt64LE(this.index);
    this.index += 8;
    return d;
  }
  writeDouble(d: bigint) {
    this.checkSize(8);
    this.buffer.writeBigUint64LE(d, this.index);
    this.index += 8;
  }
  writeString(s: string) {
    const length = Buffer.byteLength(s);
    this.checkSize(length);
    this.writeVarint(length);
    this.buffer.write(s, this.index);
    this.index += length;
  }
  readVarint() {
    let result = 0n;
    let shift = 0n;
    let b;

    do {
      b = this.readByte();
      result |= BigInt(b & 0x7f) << shift;
      shift += 7n;
    } while (b & 0x80);

    return result;
  }
  checkSize(size: number) {
    if (this.index + size > this.buffer.length) {
      let newLength = this.buffer.length;
      while (this.index + size > newLength) {
        newLength *= 2;
      }

      const newBuffer = Buffer.alloc(newLength);
      this.buffer.copy(newBuffer, 0, 0, this.index);
      this.buffer = newBuffer;
    }
  }
  writeVarint(varint: number) {
    const binary = chunk(varint.toString(2))
      .map((el) => pad(el, 7, "0"))
      .reverse();
    for (var i = 0; i < binary.length - 1; i++) {
      binary[i] = "1" + binary[i];
    }
    binary[binary.length - 1] = "0" + binary[binary.length - 1];
    this.checkSize(binary.length);
    for (const b of binary) {
      this.writeByte(parseInt(b, 2));
    }
  }
  writeKey(field: number, wire: number) {
    const key = (field << 3) | wire;
    this.writeVarint(key);
  }
  writeBuffer(buffer: Buffer) {
    this.checkSize(buffer.length);
    buffer.copy(this.buffer, this.index);
    this.index += buffer.length;
  }
  toInt64(u64: bigint) {
    const MAX = 1n << 64n;
    const MAX_SIGNED = 1n << 63n;
    return u64 >= MAX_SIGNED ? u64 - MAX : u64;
  }
  toUint64(i64: bigint): bigint {
    const MAX = 1n << 64n;
    return i64 < 0n ? MAX + i64 : i64;
  }
  writeInt64Varint(value: bigint) {
    let u = this.toUint64(value);
    while (u >= 0x80n) {
      this.checkSize(1);
      this.buffer[this.index++] = Number((u & 0x7fn) | 0x80n);
      u >>= 7n;
    }
    this.checkSize(1);
    this.buffer[this.index++] = Number(u);
  }
  typeToWire(type: string) {
    switch (type) {
      case "varint":
      case "boolean":
      case "signed-varint":
        return 0;
      case "string":
      case "group":
      case "packed":
      case "string-repeat":
      case "varint-repeat":
        return 2;
      case "float":
        return 5;
    }
    return -1;
  }
  getUsed() {
    return this.buffer.subarray(0, this.index);
  }
  hasMore() {
    return this.index < this.buffer.length;
  }
}
