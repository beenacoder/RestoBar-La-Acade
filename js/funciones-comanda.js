
//Pasamos como parametro a la funcion el plato elegido por el comensal
function agregarAComanda(platoElegido) {
    //Buscamos en el array comanda un id de un producto que coincida con el id elegido por el comensal (platoElegido)
    let encontrado = comanda.find(prod => prod.id == platoElegido.id);
    //Si encontrado es igual a undefined creamos un objeto de la clase productoComanda y lo agregamos al array comanda
    if (encontrado == undefined) {
        let platoAComanda = new productoComanda(platoElegido);
        comanda.push(platoAComanda);
    //     console.log(comanda);
    //Renderizamos la comanda inlcuyendo las propiedades de cada plato
        $("#comandaRender").prepend(`
                <li id="comandaCuerpo" class="list-group-item d-flex justify-content-between flex-wrap">
                    <div class = "col-11">
                        <h6 class="my-0"><span class="badge bg-secondary badge-pill" id='${platoAComanda.id}'>${platoAComanda.cantidad}</span> ${platoAComanda.nombre}</h6>
                        <small class="text-muted">${platoAComanda.ingredientes}</small>
                    </div>
                    <p class="text-muted">$ ${platoAComanda.precio}</p>
                </li>
        `);
    } else {
    //Si encontrado es diferente a undefined entonces buscamos la posicion del producto que hizo coincidencia.
        let posicion = comanda.findIndex(p => p.id == platoElegido.id);
        //le sumamos la cantidad
        comanda[posicion].cantidad += 1;
        //Renderizamos la cantidad nueva
        $(`#${platoElegido.id}`).html(comanda[posicion].cantidad);
    //     console.log(comanda);
    }
    //Guardamos en un localstorage los pedidos que realiza el cliente
    localStorage.setItem('platoComensal', JSON.stringify(comanda));
    calcularTotalComanda();
    eliminarComanda();
}

function calcularTotalComanda(){
    let total = 0;
    for(const plato of comanda){
            total += (plato.precio * plato.cantidad);
            console.log(total);
    }
    $("#total").text(total);
}

function eliminarComanda() {
    $('#EliminarTodo').click(function(){
        //Reinicamos el array comanda, quitando asi todos los elementos
          comanda = [];
          //Vaciamos el carrito/comanda
          $("#comandaRender").empty();
          //Reiniciamos el valor del total
          $("#total").text(0);
          //Removemos el/los platos del storage
          localStorage.removeItem('platoComensal');
        //   console.log(comanda);  
    })
}


function finalizarPedido(){
    $("#finalizarPedido").click(function () {
            $("#comandaCuerpo").html(`
            <div class="alert alert-success" role="alert">
            Muchas gracias por tu pedido! ya estamos cocinando para ti!
            </div>
            `)
            //BORRAMOS TODO EL LOCALSTORAGE UNA VEZ FINALIZADO EL PEDIDO
            localStorage.clear();
            $('.menuLista').fadeOut('slow')
            //Desaparecemos el menu y redirigimos al home
            setTimeout(function() {window.location.href = "index.html"}, 2000);
            
            
        });        
};
finalizarPedido();

