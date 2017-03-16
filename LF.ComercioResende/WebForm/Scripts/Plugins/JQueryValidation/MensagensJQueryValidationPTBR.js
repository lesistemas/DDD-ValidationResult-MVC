jQuery.extend(jQuery.validator.messages, {
    required: "Este campo � obrigat�rio",
    remote: "Por favor, corrija este campo",
    email: "Por favor insira um endere�o de e-mail v�lido",
    url: "Digite uma URL v�lida",
    date: "Por favor, insira uma data v�lida",
    dateISO: "Por favor, insira uma data v�lida",
    number: "Por favor insira somente n�meros",
    digits: "Digite apenas d�gitos.",
    creditcard: "Por favor insira um n�mero de cart�o de cr�dito v�lido",
    equalTo: "Por favor, insira o mesmo valor novamente",
    accept: "Por favor preencha com uma extens�o v�lida",
    maxlength: jQuery.validator.format("Digite n�o mais do que {0} caracteres"),
    minlength: jQuery.validator.format("Por favor, insira pelo menos {0} caracteres"),
    rangelength: jQuery.validator.format("Por favor insira um valor entre {0} e {1} caracteres"),
    range: jQuery.validator.format("Por favor insira um valor entre {0} e {1}"),
    max: jQuery.validator.format("Por favor insira um valor inferior ou igual a {0}"),
    min: jQuery.validator.format("Por favor insira um valor maior ou igual a {0}")
});