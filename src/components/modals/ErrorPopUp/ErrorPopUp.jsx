import "./ErrorPopUp.css";
import closeIcon from "../../../assets/closeXBlack.svg";
import { Link } from "react-router-dom";

const ErrorPopUp = ({ errorPopUp, setErrorPopUp }) => {
	return (
		<div
			className={
				errorPopUp ? "error-pop-up-wrapper active" : "error-pop-up-wrapper"
			}
		>
			<img
				src={closeIcon}
				style={{
					width: 30,
					marginBottom: 5,
					cursor: "pointer",
					alignSelf: "flex-end",
				}}
				onClick={() => setErrorPopUp("")}
			></img>
			<div className="error-pop-up-content">
				<div className="error-pop-up-text">{errorPopUp}</div>
				<div className="error-pop-up-button">
					<a
						href={`https://grandgambit.io/pot`}
						style={{ textDecoration: "none" }}
					>
						Deposit
					</a>
				</div>
			</div>
		</div>
	);
};

export default ErrorPopUp;
