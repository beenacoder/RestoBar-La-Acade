

$(document).ready(function () {

    formulario.on("submit", enviarFormulario);

    function enviarFormulario(ev) {
        ev.preventDefault();
        validarCliente();
    }


    //ESCUCHAMOS CUANDO EL USUARIO SALE DE LOS CAMPOS DEL FORMULARIO ENMARCAMOS EN ROJO SI NO ESCRIBIO NADA, O VERDE CASO CONTRARIO
    cliente.blur(() => {
        if (cliente.val() == '' || cliente.val() == null) {
            cliente.css({ border: "2px solid red" });
        } else {
            cliente.css({ border: "2px solid green" });
        }
    });
    numeroMesa.blur(() => {
        if (isNaN(numeroMesa.val()) || numeroMesa.val() <= 0) {
            numeroMesa.css({ border: "2px solid red" });
        }
        else {
            numeroMesa.css({ border: "2px solid green" });
        }
    });
    cantidadComensales.blur(() => {
        if (isNaN(cantidadComensales.val()) || cantidadComensales.val() <= 0) {
            cantidadComensales.css({ border: "2px solid red" });
        }
        else {
            cantidadComensales.css({ border: "2px solid green" });
        }
    });



    //EVENTO DE ANIMACION DE PAGINA PRINCIPAL
    //Creamos un efecto tipo parallax con diferentes velocidades en cada momento del scroll
    $(document).ready(function () {
        $(window).scroll(function () {
            var winScroll = $(window).scrollTop();
        
            $('header .titulo').css({
                'transform': 'translate(0px, ' + winScroll / 1 + '%)'
            });
        
            $('.main1 .foto-perfil').css({
                'transform': 'translate(0px, -' + winScroll / 7 + '%)'
            });
        
            $('.main1 .quienes-somos').css({
                'transform': 'translate(0px, -' + winScroll / 6 + '%)'
            });
        });
    });
});

