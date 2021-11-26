import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import { respuesta } from '../../util/respuesta';

const verificar: NextPage = () => {
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
			<div>
				<h1>Usuario verificado</h1>
				<Link href="/">
					<a style={{ fontSize: '2rem', textAlign: 'center' }}>Inicio</a>
				</Link>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: any) {
	const { token } = context.query;

	let auth = axios
		.put(`${process.env.APIURL}auth`, { token: token })
		.then((res) => {
			let respuesta: respuesta = res.data;
		})
		.catch((error: any) => {});

	return { props: { token } };
}
export default verificar;
