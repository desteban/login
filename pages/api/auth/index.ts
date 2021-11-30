import { NextApiRequest, NextApiResponse } from 'next';
import { AgregarUsuario, AutenticarUsuario, db } from '../../../util/database';
import { enviarEmail, htmlBIENBENIDA, htmlCuentaVerificada } from '../../../util/email';
import { generarToken } from '../../../util/jwt';
import { Persona } from '../../../util/persona';
import { respuesta } from '../../../util/respuesta';
import { validarEmail } from '../../../util/validaremail';

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

//crear los usuarios
async function POST(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = {
		code: 400,
		mensaje: 'Algunos campos no cumplen con un formato valido o están vacíos'
	};

	//tomar datos
	let persona: Persona = req.body;

	persona.fecha_creacion = new Date();
	persona.token = generarToken({ mail: persona.email, nombre: persona.nombre });

	if (!validarEmail(persona.email)) {
		respuesta = { code: 400, mensaje: 'No se ha enviado un formato de email valido' };
	}

	if (validarPersona(persona)) {
		try {
			persona = UpperCase(persona);

			//guardar la persona en la base de datos
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
	}

	await db.end();

	res.status(respuesta.code).json(respuesta);
}

function validarPersona(persona: Persona): boolean {
	if (validarEmail(persona.email) && persona.nombre && persona.apellido) {
		return true;
	}

	return false;
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

// verificar los usuarios
async function PUT(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Usuario verificado' };

	const fecha: Date = new Date();

	try {
		let persona: any = await db.query(AutenticarUsuario, [req.body.token, fecha]);

		// verificar que el email exista en la base de datos
		let email = persona[0][0].email;
		if (email) {
			enviarEmail(email, 'Cuenta verificada con éxito', htmlCuentaVerificada);
		}

		await db.end();
	} catch (error: any) {
		if (error.errno == 1048) {
			respuesta = { code: 404, mensaje: 'Usuario no encontrado' };
		}

		if (error.errno == 1644) {
			respuesta = { code: 200, mensaje: error.sqlMessage };
		}
	}

	res.status(respuesta.code).json(respuesta);
}

function UpperCase(persona: Persona): Persona {
	persona.nombre = persona.nombre?.toUpperCase();
	persona.apellido = persona.apellido?.toUpperCase();

	return persona;
}
