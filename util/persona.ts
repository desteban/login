export interface Persona {
	id?: number;
	nombre?: string;
	apellido?: string;
	email: string;
	fecha_creacion?: Date;
	fecha_actualizacion?: Date;
	token?: string;
}
