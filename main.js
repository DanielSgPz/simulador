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
    opciones = parseInt(prompt("Bienvenido, digite una opción:\n1. Mostrar productos\n2. Promociones\n3. Disponibilidad\n4. Productos mas economico\n6. Carrito y Salir"));

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
            mostrarProductoMasEconomico();
            break;
    }
} while (opciones !== 6);

if (opciones == 6) {
    mostrarCarrito();

}

function pagar(valorTotal, cantidadRecibido) {
    if (cantidadRecibido >= valorTotal) {
        const cambio = Math.round(cantidadRecibido - valorTotal);
        alert(`Cambio: $${cambio}`);
    } else {
        alert("La cantidad recibida es insuficiente para cubrir el total de la compra.");
    }
}
function agregarAlCarrito(idProducto, cantidad, valor) {
    const producto = productos.find(producto => producto.id === idProducto);

    if (producto) {
        carrito.push({ producto, cantidad, valor });
        reducirStock(producto.id, cantidad);
        alert(`Se agregó ${cantidad} ${producto.nombre} al carrito.`);
    } else {
        alert(`El producto con ID ${idProducto} no existe.`);
    }
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let subtotal = 0;
        let mensaje = "Contenido del carrito:\n";

        carrito.forEach(item => {
            const { producto, cantidad } = item;
            const totalItem = producto.precio * cantidad;

            subtotal += totalItem;
            mensaje += `Producto: ${producto.nombre}\n`;
            mensaje += `Cantidad: ${cantidad}\n`;
            mensaje += `Precio unitario: $${producto.precio}\n`;
            mensaje += `Total: $${totalItem}\n\n`;
        });

        const iva = Math.round(subtotal * 0.21);
        const total = Math.round(subtotal + iva);

        mensaje += `Subtotal: $${subtotal}\n`;
        mensaje += `IVA (21%): $${iva}\n`;
        mensaje += `Total con IVA: $${total}`;

        alert(mensaje);

        const cantidadRecibida = parseFloat(prompt("Ingrese la cantidad recibida:"));
        pagar(total, cantidadRecibida);
    }
}

function reducirStock(id, cantidad) {
    const producto = productos.find(producto => producto.id === id);
    producto.stock -= cantidad;
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
    const today = new Date();
    const promociones = productos.filter(producto => {
        const fechaVencimiento = new Date(producto.fechaVencimiento);
        const tiempoRestante = fechaVencimiento.getTime() - today.getTime();
        const diasRestantes = Math.floor(tiempoRestante / (1000 * 3600 * 24)); // Convierto el tiempo a días

        return diasRestantes <= 15; // Promociono los productos que tienen menos días para vencerse
    });

    if (promociones.length === 0) {
        alert("No hay promociones disponibles en este momento.");
    } else {
        alert("¡Promociones disponibles!");
        let mensaje;
        promociones.forEach(producto => {
            const descuento = producto.precio * 0.2; // Aplicar un descuento del 20%
            const precioPromocional = producto.precio - descuento;
            mensaje += `Producto: ${producto.nombre} Precio: $${producto.precio} Descuento: $${descuento} Precio promocional: $${precioPromocional} \n`;
        });
        return mensaje;
    }
}


function mostrarDisponibilidad() {
    let mensaje;
    productos.forEach(producto => {
        mensaje += `${producto.nombre} Disponible: ${producto.stock} Und\n`;
    });
    return alert(mensaje);

}

function mostrarProductoMasEconomico() {
    let productoMasEconomico = productos[0];

    for (let i = 1; i < productos.length; i++) {
        if (productos[i].precio < productoMasEconomico.precio) {
            productoMasEconomico = productos[i];
        }
    }
    return alert(`El producto más económico es: ${productoMasEconomico.nombre} con precio: $${productoMasEconomico.precio}`);
}
