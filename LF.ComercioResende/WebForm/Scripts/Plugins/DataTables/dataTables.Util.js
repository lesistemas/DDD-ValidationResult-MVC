//Ordenacao por data, desconsiderando quando o valor não for do tipo correto (ASCENDENTE)
jQuery.fn.dataTableExt.oSort['br_date-asc'] = function (a, b) {
	var brDatea = a.split('/');
	var brDateb = b.split('/');

	var x = (brDatea[2] + brDatea[1] + brDatea[0]) * 1;
	var y = (brDateb[2] + brDateb[1] + brDateb[0]) * 1;

	if ($.isNumeric(x) == false) {
		return 1;
	}

	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};
//Ordenacao por data, desconsiderando quando o valor não for do tipo correto (DESCENDENTE)
jQuery.fn.dataTableExt.oSort['br_date-desc'] = function (a, b) {
	var brDatea = a.split('/');
	var brDateb = b.split('/');

	var x = (brDatea[2] + brDatea[1] + brDatea[0]) * 1;
	var y = (brDateb[2] + brDateb[1] + brDateb[0]) * 1;

	if ($.isNumeric(x) == false)
		return 1;

	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
};