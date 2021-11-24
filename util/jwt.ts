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
