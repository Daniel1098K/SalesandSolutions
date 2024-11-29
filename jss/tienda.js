// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carritoBoton = document.getElementById('carrito-boton');
    const carritoDetalle = document.querySelector('.carrito-detalle');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const cantidadCarrito = document.querySelector('.carrito-cantidad');
    const botonesCompra = document.querySelectorAll('.boton-compra');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        // Limpiar lista actual
        listaCarrito.innerHTML = '';
        
        // Calcular total
        let total = 0;
        
        // Agregar productos al carrito
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            
            // Eliminar el signo de pesos y las comas para calcular correctamente
            const precioLimpio = producto.precio.replace(/[^\d]/g, '');
            const precioNumero = parseInt(precioLimpio);
            
            li.innerHTML = `
                ${producto.nombre} - ${producto.precio}
                <button class="eliminar-producto" data-index="${index}">X</button>
            `;
            listaCarrito.appendChild(li);
            
            total += precioNumero;
        });

        // Actualizar total
        totalCarrito.innerHTML = `<strong>Total:</strong> $${total.toLocaleString()}`;
        
        // Actualizar cantidad de productos
        cantidadCarrito.textContent = carrito.length;

        // Guardar carrito en localStorage
        guardarCarrito();
    }

    // Agregar evento a botones de compra
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Encontrar el producto más cercano
            const productoElemento = e.target.closest('.producto');
            
            // Si no se encuentra desde tienda, buscar desde detalles de producto
            const producto = productoElemento ? {
                id: productoElemento.dataset.id,
                nombre: productoElemento.dataset.nombre,
                precio: productoElemento.querySelector('.producto_precio').textContent
            } : {
                id: document.getElementById('producto-imagen').getAttribute('data-id'),
                nombre: document.getElementById('producto-nombre').textContent,
                precio: document.getElementById('producto-precio').textContent
            };

            // Agregar al carrito
            carrito.push(producto);
            
            // Actualizar vista del carrito
            actualizarCarrito();
        });
    });

    // Mostrar/ocultar carrito
    carritoBoton.addEventListener('click', () => {
        carritoDetalle.classList.toggle('oculto');
    });

    // Eliminar producto del carrito
    listaCarrito.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    // Inicializar carrito al cargar página
    actualizarCarrito();
});