export interface Persona {
	id_usuario?: number;
	nombre?: string;
	apellido?: string;
	email: string;
	fecha_creacion?: Date;
	fecha_actualizacion?: Date;
	token?: string;
	password?: string;
}
