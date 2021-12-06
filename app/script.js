const ID_APP        = '#app'
const VIEW_PATH     = 'views/';
const MODAL_HOME    = '#modal_home'
const BASE_URL      = 'http://localhost:8081/api'; //'http://144.22.236.244:8080/api';
const DATA_TYPE     = 'json';
const CONTENT_TYPE  = 'application/json';
const METHOD_GET    = 'GET';
const METHOD_POST   = 'POST';
const ERROR_MESSAGE = {
    required : "Este campo es requerido",
    type : "Este campo no cumple con el tipo solicitado",
    pass_not_match: "contraseña/confirmación no coincidentes",
    email_exist: "Cuenta asociada al email ya existe",
    user_not_exist: "No existe un usuario"
}
const SUCCESS_MESSAGE = {
    success_signup: "Cuenta creada de forma correcta"
}
const FORMS = {
    login: {
        id: '#form_login',
        header: 'Iniciar Sesión',
        submit_text: 'aceptar',
        url_ws: 'user/&email/&password',
        method: METHOD_GET,
        callback: function(res){
            if(res !== null && res.id !== null){
                localStorage.setItem('user', JSON.stringify(res));
                window.location.href = 'views/home.html'
            }else{
                alert(ERROR_MESSAGE.user_not_exist);
            }
        }
    },
    signup: {
        id: '#form_signup',
        header: 'Registrar usuario',
        submit_text: 'guardar',
        url_ws: 'user/new',
        method: METHOD_POST,
        callback: function(res){
            alert(SUCCESS_MESSAGE.success_signup);
            toggleTabsPage('login');
        }
    }
}

var currentForm;

/**
 * 
 */
$(document).ready(() => {
    $("#login_signup_form").submit(function(ev) {
        ev.preventDefault();
        if(validateForm($(this).prop('id'))){
            submitForm();
        }
    });
    init();
})

/**
 * 
 */
function init(){
    $(MODAL_HOME).modal({
        backdrop: 'static',
        keyboard: false
    });
    $(MODAL_HOME).modal('show');
    toggleTabsPage('login');
}

/**
 * 
 * @param {*} tab 
 */
function toggleTabsPage(tab){
    currentForm = FORMS[tab];
    $("#modal_header_text").html(FORMS[tab].header);
    $("#form_login_content").html($(FORMS[tab].id).html());
    $("#btn_send").val(FORMS[tab].submit_text);
}

/**
 * 
 * @param {*} form 
 */
function validateForm(form){
    let countErrors = 0;
    $(`form#${form} :input`).each(function(){
        $(this).parent().find('.feedback-error').text("");
        //validación de requeridos
        if($(this).val() === ""){
            $(this).parent().find('.feedback-error').text(ERROR_MESSAGE.required);
            countErrors++;
        }

        //validación tipo
        if($(this).prop('type') === 'email'){
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test($(this).val())){
                $(this).parent().find('.feedback-error').text(ERROR_MESSAGE.type);
                countErrors++;
            }else{
                let input = $(this); 
                let callback = function(res){
                    if(res){
                        input.parent().find('.feedback-error').text(ERROR_MESSAGE.email_exist);
                        countErrors++;
                    }
                }
                sendRequest({ url: 'user/' + $(this).val() }, callback)
            }
        }

        if($(this).prop('type') === 'password'){
            let values = $("input.password-control").map(function(){return $(this).val();}).get();
            values = values.filter(e => e);
            if(!values.every( v => v === values[0])){
                $(this).parent().find('.feedback-error').text(ERROR_MESSAGE.pass_not_match);
                countErrors++;
            }
        }
    });
    return (countErrors === 0);
}

/**
 * 
 * 
 */
function submitForm(){
    let dataPayload = {}
    $(`${currentForm.id}`).find('input').each(function(){
        let id = $(this)[0].id;
        //console.log($("#login_signup_form").find($(`#${id}`)[0]).val())
        let value = $("#login_signup_form").find($(`#${id}`)[0]).val()
        dataPayload[$(this).prop('id')] = value;   
        currentForm.url_ws = currentForm.url_ws.replace(`&${id}`, value)
    })
    let options = {
        url: currentForm.url_ws,
        method: currentForm.method,
        data: currentForm.method == METHOD_POST ? JSON.stringify(dataPayload) : null
    }
    //console.log(options)
    sendRequest(options, currentForm.callback);
}


/**
 * metodo para envio de peticiones a la base de datos
 * @param {*} options 
 * @param {*} callback 
 */
function sendRequest(options, callback){
    $.ajax({
        dataType: DATA_TYPE,
        data: options.data,
        url: `${BASE_URL}/${options.url}`,
        contentType: CONTENT_TYPE,
        type: options.method ?? METHOD_GET,
        success: callback,
        statusCode: {
            201: function() { 
                resetForm();
            }
        },
        error: function(jqXHR, textStatus, errorThrown){ }
    })
}

/**
 * 
 */
function resetForm(){
    $(`${currentForm.id}`).find('input').each(function(){ 
        $(`#${$(this)[0].id}`).val(""); 
    })
}
