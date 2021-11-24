import { Component } from 'react';
import Head from 'next/head';
import evt from '../util/eventos';
import Entrada from '../componentes/entrada';
import Link from 'next/link';
import { noEnviarFormulario } from '../util/preventformulario';

interface Istate {
	user?: string;
	codigo?: string;
	load?: boolean;
	step?: number;
}
class Login extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = {
			user: '',
			codigo: '',
			load: false,
			step: 1
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

				<div>
					<Link href="/">
						<a>
							<p style={{ fontSize: '2rem', textAlign: 'center' }}>Logo</p>
						</a>
					</Link>

					<div className="formulario round">
						<h1 style={{ fontSize: '2rem' }}>Iniciar sesión</h1>

						<form onSubmit={noEnviarFormulario} className="step1" id="step1">
							<div>
								<Entrada
									id="User"
									label="Usuario o correo electrónico"
									value={this.state.user}
									onChange={(evt: any) => this.cambiar_estado(evt, 'user')}
								/>
							</div>

							<div style={{ marginTop: '1.5rem' }}>
								<button className="round btn" onClick={() => this.mostrar_Codigo()}>
									Enviar Codigo <span className="material-icons">send</span>
								</button>
							</div>
						</form>

						<form id="step2" className="hide" onSubmit={noEnviarFormulario}>
							<p>
								Por favor ingresa el código de verificación que se ha enviado a tu
								correo electrónico
							</p>

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
										alert('verificando');
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
}

export default Login;
