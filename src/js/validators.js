export function required(value) {
	if (value) {
		return ""
	} else {
		return "This field is required"
	}
}

export function equal(value1, field1, value2, field2) {
	if(value1 === value2) {
		return ""
	} else {
		return field1+ " and "+ field2+ " don't match!"
	}
}