import nodemailer from 'nodemailer';

export default async function auth(req: any, res: any) {
	let respuesta = { code: 200, mensaje: 'Todo esta bien' };

	if (req.method == 'GET') {
		res.status(respuesta.code).json(respuesta);
	}
}

async function enviarEmail(email: string) {
	try {
		let testAccount = await nodemailer.createTestAccount();

		var transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.USERMAIL,
				pass: process.env.PASSMAIL
			}
		});

		transporter.verify().then(() => {
			transporter.sendMail({
				from: `Il Ristorante <${process.env.USERMAIL}>`,
				to: `${email}`,
				subject: 'Asunto',
				html: `<h1>Codigo html</h1>`
			});
		});
	} catch (error) {
		console.log('No se puede enviar el correo');
		console.log(error);
	}
}
