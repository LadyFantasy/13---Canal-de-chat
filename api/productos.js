const arrProds = require("./productos.json");

class Productos {
  constructor() {
    this.arrproductos = arrProds;
  }

  listar() {
    return this.arrproductos;
  }

  listarId(id) {
    const product = this.arrproductos.find(prod => {
      return prod.id == id;
    });
    return product;
  }

  guardar(body) {
    if (body.title && body.price && body.thumbnail) {
      let { title, price, thumbnail } = body;
      price = Number(price);
      const id = this.arrproductos.length + 1;
      const product = { title, price, thumbnail, id };

      this.arrproductos.push(product);
      console.log(product)
      return product;
    } else return;
  }

  actualizar(id, body) {
    let productExists = this.listarId(id);

    if (productExists) {
      let producto = this.arrproductos.findIndex(product => product.id == id);
      return Object.assign(this.arrproductos[producto], body);
    } else return;
  }

  borrar(id) {
    let productExists = this.listarId(id);

    if (productExists) {
      this.arrproductos = this.arrproductos.filter(product => product.id != id);
      return productExists;
    } else return;
  }
}

module.exports = new Productos();
