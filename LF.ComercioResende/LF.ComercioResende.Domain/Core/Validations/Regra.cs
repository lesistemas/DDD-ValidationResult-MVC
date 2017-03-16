using LF.ComercioResende.Domain.Core.Interfaces.Validations;
namespace LF.ComercioResende.Domain.Core.Validations
{
    public class Regra<TEntity> : IRegra<TEntity> where TEntity : class
    {
        private readonly ISpecification<TEntity> _specificationRule;
        public string MensagemErro { get; private set; }

        public Regra(ISpecification<TEntity> rule, string mensagemErro)
        {
            _specificationRule = rule;
            MensagemErro = mensagemErro;
        }

        public bool Validar(TEntity entity)
        {
            return _specificationRule.IsSatisfiedBy(entity);
        }
    }
}