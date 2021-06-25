const express = require("express");
const router = express.Router();

// CONTROLLER
const Productos = require("./api/productos");
// const Productos = new Productos();

// RUTAS
router.get("/productos/vista", (req, res) => {
  const productos = Productos.listar();
  // if (productos.length > 0) {
  res.render("lista", { hayProductos: productos });

  // else {
  //   res.json({ error: "No hay productos cargados" });
  // } }
});

router.get("/productos/listar", (req, res) => {
  const products = Productos.listar();
  products.length > 0 ? res.send(products) : res.send({ error: "no hay productos cargados" });
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  const product = Productos.listarId(id);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

router.post("/productos/guardar", (req, res) => {
  const { body } = req;
  const product = Productos.guardar(body);
  // res.send(product ?? { error: "Falta rellenar campos" });
  // res.redirect("/");
  res.json(product);
});

router.put("/productos/actualizar/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const product = Productos.actualizar(id, body);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

router.delete("/productos/borrar/:id", (req, res) => {
  const id = req.params.id;
  const product = Productos.borrar(id);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

module.exports = router;
