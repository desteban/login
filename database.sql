CREATE TABLE IF NOT EXISTS roles(
	rol VARCHAR(20) NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS eventos(
	id_evento INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	evento VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios(
	id_usuario INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(6),
	token TEXT,
	verificado BOOL NOT NULL DEFAULT FALSE,
	rol VARCHAR(20) NOT NULL DEFAULT 'usuario',
	fecha_creacion DATETIME NOT NULL,
	fecha_actualizacion DATETIME NOT NULL, 
	FOREIGN KEY (rol) REFERENCES roles(rol)
);

CREATE TABLE IF NOT EXISTS usuarios_log(
	id_usuario INTEGER NOT NULL,
	id_evento INTEGER NOT NULL,
	fechas DATETIME,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
	FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)
);
