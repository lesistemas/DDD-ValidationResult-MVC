
namespace LF.ComercioResende.Domain.Core.Interfaces.Validations
{
    public interface IRegra<in TEntity> where TEntity : class 
    {
        string MensagemErro { get; }
        bool Validar(TEntity entity);

    }
}