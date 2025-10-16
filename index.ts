import "frida-il2cpp-bridge";

console.log("started");

Il2Cpp.perform(() => {
  console.log("ran");
  /*Il2Cpp.trace(true)
    .assemblies(...Il2Cpp.domain.assemblies)
    .filterClasses((k) => k.name.toLowerCase().includes("popup"))
    .and()
    .attach();*/
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;
  const logger = Il2Cpp.domain
    .assembly("SpaceApe.Logger")
    .image.class("Logger");
  const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly.class("ErrorPopupScreen").method("Initialise").implementation =
    function (evt) {
      console.log("called!");
      this.method("Initialise").invoke(evt);
      const abel = this.field("ErrorCodeLabel").value;
      console.log(abel.method("get_text").invoke());
    };

  /*rakshaClient.class("raksha.ProtoItem").method("ToBytes").implementation =
    function (estimated) {
      console.log("--------------------");
      console.log((this as any).class.name);

      const json = Il2Cpp.domain.assembly("JsonFx.Json").image;
      const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;

      const o = json.class("JsonFx.Json.JsonWriterSettings").alloc();
      o.method(".ctor").invoke();

      const str = rakshaClient
        .class("raksha.RakshaJson")
        .method("Serialize")
        .invoke(this as any, o) as Il2Cpp.String;

      console.log(str);
      return this.method("ToBytes").invoke(estimated);
    };

  rakshaClient.class("raksha.ProtoItem").method("Read").implementation =
    function (input) {
      this.method("Read").invoke(input);
      console.log("--------------------");
      console.log((this as any).class.name);

      const json = Il2Cpp.domain.assembly("JsonFx.Json").image;
      const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;

      const o = json.class("JsonFx.Json.JsonWriterSettings").alloc();
      o.method(".ctor").invoke();

      const str = rakshaClient
        .class("raksha.RakshaJson")
        .method("Serialize")
        .invoke(this as any, o) as Il2Cpp.String;

      console.log(str);
    };*/

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
});
