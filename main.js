
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('carrito.html')) {
        mostrarCarrito();
    } else {
        const productosContainer = document.getElementById('productos-container');
        productosContainer.innerHTML = mostrarProductos();
    }
});

const productos = [
    {
        id: 1,
        nombre: "Helado de vainilla",
        precio: 2.50,
        stock: 50,
        fechaVencimiento: "2023-12-31",
        imagen: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1416&q=80"
    },
    {
        id: 2,
        nombre: "Malteada de fresa",
        precio: 3.00,
        stock: 30,
        fechaVencimiento: "2023-11-30",
        imagen: "https://i.blogs.es/ba1ea2/como-hacer-malteada-de-fresa-1-/1366_2000.jpg"
    },
    {
        id: 3,
        nombre: "Helado de chocolate",
        precio: 2.50,
        stock: 40,
        fechaVencimiento: "2023-12-31",
        imagen: "https://www.recetasderechupete.com/wp-content/uploads/2019/07/shutterstock_1010248351.jpg"
    },
    {
        id: 4,
        nombre: "Malteada de vainilla",
        precio: 3.00,
        stock: 25,
        fechaVencimiento: "2023-11-30",
        imagen: "https://s3.amazonaws.com/takami.co/thumbnails/productimage/5aa0da58d445483b9babf5b8339351a1/62wfeqvj7lilyjvoapnumd_1280_800.jpg"
    },
    {
        id: 5,
        nombre: "Helado de fresa",
        precio: 2.50,
        stock: 35,
        fechaVencimiento: "2023-12-31",
        imagen: "https://elmundoenrecetas.s3.amazonaws.com/uploads/recipe/picture/646/helado_de_fresa_casero_2.webp"
    },
    {
        id: 6,
        nombre: "Malteada de chocolate",
        precio: 3.00,
        stock: 20,
        fechaVencimiento: "2023-11-30",
        imagen: "https://i.blogs.es/c6f09d/como-hacer-malteada-chocolate-cremosa-receta-facil-mundo/1366_2000.jpg"
    },
    {
        id: 7,
        nombre: "Helado de cookies and cream",
        precio: 2.50,
        stock: 45,
        fechaVencimiento: "2023-12-31",
        imagen: "https://lh3.googleusercontent.com/-vYhp6GbzUos/YK_LYpmMTsI/AAAAAAAAISo/JNXFySqrVm0bjlvs-SU2bdL5-8sxg6F6wCLcBGAsYHQ/Helado%2Bde%2BCookies%2B2.jpg"
    },
    {
        id: 8,
        nombre: "Malteada de cookies and cream",
        precio: 3.00,
        stock: 15,
        fechaVencimiento: "2023-11-30",
        imagen: "https://img-global.cpcdn.com/recipes/eafdfa385aea7985/640x640sq70/photo.webp"
    },
    {
        id: 9,
        nombre: "Helado de mango",
        precio: 2.50,
        stock: 30,
        fechaVencimiento: "2023-12-31",
        imagen: "https://i.blogs.es/6b8c1d/receta-de-helado-de-mango-facil/1366_2000.jpg"
    },
    {
        id: 10,
        nombre: "Malteada de mango",
        precio: 3.00,
        stock: 10,
        fechaVencimiento: "2023-11-30",
        imagen: "https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/965be018fa900b8cc96d6fa3ed774fb0.webp?itok=F5qDrPwB"
    }
];



let carrito = [];
let opciones

/* function realizarPago() {
    obtenerCarritoDeLocalStorage();

    if (carrito.length === 0) {
        swal("Carrito vacío", "No hay productos en el carrito para pagar.", "info");
    } else {
        const subtotal = calcularSubtotal();
        const iva = Math.round(subtotal * 0.21);
        const total = subtotal + iva;

        const now = luxon.DateTime.local();
        const formattedDate = now.toFormat("yyyy-MM-dd HH:mm:ss");

        const factura = generarFactura(carrito, subtotal, iva, total, formattedDate);

        swal({
            title: "Pagar",
            text: `El subtotal es: $${subtotal}\nIVA (21%): $${iva}\nTotal a pagar: $${total}\n\n${factura}`,
            icon: "info",
            buttons: ["Cancelar", "Pagar"],
        }).then((willPay) => {
            if (willPay) {
                // Realizar la acción de pago aquí
                // Por ejemplo, podrías mostrar un mensaje de éxito y limpiar el carrito.
                swal("Pago realizado", "Gracias por tu compra. El carrito ha sido vaciado.", "success");
                carrito = [];
                guardarCarritoEnLocalStorage();
                mostrarCarrito();
            } else {
                swal("Pago cancelado", "Tu carrito no ha sido modificado.", "info");
            }
        });
    }
} */


async function realizarPago() {
    obtenerCarritoDeLocalStorage();

    if (carrito.length === 0) {
        swal("Carrito vacío", "No hay productos en el carrito para pagar.", "info");
    } else {
        const subtotal = calcularSubtotal();
        const iva = Math.round(subtotal * 0.21);
        const total = subtotal + iva;

        const now = luxon.DateTime.local();
        const formattedDate = now.toFormat("yyyy-MM-dd HH:mm:ss");

        const factura = generarFactura(carrito, subtotal, iva, total, formattedDate);

        const willPay = await swal({
            title: "Pagar",
            text: `El subtotal es: $${subtotal}\nIVA (21%): $${iva}\nTotal a pagar: $${total}\n\n${factura}`,
            icon: "info",
            buttons: ["Cancelar", "Pagar"],
        });

        if (willPay) {
            try {
                const response = await fetch('https://reqres.in/api/users/1');
                const data = await response.json();
                
                if (data.data) {
                    const pagoExitoso = Math.random() < 0.5; // Simulación de éxito o fallo de pago
                    if (pagoExitoso) {
                        // Mostrar el mensaje de éxito de transacción
                        await swal("Transacción exitosa", "El pago se ha procesado correctamente.", "success");

                        // Vaciar el carrito y actualizar la interfaz
                        carrito = [];
                        guardarCarritoEnLocalStorage();
                        mostrarCarrito();
                    } else {
                        await swal("Transacción fallida", "El pago no pudo ser procesado. Por favor, inténtalo nuevamente.", "error");
                    }
                } else {
                    await swal("Error en la respuesta", "La respuesta de la API no es la esperada.", "error");
                }
            } catch (error) {
                console.error('Error en la solicitud de pago:', error);
            }
        } else {
            swal("Pago cancelado", "Tu carrito no ha sido modificado.", "info");
        }
    }
}


function calcularSubtotal() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.producto.precio * item.cantidad;
    });
    return subtotal;
}


function generarFactura(carrito, subtotal, iva, total, fecha) {
    let factura = "Factura:\n\n";
    factura += `Fecha y hora: ${fecha}\n\n`;
    factura += "Detalle de la compra:\n\n";

    carrito.forEach(item => {
        factura += `Producto: ${item.producto.nombre}\n`;
        factura += `Cantidad: ${item.cantidad}\n`;
        factura += `Precio unitario: $${item.producto.precio}\n`;
        factura += `Total: $${item.producto.precio * item.cantidad}\n\n`;
    });

    factura += `Subtotal: $${subtotal}\n`;
    factura += `IVA (21%): $${iva}\n`;
    factura += `Total a pagar: $${total}`;

    return factura;
}

function agregarAlCarrito(idProducto, cantidad, valor) {
    const producto = productos.find(producto => producto.id === idProducto);

    if (producto) {
        if (validarStock(idProducto, cantidad)) {
            const itemEnCarrito = carrito.find(item => item.producto.id === idProducto);
            if (itemEnCarrito) {
                itemEnCarrito.cantidad += cantidad;
            } else {
                carrito.push({ producto, cantidad, valor });
            }

            reducirStock(producto.id, cantidad);
            guardarCarritoEnLocalStorage();
            swal("Agregado!", `Se agregó ${cantidad} ${producto.nombre} al carrito.`, "success");
        }
    } else {
        swal("Información", `El producto con ID ${idProducto} no existe.`, "info");
    }
}


function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}



function mostrarCarrito() {
    obtenerCarritoDeLocalStorage();
    if (carrito.length === 0) {
        swal("No hay productos", "El carrito está vacío.", "info");

    } else {
        const tableBody = document.querySelector('#carrito-table tbody');
        tableBody.innerHTML = '';

        let subtotal = 0;

        carrito.forEach(item => {
            const { producto, cantidad } = item;
            const totalItem = producto.precio * cantidad;

            subtotal += totalItem;

            const rowHTML = `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${cantidad}</td>
                    <td>$${producto.precio}</td>
                    <td>$${totalItem}</td>
                </tr>
            `;

            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        });

        const iva = Math.round(subtotal * 0.21);
        const total = Math.round(subtotal + iva);

        const totalHTML = `
            <tr>
                <th colspan="3" class="text-end">Subtotal:</th>
                <td>$${subtotal}</td>
            </tr>
            <tr>
                <th colspan="3" class="text-end">IVA (21%):</th>
                <td>$${iva}</td>
            </tr>
            <tr>
                <th colspan="3" class="text-end">Total con IVA:</th>
                <td>$${total}</td>
            </tr>
        `;

        tableBody.insertAdjacentHTML('beforeend', totalHTML);
    }
}



function reducirStock(id, cantidad) {
    const producto = productos.find(producto => producto.id === id);
    producto.stock -= cantidad;
}

function validarStock(idProducto, cantidad) {
    const producto = productos.find(producto => producto.id === idProducto);

    if (producto) {
        if (cantidad <= producto.stock) {
            return true;
        } else {
            swal("Unidades insuficientes", `Lo sentimos, no hay suficiente stock disponible. Stock actual: ${producto.stock}.`, "error");
            return false;
        }
    } else {
        swal("No encontrado", `El producto con ID ${idProducto} no existe.`, "error");
        return false;
    }
}

function mostrarProductos() {
    let cardsHTML = '';

    productos.forEach(producto => {
        const cardHTML = `
            <div class="card mx-auto col-md-3 col-10 mt-5">
                <img class='mx-auto img-thumbnail'
                    src="${producto.imagen}"
                    width="auto" height="150px"/>
                <div class="card-body text-center mx-auto">
                    <div class='cvp align-items-center d-flex flex-column gap-1'>
                        <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <input type="number" id="cantidad-${producto.id}" min="1" value="1" style="width: 60px;  text-align: center;">
                        <button class="btn btn-primary cart px-auto" onclick="agregarAlCarrito(${producto.id}, document.getElementById('cantidad-${producto.id}').value, ${producto.precio})">ADD TO CART</button>
                    </div>
                </div>
            </div>
        `;

        cardsHTML += cardHTML;
    });

    return cardsHTML;
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
        swal("Sin promociones ", "No hay promociones disponibles en este momento.", "info");
    } else {
        let mensaje;
        promociones.forEach(producto => {
            const descuento = producto.precio * 0.2; // Aplicar un descuento del 20%
            const precioPromocional = producto.precio - descuento;
            mensaje += `Producto: ${producto.nombre} Precio: $${producto.precio} Descuento: $${descuento} Precio promocional: $${precioPromocional} \n`;
        });
        return swal("Información", mensaje, "info");

    }
}


function mostrarDisponibilidad() {
    let mensaje = "";
    productos.forEach(producto => {
        mensaje += `${producto.nombre} Disponible: ${producto.stock} Und\n`;
    });
    return swal("Información", mensaje, "info");

}

function mostrarProductoMasEconomico() {
    let productoMasEconomico = productos[0];

    for (let i = 1; i < productos.length; i++) {
        if (productos[i].precio < productoMasEconomico.precio) {
            productoMasEconomico = productos[i];
        }
    }
    return swal("Información", `El producto más económico es: ${productoMasEconomico.nombre} con precio: $${productoMasEconomico.precio}`, "info");
}
