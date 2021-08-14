import { Fragment } from "react";

export const Info = () => {
	return (
		<Fragment>
			<div className="info">
				<div className="header">
					<h1>History of user</h1>
				</div>
				<div className="estados">
					<div className="activos">
						<h2> Activo</h2>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
					</div>
					<div className="enProceso">
						<h2> Proceso</h2>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
	
					</div>
					<div className="finalizados">
						<h2> Finalizado</h2>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
						<div className="ticket">ticket</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
