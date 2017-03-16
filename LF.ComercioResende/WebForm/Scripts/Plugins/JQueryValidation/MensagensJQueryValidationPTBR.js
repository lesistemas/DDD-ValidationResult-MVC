jQuery.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório",
    remote: "Por favor, corrija este campo",
    email: "Por favor insira um endereço de e-mail válido",
    url: "Digite uma URL válida",
    date: "Por favor, insira uma data válida",
    dateISO: "Por favor, insira uma data válida",
    number: "Por favor insira somente números",
    digits: "Digite apenas dígitos.",
    creditcard: "Por favor insira um número de cartão de crédito válido",
    equalTo: "Por favor, insira o mesmo valor novamente",
    accept: "Por favor preencha com uma extensão válida",
    maxlength: jQuery.validator.format("Digite não mais do que {0} caracteres"),
    minlength: jQuery.validator.format("Por favor, insira pelo menos {0} caracteres"),
    rangelength: jQuery.validator.format("Por favor insira um valor entre {0} e {1} caracteres"),
    range: jQuery.validator.format("Por favor insira um valor entre {0} e {1}"),
    max: jQuery.validator.format("Por favor insira um valor inferior ou igual a {0}"),
    min: jQuery.validator.format("Por favor insira um valor maior ou igual a {0}")
});