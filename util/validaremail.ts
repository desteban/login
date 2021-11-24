export function validarEmail(email: string) {
	const regular =
		/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

	if (regular.test(email)) {
		return true;
	}

	return false;
}
