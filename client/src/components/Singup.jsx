import { useEffect, useState } from "react";
import { Link } from "wouter";
import { host } from "../keys.json";

export const Singup = ({ action, onmounted, onunmounted}) => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		getCompanies();
		onmounted();
		return () => {
			onunmounted();
		};
	}, []);

	const getCompanies = async () => {
		let response = await fetch(host + "/auth/companies", {
			method: "POST",
		});

		if (response.ok) {
			setCompanies(await response.json());
		}
	};

	const log = async (e) => {
		e.preventDefault();
		let inputCorreo = e.target.elements.correo;
		let inputNombre = e.target.elements.nombre;
		let inputPassword = e.target.elements.password;
		let inputPasswordVerify = e.target.elements.passwordVerify;
		let inputCompañia = e.target.elements.compañia;
		let { value: correo } = inputCorreo;
		let { value: nombre } = inputNombre;
		let { value: password } = inputPassword;
		let { value: compañia } = inputCompañia;
		if (inputPasswordVerify.value == password) {
			if (correo.length > 6 && password.length > 4) {
				let response = await fetch(host + "/auth/singup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						correo,
						nombre,
						password,
						compañia,
					}),
				});
				if (response.ok) {
					alert("Registrado correctamente");
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
					"El correo y/o la contraseña son demasiado cortos, ingrese datos validos"
				);
			}
		} else {
			alert("Las contraseñas no coinciden");
		}
		inputPasswordVerify.value = "";
		inputPassword.value = "";
	};
	const Companies = () => {
		return companies.map((com) => {
			return (
				<option key={com.id} value={com.id} className="input">
					{com.nombre}
				</option>
			);
		});
	};
	return (
		<form onSubmit={log}>
			<div className="button-list">
				<div className="header">
					<h1>Registro</h1>
				</div>
				<div className="input-couple">
					<label className="label-input">Correo electronico</label>
					<input
						type="email"
						name="correo"
						className="input"
						placeholder="ejemplo@gmail.com"
						required
					/>
				</div>
				<div className="input-couple">
					<label className="label-input">Nombre</label>
					<input
						type="text"
						name="nombre"
						className="input"
						placeholder="Pepito Perez"
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
				<div className="input-couple">
					<label className="label-input">Repetir Contraseña</label>
					<input
						type="password"
						name="passwordVerify"
						className="input"
						placeholder="secreto"
						required
					/>
				</div>
				<div className="input-couple">
					<label className="label-input">Compañia</label>
					<div className="select ">
						<select className="input" name="compañia" required>
							<Companies />
						</select>
						<i></i>
					</div>
				</div>
				<button className="button">enviar</button>
				<Link href="/login">
					<div className="link">
						<h4>Ya tiene una cuenta, ingrese aqui</h4>
					</div>
				</Link>
			</div>
		</form>
	);
};
