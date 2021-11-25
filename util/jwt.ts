import jwt from 'jsonwebtoken';
import { Persona } from './persona';

export function generarToken(data: any) {
	try {
		let token = jwt.sign(data, `${process.env.JWTPASS}`);
		return token;
	} catch (error) {
		console.log('error al generar el token');
		console.log(error);

		return undefined;
	}
}

export function validarToken(token: any) {
	jwt.verify(token, `${process.env.JWTPASS}`, (err: any, email: any) => {
		if (err) {
			return false;
		}

		return true;
	});
}
