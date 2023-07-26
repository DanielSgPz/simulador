
document.addEventListener('DOMContentLoaded', function() {
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

/* do {
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
 */
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
        const itemEnCarrito = carrito.find(item => item.producto.id === idProducto);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ producto, cantidad, valor });
        }
        
        reducirStock(producto.id, cantidad);
        guardarCarritoEnLocalStorage();
        alert(`Se agregó ${cantidad} ${producto.nombre} al carrito.`);
    } else {
        alert(`El producto con ID ${idProducto} no existe.`);
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
        alert("El carrito está vacío.");
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
    let cardsHTML = '';

    productos.forEach(producto => {
        const cardHTML = `
            <div class="card mx-auto col-md-3 col-10 mt-5">
                <img class='mx-auto img-thumbnail'
                    src="${producto.imagen}"
                    width="auto" height="150px"/>
                <div class="card-body text-center mx-auto">
                    <div class='cvp'>
                        <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary cart px-auto" onclick="agregarAlCarrito(${producto.id}, 1, ${producto.precio})">ADD TO CART</button>
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
