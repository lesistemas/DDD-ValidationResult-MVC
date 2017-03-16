var ClienteDetalhes = {

    //variaveis
    _idCliente: 0,
    _dsIdCliente: '',


    //Informações dos campos
    txtNomeCliente: '',
    lblCodigoCliente: '',
    txtCpfCliente: '',
    txtDtNascimento: '',
    txtEmailCliente: '',

    btnExcuir: '',
    btnAbrirEdicao: '',
    btnEditar: '',

    Cliente: {
        nomeCliente: 'Leandro',
        clienteId: '1',
        cpfCliente: '112345678900',
        dtNascimento: '17/09/1984',
        emailCliente: 'teste@teste.com'
    },

    init: function () {
        ClienteDetalhes._idCliente = getParametrosUrl()["id"];
        ClienteDetalhes.btnExcuir = $("#btnExcuir");
        ClienteDetalhes.btnEditar = $("#btnAlterar");
        ClienteDetalhes.btnAbrirEdicao = $("#btnAbrirEdicao");

        //Informacoes
        ClienteIncluir.txtNomeCliente = $("#txtNomeCliente");
        ClienteIncluir.lblCodigoCliente = $("#lblCodigoCliente");
        ClienteIncluir.txtCpfCliente = $("#txtCpfCliente");
        ClienteIncluir.txtDtNascimento = $("#txtDtNascimento");
        ClienteIncluir.txtEmailCliente = $("#txtEmailCliente");

        ClienteDetalhes.addEvents();
        ClienteDetalhes.BuscarDetalhesCliente();
    },

    addEvents: function () {
        ClienteDetalhes.btnExcuir.click(function () {
            ClienteDetalhes.ExcluirCliente(ClienteDetalhes._idCliente);
        });

        ClienteDetalhes.btnAbrirEdicao.click(function () {
            LiberarEdição();
        });

        ClienteDetalhes.btnEditar.click(function () {
            EditarCliente(
                );
        });
    },

    BuscarDetalhesCliente: function () {

        //TODO: incluir CarregandoPagina();

        if(BuscarClienteAjax()) {
            PreencherCombosDetalhesCliente(ClienteDetalhes.Cliente);
            BloquearCamposParaEdição();
        }
    },

    BloquearCamposParaEdição: function () {

        ClienteDetalhes.txtNomeCliente.attr('readonly', true);
        ClienteDetalhes.txtCpfCliente.attr('readonly', true);
        ClienteDetalhes.txtDtNascimento.attr('readonly', true);
        ClienteDetalhes.txtEmailCliente.attr('readonly', true);

        ClienteDetalhes.btnEditar.removeAttr('visible');
        ClienteDetalhes.btnAbrirEdicao.attr('visible', true);
        ClienteDetalhes.btnExcuir.attr('visible', true);

    },

    LiberarEdição: function () {
        ClienteDetalhes.txtNomeCliente.removeAttr('readonly');
        ClienteDetalhes.txtCpfCliente.removeAttr('readonly');
        ClienteDetalhes.txtDtNascimento.removeAttr('readonly');
        ClienteDetalhes.txtEmailCliente.removeAttr('readonly');

        ClienteDetalhes.btnEditar.attr('visible', true);
        ClienteDetalhes.btnAbrirEdicao.removeAttr('visible');
        ClienteDetalhes.btnExcuir.attr('visible', true);
    },
    
    PreencherCliente: function (clienteId, nomeCliente, cpfCliente, dtNascimento, emailCliente) {
        ClienteDetalhes.Cliente.clienteId = clienteId;
        ClienteDetalhes.Cliente.nomeCliente = nomeCliente;
        ClienteDetalhes.Cliente.cpfCliente = cpfCliente;
        ClienteDetalhes.Cliente.dtNascimento = dtNascimento;
        ClienteDetalhes.Cliente.emailCliente = emailCliente;

        return ClienteDetalhes.Cliente;
    },

    PreencherCombosDetalhesCliente: function (cliente) {
        $("#lblCodigoCliente").val(cliente.clienteId);
        $("#txtNomeCliente").val(cliente.nomeCliente);
        $("#txtCpfCliente").val(cliente.cpfCliente);
        $("#txtDtNascimento").val(cliente.dtNascimento);
        $("#txtEmailCliente").val(cliente.emailCliente);
    },

    ExcluirCliente: function () {

        Dialog.abrir('Confirmar', 'Deseja realmente excluir o ' + ClienteDetalhes.nomeCliente + '?',
            function () {
                ExcluirClienteAjax(ClienteDetalhes._idCliente);
            }, function () {
                Dialog.fechar();
            });
    },

    EditarCliente: function () {

        var clienteAptoParaEdicao = ClienteDetalhes.ValidarCliente(Cliente);

        if (clienteAptoParaEdicao) {
            Dialog.abrir('Confirmar', 'Deseja realmente alterações do ' + ClienteDetalhes.nomeCliente + '?',
                function () {
                    ClienteDetalhes.SalvarClienteAjax();
                }, function () {
                    Dialog.fechar();
            });
        }
    },

    ValidarCliente: function () {
        ClienteDetalhes.txtNomeCliente.removeClass('campoObrigatorio');
        ClienteDetalhes.txtCpfCliente.removeClass('campoObrigatorio');
        ClienteDetalhes.txtDtNascimento.removeClass('campoObrigatorio');
        ClienteDetalhes.txtEmailCliente.removeClass('campoObrigatorio');

        //Campos Obrigatórios
        var campoObrigatorioInformado = true;

        if (ClienteDetalhes.txtNomeCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteDetalhes.txtNomeCliente.addClass('campoObrigatorio');
        }

        if (ClienteDetalhes.txtCpfCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteDetalhes.txtCpfCliente.addClass('campoObrigatorio');
        }

        if (ClienteDetalhes.txtDtNascimento.val() == '') {
            campoObrigatorioInformado = false;
            ClienteDetalhes.txtDtNascimento.addClass('campoObrigatorio');
        }

        if (ClienteDetalhes.txtEmailCliente.val() == '') {
            campoObrigatorioInformado = false;
            ClienteDetalhes.txtEmailCliente.addClass('campoObrigatorio');
        }

        //Fim Campos Obrigatórios
        if (!campoObrigatorioInformado) {
            Mensagem.exibir('alerta', 'Informe os campos obrigatórios', 5000);
            return false;
        }
        return true;
    },
    
    BuscarClienteAjax: function (idCliente) {
        var params = new Array();
        params.push("Id");
        params.push(idCliente);

        if (idCliente > 0) {
            //TODO: Carregar via Ajax
            Ajax.init('Cliente/Detalhes',
                params,
                null,
                //Todo: Arrumar chamada Ajax
                function (result) {
                    if (result.clienteId > 0)
                        ClienteDetalhes.PreencherCliente(result.clienteId,
                                                        result.nomeCliente,
                                                        result.cpfCliente,
                                                        result.dtNascimento,
                                                        result.emailCliente);
                    else {
                        //TODO:Mensagem.exibirPadrao("Não encontrado", 3000);
                        return false;
                    }
                    return true;
                }, function () {
                    //TODO: remove CarregandoPagina();
                },
                false);
        }
    },

    ExcluirClienteAjax: function (idCliente) {
        //TODO: incluir CarregandoPagina();

        if (idCliente > 0) {
            //parametros
            var params = new Array();
            params.push("Id");
            params.push(idCliente);

            //TODO: Carregar via Ajax
            Ajax.init('Cliente/Excluir',
                params,
                null,
                //Todo: Arrumar chamada Ajax
                function (result) {
                    //if(result)
                    //    //TODO:Mensagem.exibirPadrao("Excluido com sucesso", 3000);
                    //    //TODO:Enviar para outra pagina  
                    //else
                    //    //TODO:Mensagem.exibirPadrao("Erro no processo de exclusão!", 3000);

                }, function () {
                    //TODO: remove CarregandoPagina();
                },
                false);
        }
    },
    
    SalvarClienteAjax: function (cliente) {
        var params = new Array();
        params.push("idCliente");
        params.push(ClienteDetalhes.lblCodigoCliente.val());
        params.push("nomeCliente");
        params.push(ClienteDetalhes.txtNomeCliente.val());
        params.push("cpfCliente");
        params.push(ClienteDetalhes.txtCpfCliente.val());
        params.push("dtNascCliente");
        params.push(ClienteDetalhes.txtDtNascimento.val());
        params.push("emailCliente");
        params.push(ClienteDetalhes.txtEmailCliente.val());

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