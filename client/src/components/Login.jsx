import { useEffect } from "react";
import { useLocation, Link } from "wouter";
export const Login = ({ action, onmounted }) => {
	const [_, setLocation] = useLocation();

	useEffect(() => {
		onmounted.current.classList.remove("complete");
		return () => {
			onmounted.current.classList.add("complete");
		};
	}, []);

	const log = async (e) => {
		e.preventDefault();
		let correo = e.target.elements.correo;
		let password = e.target.elements.password;
		let response = await fetch("http://localhost:5000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				correo: correo.value,
				password: password.value,
			}),
		});
		let { token } = await response.json();
		localStorage.setItem("JWT", token);
		action(token);
		correo.value = "";
		password.value = "";
		onmounted.current.classList.add("complete");
		setLocation("/");
	};
	return (
		<form onSubmit={log}>
			<div className="button-list">
				<div className="header">
					<h1>Ingreso</h1>
				</div>
				<label className="label-input">Correo electronico</label>
				<input type="email" name="correo" className="input" placeholder="ejemplo@gmail.com"/>
				<label className="label-input">Contraseña</label>
				<input type="password" name="password" className="input" placeholder="secreto"/>
				<button className="button">enviar</button>
				<Link href="/singup">
					<div className="link">
						<h4>No tiene cuenta aun, registrece aqui</h4>
					</div>
				</Link>
			</div>
		</form>
	);
};
