//define como se envian y reciben las respuestas http de la app
export interface respuesta {
	code: number;
	mensaje: string;
	data?: any;
}
