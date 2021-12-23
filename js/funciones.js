let formulario = $("#formulario");
let cliente = $("#nombre");
let numeroMesa = $("#mesa");
let cantidadComensales = $("#cantComensales");
let observaciones = $("#observaciones");
let error = $("#error");
let listaComensales = [];
let comanda = [];
let platos = [];


function validarCliente(){
        //Cambiamos los colores del borde y mostramos un error de acuerdo a la accion del usuario en el formulario
        if(cliente.val() == '' || cliente.val() == null){
                cliente.css({border: "2px solid red"});
                error.css({display: "inline-block"});
                error.html('<li>Por favor completa el nombre</li>');
                return false;
        } if(isNaN(numeroMesa.val()) || numeroMesa.val() <= 0){
                numeroMesa.css({border: "2px solid red"});
                error.css({display: "inline-block"});
                error.html('<li>Ingresa un numero de mesa válido</li>');
                return false;
        } if(isNaN(cantidadComensales.val()) || cantidadComensales.val() <= 0){
                cantidadComensales.css({border: "2px solid red"});
                error.css({display: "inline-block"});
                error.html('<li>Ingresa la cantidad de comensales para tu mesa</li>');
                return false;
        } else{
                //Si todo esta bien ingresado escondemos el formulario y quitamos los valores de errores
                $(".contenedor").hide('slow');
                error.css({display:"none"});
                //Creamos un objeto comensal con los datos del formulario para poder saludarlo
                const comensal = new Comensal(cliente.val(), numeroMesa.val(),cantidadComensales.val(), observaciones.val());
                listaComensales.push(comensal);
                //Guardamos al comensal en locastorage
                guardarComensalEnLocal();
                //Mostramos el menu de platos al comensal para que haga su pedido
                $("#menu-escondido").show('slow');
                saludarComensal(); 
                obtenerPlatosJSON();     
        }
}


function guardarComensalEnLocal(){
        localStorage.setItem("cliente", JSON.stringify(listaComensales));
}

function saludarComensal() {
        //TRAEMOS EL CLIENTE GUARDADO EN STORAGE Y LO RENDERIZAMOS DANDOLE LA BIENVENIDA
        listaComensales = JSON.parse(localStorage.getItem("cliente"));
        listaComensales.forEach(elemento => {
                $("#menu-escondido").prepend(
                        `
                        <div class="text-center">
                                <h3 class="pt-3">Bienvenido ${elemento.nombre} tu mesa es la numero ${elemento.numeroDeMesa}</h3>
                                <h2>Que te apetece comer hoy?</h2>
                        </div>
                        <hr>
                        <button class="btn btn-danger pedidos mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight" >Ver Comanda</button>

                        `
                );
        });
}

function obtenerPlatosJSON () {
        //Obtenemos el menu desde un archivo JSON local
        const URLJSON = "./json/menu.json";
        $.getJSON(URLJSON, function (respuesta, estado) {
                // console.log(estado);
                if (estado == "success") {
                        //Guardamos los datos de respuesta en el array platos
                        platos = respuesta;
                        //Pasamos el array platos como parametro a la funcion mostrarMenu
                        mostrarMenu(platos);
                        categorizar();
                }
        });
}




function mostrarMenu(platosMenu) {
        for (const plato of platosMenu) {
                $('.menuLista').append(`<div class="col-3" id="cardMenu" >
                                <div class="card-group">
                                        <div class="card mt-2"  >
                                                <img src="./img/menu/${plato.imagen}" class="card-img-top imagen" alt="...">
                                                <div class="card-body">
                                                        <h4 class="card-title"><strong>${plato.nombre}</strong></h4>
                                                        <p class="card-text text-muted ingredientes">${plato.ingredientes}</p>
                                                        <div class="d-flex flex-wrap justify-content-between">
                                                        <h4 class="card-text">$${plato.precio}</h4>
                                                        <button type="button" class="btn btn-success" id="btn${plato.id}">Pedir plato</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>`
                ).hide().fadeIn(500);
                //Escuchamos el boton de "Pedir plato"
                $(`#btn${plato.id}`).on('click', function () {
                        //Creamos un efecto con un visto (check) 
                        $(`#btn${plato.id}`).html('<i class="fas fa-check"></i>');
                        //Pasado medio segundo el boton vuelve a su estado original
                        setTimeout(function() { $(`#btn${plato.id}`).text('Pedir Plato')}, 500);
                        $('.pedidos').slideDown('slow');
                        agregarAComanda(plato);//Mandamos completo el plato
                })
        }
        
}

//Funcion para el menu de categorias de platos
function categorizar(){
        $(".nav-link").click(function (e) {
                $(".nav-link").removeClass('active');
                $(this).addClass('active');
    
                //USAMOS UN SWITCH Y EL METODO FILTER PARA FILTRAR EL ARRAY OBTENIDO
                switch (e.target.id) {
                        case "principales":
                                //Filtramos y traemos los elementos con la categoria principales
                                var platosCategoria = platos.filter(elemento => elemento.categoria === "principales");
                                $(".menuLista").empty();
                                // console.log(platosCategoria);
                                mostrarMenu(platosCategoria);
                                break;
                        case "bebidas":
                                //Filtramos y traemos los elementos con la categoria bebidas
                                var platosCategoria = platos.filter(elemento => elemento.categoria === "bebidas");
                                $(".menuLista").empty();
                                // console.log(platosCategoria);
                                mostrarMenu(platosCategoria);
                                break;
                        case "postres":
                                //Filtramos y traemos los elementos con la categoria postres
                                var platosCategoria = platos.filter(elemento => elemento.categoria === "postres");
                                $(".menuLista").empty();
                                // console.log(platosCategoria);
                                mostrarMenu(platosCategoria);
                                break;
                        case "todo":
                                //Traemos todos los elementos
                                var platosCategoria = platos;
                                $(".menuLista").empty();
                                // console.log(platosCategoria);
                                mostrarMenu(platosCategoria);
                                break;
                }
        });
}

