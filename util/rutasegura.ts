import Router from 'next/router';

export default function RutaSegura() {
	try {
		console.log('ruta segura');

		let persona: any = JSON.parse(`${localStorage.getItem('usuario')}`);
		let token: any = JSON.parse('token');

		if (!(token && persona)) {
			Router.push('/login');
			return false;
		}

		return true;
	} catch (error) {
		Router.push('/');
		return false;
	}
}
