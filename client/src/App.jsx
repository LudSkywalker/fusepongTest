import { Fragment, useState, useEffect } from "react";
import { Routes } from "./components/Routes";
export const App = () => {
	const [complete, setComplete] = useState("");

	const addComplete = () => {
		setComplete("complete");
	};
	const removeComplete = () => {
		setComplete("");
	};

	const glassActions = () => {
		return [addComplete, removeComplete];
	};
	useEffect(() => {
		return () => {};
	}, [complete]);

	return (
		<Fragment>
			<div className={"glass " + complete}>
				<Routes useGlass={glassActions} />
			</div>
			<div className="circle1"></div>
			<div className="circle2"></div>
		</Fragment>
	);
};
