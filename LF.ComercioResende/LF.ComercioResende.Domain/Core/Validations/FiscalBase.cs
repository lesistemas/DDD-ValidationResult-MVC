using System.Collections.Generic;
using System.Linq;
using LF.ComercioResende.Domain.Validation.ValueObjects;
using LF.ComercioResende.Domain.Core.Interfaces.Validations;
using LF.ComercioResende.Domain.Core.ValueObjects;

namespace LF.ComercioResende.Domain.Core.Validations
{
    public abstract class FiscalBase<TEntity> : IFiscalBase<TEntity> where TEntity : class
    {
        private readonly Dictionary<string, IRegra<TEntity>> _validations = new Dictionary<string, IRegra<TEntity>>();

        protected virtual void AdicionarRegra(string nomeRegra, IRegra<TEntity> rule)
        {
            _validations.Add(nomeRegra, rule);
        }

        protected virtual void RemoverRegra(string nomeRegra)
        {
            _validations.Remove(nomeRegra);
        }

        public virtual ValidationResult Validar(TEntity entity)
        {
            var result = new ValidationResult();
          
            foreach (var key in _validations.Keys)
            {
                var rule = _validations[key];
                if(!rule.Validar(entity))
                    result.AdicionarErro(new ValidationError(rule.MensagemErro));
            }

            return result;
        }

        protected IRegra<TEntity> ObterRegra(string nomeRegra)
        {
            IRegra<TEntity> rule;
            _validations.TryGetValue(nomeRegra, out rule);
            return rule;
        }
    }
}