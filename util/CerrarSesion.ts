import Router from 'next/router';

export default function cerrarSesion() {
	localStorage.removeItem('token');
	localStorage.removeItem('usuario');

	Router.push('/');
}
