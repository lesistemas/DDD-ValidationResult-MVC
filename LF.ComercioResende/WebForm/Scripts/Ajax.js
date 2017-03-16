var Ajax = {
    assincrono: true,
    metodo: '/InternalServices/Service.asmx',
    onSuccess: '',
    onError: '',
    beforeSend: '',
    parametros: '{}',
    showErro: false,
    init: function (metodo, array, beforeSend, onSuccess, onError, assincrono, complete) {
        Ajax.metodo = metodo;
        Ajax.parametros = Ajax.ParametrosJSON(array == null ? '{}' : array);
        Ajax.beforeSend = beforeSend;
        Ajax.onSuccess = onSuccess;
        Ajax.onError = onError;
        Ajax.assincrono = assincrono;
        Ajax.complete = complete;
        Ajax.call();

    },
    call: function () {
        $.ajax({
            type: "POST",
            url: Ajax.metodo,
            data: Ajax.parametros,
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            beforeSend: Ajax.beforeSend,
            success: Ajax.onSuccess,
            error: function (xhr, ajaxOptions, thrownError) {

                //mensagem default
                try {
                    Mensagem.exibir('erro', decodeURIComponent(escape(xhr.responseJSON.Message)));
                }
                catch (e) {
                    try {
                        Mensagem.exibir('erro', xhr.responseJSON.Message);
                    } catch (e) {
                        Mensagem.exibir('erro', decodeURIComponent(escape('Ops! Ocorreu um erro inesperado.')));
                    }
                }

                if (Ajax.onError != undefined && Ajax.onError != null && Ajax.onError != '') {
                    Ajax.onError.call();
                }
            },
            async: Ajax.assincrono,
            complete: Ajax.complete
        });
    },
    ParametrosJSON: function (array) {
        if (array.length == 0 || array == null) return '{} ';
        var str = "{";

        for (var i = 0; i < array.length; i = i + 2) {
            str = str.concat("'");
            str = str.concat(array[i]);
            str = str.concat("' : '");
            str = str.concat(array[i + 1]);
            str = str.concat("', ");
        }
        str = str.substr(0, str.length - 2);
        str = str.concat("} ");
        return str;
    }
}