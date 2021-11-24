import nodemailer from 'nodemailer';
import { Persona } from './persona';

export async function enviarEmail(email: string, asunto: string, texto: any) {
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
				from: `Equipo de trabajo <${process.env.USERMAIL}>`,
				to: `${email}`,
				subject: asunto,
				html: `${texto}`
			});
		});
	} catch (error) {
		console.log('No se puede enviar el correo');
		console.log(error);
	}
}

export async function htmlBIENBENIDA(nombre: string, link: string) {
	let html = `<div style="color: #2b2c34">
	<div
		class="cabecera"
		style="border-radius: 1rem; background-color: #eaeaec; padding: 1rem; text-align: center"
	>
		<h1>Bienvenido</h1>
		<p>Hola ${nombre}</p>
	</div>

	<div
		style="
			margin-top: 1rem;
			margin-bottom: 1rem;
			margin-right: 8%;
			margin-left: 8%;
			padding: 1rem;
		"
	>
		<p>
			Te has registrado exitosamente en nuestra página, por favor ingresa en el siguiente
			<a href="${link}" target="_blanck">enlace</a> para activar y verificar tu cuenta o puedes
			copiar el siguiente link ${link}
		</p>
	</div>

	<div
		style="
			text-align: center;
			border-top: 1px solid rgb(128, 126, 121);
			padding: 1rem;
			margin-top: 1rem;
		"
	>
		<a href="${process.env.PAGEURL}/terminos-y-condiciones">Terminos y condiciones</a>
	</div>
</div>
`;
	return html;
}
