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
	password TEXT,
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


/*
	Realizar un log al momento de registrar un usuario
*/
DELIMITER $$
CREATE TRIGGER `registro` AFTER INSERT ON usuarios
FOR EACH ROW BEGIN
	INSERT INTO usuarios_log (id_usuario, id_evento, fechas)
	VALUES (NEW.id_usuario, 2, NEW.fecha_creacion);
END
$$
DELIMITER ; 

/*
	Valida que los usuarios estan verificados para ingresar a la aplicacion,
	ademas de modificar el token del usuario
*/
DELIMITER $$
CREATE PROCEDURE verificacion(IN _token TEXT, _fecha DATETIME)
BEGIN
	SET @usuario = (SELECT id_usuario FROM usuarios WHERE token = _token AND verificado = FALSE );
	
	UPDATE usuarios 
	SET verificado = TRUE
	WHERE id_usuario = @usuario;
	
	INSERT INTO usuarios_log (id_usuario, id_evento, fechas)
	VALUES (@usuario, 1, _fecha);
	SELECT email FROM usuarios WHERE id_usuario = @usuario AND verificado = TRUE;
END $$
DELIMITER ;

/*
	VAlida que los usuarios solo se puedan verifiacr una sola vez
*/
DELIMITER $$
CREATE TRIGGER validarVerifiacion BEFORE INSERT ON usuarios_log
FOR EACH ROW
BEGIN
	SET @contador = (SELECT COUNT(id_evento) FROM usuarios_log WHERE id_usuario = NEW.id_usuario AND id_evento = 1);
	
	IF (@contador > 1) THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'El usuario ya fue verificado ';
	END IF;
	
END $$
DELIMITER ;


/*
	actualiza la contraseña del usuario y hace el log de pedir codigo
*/
DELIMITER $$
CREATE PROCEDURE codigoSeguridad (IN _codigo TEXT, IN _email VARCHAR(50), IN _fecha DATETIME)
BEGIN
	SET @_id_usuario = (SELECT id_usuario FROM usuarios WHERE email =  _email);

	UPDATE usuarios
	SET password = _codigo
	WHERE email =  _email AND verificado = TRUE;
	
	INSERT INTO usuarios_log (id_usuario, id_evento, fechas) VALUES ( @_id_usuario, 3, _fecha );
	
	SELECT nombre, apellido, email FROM usuarios WHERE email =  _email;
END $$
DELIMITER ;


/*
	al iniciar sesion elimina la constraseña del usuario y hace el log de iniciar sesion
*/
DELIMITER $$
CREATE PROCEDURE cambiarToken (IN _token TEXT, IN _id INTEGER, IN _fecha DATETIME)
BEGIN
	UPDATE usuarios 
	SET token = _token, password = ''
	WHERE id_usuario = _id;
	
	INSERT INTO usuarios_log (id_usuario, id_evento, fechas)
	VALUES (_id, 4, _fecha);
END $$
DELIMITER ;

#---------------------------------------------------------------------------------------------------------------------------

INSERT INTO eventos (id_evento, evento) 
	VALUES (1, 'verificación de la cuenta '), (2, 'Creación del usuario '), (3, 'Código de Seguridad'), (4, 'Sesión iniciada');
	
INSERT INTO roles (rol) VALUES ('usuario');