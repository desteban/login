import mysql from 'serverless-mysql';

export let db = mysql({
	config: {
		host: process.env.HOSTNAME,
		user: process.env.USERDB,
		password: process.env.PASSWORD,
		database: process.env.DATABASE
	}
});

export const AgregarUsuario: string =
	'INSERT INTO usuarios(nombre, apellido, email, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?);';
