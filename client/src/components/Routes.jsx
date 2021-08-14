import { Route, Router, Redirect, Switch } from "wouter";
import { useEffect } from "react";
import { Menu } from "./Menu";
import { Info } from "./Info";
import { Login } from "./Login";
import { Singup } from "./Singup";
import React from "react";

export const Routes = ({ jwt, setJwt, glass }) => {
	useEffect(async () => {
		console.log("routes");
	}, []);

	return jwt || localStorage.getItem("JWT") ? (
		<Switch>
			<Route path="/">
				<Menu />
				<Info />
			</Route>
			<Route>
				<Redirect to={"/"} />
			</Route>
		</Switch>
	) : (
		<Switch>
			<Route path="/login">
				<Login action={setJwt} onmounted={glass} />
			</Route>
			<Route path="/singup">
				<Singup action={setJwt} onmounted={glass} />
			</Route>
			<Route>
				<Redirect to={"/login"} />
			</Route>
		</Switch>
	);
};
