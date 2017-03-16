using System.Collections.Generic;
using System.Linq;
using LF.ComercioResende.Domain.Entities;
using LF.ComercioResende.Domain.Core.ValueObjects;

namespace LF.ComercioResende.Domain.Validation.ValueObjects
{
    public class ValidationResult
    {
        private readonly List<ValidationError> _errors = new List<ValidationError>();

        public string Mensagem { get; set; }
        public bool IsValid => _errors.Count == 0;

        public IEnumerable<ValidationError> Erros => _errors;

        public void AdicionarErro(ValidationError error)
        {
            _errors.Add(error);
        }

        public void RemoverErro(ValidationError error)
        {
            if (_errors.Contains(error))
                _errors.Remove(error);
        }

        public void AdicionarErro(params ValidationResult[] resultadoValidacao)
        {
            if(resultadoValidacao == null) return;

            foreach (var validationResult in resultadoValidacao.Where(result => result != null))
            {
                _errors.AddRange(validationResult.Erros);
            }
        }

    }
}