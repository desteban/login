import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../util/database';
import { enviarEmail } from '../../../util/email';
import { respuesta } from '../../../util/respuesta';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	let data: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	if (req.method == 'GET') {
		res.status(data.code).json(data);
	}

	if (req.method == 'POST') {
		await crearUsuario(req, res);
	}
}

interface Persona {
	nombre?: string;
	apellido?: string;
	email: string;
	fecha_creacion?: Date;
	fecha_actualizacion?: Date;
}

async function crearUsuario(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	const persona: Persona = req.body;

	const fecha: Date = new Date();

	try {
		let personadb = await db.query(
			`INSERT INTO usuarios(nombre, apellido, email, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?);`,
			[persona.nombre, persona.apellido, persona.email, fecha, fecha]
		);

		respuesta = {
			code: 201,
			mensaje:
				'Usuario registrado exitosamente, se ha enviado un mensaje a su correo electrónico para verificar su cuenta.',
			data: personadb
		};
	} catch (error: any) {
		respuesta = { code: 400, mensaje: 'Algo salió mal, por favor verifica la información' };

		if (error.errno == 1062) {
			respuesta = { code: 400, mensaje: 'Correo electrónico no valido' };
		}

		if (error.errno == 1048) {
			respuesta = { code: 400, mensaje: 'Faltan algunos datos para crear el usuario' };
		}
	}

	res.status(respuesta.code).json(respuesta);
}

async function VERIFICAR(req: NextApiRequest, res: NextApiResponse) {}
