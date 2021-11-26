import { NextApiRequest, NextApiResponse } from 'next';
import { CambiarCodigo, db } from '../../../util/database';
import bcrypt from 'bcrypt';
import { enviarEmail, htmlCodigodeSeguridad } from '../../../util/email';
import { Persona } from '../../../util/persona';
import { respuesta } from '../../../util/respuesta';

export default async function cuentas(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'POST') {
		await POST(req, res);
	}
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	let respuesta: respuesta = { code: 200, mensaje: 'Todo bien' };

	let persona: Persona = req.body;

	const codigo = Math.floor(Math.random() * (999999 - 111111) + 111111);

	try {
		bcrypt;

		let personadb: any = await db.query(CambiarCodigo, [codigo, persona.email]);

		if (!personadb[0][0]) {
			respuesta = {
				code: 200,
				mensaje: 'Esta cuenta no ha sido activada o no ha sigo registrada'
			};
		}

		//validar si la persona está registrada
		if (personadb[0][0]) {
			persona = personadb[0][0];
			persona.password = `${codigo}`;

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
