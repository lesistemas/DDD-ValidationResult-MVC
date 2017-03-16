
using LF.ComercioResende.Domain.Validation.ValueObjects;
namespace LF.ComercioResende.Domain.Core.Interfaces.Validations
{
    public interface ISelfValidator
    {
        ValidationResult ResultadoValidacao { get; }
        bool IsValid();
    }
}