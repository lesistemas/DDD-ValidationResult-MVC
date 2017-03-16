/*
Nesse arquivo deve existir apenas funções basicas e padroes do sistema
*/

//retorna array com todos os parametros contidos na url
function getParametrosUrl() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var Request = {
    QueryString: function (variavel) {
        var hu = window.location.search.substring(1);
        var gy = hu.split("&");
        for (var i = 0; i < gy.length; i++) {
            var ft = gy[i].split("=");
            if (ft[0] == variavel) {
                return ft[1];
            }
        }
        return "";
    }
};

//pega a url do host
function getHostUrl() {
    return window.location.protocol + '//' + window.location.host;
}

//metodo para redirecionamento de tela
function Redirecionar(pUrl) { window.location.href = pUrl; }

function ExibirCarregando(idTabela, pconteudo) {

    var div = $("#" + idTabela);

    if (div.css("min-height") == '0px') {
        div.css("min-height", '100px');
    }

    $('<div/>').html(pconteudo).fadeIn("slow").attr('id', 'divGiexLoading_' + idTabela).addClass("giexloading").css({
        lineHeight: div.height() - 70 + 'px',
        padding: div.css("padding-top") + " " + div.css("padding-left") + " " + div.css("padding-bottom") + " " + div.css("padding-right"),
        margin: div.css("margin-top") + " " + div.css("margin-left") + " " + div.css("margin-bottom") + " " + div.css("margin-right"),
        minHeight: div.css("min-height"),
        width: div.width(),
        height: div.height(),
        position: div.position()
    }).insertBefore("#" + idTabela);

    $(window).resize(function () {
        $("#giexloading_" + idTabela).css({
            width: div.width(),
            height: div.height(),
            position: div.position()
        });
    });
}

function RemoverCarregando(idTabela) {
    $("#" + idTabela).prev(".giexloading").remove();
};

function downloadArquivo(pIdArquivo, pNmArquivo, pDownload) {

    if (pDownload === undefined || pDownload === '' || pDownload === null) {
        pDownload = true;
    }   

    window.open('../Arquivo/Download.aspx?NOME_ARQUIVO=' + pNmArquivo + '&ID_ARQUIVO=' + pIdArquivo + '&DOWNLOAD=' + pDownload);
};

function recuperarVersaoInternetExplorer() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var rv = 0;

    //Caso seja o internet explorer, retorna a versão
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {

        if (isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
            //Se for IE 11
            if (navigator.appName == 'Netscape') {

                var ua = navigator.userAgent;
                var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null) {
                    rv = parseFloat(RegExp.$1);
                    return rv
                }
            }
            else {
                //outro browser qualquer
                return 0;
            }
        }
        else {
            // caso seja qualquer versap abaixo do IE 11
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
        }
    }
    return 0;
};

var Sessao = {
    _idAssinatura: 0,
    idAssinatura: function () {
        Ajax.init('/WebUI/InternalServices/Sessao.asmx/IdAssinatura', null, null, function (msg) {
            Sessao._idAssinatura = msg.d;
        }, null, false);
        return Sessao._idAssinatura;
    },

    _idCredor: 0,
    idCredor: function () {
        Ajax.init('/WebUI/InternalServices/Sessao.asmx/idCredor', null, null, function (msg) {
            Sessao._idCredor = msg.d;
        }, null, false);
        return Sessao._idCredor;
    },

    paginaInicialUsuario: function () {
        var url = "/WebUI/Default.aspx";

        try {
            Ajax.init('/WebUI/InternalServices/Assinatura.asmx/ListarPaginaInicial', null, null,
                function (result) {
                    if (result.d.dsUrl.trim() != '') {
                        url = result.d.dsUrl;
                    }
                }, null, false);
        } catch (e) {

        }
        window.location = url;
    }
}



var calcHeight = function () {
    $('iframe.iframe').height($(window).height() - 80);
}

$(window).resize(function () {
    calcHeight();
}).load(function () {
    calcHeight();
});

//jquery extend para redirect com post
$.extend(
{
    redirectPost: function (location, args) {
        var form = '';
        $.each(args, function (key, value) {
            value = value.split('"').join('\"');
            value = value.replace('"', '').replace('"', '');

            form += '<input type="hidden" name="' + key + '" value="' + value + '">';
        });
        $('<form action="' + location + '" method="POST" target="_blank">' + form + '</form>').appendTo($(document.body)).submit();
    }
});

var Validacao = {

    validaCPF: function (strCPF) {
        strCPF = strCPF.replace(/[^\d]+/g, '');
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },

    validaCNPJ: function (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    },

    validaHora: function (hr) {
        if (hr.val() != "") {
            var hr_ = hr.val();
            hrs = (hr_.substring(0, 2));
            min = (hr_.substring(3, 5));
            isValid = true;

            if ((hrs < 00) || (hrs > 23) || (min < 00) || (min > 59) || hrs.length != 2 || min.length != 2) {
                isValid = false;
            }

            if (min.length == 0) {
                min = '00';
            }
            else if (min.length == 1) {
                min = min + '0';
            }

            if (isValid == false) {
                Mensagem.exibir('alerta', hr.val() + " não é uma hora válida!", 5000);
                hr.val('');
                setTimeout(function () {
                    hr.focus();
                }, 250);
            }
        }
    },

    validaIntervaloData: function (pDtIni, pDtFim) {
        var data_1 = new Date(pDtIni);
        var data_2 = new Date(pDtFim);
        if (data_1 > data_2) {
            Mensagem.exibir('alerta', "Data inicial não pode ser maior que a data final", 5000);
            return false;
        } else { return true; }
    }
}

var Modal = {
    //variables
    element: '',
    //Modal Containers
    modalMoved: '',
    modalMaster: '',
    modalMasterTitle: '',
    modalMasterContent: '',
    modalIframeMaster: '',
    modalIframe: '',
    modalMasterTitleIframe: '',

    init: function () {
        Modal.modalMoved = $("#modalMoved");
        Modal.modalMaster = $("#modalMaster");
        Modal.modalMasterTitle = $("#modalMasterTitle");
        Modal.modalMasterContent = $("#modalMasterContent");
        Modal.modalIframeMaster = $("#modalMasterIframe");
        Modal.modalIframe = $("#modalIframe");
        Modal.modalMasterTitleIframe = $("#modalMasterTitleIframe");
    },

    exibir: function (idContainer, title, onInit, width, height) {
        Modal.element = $("#" + idContainer);
        Modal.modalMasterContent.append(Modal.element);
        $("#" + idContainer).show();
        Modal.modalMasterTitle.html(title);
        Modal.modalMaster.find(".close-modal").attr("id", "dvFechar" + idContainer);

        var modalW = width != undefined ? width : "98%";
        var modalH = height != undefined ? height : "95%";
        if (width != undefined && height != undefined) {
            Modal.modalMaster.css({
                width: modalW + "px",
                height: modalH + "px",
                margin: -(modalH / 2) + "px 0px 0px " + -(modalW / 2) + "px",
                top: "50%",
                left: "50%"
            });
            Modal.modalMasterContent.css({
                height: height - 32 + "px"
            });
        }
        else {
            Modal.modalMaster.css({
                width: modalW,
                height: modalH,
                margin: "0px",
                top: "1%",
                left: "1%"
            });
            Modal.modalMasterContent.css({
                height: Modal.modalMaster.height() - 32 + "px"
            });
        }

        if (onInit != undefined) {
            onInit.call();
        }

        $(".modal-mask").fadeIn(100, function () {
            Modal.modalMaster.fadeIn(100);
        });

        $(".modal-mask").unbind("click").click(function () {
            Modal.fechar();
            Dialog.fechar();
        });

        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    },

    exibirIframe: function (url, title, onInit) {
        //solução p não abrir modal dentro de modal dentro de modal
        try {
            if (parent.Modal.modalIframe.attr("src") != undefined && parent.Modal.modalIframe.attr("src") != "") {
                window.location.href = url;
            }
        } catch (e) {
            window.location.href = url;
        }

        Modal.modalMasterTitleIframe.html(title);
        var modalW = "98%";
        var modalH = "94%";

        Modal.modalIframeMaster.css({
            width: modalW,
            height: modalH,
            margin: "0px",
            top: "1%",
            left: "1%"
        });


        if (onInit != undefined) {
            onInit.call();
        }

        $(".modal-mask").fadeIn(100, function () {
            Modal.modalIframeMaster.fadeIn(100);
        });

        $(".modal-mask").unbind("click").click(function () {
            Modal.fecharIframe();

        });

        Modal.modalIframe.attr("src", url);

        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    },

    fechar: function (onClose) {
        Modal.modalMaster.fadeOut(100, function () {
            $(".modal-mask").fadeOut(100, function () {
                Modal.modalMasterTitle.html('');
                Modal.modalMoved.append(Modal.element);
                Modal.element = '';
                if (onClose != undefined) {
                    onClose.call();
                }
            });
        });
        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    },

    fecharIframe: function (onClose) {
        Modal.modalIframe.attr("src", "");
        Modal.modalIframeMaster.fadeOut(100, function () {
            $(".modal-mask").fadeOut(100, function () {
                Modal.modalMasterTitleIframe.html('');
                if (onClose != undefined) {
                    onClose.call();
                }
            });
        });
        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    }
};

var Dialog = {
    //variables

    //Dialog Containers
    dialogMaster: '',
    dialogTitle: '',
    dialogMasterContent: '',
    btnFecharDialog: '',
    btnCancelarDialog: '',
    btnConfirmarDialog: '',

    init: function () {
        Dialog.dialogMaster = $("#dialogMaster");
        Dialog.dialogTitle = $("#dialogTitle");
        Dialog.dialogMasterContent = $("#dialogMasterContent");
        Dialog.btnFecharDialog = $("#btnFecharDialog");
        Dialog.btnCancelarDialog = $("#btnCancelarDialog");
        Dialog.btnConfirmarDialog = $("#btnConfirmarDialog");

        Dialog.dialogMaster.css({
            width: "400px",
            height: "200px",
            margin: "-100px 0px 0px -200px",
            top: "50%",
            left: "50%"
        });

        $(".modal-mask").unbind("click").click(function () {
            Dialog.fechar();
            Modal.fechar();
        });
    },

    abrir: function (title, text, confirmFunction, cancelFunction, confirmLabel, cancelLabel) {
        Dialog.dialogTitle.html(title);
        Dialog.dialogMasterContent.html(text);

        Dialog.btnConfirmarDialog.html("Confirmar");
        if (confirmLabel != undefined && confirmLabel != "")
            Dialog.btnConfirmarDialog.html(confirmLabel);

        Dialog.btnCancelarDialog.html("Cancelar");
        if (cancelLabel != undefined && cancelLabel != "")
            Dialog.btnCancelarDialog.html(cancelLabel);

        Dialog.btnCancelarDialog.unbind("click").click(function () {
            cancelFunction.call();
            Dialog.fechar();
        });

        Dialog.btnFecharDialog.unbind("click").click(function () {
            cancelFunction.call();
            Dialog.fechar();
        });

        Dialog.btnConfirmarDialog.unbind("click").click(function () {
            confirmFunction.call();
            Dialog.fechar();
        });

        $(".modal-mask").fadeIn(100, function () {
            Dialog.dialogMaster.fadeIn(100);
        });

        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    },

    fechar: function () {
        Dialog.dialogMaster.fadeOut(100, function () {
            $(".modal-mask").fadeOut(100, function () {
                Dialog.dialogTitle.html('');
                Dialog.dialogMasterContent.html('');
            });
        });
        ControleNavegacao.Limpar(ControleNavegacao.storageNavegacaoModal);
    }
};

function mascaraValor(v) {

    var valor = v.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    valor = valor.replace(/,/g, 'x').replace('.', ',').replace(/x/g, '.');

    return valor;
}

function converteData(v) {

    if (v === undefined || v == '') {
        return '';
    }

    try {
        var partes = v.split('/');

        var data = new Date(partes[2], partes[1] - 1, partes[0]);

        return data;
    } catch (ex) {
        return '';
    }
}

function converteDataString(v) {

    var dia = v.getDate();
    var mes = v.getMonth() + 1;
    var ano = v.getFullYear();

    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
}

function retornaDataMaior(datas) {

    var dataMaior = Math.max.apply(Math, datas.map(function (o) { return o; }));

    return new Date(dataMaior);
}

function validaAnoAtual(elemento, mensagem, anoMinimo) {

    var mensagemDefault = 'Informe somente números de {0} até {1}';
    var anoMinimoDefault = 1900;

    anoMinimo = typeof anoMinimo !== 'undefined' ? anoMinimo : anoMinimoDefault;
    mensagem = typeof mensagem !== 'undefined' ? mensagem : mensagemDefault;

    $('.campoErroValidacao').hide();
    $(elemento).removeClass('campoObrigatorio');

    if ($(elemento).val() == '') {
        return true;
    }

    var data = new Date();
    var anoAtual = data.getFullYear()

    var valor = 0;

    try {
        valor = Number($(elemento).val());
    } catch (ex) {
        valor = 0;
    }

    if (valor <= anoMinimo || valor > anoAtual) {
        $(elemento).addClass('campoObrigatorio');
        $(elemento).after('<span class="campoErroValidacao">' + mensagem.replace('{0}', anoMinimo).replace('{1}', anoAtual) + '</span>');
        return false;
    }

    return true;
}

function AtivarComponenteData() {

    $(".input-group.date").datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        daysOfWeekDisabled: "0,6",
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
    });
}

function GerarBreadcrumb(idFuncao) {
    $("#olBreadcrumb").show();

    var urlParams = getParametrosUrl();
    var dsArgumentos = [];
    var stPermitida = "S";
    var stArquivoManual = 'N'; //define se o modulo em questão possui arquivo de manual para download
    var stAlterarArquivoManual = 'N'; //define se o usuário logado possui permissão para alterar/incluir o arquivo de guia/manual do módulo

    $(urlParams).each(function (k, v) {
        dsArgumentos.push(urlParams[v]);
    });

    $("#olBreadcrumb").html('');

    var params = new Array();
    params.push("IdFuncao");
    params.push(idFuncao);
    params.push("DsArgumentos");
    params.push(dsArgumentos);
    Ajax.init('/WebUI/InternalServices/Geral.asmx/ListarFuncoesBreadcrumbs', params, function (e) {
        $("#olBreadcrumb").append("<li><img src='/WebUI/Styles/Imagens/ajax_loader_barra.gif' style='width: 20px;' /></li>");
    }, function (result) {

        $("#olBreadcrumb").html('');

        $("#olBreadcrumb").append("<li style='cursor: pointer;'><a onclick='javascript:Sessao.paginaInicialUsuario();'><i class='fa fa-home'></i></a></li>");

        $.each(result.d, function (key, item) {

            stPermitida = item.StPermitida;
            stArquivoManual = item.StArquivoManual;
            stAlterarArquivoManual = item.StAlterarArquivoManual;

            $("#olBreadcrumb").append("<li><a href='" + item.Url + "'>" + item.NmFuncao + "</a></li>");

        });
        $("#olBreadcrumb li:last").html($("#olBreadcrumb li:last a").html());

        var acaoRaiz = "";
        if (getParametrosUrl()["cabecalhoocultar"] == 1)
            acaoRaiz = "Modal";

        AdicionarVoltarBreadcrumb();

        if (stArquivoManual == 'S') {
            $("#olBreadcrumb").append('<div class="breadcrumb-voltar" style="margin-right: 5px; font-size: 13px !important;"><a data-toggle=\"tooltip\" data-original-title=\"Download guia/manual do módulo\" onclick="GuiaRapidoModulo.downloadManualModulo(\'' + idFuncao + '\');"><i class="fa fa-cloud-download"></i></a></div>');
            $('[data-toggle="tooltip"]').tooltip();
        }

        if (stAlterarArquivoManual == 'S') {
            $("#olBreadcrumb").append('<div class="breadcrumb-voltar" style="margin-right: 5px; font-size: 13px !important;"><a data-toggle=\"tooltip\" data-original-title=\"Incluir guia/manual do módulo\" onclick="GuiaRapidoModulo.exibirModalUploadManualModulo(\'' + idFuncao + '\');"><i class="fa fa-cloud-upload"></i></a></div>');
            $('[data-toggle="tooltip"]').tooltip();
        }

        //Se retornar "N" deverá limpar as informações do storage e redirecionar o usuário para a página inicial.
        if (stPermitida == 'N') {
            localStorage.removeItem("GiexOnlineMenu");
            localStorage.removeItem("GiexOnlineDadosUsuario");

            $("#modalPermissao").css({
                width: "308px",
                height: "100px",
                margin: "-100px 0px 0px -100px",
                top: "50%",
                left: "50%"
            });

            $(".modal-mask").fadeIn(100, function () {
                $("#modalPermissao").fadeIn(100);
            });

            $(".modal-mask").unbind("click");
        }
    }, function () { $("#olBreadcrumb").html(''); });
}

var GuiaRapidoModulo = {

    idFuncaoModulo: '',
    nmArquivo: '',
    arquivoGuia: '',

    downloadManualModulo: function (idFuncao) {
        var params = new Array();
        params.push("IdFuncao");
        params.push(idFuncao);
        Ajax.init('/WebUI/InternalServices/Geral.asmx/DownloadManualFuncao', params, function () {
            GiexMasterPage.ExibirCarregandoPagina("Preparando Download...");
        }, function (result) {

            GiexMasterPage.RemoveCarregandoPagina();

            if (result.d.stArquivo == 'S') {
                var redirect = '/WebUI/Arquivo/download.aspx';
                var nome = result.d.nmFuncaoManual;
                var arquivo = result.d.bnArquivo;
                $.redirectPost(redirect, { NOME_ARQUIVO: nome, ARQUIVO: JSON.stringify(arquivo), DOWNLOAD: 'true' });
            } else {
                Mensagem.exibir('erro', 'Não foi possível realizar o download do arquivo.');
            }
        }, function () {
            GiexMasterPage.RemoveCarregandoPagina();
        }, false);
    },

    exibirModalUploadManualModulo: function (idFuncao) {
        GuiaRapidoModulo.idFuncaoModulo = idFuncao;
        Modal.exibir('divModalUploadGuiaBreadcrumb', 'Upload guia/manual do módulo', null, 600, 200);
        GuiaRapidoModulo.atribuiFuncaoUploadGuiaModulo();
    },

    atribuiFuncaoUploadGuiaModulo: function () {

        $('#divUploadGuiaModulo').css({ opacity: 0.5 });
        $('#fileUploadGuiaModulo').prop("disabled", true);
        $("#txtNmArquivoUpload").val('Preparando...');

        window.setTimeout(function () {
            $('#fileUploadGuiaModulo').fileupload({
                url: '/WebUI/Arquivo/Upload.ashx?TIPO=GUIAMODULO',
                dataType: 'text',
                autoUpload: true,
                acceptFileTypes: /^image\/(pdf)$/i,
                maxFileSize: 500000000, // 500 MB ?
                disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
                send: function (e, data) {
                    $("#btnCancelarUploadGuia").prop("disabled", true);
                    $("#btnConfirmarUploadGuia").prop("disabled", true);
                },
                done: function (e, data) {
                    $("#btnCancelarUploadGuia").prop("disabled", false);
                    $("#btnConfirmarUploadGuia").prop("disabled", false);
                    GuiaRapidoModulo.arquivoGuia = data._response.result;
                },
                fail: function (e, data) {
                    $("#btnCancelarUploadGuia").prop("disabled", false);
                    $("#btnConfirmarUploadGuia").prop("disabled", false);
                    $("#txtNmArquivoUpload").val('');
                    GuiaRapidoModulo.arquivoGuia = '';
                    Mensagem.exibir('erro', 'Problema ao realizar upload do arquivo de guia/manual do módulo. ' + data._response.jqXHR.responseText);
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    var msg = progress + "% Carregado";
                    $('#progressUploadGuia .progress-bar').css('width', progress + '%').html(msg);
                },
                always: function (e, data) {
                    window.setTimeout(function () { $('#progressUploadGuia .progress-bar').css('width', 0 + '%').html(0 + '%'); }, 5000);
                }
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

            $('#divUploadGuiaModulo').css({ opacity: 1 });
            $('#fileUploadGuiaModulo').prop("disabled", false);
            $("#txtNmArquivoUpload").val('');
        }, 2500);
    },

    incluirGuiaModulo: function () {

        if (GuiaRapidoModulo.nmArquivo.trim() == '') {
            Mensagem.exibir('alerta', 'Selecione o arquivo para upload.', 5000);
            return;
        }

        var params = new Array();
        params.push('IdFuncao');
        params.push(GuiaRapidoModulo.idFuncaoModulo);
        params.push('NmArquivo');
        params.push(GuiaRapidoModulo.nmArquivo);
        params.push('BnArquivo');
        params.push(GuiaRapidoModulo.arquivoGuia);
        Ajax.init('/WebUI/InternalServices/Geral.asmx/incluirGuiaModulo', params,
            function () {
                ExibirCarregando('divModalUploadGuiaBreadcrumb', 'Gravando arquivo...');
            },
            function (result) {
                Mensagem.exibirPadrao(result.d, 5000);
                Modal.fechar(function () {
                    $("#txtNmArquivoUpload").val('');
                    GuiaRapidoModulo.idFuncaoModulo = '';
                    GuiaRapidoModulo.nmArquivo = '';
                    GuiaRapidoModulo.arquivoGuia = '';
                });
                RemoverCarregando('divModalUploadGuiaBreadcrumb');
                GerarBreadcrumb(GuiaRapidoModulo.idFuncaoModulo); //recarrega breadcrumb
            }, function () { RemoverCarregando('divModalUploadGuiaBreadcrumb'); });
    },

    validaUploadGuiaModulo: function () {
        var nmArquivoUpload = RemoveAcento($('#fileUploadGuiaModulo').val().substring($('#fileUploadGuiaModulo').val().lastIndexOf('\\')).replace('\\', '').toLowerCase().replace(/( )+/g, '_').replace('.pdf', '')) + $('#fileUploadGuiaModulo').val().substring($('#fileUploadGuiaModulo').val().lastIndexOf(".")).toLowerCase();
        var ext = $('#fileUploadGuiaModulo').val().substring($('#fileUploadGuiaModulo').val().lastIndexOf(".")).toLowerCase().replace('.', '');
        if ('pdf' == ext) {
            $("#txtNmArquivoUpload").val(nmArquivoUpload);
            GuiaRapidoModulo.nmArquivo = nmArquivoUpload;
        }
        else
            Mensagem.exibir('alerta', 'Tipo de arquivo inválido, por favor selecione um ".PDF"', 5000);
    }
}

function VoltarNavegacao(acaoRaiz) {
    //Se for Modal, controla a navegação interna
    if (getParametrosUrl()["cabecalhoocultar"] == 1 || acaoRaiz == "Modal") {

        //Obtem paginas da storage
        ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacaoModal);

        //Obtem quantidade de paginas na navegação
        ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

        //Se existir mais de uma pagina, realiza operação de voltar
        if (ControleNavegacao.qtdArray > 1) {
            ControleNavegacao.RemoverUltimaPagina(ControleNavegacao.storageNavegacaoModal);
            localStorage.setItem("GiexOnlineControleVoltarModal", "1");
            window.location.href = ControleNavegacao.ObterUltimaPagina();
        } else
            return;
    } else {
        //Obtem paginas da storage
        ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacao);

        //Obtem quantidade de paginas na navegação
        ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

        //Se existir mais de uma pagina, realiza operação de voltar
        if (ControleNavegacao.qtdArray > 1) {
            ControleNavegacao.RemoverUltimaPagina(ControleNavegacao.storageNavegacao);
            localStorage.setItem("GiexOnlineControleVoltar", "1");
            window.location.href = ControleNavegacao.ObterUltimaPagina();
        } else {
            return;
        }
    }
}

var ControleNavegacao = {

    //Variaveis
    paginaAtual: window.location.href,
    storageNavegacao: 'GiexOnlineNavegacao',
    storageNavegacaoModal: 'GiexOnlineNavegacaoModal',
    paginas: [],
    qtdArray: 0,

    //Controla a gravação da navegacao
    Init: function () {

        var gravaLista = true;
        var ultimaPaginaNavegada = '';
        var paginaAnterior = '';

        //Verifica se existe dados na storage
        //Se nao existir grava primeira pagina
        //Se existir, aplica logica para salvar pagina nova
        if (!localStorage.getItem(ControleNavegacao.storageNavegacao)) {
            //Grava pagina no array de paginas
            ControleNavegacao.paginas.push({ url: ControleNavegacao.paginaAtual });

            //Grava array de paginas na storage como string
            localStorage.setItem(ControleNavegacao.storageNavegacao, JSON.stringify(ControleNavegacao.paginas));

            $(".breadcrumb-voltar a").addClass("voltarDesativado");
        } else {
            //Obter lista de paginas na storage
            ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacao);

            //Obtem ultima pagina navegada
            ultimaPaginaNavegada = ControleNavegacao.ObterUltimaPagina();

            //Se a pagina atual for diferente da ultima pagina navegada, grava pagina na navegação
            //Se forem iguais, desconsidera (postback)
            if (ControleNavegacao.paginaAtual != ultimaPaginaNavegada) {

                //Variavel responsavel por controlar se o carregamento é devido ao botao voltar
                var acaoBotaoVoltar = localStorage.getItem("GiexOnlineControleVoltar");

                if (acaoBotaoVoltar == 1) {
                    //Remove a ultima pagina navegada da lista
                    ControleNavegacao.paginas.pop();

                    //Grava lista atualizada de paginas
                    ControleNavegacao.GravarStorage(ControleNavegacao.storageNavegacao);

                    //Obtem ultima pagina navegada (atualizada)
                    ultimaPaginaNavegada = ControleNavegacao.ObterUltimaPagina();

                    //Se a ultima url for igual a atual, não salva na lista
                    if (ControleNavegacao.paginaAtual == ultimaPaginaNavegada) {
                        gravaLista = false;
                    }
                } else {
                    //Obtem quantidade de paginas acessadas
                    ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

                    //Se existir apenas uma pagina na navegação, limpa variavel de pagina anterior
                    if (ControleNavegacao.qtdArray <= 1)
                        paginaAnterior = '';
                    else {
                        //Obtem penultima pagina
                        paginaAnterior = ControleNavegacao.paginas[ControleNavegacao.qtdArray - 2].url;
                    }

                    //Se não existir pagina anterior e a pagina atual for igual a penultima acessada.
                    //Remove ultima pagina acessada, atualiza a lista e não grava a pagina atual
                    //Logica que caracteriza o retorno através do botao voltar do browser
                    if (paginaAnterior != '' && (ControleNavegacao.paginaAtual == paginaAnterior)) {
                        ControleNavegacao.paginas.pop();
                        ControleNavegacao.GravarStorage(ControleNavegacao.storageNavegacao);
                        gravaLista = false;
                    }
                }

                if (gravaLista) {
                    //Cria nova pagina navegada
                    ControleNavegacao.paginas.push({ url: ControleNavegacao.paginaAtual });

                    //Salva lista de paginas atualizadas
                    ControleNavegacao.GravarStorage(ControleNavegacao.storageNavegacao);
                }
            }

            //Obtem quantidade de paginas acessadas
            ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

            if (ControleNavegacao.qtdArray <= 1)
                $(".breadcrumb-voltar a").addClass("voltarDesativado");
            else
                $(".breadcrumb-voltar a").removeClass("voltarDesativado");
        }

        localStorage.removeItem("GiexOnlineControleVoltar");
    },

    //Controla a gravação da navegacao no modal
    InitModal: function () {

        var gravaLista = true;
        var ultimaPaginaNavegada = '';
        var paginaAnterior = '';

        //Verifica se existe dados na storage
        //Se nao existir grava primeira pagina
        //Se existir, aplica logica para salvar pagina nova
        if (!localStorage.getItem(ControleNavegacao.storageNavegacaoModal)) {
            //Grava pagina no array de paginas
            ControleNavegacao.paginas.push({ url: ControleNavegacao.paginaAtual });

            //Grava array de paginas na storage como string
            localStorage.setItem(ControleNavegacao.storageNavegacaoModal, JSON.stringify(ControleNavegacao.paginas));

            $(".breadcrumb-voltar a").addClass("voltarDesativado");
        } else {
            //Obter lista de paginas na storage
            ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacaoModal);

            //Obtem ultima pagina navegada
            ultimaPaginaNavegada = ControleNavegacao.ObterUltimaPagina();

            //Se a pagina atual for diferente da ultima pagina navegada, grava pagina na navegação
            //Se forem iguais, desconsidera (postback)
            if (ControleNavegacao.paginaAtual != ultimaPaginaNavegada) {

                //Variavel responsavel por controlar se o carregamento é devido ao botao voltar
                var acaoBotaoVoltar = localStorage.getItem("GiexOnlineControleVoltarModal");

                if (acaoBotaoVoltar == 1) {
                    //Remove a ultima pagina navegada da lista
                    ControleNavegacao.paginas.pop();

                    //Grava lista atualizada de paginas
                    ControleNavegacao.GravarStorage(ControleNavegacao.storageNavegacaoModal);

                    //Obtem ultima pagina navegada (atualizada)
                    ultimaPaginaNavegada = ControleNavegacao.ObterUltimaPagina();

                    //Se a ultima url for igual a atual, não salva na lista
                    if (ControleNavegacao.paginaAtual == ultimaPaginaNavegada) {
                        gravaLista = false;
                    }
                }

                if (gravaLista) {
                    //Cria nova pagina navegada
                    ControleNavegacao.paginas.push({ url: ControleNavegacao.paginaAtual });

                    //Salva lista de paginas atualizadas
                    ControleNavegacao.GravarStorage(ControleNavegacao.storageNavegacaoModal);
                }
            }

            //Obtem quantidade de paginas acessadas
            ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

            if (ControleNavegacao.qtdArray <= 1)
                $(".breadcrumb-voltar a").addClass("voltarDesativado");
            else
                $(".breadcrumb-voltar a").removeClass("voltarDesativado");
        }

        localStorage.removeItem("GiexOnlineControleVoltarModal");
    },

    //Obter lista de paginas na storage
    ObterPaginas: function (nomeStorage) {
        ControleNavegacao.paginas = JSON.parse(localStorage.getItem(nomeStorage));
    },

    //Obtem ultima pagina navegada para a ação de voltar
    ObterUltimaPagina: function () {
        //ControleNavegacao.paginas = JSON.parse(localStorage.getItem(nomeStorage));
        ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

        if (ControleNavegacao.qtdArray == 0)
            return "#";

        return ControleNavegacao.paginas[ControleNavegacao.qtdArray - 1].url;
    },

    //Remove ultima pagina da navegação (voltando)
    RemoverUltimaPagina: function (nomeStorage) {

        //Obtem lista de paginas da navegação
        ControleNavegacao.paginas = JSON.parse(localStorage.getItem(nomeStorage));

        //Remove ultima pagina do array
        ControleNavegacao.paginas.pop();

        //Limpa storage para garantir navegação atualizada
        ControleNavegacao.Limpar(nomeStorage);

        //Salva novo array na storage com a nova pagina
        localStorage.setItem(nomeStorage, JSON.stringify(ControleNavegacao.paginas));
    },

    //Gravar lista de paginas na storage
    GravarStorage: function (nomeStorage) {
        //Limpa storage para garantir navegação atualizada
        ControleNavegacao.Limpar(nomeStorage);

        //Salva novo array na storage com a nova pagina
        localStorage.setItem(nomeStorage, JSON.stringify(ControleNavegacao.paginas));
    },

    //Limpa navegação da storage
    Limpar: function (nomeStorage) {
        localStorage.removeItem(nomeStorage);
    },

    //Retorna quantidade de paginas gravadas na navegação
    QuantidadePaginas: function () {
        var length = 0;
        //objetoStorage.paginas = JSON.parse(localStorage.getItem(objetoStorage.storageNavegacao));

        for (var prop in ControleNavegacao.paginas) {
            if (ControleNavegacao.paginas.hasOwnProperty(prop)) length++;
        }

        return length;
    }
}

function stMenuExpandido() {
    if ($('body').hasClass('sidebar-collapsed'))
        return false;
    else
        return true;
}

function AdicionarVoltarBreadcrumb() {

    var objVoltar = $("#dvBreadcrumbVoltar");
    //console.log(objVoltar.length);
    if (objVoltar.length == 0) {
        var acaoRaiz = "";
        if (getParametrosUrl()["cabecalhoocultar"] == 1)
            acaoRaiz = "Modal";


        //Se for Modal, controla a navegação interna
        if (getParametrosUrl()["cabecalhoocultar"] == 1 || acaoRaiz == "Modal") {

            //Obtem paginas da storage
            ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacaoModal);

            //Obtem quantidade de paginas na navegação
            ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

            //Se existir mais de uma pagina, realiza operação de voltar
            if (ControleNavegacao.qtdArray > 1) {
                $("#olBreadcrumb").append("<div class='breadcrumb-voltar' id='dvBreadcrumbVoltar'><a href='javascript:;' onclick='VoltarNavegacao(" + acaoRaiz + ");'><i class='glyphicon glyphicon-chevron-left'></i>Voltar</a></div>");
            }

        } else {
            //Obtem paginas da storage
            ControleNavegacao.ObterPaginas(ControleNavegacao.storageNavegacao);

            //Obtem quantidade de paginas na navegação
            ControleNavegacao.qtdArray = ControleNavegacao.QuantidadePaginas();

            //Se existir mais de uma pagina, realiza operação de voltar
            if (ControleNavegacao.qtdArray > 1) {
                $("#olBreadcrumb").append("<div class='breadcrumb-voltar' id='dvBreadcrumbVoltar'><a href='javascript:;' onclick='VoltarNavegacao(" + acaoRaiz + ");'><i class='glyphicon glyphicon-chevron-left'></i>Voltar</a></div>");
            }
        }
    }
}



function RemoveAcento(palavra) {
    var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ&.,´`^¨~"' + "'";
    var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC          ';
    for (l in palavra) {
        for (l2 in com_acento) {
            if (palavra[l] == com_acento[l2]) {
                palavra = palavra.replace(palavra[l], sem_acento[l2]);
            }
        }
    }
    return palavra.replace(/( )+/g, '');
}

//Aplica layout nos campos obrigatórios
function CampoObrigatorio(elemento, sucesso) {
    if (sucesso) {
        elemento.removeClass('campoObrigatorio');
    } else {
        elemento.addClass('campoObrigatorio');
    }
};

var Alerta = {
    //variables

    //Dialog Containers
    alertaMaster: '',
    alertaMasterContent: '',
    btnAlertaMasterOK: '',

    init: function () {
        Alerta.alertaMaster = $("#alertaMaster");
        Alerta.alertaMasterContent = $("#alertaMasterContent");
        Alerta.btnAlertaMasterOK = $("#btnAlertaMasterOK");

        $(".modal-mask").unbind("click");
    },

    abrir: function (text, OkFunction, OkLabel, width, height) {
        Alerta.alertaMasterContent.html(text);

        var modalW = width != undefined ? width : "98%";
        var modalH = height != undefined ? height : "95%";
        if (width != undefined && height != undefined) {

            Alerta.alertaMaster.css({
                width: modalW + "px",
                height: modalH + "px",
                margin: -(modalH / 2) + "px 0px 0px " + -(modalW / 2) + "px",
                top: "50%",
                left: "50%"
            });
        }
        else {
            Alerta.alertaMaster.css({
                width: "400px",
                height: "200px",
                margin: "-100px 0px 0px -200px",
                top: "50%",
                left: "50%"
            });
        }

        Alerta.btnAlertaMasterOK.html("OK");
        if (OkLabel != undefined && OkLabel != "")
            Alerta.btnAlertaMasterOK.html(OkLabel);

        if (OkFunction != undefined) {
            Alerta.btnAlertaMasterOK.unbind("click").click(function () {
                OkFunction.call();
                Alerta.fechar();
            });
        } else {
            Alerta.btnAlertaMasterOK.unbind("click").click(function () {
                Alerta.fechar();
            });
        }

        $(".modal-mask").fadeIn(100, function () {
            Alerta.alertaMaster.fadeIn(100);
        });
    },

    fechar: function () {
        Alerta.alertaMaster.fadeOut(100, function () {
            $(".modal-mask").fadeOut(100, function () {
                Alerta.alertaMasterContent.html('');
            });
        });
    }
};


var Mensagem = {

    //recebe retorno padrao (objeto com os atributos 'tpRetorno' e 'dsMensagem'
    exibirPadrao: function (objRetornoPadrao, tempo) {
        var tipoMsg = '';
        switch (objRetornoPadrao.tpRetorno.toLowerCase()) {
            case 'ok': tipoMsg = 'sucesso';
                break;
            case 'er': tipoMsg = 'erro';
                break;
            case 'al': tipoMsg = 'alerta';
                break;
        }
        Mensagem.exibir(tipoMsg, objRetornoPadrao.dsMensagem, tempo);
    },

    //tipo is error, success, info, alert
    exibir: function (tipo, msg, tempo) {
        var id_ = Math.random().toString().replace(".", "");
        var glyphicon = '';
        switch (tipo.toLowerCase()) {
            case 'erro': glyphicon = "remove";
                break;
            case 'sucesso': glyphicon = "ok";
                break;
            case 'info': glyphicon = "info-sign";
                break;
            case 'alerta': glyphicon = "warning-sign";
                break;
        }
        var box = '<div class="message-box box-' + tipo + '" id="' + id_ + '">';
        box += '       <span class="message-close" onclick="javascript:Mensagem.fecharMensagem(\'' + id_ + '\');">X</span>';
        box += '           <span class="message-ico glyphicon glyphicon-' + glyphicon + '"></span>';
        box += '           <span class="message-text">' + msg + '</span>';
        box += '   </div>';
        $("#message").append(box);
        $("#" + id_).fadeIn(500);
        if (tempo != undefined) {
            setTimeout(function () {
                $("#" + id_).fadeOut(500).remove();
            }, tempo);
        }
    },

    fecharMensagem: function (id) {
        $("#" + id).fadeOut(150);
    },

    fecharTodas: function () {
        $('.message-box').fadeOut(150);
    }
}

//Função para incluir arquivo JS versionado com ultimo build (cache)
var ControlarJS = {

    incluir: function (arquivo, onInit) {
        arquivo = arquivo + "?v=" + VersaoBuild.obterVersao();
        var body = document.getElementsByTagName('body')[0];
        var script;

        script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', arquivo);
        body.appendChild(script);

        script.onload = function () {
            if (onInit != undefined) {
                onInit.call();
            }
        }
        return false;
    }
}

var VersaoBuild = {
    versao: 0,
    storageVersao: "GiexOnlineVersao",

    obterVersao: function () {
        //Se storage for compativel, busca/grava versao
        if (typeof (Storage) !== "undefined") {
            //Obter versao do storage
            if (localStorage.getItem(VersaoBuild.storageVersao)) {
                VersaoBuild.versao = localStorage.getItem(VersaoBuild.storageVersao);
            } else {
                //Busca versao atualizada do build
                VersaoBuild.buscarBuild();

                //Grava versao atualizada do build
                localStorage.setItem(VersaoBuild.storageVersao, VersaoBuild.versao);
            }
        } else {
            //Busca versao atualizada do build
            VersaoBuild.buscarBuild();
        }

        return VersaoBuild.versao;
    },

    buscarBuild: function () {
        Ajax.init('/WebUI/InternalServices/Geral.asmx/ObterVersao', null, null, function (dados) {
            VersaoBuild.versao = dados.d;
        }, null, false);
    },

    //Limpa navegação da storage
    limpar: function () {
        localStorage.removeItem(VersaoBuild.storageVersao);
    }
}