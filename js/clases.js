//---------------------------Creo clase para comensal

class Comensal {
    constructor(nombre,numeroMesa, cantidad, observaciones){
            this.nombre = nombre;
            this.numeroDeMesa = parseInt(numeroMesa);
            this.cantidad = parseInt(cantidad);
            this.observaciones = observaciones;
    }     
}


//----------------------Objeto clase para el menu 
class Menu {
    constructor(id,imagen, nombre, ingredientes, precio, categoria) {
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.categoria = categoria;
    }
}
//---------------------- Clase para agregar al carrito
class productoComanda {
    constructor(obj) {
        this.id = obj.id;
        this.imagen = obj.imagen;
        this.nombre = obj.nombre;
        this.ingredientes = obj.ingredientes;
        this.precio = obj.precio;
        this.cantidad = 1;
    }
}