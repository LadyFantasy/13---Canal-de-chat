let socket = io.connect();

socket.on("productos", function (productos) {
  document.getElementById("datos").innerHTML = data2TableHBS(productos);
});

socket.on("showMessages", data => {
  render(data);
});

// ==========CHAT============

function render(data) {
  console.log("data en render", data);
  let htmlMensajes = data
    .map(mensaje => {
      return `<div><span class="blue">${mensaje.email}</span>
            <span>[ <span class="red">${mensaje.fecha}</span> ]:</span>
            <span class="green">${mensaje.mensaje}</span></div>
        `;
    })
    .join(" ");
  document.getElementById("listaMensajes").innerHTML = htmlMensajes;
}

function addMessage(e) {
  let mensaje = {
    email: document.getElementById("email").value,
    mensaje: document.getElementById("mensaje").value,
    fecha: new Date().toLocaleString()
  };

  socket.emit("newMessage", mensaje);
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";

  return false;
}

// ===============tabla de productos===============

const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

  fetch("/api/productos/guardar", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(respuesta => respuesta.json())
    .then(productos => {
      form.reset();
      socket.emit("update", "ok");
    })
    .catch(error => {
      console.log("ERROR", error);
    });
});

function data2TableHBS(productos) {
  const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>
        {{#if productos}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Thumbnail</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `;

  var template = Handlebars.compile(plantilla);
  let html = template({ productos: productos });
  return html;
}
