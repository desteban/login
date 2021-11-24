import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Header } from '../componentes/index';

const terminos: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Terminos y Condiciones - ilRistorante</title>
				<meta
					name="description"
					content="Conoce todos los términos y condiciones de nuestra pagina web para poder brindarte nuestro mejor servicio"
				/>

				<meta name="author" content="Sergio Andres Blanco Garcia" />
			</Head>

			<Header />

			<main className="contenido espacio espacio-nav">
				<h1>Términos y Condiciones</h1>

				<div>
					<h2>Declaración de Privacidad</h2>

					<p>
						El portal Il Ristorente es una instancia comprometida con los usuarios que
						además de proveer información, vela por su calidad y fidelidad. Para ello
						institucionalizó la Declaración de Privacidad, la cual determina y garantiza
						el debido proceso para utilizar información personal y privada de personas
						inscritas en el portal para no infligir de ninguna manera las disposiciones
						contenidas en la Ley Estatutaria del Habeas Data{' '}
						<Link href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981">
							<a className="enlace" target="_blank">
								(Ley 1581 del 2012)
							</a>
						</Link>
						, reglamentada mediante el decreto 1377 del 2013 y en la Ley de Privacidad o
						Habeas Data Colombiana{' '}
						<Link href="https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=34488">
							<a className="enlace" target="_blank">
								(Ley 1266 de 2008)
							</a>
						</Link>
						.
					</p>
				</div>

				<div>
					<h2>Recolección de información personal</h2>
					<p>
						El portal de Il Ristorante recolecta información personal de sus usuarios
						para garantizar algunas de sus actividades. Los datos que con mayor
						frecuencia se solicitan son: nombre, identificación, dirección de correo
						electrónico, dirección de residencia, número telefónico, edad, género,
						formación académica, producción académica y científica, preferencias e
						intereses. También cuenta con información que se captura automáticamente
						relacionada con el hardware y software de los usuarios o clientes de Il
						Ristorante, como dirección IP, tipo de explorador de Internet utilizado,
						nombre de dominio, tiempos de acceso y direcciones de sitios Web. Esta
						información es utilizada por el portal institucional para garantizar la
						operación del servicio, asegurar su calidad y brindar estadísticas generales
						sobre el uso del sitio Web.
					</p>
				</div>

				<div>
					<h2>Condiciones de Uso</h2>

					<ol>
						<li>
							Por el hecho de ingresar al Portal y para garantizar el buen y adecuado
							uso de este, el Usuario reconoce en cabeza de Il Ristorante:
							<ul>
								<li>
									El derecho de modificar en cualquier tiempo y por cualquier
									razón sin previo aviso los Términos y Condiciones del Portal
									web.
								</li>

								<li>
									El derecho de negar el registro a cualquier persona, en
									cualquier momento y por cualquier razón.
								</li>

								<li>
									El derecho a utilizar la información personal y/o contenidos
									suministrados por los Usuarios de acuerdo con los Términos y
									Condiciones del Portal web.
								</li>
							</ul>
						</li>

						<li>
							El Portal, contiene links que remiten a otras páginas de Internet.
							Teniendo en cuenta que Il Ristorante no es responsable por la
							disponibilidad de dichos sitios, el Usuario deberá dirigirse
							directamente al administrador de dicho sitio cuando así lo requiera y
							usar dichos sitios de acuerdo con los términos de uso respectivos.
						</li>

						<li>
							El registro al Portal web podrá darse por terminado por el Usuario en
							cualquier momento enviando un correo electrónico a
							atencionalciudadano@Il Ristorante.gov.co
						</li>

						<li>
							El Usuario deberá cumplir los Términos y Condiciones del Portal, así
							como toda condición adicional que se establezca en el Portal.
						</li>

						<li>
							Il Ristorante no garantiza la disponibilidad y continuidad del
							funcionamiento del Portal. Cuando ello sea razonablemente posible, Il
							Ristorante advertirá previamente las interrupciones en el funcionamiento
							del Portal, cuando fueren previsibles o hubieren sido dispuestos por la
							entidad. Il Ristorante tampoco garantiza la utilidad del Portal para la
							realización de ninguna actividad en particular, ni su infalibilidad y,
							en particular, aunque no de modo exclusivo, que los Usuarios puedan
							efectivamente utilizar el Portal, acceder a las distintas páginas web o
							secciones que forman el Portal.
						</li>

						<li>
							Il Ristorante no incurrirá en responsabilidad con el usuario o terceros,
							cuando su sitio WEB no se encuentre disponible.
						</li>

						<li>
							Il Ristorante excluye cualquier responsabilidad por los daños y
							perjuicios de toda naturaleza que puedan deberse a la falta de
							disponibilidad o de continuidad del funcionamiento del Portal, a la
							defraudación de la utilidad que los Usuarios hubieren podido atribuir al
							Portal y a los servicios, a la falibilidad del Portal, y en particular,
							aunque no de modo exclusivo, a las fallas en el acceso a las distintas
							páginas web o secciones del Portal.
						</li>

						<li>
							Il Ristorante no controla ni garantiza, y por lo tanto no se hace
							responsable por, la ausencia de virus ni de otros elementos en los
							contenidos del Portal que puedan producir alteraciones en el sistema
							informático (software y hardware) del Usuario o en los documentos
							electrónicos y ficheros almacenados en el sistema informático del
							Usuario.
						</li>

						<li>
							Es interés de Il Ristorante ser un espacio para el desarrollo de la
							ciencia y el trabajo con contenido de actualidad y de interés para los
							Usuarios. No obstante, Il Ristorante no puede garantizar que dicho
							contenido esté exento de errores o imprecisiones, en cuyo caso podrán
							solicitarse las aclaraciones o correcciones que sean del caso. Il
							Ristorante tampoco puede garantizar que el contenido del Portal sea
							suficiente y/o útil para el Usuario.
						</li>

						<li>
							Il Ristorante no garantiza y por lo tanto no es responsable de, la
							licitud, fiabilidad, exactitud, exhaustividad, actualidad y utilidad de
							las columnas de opinión, y/o las opiniones e informaciones registradas
							por los Usuarios en el Portal.
						</li>
					</ol>
				</div>
			</main>
		</div>
	);
};

export default terminos;
