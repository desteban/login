import { NextPage } from 'next';
import { Header } from '../componentes';
import Image from 'next/image';
import Head from 'next/head';

const perfil: NextPage = () => {
	return (
		<main>
			<Header />

			<Head>
				<title>Perfil</title>
			</Head>

			<div className="espacio espacio-nav">
				<div className="round card">
					<h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Nombre de la persona</h1>
					<div className="img-perfil">
						<Image
							src="https://images.unsplash.com/photo-1431368576556-fb5cb04416ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
							alt="Foto de la persona"
							height={250}
							width={250}
						/>
					</div>
				</div>

				<div className="borde">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores
					accusantium, quidem cumque atque, voluptas aperiam at iure quas alias nihil
					culpa repellendus recusandae illo. Alias aperiam sunt iure velit.
				</div>
			</div>
		</main>
	);
};

export default perfil;
