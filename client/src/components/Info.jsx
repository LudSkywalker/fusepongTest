import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { host } from "../keys.json";

export const Info = ({ info, title, where, jwt, del }) => {
	const [_, setLocation] = useLocation();
	const [tickets, setTickets] = useState({
		activos: [],
		enProceso: [],
		finalizados: [],
	});

	const changeTicketState = async (id, oldEstado, direccion) => {
		let estados = ["activos", "enProceso", "finalizados"];
		let posicion =
			(estados.indexOf(oldEstado) + direccion) % estados.length != -1
				? (estados.indexOf(oldEstado) + direccion) % estados.length
				: estados.length - 1;
		let estado = estados[posicion];
		let response = await fetch(host + "/api/ticket", {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				estado,
			}),
		});
		if (response.ok) {
			loadTickets();
		}
	};
	const changeTicketStateDrop = async (e) => {
		let [id, tipo] = e.dataTransfer.getData("text").split(" ");
		if (e.target.id != tipo && e.target.id) {
			let response = await fetch(host + "/api/ticket", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					estado: e.target.id,
				}),
			});
			if (response.ok) {
				loadTickets();
			}
		}
	};
	const deleteTicket = async (id) => {
		if (confirm("Esta seguro que desea eliminiar el Ticket")) {
			let response = await fetch(host + del, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			if (response.ok) {
				loadTickets();
			}
		}
	};
	const loadTickets = async () => {
		let response = await fetch(host + info, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(where),
		});
		if (response.ok) {
			response = await response.json();
			let activos = [],
				enProceso = [],
				finalizados = [];
			response.map((ticket) => {
				switch (ticket.estado) {
					case "activos":
						activos.push(ticket);
						break;
					case "enProceso":
						enProceso.push(ticket);
						break;
					case "finalizados":
						finalizados.push(ticket);
						break;
					default:
						break;
				}
			});
			setTickets({ activos, enProceso, finalizados });
		}
	};

	useEffect(() => {
		if (info) {
			loadTickets();
		}
		return () => {};
	}, [info, where, title]);

	const Estado = ({ title, tipo }) => {
		return (
			<div
				className={tipo}
				id={tipo}
				onDrop={changeTicketStateDrop}
				onDragOver={(e) => e.preventDefault()}
			>
				<h2>{title}</h2>
				{tickets[tipo].map((ticket) => {
					return (
						<div
							key={ticket.id}
							className="ticket"
							draggable="true"
							onDragStart={(e) => {
								e.dataTransfer.setData(
									"text/plain",
									ticket.id + " " + tipo
								);
							}}
						>
							<div className="ticket-title">
								<h4>{ticket.titulo}</h4>
								<h5>({ticket.hdu.titulo})</h5>
							</div>
							<p>{ticket.descripcion}</p>
							<div className="ticket-buttons">
								<div
									className="ticket-button"
									onClick={() => {
										deleteTicket(ticket.id);
									}}
								>
									<div className="cancel" />
								</div>
								<Link href={"/edit/ticket/" + ticket.id}>
									<div className="ticket-button">
										<div className="edit" />
									</div>
								</Link>
								<div
									className="ticket-button"
									onClick={() => {
										changeTicketState(ticket.id, tipo, -1);
									}}
								>
									<div className="arrow" />
								</div>
								<div
									className="ticket-button"
									onClick={() => {
										changeTicketState(ticket.id, tipo, 1);
									}}
								>
									<div className="arrow rigth" />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};
	return (
		<Fragment>
			<div className="info">
				<div className="header">
					<h1>{title}</h1>
				</div>
				<div className="estados">
					<Estado title="Activos" tipo="activos" />
					<Estado title="En proceso" tipo="enProceso" />
					<Estado title="Finalizados" tipo="finalizados" />
				</div>
				<div
					className="plus-form "
					onClick={() => setLocation("/create/ticket")}
				>
					<div className="plus"></div>
				</div>
			</div>
		</Fragment>
	);
};
