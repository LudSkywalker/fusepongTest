import { Route, Redirect, Switch, useLocation, useRoute } from "wouter";
import { Fragment, useEffect, useState } from "react";

import { Menu } from "./Menu";
import { Info } from "./Info";
import { Edit } from "./Edit";
import { Create } from "./Create";
import { Hduser } from "./Hduser";
import { Login } from "./Login";
import { Singup } from "./Singup";
import { host } from "../keys.json";

export const Routes = ({ useGlass }) => {
	const [jwt, setJwt] = useState({ token: null });
	const [user, setUser] = useState({ nombre: "", com: "", id: "" });
	const [location, _] = useLocation();
	const [, ticketsParams] = useRoute("/tickets/:hdUsuario");
	const [, editTicketsParams] = useRoute("/edit/ticket/:tickedId");
	const [, editHduParams] = useRoute("/edit/hdu/:hduId");
	const [glassComplete, glassUncomplete] = useGlass();

	const isLog = async () => {
		const jwtString = jwt.token || localStorage.getItem("JWT");
		if (jwtString) {
			let response = await fetch(host + "/api", {
				headers: {
					Authorization: `Bearer ${jwtString}`,
				},
			});
			if (response.ok) {
				if (jwt.token != jwtString) {
					setJwt({ token: jwtString });
					let { id, nombre, com } = await response.json();
					setUser({ id, nombre, com });
				}
			} else {
				localStorage.removeItem("JWT");
				setJwt({ token: null });
			}
		} else {
			if (location != "/login" && location != "/singup") {
				setJwt({ token: null });
			}
		}
	};
	const logOnMounted = () => {
		logout();
	};
	const logOnUnMounted = () => {
		glassComplete();
		isLog();
	};

	const logout = async () => {
		localStorage.removeItem("JWT");
		setJwt({ token: null });
		glassUncomplete();
		isLog();
	};

	useEffect(async () => {
		isLog();
		return () => {
			setJwt({ token: null });
		};
	}, [location, jwt, user]);

	return jwt.token || localStorage.getItem("JWT") ? (
		<Fragment>
			<Menu
				user={user}
				logout={logout}
				onmounted={glassComplete}
				onunmounted={glassUncomplete}
			/>
			<Switch>
				<Route path="/">
					<Info
						info={user.com ? "/api/tickets/" + user.com : ""}
						title="Todos los tickets"
						where={{}}
						jwt={jwt.token}
						del="/api/ticket"
					/>
				</Route>
				<Route path="/hduser">
					<Hduser
						info={user.com ? "/api/hdusers" : ""}
						title="Historia de usuario"
						where={{ compañia: user.com }}
						jwt={jwt.token}
						del="/api/hduser"
					/>
				</Route>
				<Route path="/tickets/:hdUsuario">
					{() => {
						let [hdUsuario, hdTitulo] = ticketsParams?.hdUsuario
							?.replaceAll("%20", " ")
							.split("_") || [null, null];
						return (
							<Info
								info={user.com ? "/api/tickets" : ""}
								title={hdTitulo}
								where={{ hdUsuario }}
								jwt={jwt.token}
								del="/api/ticket"
							/>
						);
					}}
				</Route>
				<Route path="/edit/ticket/:tickedId">
					<Edit
						info={user.com ? "/api/ticket" : ""}
						title="Editar ticket"
						edit={editTicketsParams?.tickedId}
						jwt={jwt.token}
					/>
				</Route>
				<Route path="/create/ticket">
					<Create
						info={user.com ? "/api/ticket" : ""}
						title="Crear ticket"
						jwt={jwt.token}
						ticket="true"
						where={{ compañia: user.com }}
					/>
				</Route>
				<Route path="/edit/hdu/:hduId">
					<Edit
						info={user.com ? "/api/hduser" : ""}
						title="Editar Historia de Usuario"
						edit={editHduParams?.hduId}
						jwt={jwt.token}
					/>
				</Route>
				<Route path="/create/hdu">
					<Create
						info={user.com ? "/api/hduser" : ""}
						title="Crear Historia de Usuario"
						where={{ compañia: user.com }}
						jwt={jwt.token}
					/>
				</Route>
				<Route>
					<Redirect to={"/"} />
				</Route>
			</Switch>
		</Fragment>
	) : (
		<Switch>
			<Route path="/login">
				<Login
					action={setJwt}
					onmounted={logOnMounted}
					onunmounted={logOnUnMounted}
				/>
			</Route>
			<Route path="/singup">
				<Singup
					action={setJwt}
					onmounted={logOnMounted}
					onunmounted={logOnUnMounted}
				/>
			</Route>
			<Route>
				<Redirect to={"/login"} />
			</Route>
		</Switch>
	);
};
