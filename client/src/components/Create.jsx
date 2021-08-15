import { Link, useLocation } from "wouter";
import { Fragment, useEffect, useState } from "react";
import { host } from "../keys.json";

export const Create = ({ info, title, jwt, ticket, where }) => {
	const [_, setLocation] = useLocation();
	const [hdu, setHdu] = useState([]);
	useEffect(() => {
		getHdu();
		return () => {
			setHdu([]);
		};
	}, [info]);

	const getHdu = async () => {
		if (info && where?.compañia) {
			let response = await fetch(host + "/api/hdusers", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(where),
			});
			if (response.ok) {
				setHdu(await response.json());
			}
		}
	};

	const log = async (e) => {
		e.preventDefault();
		let inputTitulo = e.target.elements.titulo;
		let inputDescripcion = e.target.elements.descripcion;
		let inputEstado = e.target.elements.estado;
		let inputHdUsuario = e.target.elements.hdUsuario;
		let { value: titulo } = inputTitulo;
		let { value: descripcion } = inputDescripcion;
		let { value: estado } = inputEstado || {};
		let { value: hdUsuario } = inputHdUsuario || {};
		let body = {
			titulo,
			descripcion,
			estado,
			hdUsuario,
		};
		if (!ticket) {
			body={...body, compañia:where.compañia}
		}
		let response = await fetch(host + info, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		if (response.ok) {
			setLocation("/");
		}
	};
	const Hduser = () => {
		return hdu.map((h) => {
			return (
				<option key={h.id} value={h.id} className="input">
					{h.titulo}
				</option>
			);
		});
	};

	const JustTicket = () => {
		if (ticket) {
			return (
				<Fragment>
					<div className="input-couple">
						<label className="label-input">Estado</label>
						<div className="select ">
							<select className="input" name="estado" required>
								<option value="activos" className="input">
									Activo
								</option>
								<option value="enProceso" className="input">
									En proceso
								</option>
								<option value="finalizados" className="input">
									Finalizado
								</option>
							</select>
							<i></i>
						</div>
					</div>
					<div className="input-couple">
						<label className="label-input">
							Historia de usuario
						</label>
						<div className="select ">
							<select className="input" name="hdUsuario" required>
								<Hduser />
							</select>
							<i></i>
						</div>
					</div>
				</Fragment>
			);
		}
		return "";
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
					<label className="label-input">Titulo</label>
					<textarea name="titulo" className="input" required />
				</div>
				<div className="input-couple">
					<label className="label-input">Descripcion</label>
					<textarea name="descripcion" className="input" required />
				</div>
				<JustTicket />
				<button className="button" type="submit">
					enviar
				</button>
			</div>
		</form>
	);
};
