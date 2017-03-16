
using LF.ComercioResende.Domain.Validation.ValueObjects;

namespace LF.ComercioResende.Domain.Core.Interfaces.Validations
{
    public interface IFiscalBase<in TEntity>
    {
        ValidationResult Validar(TEntity entity);
    }
}