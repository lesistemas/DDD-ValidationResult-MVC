
namespace LF.ComercioResende.Domain.Core.Interfaces.Validations
{
    public interface ISpecification<in TEntity> where TEntity : class
    {
        bool IsSatisfiedBy(TEntity entity);
    }
}