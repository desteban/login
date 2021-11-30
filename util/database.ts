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

// script SQL
export const AgregarUsuario: string =
	'INSERT INTO usuarios(nombre, apellido, email, fecha_creacion, fecha_actualizacion, token) VALUES (?, ?, ?, ?, ?, ?);';

export const AutenticarUsuario: string = 'CALL verificacion(?,?)';

export const CambiarCodigo: string = 'CALL codigoSeguridad(?, ?, ?);';

export const ObtenerUsuario: string =
	'	SELECT id_usuario, nombre, apellido, email, password FROM usuarios WHERE email = ?;';

export const CambiarToken: string = 'CALL cambiarToken (?, ?, ?)';
