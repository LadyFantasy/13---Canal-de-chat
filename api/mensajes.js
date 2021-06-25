const fs = require("fs");

class Mensajes {
  constructor() {
    this.mensajes = [];
  }

  leerMensajes() {
    try {
      let content = fs.readFileSync("./mensajesFile.txt", "utf-8");
      if (content) {
        this.mensajes = JSON.parse(content);
      }
      return this.mensajes;
    } catch (error) {
      console.log(error);
    }
  }

  agregarMensaje(mensaje) {
    try {
      this.mensajes.push(mensaje);
      fs.writeFileSync("./mensajesFile.txt", JSON.stringify(this.mensajes, null, "\t"));
      return this.mensajes;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new Mensajes();
