import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Header, Entrada } from '../componentes';

const Home: NextPage = () => {
	return (
		<main>
			<Header />

			<div className="espacio">
				<Head>
					<title>Inicio</title>
				</Head>

				<h1 className="espacio-nav">Hola</h1>

				<h2>Texto</h2>

				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis saepe dolorem
					dolores ex ducimus. Adipisci est, perferendis quasi sunt atque quis nihil rem
					placeat, debitis officia delectus provident consectetur laboriosam!
				</p>

				<h2>Link</h2>

				<p>
					<Link href="/">
						<a>Lorem ipsum dolor sit amet consectetur</a>
					</Link>
					, adipisicing elit. Itaque tempora accusantium laudantium alias corrupti quas
					est aliquid provident pariatur, a deserunt ipsa quo dolore eum rem quidem
					doloremque. Officia, excepturi.
				</p>

				<h2>Formularios</h2>

				<div className="formulario round">
					<h3>Formulario</h3>

					<Entrada label="Entrada 1" />

					<Entrada label="Entrada 1" />

					<div style={{ marginTop: '1.5rem', display: 'flex' }}>
						<button className="btn">Enviar Codigo</button>
						<button className="btn">Ingresar</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
