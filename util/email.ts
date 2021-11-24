import nodemailer from 'nodemailer';

export async function enviarEmail(email: string, asunto: string, texto: string) {
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
				subject: asunto,
				html: texto
			});
		});
	} catch (error) {
		console.log('No se puede enviar el correo');
		console.log(error);
	}
}
