<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Incluir.aspx.cs" Inherits="WebForm.Forms.Clientes.Incluir" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Styles/Plugins/Datepicker/datepicker.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Plugins/DataTables/dataTables.responsive.css" rel="stylesheet" />

    <script src="../../Scripts/Plugins/JQuery/jQuery-2.1.1.min.js"></script>
    <script src="../../Scripts/Plugins/Bootstrap/bootstrap.js"></script>
    <script src="../../Scripts/Ajax.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.ui.widget.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.iframe-transport.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.fileupload.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.fileupload-process.js"></script>

</head>
<body>
    <div class="title-divisor">Informações de cliente</div>
    <div class="row">
        <div class="col-md-12">
            <div class="form-cadastro">
                <div class="row">
                    <div class="col-md-6">
                        <label class="control-label">Nome do Cliente</label>
                        <input type="text" id="txtNomeCliente" />
                    </div>
                    <div class="col-md-4">
                        <label class="control-label">Código do Cliente</label>
                        <label class="control-label" id="lblCodigoCliente"></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="control-label">CPF do Cliente</label>
                        <input type="text" id="txtCpfCliente" />
                    </div>
                    <div class="col-md-6">
                        <label class="control-label" id="lblDtNascimento">Data de Nascimento</label>
                        <div id="divDtNascimento" class="input-group date">
                            <input id="txtDtNascimento" type="text" class="form-control input-sm" data-date-format="DD/MM/YYYY"
                                placeholder="dd/mm/aaa" />
                            <span class="input-group-addon" style="height: 20px; border-radius: 0px; font-size: 12px;">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-12">
                        <div class="col-md-6">
                            <label class="control-label">Email do Cliente</label>
                            <input type="text" id="txtEmailCliente" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-sm btn-primary aRight" id="btnGravaCliente" style="margin: 10px 0px">Gravar Pessoa</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../../Scripts/Forms/Clientes/Incluir.js"></script>
    <script>
        function _onLoad() {
            ClienteIncluir.init();
        }
    </script>
</body>
</html>
