import { Component } from 'react';

import Link from 'next/link';

interface Istate {
	tema: boolean;
}
export default class Header extends Component {
	constructor(props: any) {
		super(props);
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

						<Link href="/login">
							<a>Ingresar</a>
						</Link>
					</div>
				</div>
			</nav>
		);
	}
}
