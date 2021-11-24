import { NextApiRequest, NextApiResponse } from 'next';
import { enviarEmail } from '../../../util/email';
import { respuesta } from '../../../util/respuesta';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	let data: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	if (req.method == 'GET') {
		res.status(data.code).json(data);
	}

	if (req.method == 'POST') {
		await POST(req, res);
	}
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	let data: respuesta = { code: 200, mensaje: 'Todo salio bien' };

	data.data = req.body;

	res.status(data.code).json(data);
}

async function VERIFICAR(req: NextApiRequest, res: NextApiResponse) {}
