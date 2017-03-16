var ClienteIncluir = {

    //Informações do Cliente
    txtNomeCliente: '',
    lblCodigoCliente: '',
    txtCpfCliente: '',
    txtDtNascimento: '',
    txtEmailCliente: '',

    //Gravação
    btnGravaCliente: '',


    init: function () {
        //Informações do Cliente
        ClienteIncluir.txtNomeCliente = $("#txtNomeCliente");
        ClienteIncluir.lblCodigoCliente = $("#lblCodigoCliente");
        ClienteIncluir.txtCpfCliente = $("#txtCpfCliente");
        ClienteIncluir.txtDtNascimento = $("#txtDtNascimento");
        ClienteIncluir.txtEmailCliente = $("#txtEmailCliente");

        //Gravação
        ClienteIncluir.btnGravaCliente = $("#btnGravaPessoa");

        //Adicionando máscaras
        ClienteIncluir.txtCpf.mask('000.000.000-00');

        //Adicionando eventos
        ClienteIncluir.addEvents();
    },

    addEvents: function () {
        //Gravar Cliente
        ClienteIncluir.btnGravaCliente.click(function () {
            ClienteIncluir.GravarCliente();
        });
    },

    GravarCliente: function () {
        if (!ValidarCliente())
            return false;

        //Dialog.abrir('Confirmar', 'Deseja realmente gravar pessoa?', function() {
        setTimeout(function () {
            ClienteIncluir.IncluirClienteAjax(
                ClienteIncluir.txtNomeCliente.val(),
                ClienteIncluir.txtCpfCliente.val(),
                ClienteIncluir.txtDtNascimento.val(),
                ClienteIncluir.txtEmailCliente.val()
            );
        }, 100);
        //}, function () {
        //    Dialog.fechar();
        //});

        return true;
    },

    ValidarCliente: function () {
        ClienteIncluir.txtNomeCliente.removeClass('campoObrigatorio');
        ClienteIncluir.txtCpfCliente.removeClass('campoObrigatorio');
        ClienteIncluir.txtDtNascimento.removeClass('campoObrigatorio');
        ClienteIncluir.txtEmailCliente.removeClass('campoObrigatorio');

        //Campos Obrigatórios
        var campoObrigatorioInformado = true;

        if (ClienteIncluir.txtNomeCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteIncluir.txtNomeCliente.addClass('campoObrigatorio');
        }

        if (ClienteIncluir.txtCpfCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteIncluir.txtCpfCliente.addClass('campoObrigatorio');
        }

        if (ClienteIncluir.txtDtNascimento.val() == '') {
            campoObrigatorioInformado = false;
            ClienteIncluir.txtDtNascimento.addClass('campoObrigatorio');
        }

        if (ClienteIncluir.txtEmailCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteIncluir.txtEmailCliente.addClass('campoObrigatorio');
        }

        //Fim Campos Obrigatórios
        if (!campoObrigatorioInformado) {
            Mensagem.exibir('alerta', 'Informe os campos obrigatórios', 5000);
            return false;
        }

        return true;
    },

    IncluirClienteAjax: function (nomeCliente, cpfCliente, dtNascCliente, emailCliente) {
        //TODO: incluir CarregandoPagina();

        var params = new Array();
        params.push("nomeCliente");
        params.push(nomeCliente);
        params.push("cpfCliente");
        params.push(cpfCliente);
        params.push("dtNascCliente");
        params.push(dtNascCliente);
        params.push("emailCliente");
        params.push(emailCliente);

        Ajax.init('Clientes/Incluir', params, null,
            function (result) {
                //TODO:Mensagem.exibirPadrao(result.d, 3000);

                if (result.d.tpRetorno == 'OK') {
                    setTimeout(function () {
                        location.href = "../Forms/Clientes/Detalhes.aspx?id=" + result.d.idCliente;
                    }, 2000);
                }
            }, function () {
                //TODO: remove CarregandoPagina();
            }, false);
    }
}