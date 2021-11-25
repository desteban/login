import { NextApiRequest, NextApiResponse } from 'next';
import { AgregarUsuario, AutenticarUsuario, db } from '../../../util/database';
import { enviarEmail, htmlBIENBENIDA } from '../../../util/email';
import { generarToken } from '../../../util/jwt';
import { Persona } from '../../../util/persona';
import { respuesta } from '../../../util/respuesta';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	let data: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	if (req.method == 'GET') {
		res.status(data.code).json(data);
	}

	if (req.method == 'POST') {
		await POST(req, res);
	}

	if (req.method == 'PUT') {
		await PUT(req, res);
	}
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	const persona: Persona = req.body;

	persona.fecha_creacion = new Date();
	persona.token = generarToken({ mail: persona.email });

	try {
		await db.query(AgregarUsuario, [
			persona.nombre,
			persona.apellido,
			persona.email,
			persona.fecha_creacion,
			persona.fecha_creacion,
			persona.token
		]);

		let html = await htmlBIENBENIDA(
			`${persona.nombre}`,
			`${process.env.PAGEURL}validar/${persona.token}`
		);

		await enviarEmail(persona.email, 'Bienvenido/a', html);

		respuesta = {
			code: 201,
			mensaje:
				'Usuario registrado exitosamente, se ha enviado un mensaje a su correo electrónico para verificar su cuenta.'
		};
	} catch (error: any) {
		respuesta = errorCrearUsuario(error);
	}

	await db.end();

	res.status(respuesta.code).json(respuesta);
}

function errorCrearUsuario(error: any): respuesta {
	if (error.errno == 1062) {
		return { code: 400, mensaje: 'Correo electrónico no valido' };
	}

	if (error.errno == 1048) {
		return { code: 400, mensaje: 'Faltan algunos datos para crear el usuario' };
	}

	return { code: 400, mensaje: 'Algo salió mal, por favor verifica la información' };
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Usuario verificado' };
	try {
		let persona: any = await db.query(AutenticarUsuario, [req.body.token]);

		if (persona.affectedRows == 0) {
			respuesta = { code: 404, mensaje: 'Usuario no encontrado' };
		}

		await db.end();
	} catch (error) {
		console.log(error);
	}

	res.status(respuesta.code).json(respuesta);
}
