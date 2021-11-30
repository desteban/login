import Router from 'next/router';

export default function RutaSegura() {
	try {
		//verificar que los usuarios han iniciado sesion
		let persona: any = localStorage.getItem('usuario');
		let token: any = localStorage.getItem('token');

		if (!(token && persona)) {
			Router.push('/login');
		}
	} catch (error) {
		Router.push('/');
	}
}
