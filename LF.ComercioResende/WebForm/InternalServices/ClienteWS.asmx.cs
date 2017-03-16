using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using LF.ComercioResende.Domain.Entities;

namespace WebForm.InternalServices
{
    /// <summary>
    /// Summary description for ClienteWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class ClienteWS : System.Web.Services.WebService
    {
        private IEnumerable<Cliente> Clientes;
        public ClienteWS()
        {

            Clientes = new List<Cliente>()
            {
                new Cliente()
                {
                    ClienteId = 1,
                    Nome = "Leandro",
                    CPF = "11122233345",
                    DataNascimento = DateTime.Now.AddYears(-20).AddMonths(-3),
                    Email = "teste1@teste.com",
                    DataCadastro = DateTime.Now,
                    Ativo = true
                },
                new Cliente()
                {
                    ClienteId = 2,
                    Nome = "Jose",
                    CPF = "22222222234",
                    DataNascimento = DateTime.Now.AddYears(-23).AddMonths(-6),
                    Email = "teste2@teste.com",
                    DataCadastro = DateTime.Now,
                    Ativo = true
                },
                new Cliente()
                {
                    ClienteId = 3,
                    Nome = "Maria",
                    CPF = "55555555555",
                    DataNascimento = DateTime.Now.AddYears(-19).AddMonths(-1),
                    Email = "teste3@teste.com",
                    DataCadastro = DateTime.Now,
                    Ativo = true
                },
            };
        }

        [WebMethod]
        public IEnumerable<Cliente> BuscarTodos()
        {
            return Clientes;
        }

        [WebMethod]
        public Cliente BuscarPorId(int id)
        {
            return Clientes != null ? Clientes.FirstOrDefault(x => x.ClienteId == id) : null;
        }

        [WebMethod]
        public void Adicionar(Cliente cliente)
        {
            if (!String.IsNullOrEmpty(cliente.Nome) &&
                !String.IsNullOrEmpty(cliente.CPF) &&
                !String.IsNullOrEmpty(cliente.Email) &&
                (cliente.DataNascimento != DateTime.MinValue &&
                 cliente.DataNascimento != DateTime.MaxValue))
            {
                //Add prox Id
                cliente.ClienteId = Clientes.Max(x => x.ClienteId) + 1;

                //Add dados padrão
                cliente.DataCadastro = DateTime.Now;
                cliente.Ativo = true;

                var ClientesAdd = new Cliente[] {cliente};

                Clientes.Concat()
            }
        }

        [WebMethod]
        public void Excluir(int id)
        {
            Clientes = Clientes.Where(x => x.ClienteId != id);
        }

        [WebMethod]
        public void Alterar(int id)
        {
            Clientes = Clientes.Where(x => x.ClienteId != id);
        }

    }
}
