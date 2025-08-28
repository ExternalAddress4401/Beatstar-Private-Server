import "frida-il2cpp-bridge";

console.log("started");

Il2Cpp.perform(() => {
  console.log("ran");
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;

  network.class("EndPointConfig").method(".ctor").implementation = function (
    host,
    port,
    name,
    secret
  ) {
    console.log(name, host, port);
    host = Il2Cpp.string("192.168.0.93");
    port = 3000;
    this.method(".ctor").invoke(host, port, name, secret);
    this.field("useSsl").value = false;
  };
}, "free");
