
/* XXXXXX SISTEMA DE INVENTARIO JFC XXXXXX

Corresponde a una mejora realizada en el código de la 1 ra Preentrega, se realiza
bajo el mismo concepto, "el manejo de inventarios" incluyendo algunas operaciones
básicas con stock basadas en consultas, ingresos, egresos, transferencias, desincorporaciones,
modificación de precios. */




// Clase Producto para representar un artículo alimenticio
class Producto {
  constructor(nombre, stock, precio) {
    this.nombre = nombre;
    this.stock = stock;
    this.precio = precio;
  }

  sumarStock(cantidad) {
    this.stock += cantidad;
  }

  restarStock(cantidad) {
    if (cantidad <= this.stock) {
      this.stock -= cantidad;
    } else {
      console.log("No hay suficiente stock para restar.");
    }
  }
}


// Clase Inventario para gestionar las operaciones del inventario
class Inventario {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }

  mostrarInventario() {
    console.log("Inventario:");
    for (let i = 0; i < this.productos.length; i++) {
      const producto = this.productos[i];
      console.log(`${i + 1}: ${producto.nombre} - Stock: ${producto.stock} - Precio: $${producto.precio}`);
    }
    alert("Inventario mostrado en la consola.");
  }
}


// Solicitud de identificación del usuario
let nombreUsuario;

do {
  nombreUsuario = prompt("Sistema de Inventario - Por favor, introduce tu nombre");

  if (/^[A-Za-z]+$/.test(nombreUsuario)) {
    alert(`¡Bienvenido, ${nombreUsuario}!`);
    break;
  } else {
    alert("Por favor, introduce un nombre válido (solo letras).");
  }
} while (true);


// Creación de un inventario
const inventario = new Inventario();


// Agregado de productos al inventario
const arroz = new Producto("Arroz blanco JFC", 2500, 259.99);
const azucar = new Producto("Azúcar refinada JFC", 3060, 699.99);
const leche = new Producto("Leche en polvo JFC", 840, 2300.99);

inventario.agregarProducto(arroz);
inventario.agregarProducto(azucar);
inventario.agregarProducto(leche);


// Función principal para interactuar con el usuario
function gestionarInventario() {
  while (true) {
    const opcion = prompt(
      `${nombreUsuario}, ¿qué deseas hacer?\n1: Mostrar Inventario\n2: Sumar Stock\n3: Restar Stock\n4: Modificar Precio\n5: Transferir Stock\n6: Desincorporar Producto\n7: Salir`
    );

    switch (opcion) {
      case "1":
        mostrarInventario();
        break;
      case "2":
        sumarStock();
        break;
      case "3":
        restarStock();
        break;
      case "4":
        modificarPrecio();
        break;
      case "5":
        transferirStock();
        break;
      case "6":
        desincorporarProducto();
        break;
      case "7":
        alert(`¡Hasta luego, ${nombreUsuario}!`);
        return;
      default:
        alert("Opción no válida. Por favor, elige una opción válida.");
    }
  }
}


// Función para mostrar el inventario en el display y en la consola
function mostrarInventario() {
  let inventarioTexto = "Inventario:\n";
  for (let i = 0; i < inventario.productos.length; i++) {
    const producto = inventario.productos[i];
    inventarioTexto += `${i + 1}: ${producto.nombre} - Stock: ${producto.stock} - Precio: $${producto.precio}\n`;
  }
  alert(inventarioTexto);
  console.log(inventarioTexto);
}


// Función para sumar stock con opción de salir
function sumarStock() {
  while (true) {
    const productoIndex = prompt("Elige un producto para sumar stock:\n" + obtenerListaProductos() + "\nS: Salir").toLowerCase();

    if (productoIndex === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    const producto = inventario.productos[productoIndex - 1];
    const cantidad = parseInt(prompt(`Ingresa la cantidad que deseas sumar al stock de ${producto.nombre}:\nS: Salir`));

    if (cantidad === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    if (!isNaN(cantidad)) {
      producto.sumarStock(cantidad);
      alert(`Stock actualizado: ${producto.nombre} - Nuevo Stock: ${producto.stock}`);
    } else {
      alert("Por favor, introduce una cantidad válida.");
    }
  }
}


// Función para restar stock con opción de salir
function restarStock() {
  while (true) {
    const productoIndex = prompt("Elige un producto para restar stock:\n" + obtenerListaProductos() + "\nS: Salir").toLowerCase();

    if (productoIndex === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    const producto = inventario.productos[productoIndex - 1];
    const cantidad = parseInt(prompt(`Ingresa la cantidad que deseas restar del stock de ${producto.nombre}:\nS: Salir`));

    if (cantidad === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    if (!isNaN(cantidad)) {
      producto.restarStock(cantidad);
      alert(`Stock actualizado: ${producto.nombre} - Nuevo Stock: ${producto.stock}`);
    } else {
      alert("Por favor, introduce una cantidad válida.");
    }
  }
}


// Función para mostrar precio del producto
function modificarPrecio() {
  while (true) {
    const productoIndex = prompt("Elige un producto para modificar su precio:\n" + obtenerListaProductos() + "\nS: Salir").toLowerCase();

    if (productoIndex === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    const producto = inventario.productos[productoIndex - 1];
    alert(`Precio actual de ${producto.nombre}: $${producto.precio}`);
    const nuevoPrecio = parseFloat(prompt(`Ingresa el nuevo precio para ${producto.nombre}:\nS: Salir`));

    if (nuevoPrecio === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    if (!isNaN(nuevoPrecio)) {
      producto.precio = nuevoPrecio;
      alert(`Precio actualizado: ${producto.nombre} - Nuevo Precio: $${producto.precio}`);
    } else {
      alert("Por favor, introduce un precio válido.");
    }
  }
}


// Función para transferir stock
function transferirStock() {
  while (true) {
    const productoIndex = prompt("Elige un producto para transferir stock a sector de ventas:\n" + obtenerListaProductos() + "\nS: Salir").toLowerCase();

    if (productoIndex === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    const producto = inventario.productos[productoIndex - 1];
    const cantidad = parseInt(prompt(`Ingresa la cantidad que deseas transferir a sector de ventas desde depósito >>> ${producto.nombre}:\nS: Salir`));

    if (cantidad === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    if (!isNaN(cantidad) && cantidad <= producto.stock) {
      producto.restarStock(cantidad);
      alert(`Stock transferido a sector de ventas desde depósito >>> ${producto.nombre}: ${cantidad} unidades. Stock en depósito: ${producto.stock}`);
    } else if (!isNaN(cantidad)) {
      alert(`No hay suficiente stock para transferir esa cantidad. Stock actual: ${producto.stock}`);
    } else {
      alert("Por favor, introduce una cantidad válida.");
    }
  }
}


// Función para desincorporar un producto
function desincorporarProducto() {
  while (true) {
    const productoIndex = prompt("Elige un producto para desincorporar por daños o vencimientos:\n" + obtenerListaProductos() + "\nS: Salir").toLowerCase();

    if (productoIndex === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    const producto = inventario.productos[productoIndex - 1];
    const cantidad = parseInt(prompt(`Ingresa la cantidad que deseas desincorporar de ${producto.nombre}:\nS: Salir`));

    if (cantidad === "s") {
      break; // Salir de esta función y volver al menú principal
    }

    if (!isNaN(cantidad) && cantidad <= producto.stock) {
      producto.restarStock(cantidad);
      alert(`Stock desincorporado de ${producto.nombre} debido a daños o vencimientos: ${cantidad} unidades. Stock restante: ${producto.stock}`);
    } else if (!isNaN(cantidad)) {
      alert(`No hay suficiente stock para desincorporar esa cantidad. Stock actual: ${producto.stock}. Solicita una revisión y ajuste del inventario.`);
    } else {
      alert("Por favor, introduce una cantidad válida.");
    }
  }
}


// Función para obtener una lista de productos
function obtenerListaProductos() {
  let lista = "";
  for (let i = 0; i < inventario.productos.length; i++) {
    const producto = inventario.productos[i];
    lista += `${i + 1}: ${producto.nombre} - Stock: ${producto.stock} - Precio: $${producto.precio}\n`;
  }
  return lista;
}

// Inicio de interacción con el usuario
gestionarInventario();

