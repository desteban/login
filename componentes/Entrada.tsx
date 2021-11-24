interface props {
	id?: string;
	label?: string;
	type?: string;
	value?: string;
	onChange?: any;
	autoComplete?: boolean;
	onKeyPress?: any;
}

export default function Entrada(props: props) {
	return (
		<div className="input">
			<label htmlFor={props.id}>{props.label}</label>
			<input
				type={props.type ? props.type : 'text'}
				name={props.id}
				id={props.id}
				placeholder=""
				value={props.value}
				onChange={props.onChange}
				autoComplete={props.autoComplete ? 'ON' : 'OFF'}
				onKeyPress={props.onKeyPress}
			/>
		</div>
	);
}
