import { Component } from 'react';
import { Header } from '../componentes';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Persona } from '../util/persona';

interface Istate {
	persona?: Persona;
}
class perfil extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		let persona: Persona = JSON.parse(`${localStorage.getItem('usuario')}`);

		this.setState({ persona });
	}

	render() {
		return (
			<main>
				<Header />

				<Head>
					<title>Perfil</title>
				</Head>

				<div className="espacio espacio-nav">
					<div className="round card perfil">
						<div className="cabecera">
							<h1 className="nombre">
								{this.state.persona?.nombre} {this.state.persona?.apellido}
							</h1>
							<div className="img-perfil">
								<Image
									src="https://images.unsplash.com/photo-1431368576556-fb5cb04416ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
									alt="Foto de la persona"
									height={250}
									width={250}
								/>
							</div>
						</div>

						<div className="contenido">
							<h2 className="user hide">Username o codigo</h2>

							<div>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
								asperiores accusantium, quidem cumque atque, voluptas aperiam at
								iure quas alias nihil culpa repellendus recusandae illo. Alias
								aperiam sunt iure velit.
							</div>

							<div
								className="ajustes"
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between'
								}}
							>
								<p className="click">
									Salir
									<span className="material-icons derecha">exit_to_app</span>
								</p>

								<p>
									<Link href="/">
										<a>
											Editar Perfil
											<span className="material-icons derecha">edit</span>
										</a>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default perfil;
