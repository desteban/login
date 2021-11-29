import { Component } from 'react';

import Link from 'next/link';
import { Persona } from '../util/persona';

interface Istate {
	tema?: boolean;
	user?: boolean;
}
export default class Header extends Component<any, Istate> {
	constructor(props: any) {
		super(props);

		this.state = { user: false };
	}

	componentDidMount() {
		escojerTema();

		let token: any = localStorage.getItem('token');

		if (token) {
			this.setState({ user: true });
		}
	}

	toggle_menu = () => {
		let nav = document.getElementById('listanav');
		nav?.classList.toggle('ocultar-nav');
	};

	cambiartema() {
		let body = document.querySelector('body');
		let html = document.querySelector('html');

		body?.classList.toggle('dark');
		html?.classList.toggle('dark');
		this.validarTema();
	}

	validarTema() {
		let local = localStorage.getItem('tema');
		let estado;

		if (local) {
			estado = JSON.parse(local);
		}

		if (estado) {
			estado.tema = !estado.tema;
			localStorage.setItem('tema', JSON.stringify(estado));
		}
	}

	render() {
		return (
			<nav className="nav">
				<span
					className="material-icons menu-btn"
					onClick={() => {
						this.toggle_menu();
					}}
				>
					menu
				</span>

				<span className="material-icons menu-tema" onClick={() => this.cambiartema()}>
					brightness_4
				</span>

				<div className="logo">
					<Link href="/">
						<a>Logo</a>
					</Link>
				</div>

				<div id="listanav" className="lista-nav ocultar-nav">
					<div className="opciones">
						<Link href="/">
							<a>Inicio</a>
						</Link>

						{!this.state.user ? UsuariosNoAutenticados() : null}

						{this.state.user ? (
							<Link href="/perfil">
								<a>Perfil</a>
							</Link>
						) : null}
					</div>
				</div>
			</nav>
		);
	}
}

function UsuariosNoAutenticados() {
	return (
		<div>
			<Link href="/login">
				<a>Ingresar</a>
			</Link>

			<Link href="/registro">
				<a>regístrame </a>
			</Link>
		</div>
	);
}

export function escojerTema() {
	let tema = localStorage.getItem('tema');
	let body = document.querySelector('body');
	let html = document.querySelector('html');
	let estado;

	if (tema) {
		estado = JSON.parse(tema);
	}

	if (!estado) {
		localStorage.setItem('tema', JSON.stringify({ tema: true }));
	}

	if (estado) {
		if (!estado.tema) {
			body?.classList.add('dark');
			html?.classList.add('dark');
		}
	}
}

export function enviarLocalStorege(persona: Persona, token: string) {
	localStorage.setItem('usuario', JSON.stringify(persona));
	localStorage.setItem('token', JSON.stringify(token));
}
