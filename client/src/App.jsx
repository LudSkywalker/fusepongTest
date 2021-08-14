import { Fragment, useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Routes } from "./components/Routes";
export const App = () => {
	//App states
	const [jwt, setJwt] = useState(null);
	const [_, setLocation] = useLocation();
	const glass = useRef();

	const isLog = async () => {
		const jwtString = jwt || localStorage.getItem("JWT");
		if (jwtString) {
			let response = await fetch("http://localhost:5000/api", {
				headers: {
					Authorization: `Bearer ${jwtString}`,
				},
			});
			if (response.ok) {
				setJwt(jwtString);
				glass.current.classList.add("complete");
			} else {
				setJwt(null);
				localStorage.setItem("JWT", null);
				// setLocation("/login");
			}
		} 
	};
	useEffect(async () => {
		console.log("mounted");
		await isLog();
		return () => {
			setJwt(null);
		};
	}, []);

	return (
		<Fragment>
			<div className={"glass"} ref={glass}>
				<Routes jwt={jwt} glass={glass} setJwt={setJwt} />
			</div>
			<div className="circle1"></div>
			<div className="circle2"></div>
		</Fragment>
	);
};
