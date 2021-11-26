import { NextApiRequest, NextApiResponse } from 'next';
import { CambiarCodigo, db, ObtenerUsuario } from '../../../util/database';
import { enviarEmail, htmlCodigodeSeguridad } from '../../../util/email';
import { Persona } from '../../../util/persona';
import { respuesta } from '../../../util/respuesta';
import bcrypt from 'bcrypt';
import { exit } from 'process';

export default async function cuentas(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'POST') {
		await POST(req, res);
	}

	if (req.method == 'PUT') {
		await PUT(req, res);
	}
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Todo ha salido bien' };
	let persona: Persona = req.body;

	const codigo = Math.floor(Math.random() * (999999 - 111111) + 111111);
	const saltRounds = +`${process.env.SALT}`;

	//encriptar código
	let aux: any = await bcrypt.genSalt(saltRounds, (err, salt) => {
		if (salt) {
			bcrypt.hash(`${codigo}`, salt, (err, hash) => {
				if (!err) {
					actualizarUsuario(res, persona, `${codigo}`, hash);
				}

				if (err) {
					res.status(200).json({
						code: 200,
						mensaje: 'No se pudo generar el codigo de seguridad'
					});
				}
			});
		}
	});
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Todo salio bien' };
	let persona: Persona = req.body;

	//validar datos
	if (!validarPersona(persona)) {
		res.status(400).json({ code: 400, mensaje: 'Verifique los datos' });
	}

	if (validarPersona(persona)) {
		//buscar persona
		let resultadoDB: any = await db.query(ObtenerUsuario, [persona.email]);

		const personadb: Persona = resultadoDB[0];

		if (!personadb) {
			respuesta = { code: 400, mensaje: 'Credenciales invalidas' };
			enviarRespuesta(respuesta, res);
		}

		if (personadb && personadb.password) {
			await validarPassword(persona, personadb, res);
		}
	}
}

async function actualizarUsuario(
	res: NextApiResponse,
	persona: Persona,
	codigo: string,
	hash: any
) {
	let respuesta: respuesta = {
		code: 200,
		mensaje: 'se ha enviado un código de seguridad a tu correo electrónico'
	};
	const fecha: Date = new Date();

	try {
		let personadb: any = await db.query(CambiarCodigo, [hash, persona.email, fecha]);

		if (!personadb[0][0]) {
			respuesta = {
				code: 200,
				mensaje: 'Esta cuenta no ha sido activada o no ha sigo registrada'
			};
		}

		//validar si la persona está registrada
		if (personadb[0][0]) {
			persona = personadb[0][0];
			persona.password = codigo;

			enviarEmail(
				persona.email,
				`${codigo} - Codigo de seguridad`,
				htmlCodigodeSeguridad(persona)
			);
		}
	} catch (error) {
		respuesta = { code: 500, mensaje: 'Algo salio mal, intetalo mas tarde' };
	}

	res.status(respuesta.code).json(respuesta);
}

function validarPersona(persona: Persona) {
	if (persona && persona.password && persona.email) {
		return true;
	}

	return false;
}

async function validarPassword(persona: Persona, personadb: Persona, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Usuario valido' };

	await bcrypt.compare(`${persona.password}`, `${personadb.password}`, (err, result) => {
		if (result) {
			respuesta.mensaje = 'Credenciales validas';
			personadb.password = undefined;
			respuesta.data = { persona: personadb };
			enviarRespuesta(respuesta, res);
		}

		if (!result) {
			respuesta.mensaje = 'Credenciales invalidas';
			enviarRespuesta(respuesta, res);
		}
	});
}

function enviarRespuesta(respuesta: respuesta, res: NextApiResponse) {
	res.status(respuesta.code).json(respuesta);
}
