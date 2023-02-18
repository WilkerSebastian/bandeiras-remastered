function validacao() {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if($("#nome").val().length < 3) {

        mostrarErro("#nome" , $("#nome").attr("err"))
        return false

    }

    if($("#senha").val().length < 8) {

        mostrarErro("#senha" , $("#senha").attr("err"))
        return false

    }

    if ($("#senha").val() != $("#confsenha").val()) {
        
        mostrarErro("#confsenha" , $("#confsenha").attr("err"))
        return false

    }

    if (!($("#term").prop('checked'))) {
        
        mostrarErro("#term", $("#term").attr("err"))
        return false

    }

    if (!(regex.test($("#email").val()))) {

        mostrarErro("#email" , $("#email").attr("err"))
        return false
        
    }

    return true

}

function mostrarErro(id , mensagem) {

    $(id).trigger("focus")
    $(id).css("border", "1px solid #a10c13")
    $("#erro-msg").text(mensagem)
    $("#alerta").css("display", "block")

}