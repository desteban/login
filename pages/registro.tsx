import { Component } from 'react';
import Head from 'next/head';
import { Header, Entrada } from '../componentes';
import evt from '../util/eventos';

interface Istate {
	nombre: string;
	apellido: string;
	email: string;
}

class registro extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = { nombre: '', apellido: '', email: '' };
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
									this.limpiar();
								}}
							>
								Registrarme <span className="material-icons">person_add</span>
							</button>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default registro;
