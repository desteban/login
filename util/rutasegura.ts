import Router from 'next/router';

export default function RutaSegura() {
	try {
		console.log('ruta segura');
		let persona: any = localStorage.getItem('usuario');
		let token: any = localStorage.getItem('token');

		if (!(token && persona)) {
			Router.push('/login');
		}
	} catch (error) {
		Router.push('/');
	}
}
