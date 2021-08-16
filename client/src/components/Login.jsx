import { useEffect } from "react";
import { Link } from "wouter";
import { host } from "../keys.json";

export const Login = ({ action, onmounted, onunmounted }) => {
	useEffect(() => {
		onmounted();
		return () => {
			onunmounted();
		};
	}, []);

	const log = async (e) => {
		e.preventDefault();
		let inputCorreo = e.target.elements.correo;
		let inputPassword = e.target.elements.password;
		let { value: correo } = inputCorreo;
		let { value: password } = inputPassword;
		if (correo.length > 6 && password.length > 4) {
			let response = await fetch(host+"/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					correo,
					password,
				}),
			});
			if (response.ok) {
				let { token } = await response.json();
				await localStorage.setItem("JWT", token);
				await action({ token });
				inputCorreo.value = "";
			} else if (response.status == 401) {
				let { error } = await response.json();
				alert(error);
			}
		} else {
			alert(
				"El correo y/o la contraseña son demasiado cortos, ingrese datos válidos"
			);
		}
		inputPassword.value = "";
	};
	return (
		<form onSubmit={log}>
			<div className="button-list">
				<div className="header">
					<h1>Ingreso</h1>
				</div>
				<div className="input-couple">
					<label className="label-input">Correo electrónico</label>
					<input
						type="email"
						name="correo"
						className="input"
						placeholder="ejemplo@gmail.com"
						required
					/>
				</div>
				<div className="input-couple">
					<label className="label-input">Contraseña</label>
					<input
						type="password"
						name="password"
						className="input"
						placeholder="secreto"
						required
					/>
				</div>
				<button className="button">Enviar</button>
				<Link href="/singup">
					<div className="link">
						<h4>No tiene cuenta aun, regístrese aquí</h4>
					</div>
				</Link>
			</div>
		</form>
	);
};
