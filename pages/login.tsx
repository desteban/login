import { Component } from 'react';
import Head from 'next/head';
import evt from '../util/eventos';
import { Entrada, Header } from '../componentes';
import Link from 'next/link';
import { noEnviarFormulario } from '../util/preventformulario';
import axios from 'axios';
import { validarEmail } from '../util/validaremail';
import { respuesta } from '../util/respuesta';
import { enviarLocalStorege } from '../componentes/Header';
import { Persona } from '../util/persona';
import Router from 'next/router';

interface Istate {
	user?: string;
	codigo?: string;
	load?: boolean;
	step?: number;
	apiUrl?: { api: string; page: string };
}
class Login extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = {
			user: '',
			codigo: '',
			load: false,
			step: 1,
			apiUrl: props.urls
		};
	}

	cambiar_estado = (event: evt, estado: any) => {
		this.setState({ [estado]: event.target.value });
	};

	mostrar_Codigo = () => {
		let step1 = document.getElementById('step1');
		let step2 = document.getElementById('step2');

		this.toogleHide([step1, step2]);
	};

	toogleHide = (arr: any) => {
		arr.forEach((elemento: any) => {
			elemento.classList.toggle('hide');
		});
	};

	render() {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					width: '100%'
				}}
			>
				<Head>
					<title>Login</title>
					<meta
						name="description"
						content="Inicia sesión para poder acceder a todos nuestros servicios"
					/>
				</Head>

				<div className="hide">
					<Header />
				</div>

				<div>
					<Link href="/">
						<a>
							<p style={{ fontSize: '2rem', textAlign: 'center' }}>Logo</p>
						</a>
					</Link>

					<div className="formulario round">
						<h1 style={{ fontSize: '2rem' }}>Iniciar sesión</h1>

						<form onSubmit={noEnviarFormulario} className="step1" id="step1">
							<div style={{ textAlign: 'center' }} className="hide loader">
								<div className="lds-ring">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>

							<div>
								<Entrada
									id="User"
									label="Correo electrónico"
									value={this.state.user}
									onChange={(evt: any) => this.cambiar_estado(evt, 'user')}
								/>
							</div>

							<div style={{ marginTop: '1.5rem' }}>
								<button className="round btn" onClick={() => this.enviarEmail()}>
									Enviar Codigo <span className="material-icons">send</span>
								</button>
							</div>
						</form>

						<form id="step2" className="hide" onSubmit={noEnviarFormulario}>
							<div>
								<span
									className="material-icons click"
									style={{ position: 'relative' }}
								>
									arrow_back
								</span>
							</div>
							<p>
								Por favor ingresa el código de verificación que se ha enviado a tu
								correo electrónico
							</p>

							<div style={{ textAlign: 'center' }} className="hide loader">
								<div className="lds-ring">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>

							<div className="input-codigo">
								<Entrada
									id="Codigo"
									label="Código de verificación"
									value={this.state.codigo}
									onChange={(evt: any) => this.cambiar_estado(evt, 'codigo')}
									type="number"
								/>
							</div>

							<div style={{ marginTop: '1.5rem' }}>
								<button
									className="round btn"
									onClick={() => {
										this.enviarCodigo();
									}}
								>
									Ingresar
								</button>
							</div>
						</form>

						<p style={{ marginTop: '2rem' }}>
							¿No tiene una cuenta?
							<Link href="/registro">
								<a> Cree una</a>
							</Link>
							.
						</p>

						<p>
							<Link href="/terminos-y-condiciones">
								<a>Terminos y Condiciones</a>
							</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}

	enviarEmail = () => {
		if (!validarEmail(`${this.state.user}`)) {
			alert('Por favor escriba un email valido');
		}

		if (validarEmail(`${this.state.user}`)) {
			this.toggleLoad();
			axios
				.put(`${this.state.apiUrl?.api}auth/cuenta`, { email: this.state.user })
				.then((data) => {
					let respuesta: respuesta = data.data;

					this.mostrar_Codigo();
					alert(respuesta.mensaje);
					this.toggleLoad();
				})
				.catch((err) => {
					alert('Algo salió mal, inténtalo más tarde');
					this.toggleLoad();
				});
		}
	};

	enviarCodigo = () => {
		this.toggleLoad();

		axios
			.post(`${this.state.apiUrl?.api}auth/cuenta`, {
				email: this.state.user,
				password: this.state.codigo
			})
			.then((data) => {
				let respesta: respuesta = data.data;
				let persona: Persona = respesta.data.persona;
				let token: string = respesta.data.token;

				enviarLocalStorege(persona, token);
				this.toggleLoad();
				Router.push('/perfil');
			})
			.catch((err) => {
				alert('Algo salió mal, inténtalo más tarde');
				this.toggleLoad();
			});
	};

	toggleLoad = () => {
		let loaders: NodeList = document.querySelectorAll('.loader');

		loaders.forEach((loader: any) => {
			loader.classList.toggle('hide');
		});
	};
}

export async function getServerSideProps(context: any) {
	const urls = { api: process.env.APIURL };

	return { props: { urls } };
}

export default Login;
