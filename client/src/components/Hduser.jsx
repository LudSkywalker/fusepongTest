import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { host } from "../keys.json";

export const Hduser = ({ info, title, where, jwt, del }) => {
	const [, setLocation] = useLocation();
	const [hdu, setHdu] = useState([]);
	const deleteHdu = async (id) => {
		if (confirm("Está seguro que desea eliminar la Historia de Usuario")) {
			let response = await fetch(host + del, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			if (response.ok) {
				loadHdus();
			}
		}
	};

	const loadHdus = async () => {
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
			setHdu(response);
		}
	};

	useEffect(() => {
		if (info) {
			loadHdus();
		}
		return () => {};
	}, [info]);

	const HDUser = () => {
		return (
			<Fragment>
				{hdu.map((h) => {
					return (
						<div key={h.id} className="hduser">
							<div className="hduser-title">
								<b>{h.titulo}</b>
							</div>
							<p>{h.descripcion}</p>
							<div className="hduser-buttons">
								<div
									onClick={() => {
										deleteHdu(h.id);
									}}
									className="hduser-button"
								>
									<div className="cancel" />
								</div>
								<Link href={"/edit/hdu/" + h.id}>
									<div className="hduser-button">
										<div className="edit" />
									</div>
								</Link>
								<Link
									href={"/tickets/" + h.id + "_" + h.titulo}
								>
									<div className="hduser-button">
										<div className="search" />
									</div>
								</Link>
							</div>
						</div>
					);
				})}
			</Fragment>
		);
	};
	return (
		<Fragment>
			<div className="info">
				<div className="header">
					<h1>{title}</h1>
				</div>
				<div className="hdusers">
					<HDUser />
				</div>
				<div
					className="plus-form "
					onClick={() => setLocation("/create/hdu")}
				>
					<div className="plus"></div>
				</div>
			</div>
		</Fragment>
	);
};
