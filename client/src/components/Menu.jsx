import { Fragment, useEffect, useState } from "react";
import { Link } from "wouter";
import { host } from "../keys.json";

export const Menu = ({ user, logout, onmounted, onunmounted }) => {
	const [compañia, setCompañia] = useState({ nombre: "" });
	let getCompany = async () => {
		if (compañia.nombre == "" || user.com == "") {
			let response = await fetch(host + "/auth/companies", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ _id: user.com }),
			});
			if (response.ok) {
				let [com] = await response.json();
				setCompañia(com);
			} else {
				setCompañia({ nombre: "" });
			}
		}
	};
	useEffect(() => {
		onmounted();
		if (user.nombre) {
			getCompany();
		}
		return () => {
			onunmounted();
		};
	}, [user]);

	return (
		<Fragment>
			<div className="menu">
				<div className="header">
					<h1>{compañia.nombre}</h1>
					<h2>{user.nombre}</h2>
				</div>
				<div className="button-list menu-list">
					<Link href="/">
						<button className="button">Tickets</button>
					</Link>
					<Link href="/hduser">
						<button className="button">Historias de usuario</button>
					</Link>

				</div>
				<div className="footer">
					<div className="link" onClick={logout}>
						<h4>Salir</h4>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
