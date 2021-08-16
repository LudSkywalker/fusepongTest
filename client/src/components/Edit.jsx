import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

import { host } from "../keys.json";

export const Edit = ({ info, title, jwt, edit }) => {
	const [_, setLocation] = useLocation();
	const [data, setData] = useState({});
	useEffect(async () => {
		if (edit && jwt) {
			let response = await fetch(host + info + "s", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					_id: edit,
				}),
			});
			if (response.ok) {
				let [newData] = await response.json();
				setData(newData);
			}
		}
		return () => {
			setData({});
		};
	}, [info]);
	const log = async (e) => {
		e.preventDefault();
		let inputTitulo = e.target.elements.titulo;
		let inputDescripcion = e.target.elements.descripcion;
		let { value: titulo } = inputTitulo;
		let { value: descripcion } = inputDescripcion;
		let response = await fetch(host + info, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: edit,
				titulo,
				descripcion,
			}),
		});
		if (response.ok) {
			setLocation("/");
		}
	};
	return (
		<form onSubmit={log} className="info form-update">
			<div className="header">
				<Link href="/">
					<div className="cancel-form">
						<div className="cancel"></div>
					</div>
				</Link>
				<h1>{title}</h1>
			</div>
			<div className="button-list form-content">
				<div className="input-couple">
					<label className="label-input">Título</label>
					<textarea
						name="titulo"
						className="input"
						defaultValue={data.titulo}
						required
					/>
				</div>
				<div className="input-couple">
					<label className="label-input">Descripción</label>
					<textarea
						name="descripcion"
						className="input"
						defaultValue={data.descripcion}
						required
					/>
				</div>
				<button className="button" type="submit">
					Enviar
				</button>
			</div>
		</form>
	);
};
