import nodemailer from 'nodemailer';
import { Persona } from './persona';

// configuracion para enviar correos
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
				from: `Social LSD Services <${process.env.USERMAIL}>`,
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

// html de contenido de los correos (plantilla de contenido para email)
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
			copiar el siguiente link
		</p>

		<p>
		<strong
			>Recuerda que para poder ingresar a tu perfil es necesario verificar tu
			cuenta</strong
		>
	</p>

		<p>${link}</p>
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

export const htmlCuentaVerificada = `<div style="color: #2b2c34">
<div
	class="cabecera"
	style="border-radius: 1rem; background-color: #eaeaec; padding: 1rem; text-align: center"
>
	<h1>Cuenta verificada</h1>
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
		Tu cuenta ha sido verificada exitosamente, ya puedes acceder a nuestros servicios desde
		nuestra <a href="${process.env.PAGEURL}" target="_blanck">pagina</a>
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

export function htmlCodigodeSeguridad(persona: Persona) {
	let html = `<div style="color: #2b2c34">
	<div
		class="cabecera"
		style="border-radius: 1rem; background-color: #eaeaec; padding: 1rem; text-align: center"
	>
		<h1>Código de seguridad</h1>
		<p>Hola ${persona.nombre}!</p>
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
		Alguien ha intentado ingresar a tu cuenta con ${persona.email}. Si has sido tú, introduce este código de confirmación en la aplicación:
		</p>
		<p style="text-align: center; font-size: 3rem; letter-spacing: 1rem">${persona.password}</p>
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

export function htmlInisiarSesion(persona: Persona) {
	let html = `<div style="color: #2b2c34">
	<div
		class="cabecera"
		style="border-radius: 1rem; background-color: #eaeaec; padding: 1rem; text-align: center"
	>
		<h1>Iniciaste sesión</h1>
		<p>Hola ${persona.nombre}!</p>
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
		Felicidades, iniciaste sesión en nuestra pagina 
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
