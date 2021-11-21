import Link from 'next/link';

export default function Header() {
	return (
		<nav className="nav">
			<span
				className="material-icons menu-btn"
				onClick={() => {
					toggle_menu();
				}}
			>
				menu
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

function toggle_menu() {
	let nav = document.getElementById('listanav');
	nav?.classList.toggle('ocultar-nav');
}
