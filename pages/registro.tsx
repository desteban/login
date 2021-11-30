import { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Header, Entrada } from '../componentes';
import evt from '../util/eventos';
import axios from 'axios';
import { validarEmail } from '../util/validaremail';
import { noEnviarFormulario } from '../util/preventformulario';
import { Persona } from '../util/persona';
import { respuesta } from '../util/respuesta';
import Router from 'next/router';

interface Istate {
	nombre: string;
	apellido: string;
	email: string;
	urls: { api: string };
}

class registro extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = { nombre: '', apellido: '', email: '', urls: props.urls };
	}

	componentDidMount() {
		let token: any = localStorage.getItem('token');

		if (token) {
			Router.push('/');
			alert('El usuario ya fue autenticado');
		}
	}

	limpiar = () => {
		this.setState({ nombre: '' });
		this.setState({ apellido: '' });
		this.setState({ email: '' });
	};

	render() {
		return (
			<div>
				<Head>
					<title>Registro</title>
					<meta
						name="description"
						content="Regístrate en nuestra pagina para acceder a todos nuestros servicios"
					/>
				</Head>

				<Header />

				<main
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						height: '100vh',
						width: '100%'
					}}
				>
					<p style={{ fontSize: '2rem', textAlign: 'center' }}>Formulario de registro</p>

					<div className="card round">
						<form onSubmit={noEnviarFormulario}>
							<Entrada
								label="nombre"
								id="nombre"
								value={this.state.nombre}
								onChange={(evt: evt) => {
									this.setState({ nombre: evt.target.value });
								}}
							/>

							<Entrada
								label="apellido"
								id="apellido"
								value={this.state.apellido}
								onChange={(evt: evt) => {
									this.setState({ apellido: evt.target.value });
								}}
							/>

							<Entrada
								label="correo electronico"
								type="email"
								id="email"
								value={this.state.email}
								onChange={(evt: evt) => {
									this.setState({ email: evt.target.value });
								}}
							/>

							<div style={{ marginTop: '1.5rem' }}>
								<button
									className="round btn"
									onClick={() => {
										this.enviarPersona();
									}}
								>
									Registrarme <span className="material-icons">person_add</span>
								</button>
							</div>

							<p style={{ marginTop: '2rem' }}>
								¿Ya tienes una cuenta?
								<Link href="/login">
									<a> inicia sesión</a>
								</Link>
								.
							</p>

							<p>
								<Link href="/terminos-y-condiciones">
									<a>Terminos y Condiciones</a>
								</Link>
							</p>
						</form>
					</div>
				</main>
			</div>
		);
	}

	enviarPersona = () => {
		if (!(this.state.nombre && this.state.apellido && this.state.email)) {
			alert('Por favor verifique los campos, algunos están vacíos');
		}

		if (this.state.nombre && this.state.apellido && this.state.email) {
			if (!validarEmail(this.state.email)) {
				alert('Ingrese un correo electrónico valido');
			}

			if (validarEmail(this.state.email)) {
				const data: Persona = {
					nombre: this.state.nombre,
					apellido: this.state.apellido,
					email: this.state.email
				};

				axios
					.post(`${this.props.urls.api}auth`, data)
					.then((data) => {
						let respuesta: respuesta = data.data;

						alert(respuesta.mensaje);

						if (respuesta.code == 201) {
							this.limpiarFormulario();
						}
					})
					.catch((error) => {
						alert('Algo salió mal');
					});
			}
		}
	};

	limpiarFormulario = () => {
		this.setState({ nombre: '' });
		this.setState({ apellido: '' });
		this.setState({ email: '' });
	};
}

export async function getServerSideProps(context: any) {
	const urls = { api: process.env.APIURL };

	return { props: { urls } };
}

export default registro;
