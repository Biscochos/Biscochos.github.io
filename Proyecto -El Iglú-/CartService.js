const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/*ID agrega al carrito */
function agregarAlCarrito(producto){
  //por si el  producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("pasteles"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("pasteles",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //localstorage repetidos
    const indiceProducto = memoria.findIndex(pasteles => pasteles.id === producto.id)
    const nuevaMemoria = memoria;
    //Si no esta
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("pasteles",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("pasteles"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(pastel => pastel.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("Pasteles",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("pasteles"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("pasteles");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();