<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Detalhes.aspx.cs" Inherits="WebForm.Forms.Clientes.Detalhes" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Detalhes Cliente</title>
    <link href="../../Styles/Plugins/Datepicker/datepicker.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Plugins/DataTables/dataTables.responsive.css" rel="stylesheet" />

    <script src="../../Scripts/Plugins/JQuery/jQuery-2.1.1.min.js"></script>
    <script src="../../Scripts/Plugins/Bootstrap/bootstrap.js"></script>
    <script src="../../Scripts/Ajax.js"></script>
    <script src="../../Scripts/helpers.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.ui.widget.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.iframe-transport.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.fileupload.js"></script>
    <script src="../../Scripts/Plugins/FileUpload/jquery.fileupload-process.js"></script>

</head>
<body>
    <div class="title-divisor">Informações de cliente</div>
    <!-- Modal -->
    <div id="DetalhesClienteModalContent" style="display: none;">
        <div class="form-processo">
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
        </div>
        
            <div class="row">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-sm btn-primary aRight" id="btnExcluirCliente" style="margin: 10px 0px">Excluir</button>
                </div>
            </div>
    </div>

    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
