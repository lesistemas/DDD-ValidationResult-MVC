namespace LF.ComercioResende.Domain.Core.ValueObjects
{
    public class ValidationError
    {
        public string Message { get; set; }

        public ValidationError(string message)
        {
            Message = message;
        }
    }
}