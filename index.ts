import "frida-il2cpp-bridge";

console.log("started");

Il2Cpp.perform(() => {
  console.log("ran");
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;
  const logger = Il2Cpp.domain
    .assembly("SpaceApe.Logger")
    .image.class("Logger");

  logger.method("Warn").implementation = function (message: Il2Cpp.Object) {
    console.log(message.toString());
  };
  logger.method("Info").implementation = function (message: Il2Cpp.Object) {
    console.log(message.toString());
  };
  logger.method("Log").implementation = function (message: Il2Cpp.Object) {
    console.log(message.toString());
  };
  logger.method("Debug").implementation = function (message: Il2Cpp.Object) {
    console.log(message.toString());
  };
  logger.method("Error").implementation = function (message: Il2Cpp.Object) {
    console.log(message.toString());
  };

  network.class("EndPointConfig").method(".ctor").implementation = function (
    host,
    port,
    name,
    secret
  ) {
    console.log(name, host, port);
    host = Il2Cpp.string("192.168.1.33");
    port = 3000;
    this.method(".ctor").invoke(host, port, name, secret);
    this.field("useSsl").value = false;
  };
}, "free");
