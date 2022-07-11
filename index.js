let formulario = document.getElementById("formulario")
let inputNombre = document.getElementById("inputNombreProducto")
let inputPrecioCompra = document.getElementById("inputPrecioCompra")
let inputPrecioVenta = document.getElementById("inputPrecioVenta")
let inputCantidad = document.getElementById("inputCantidad")


const productos = []
let tabla;
let textoTotalCompra;
let textoTotalVenta;
let textoTotalGanancia;

class Productos {
    constructor(nombre, precioCompra, precioVenta, cantidad) {
        this.nombre = nombre.toUpperCase()
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
        this.cantidad = cantidad
    }
}


function inicializarElementos() {
    tabla = document.getElementById("tabla-productos");
    textoTotalCompra = document.querySelector("#totalCompra span");
    textoTotalVenta = document.querySelector("#totalVenta span");
    textoTotalGanancia = document.querySelector("#totalGanancia span");
}

function agregarProductosTabla() {
    productos.forEach((producto) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precioCompra}</td>
        <td>${producto.precioVenta}</td>
        <td>${producto.cantidad}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
}

function calcularTotales() {
    let totalCompra = 0;
    let totalVenta = 0;

    totalCompra = productos.reduce(
        (acumulador, item) => acumulador + item.calcularPrecioCompra(),
        0
    );

    totalVenta = productos.reduce(
        (acumulador, item) => acumulador + item.calcularPrecioVenta(),
        0
    );

    textoTotalCompra.innerText = totalCompra;
    textoTotalVenta.innerText = totalVenta;
    textoTotalGanancia.innerText = totalVenta - totalCompra;

}


formulario.onsubmit = (event) => validarFormulario(event)

function validarFormulario(event) {
    event.preventDefault()
    let nombre = inputNombre.value
    let precioCompra = inputPrecioCompra.value
    let precioVenta = inputPrecioVenta.value
    let cantidad = inputCantidad.value

    let producto = new Productos(nombre, precioCompra, precioVenta, cantidad)
    productos.push(producto)

    formulario.reset()

    console.log(productos)
}

function main() {
    inicializarElementos();
    validarFormulario();
    agregarProductosTabla();
    calcularTotales();
}

main();