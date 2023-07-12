const productos = [
    {
        id: 1,
        nombre: "Helado de vainilla",
        precio: 2.50,
        stock: 50,
        fechaVencimiento: "2023-12-31"
    },
    {
        id: 2,
        nombre: "Malteada de fresa",
        precio: 3.00,
        stock: 30,
        fechaVencimiento: "2023-11-30"
    },
    {
        id: 3,
        nombre: "Helado de chocolate",
        precio: 2.50,
        stock: 40,
        fechaVencimiento: "2023-12-31"
    },
    {
        id: 4,
        nombre: "Malteada de vainilla",
        precio: 3.00,
        stock: 25,
        fechaVencimiento: "2023-11-30"
    },
    {
        id: 5,
        nombre: "Helado de fresa",
        precio: 2.50,
        stock: 35,
        fechaVencimiento: "2023-12-31"
    },
    {
        id: 6,
        nombre: "Malteada de chocolate",
        precio: 3.00,
        stock: 20,
        fechaVencimiento: "2023-11-30"
    },
    {
        id: 7,
        nombre: "Helado de cookies and cream",
        precio: 2.50,
        stock: 45,
        fechaVencimiento: "2023-12-31"
    },
    {
        id: 8,
        nombre: "Malteada de cookies and cream",
        precio: 3.00,
        stock: 15,
        fechaVencimiento: "2023-11-30"
    },
    {
        id: 9,
        nombre: "Helado de mango",
        precio: 2.50,
        stock: 30,
        fechaVencimiento: "2023-12-31"
    },
    {
        id: 10,
        nombre: "Malteada de mango",
        precio: 3.00,
        stock: 10,
        fechaVencimiento: "2023-11-30"
    }
];
let carrito = [];
let opciones
do {
    opciones = parseInt(prompt("Bienvenido, digite una opción:\n1. Mostrar productos\n2. Promociones\n3. Disponibilidad\n4. Productos nuevos\n6. Carrito y Salir"));

    switch (opciones) {
        case 1:
            let opcion = "";

            while (opcion !== "OK") {
                let id = parseInt(prompt("Digite el número del producto que desea comprar:\n" + mostrarProductos()));
                if (!isNaN(id)) {
                    let cantidad = parseInt(prompt("Digite la cantidad que desea: "));

                    if (!isNaN(cantidad)) {
                        if (validarStock(id, cantidad)) {
                            agregarAlCarrito(id, cantidad);
                        }
                    } else {
                        alert("Cantidad inválida. Por favor, ingrese un número válido.");
                    }
                } else {
                    alert("ID de producto inválido. Por favor, ingrese un número válido.");
                }
                opcion = prompt("Enter para continuar comprando o escriba 'OK' para terminar de comprar y volver al menú principal.");
            }
            break;
        case 2:
            mostrarPromociones();
            break;
        case 3:
            mostrarDisponibilidad();
            break;
        case 4:
            mostrarNuevosProductos();
            break;
        case 5:
            mostrarProductoMasEconomico();
            break;
        default:
            alert("Opción inválida");
            break;
    }
} while (opciones !== 6);



function agregarAlCarrito(idProducto, cantidad) {
    const producto = productos.find(producto => producto.id === idProducto);

    if (producto) {
        carrito.push({ producto, cantidad });
        alert(`Se agregó ${cantidad} ${producto.nombre}(s) al carrito.`);
    } else {
        alert(`El producto con ID ${idProducto} no existe.`);
    }
}

function mostrarCarrito() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
    } else {
      alert("Contenido del carrito: \n"+carrito);
      
    }
  }

function validarStock(idProducto, cantidad) {
    const producto = productos.find(producto => producto.id === idProducto);
    let estado;
    if (producto) {
        if (cantidad <= producto.stock) {
            estado = true;
        } else {
            alert(`Lo sentimos, no hay suficiente stock disponible. Stock actual: ${producto.stock}.`);
            estado = false;
        }
    } else {
        alert(`El producto con ID ${idProducto} no existe.`);
    }
    return estado;
}

function mostrarProductos() {
    let mensaje = 'ID\tProducto\tPrecio\n';
    productos.forEach(producto => {
        mensaje += `${producto.id}\t${producto.nombre}\t$${producto.precio}\n`;

    });
    return mensaje;
}

function mostrarPromociones() {
    const productosConDescuento = productos.precio.map((descuento) => {
        productosFrescos.precio = Math.round(productos.precio * 0.8);
        return productosFrescos;
    });
}

function mostrarDisponibilidad() {
 
}

function mostrarNuevosProductos() {
    // Lógica para mostrar los nuevos productos
    console.log("Mostrando nuevos productos...");
}

function mostrarProductoMasEconomico() {
    // Lógica para mostrar el producto más económico
    console.log("Mostrando producto más económico...");
}
