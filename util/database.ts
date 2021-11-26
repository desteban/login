import mysql from 'serverless-mysql';

// conexión a la base de datos
export let db = mysql({
	config: {
		host: process.env.HOSTNAME,
		user: process.env.USERDB,
		password: process.env.PASSWORD,
		database: process.env.DATABASE
	}
});

export const AgregarUsuario: string =
	'INSERT INTO usuarios(nombre, apellido, email, fecha_creacion, fecha_actualizacion, token) VALUES (?, ?, ?, ?, ?, ?);';

export const AutenticarUsuario: string = 'CALL verificacion(?,?)';

export const CambiarCodigo: string = 'CALL codigoSeguridad(?, ?);';
