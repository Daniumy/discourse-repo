import "./FixedPotInfo.css";
import { useEffect, useState } from "react";
import moneyBag from "../../assets/moneyJoderrr.png";
import ergIcon from "../../assets/ergo-icon-white.png";
import cometIcon from "../../assets/cometIcon.png";
import sigusdIcon from "../../assets/SigUSD.svg";
import cypxIcon from "../../assets/cypxIcon.svg";
import egioIcon from "../../assets/egioIcon.svg";
import fluxIcon from "../../assets/fluxIcon.svg";
import ergopadIcon from "../../assets/ergopadIcon.svg";
import paideiaIcon from "../../assets/paideiaIcon.svg";
import bassIcon from "../../assets/bassIcon.png";
import ergoneIcon from "../../assets/ergoneIcon.png";
import loveIcon from "../../assets/loveIcon.png";
import greasycexIcon from "../../assets/greasycexIcon.png";
import pepergIcon from "../../assets/pepergIcon.png";
import boberIcon from "../../assets/boberIcon.png";
import gifIcon from "../../assets/gifIcon.png";

import { Triangle } from "react-loader-spinner";

const FixedPotInfo = ({
	ergAmount,
	cometAmount,
	cypxAmount,
	sigusdAmount,
	egioAmount,
	fluxAmount,
	epadAmount,
	paideiaAmount,
	bassAmount,
	ergoneAmount,
	loveAmount,
	greasycexAmount,
	pepergAmount,
	boberAmount,
	gifAmount,
	requestCurrentPotFunds,
	show,
	setShow,
	setShowFirstTimeHoveringPot,
	refreshPotFromResult,
	setRefreshPotFromResult,
	potFundsLoading,
}) => {
	function handleRefresh() {
		requestCurrentPotFunds();
	}

	useEffect(() => {
		if (refreshPotFromResult) {
			setShow(true);
			handleRefresh();
			setTimeout(() => {
				setShow(false);
				setRefreshPotFromResult(false);
			}, 3000);
		}
	}, [refreshPotFromResult]);

	return (
		<>
			{!show && (
				<div
					className="fixedPotInfo"
					onClick={() => {
						setShowFirstTimeHoveringPot(true);
						setShow(!show);
					}}
				>
					<img src={moneyBag} className="money-bag" />
				</div>
			)}
			<div className={show ? "fixedPotInfoShown show" : "fixedPotInfoShown"}>
				<div className="fixedPotInfoShown-wrapper">
					<div className="fixedPot-tools">
						<span onClick={() => setShow(false)}>Close</span>
						<span onClick={() => handleRefresh()}>Reload</span>
					</div>
					<div className="fixedPot-tokens-wrapper">
						<div className="fixedPot-token">
							<img src={ergIcon}></img>
							{!potFundsLoading ? (
								<span>{ergAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={gifIcon} id="fixedpot-comet-image"></img>
							{!potFundsLoading ? (
								<span>{gifAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={cometIcon} id="fixedpot-comet-image"></img>
							{!potFundsLoading ? (
								<span>{cometAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={pepergIcon} id="fixedpot-comet-image"></img>
							{!potFundsLoading ? (
								<span>{pepergAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={boberIcon} id="fixedpot-comet-image"></img>
							{!potFundsLoading ? (
								<span>{boberAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={sigusdIcon}></img>
							{!potFundsLoading ? (
								<span>{sigusdAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={cypxIcon}></img>
							{!potFundsLoading ? (
								<span>{cypxAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={egioIcon}></img>
							{!potFundsLoading ? (
								<span>{egioAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={fluxIcon}></img>
							{!potFundsLoading ? (
								<span>{fluxAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={ergopadIcon}></img>
							{!potFundsLoading ? (
								<span>{epadAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={paideiaIcon}></img>
							{!potFundsLoading ? (
								<span>{paideiaAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={bassIcon}></img>
							{!potFundsLoading ? (
								<span>{bassAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						<div className="fixedPot-token">
							<img src={ergoneIcon}></img>
							{!potFundsLoading ? (
								<span>{ergoneAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
						{/* <div className="fixedPot-token">
							<img src={loveIcon}></img>
							{!potFundsLoading ? (
								<span>{loveAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div> */}
						<div className="fixedPot-token">
							<img src={greasycexIcon}></img>
							{!potFundsLoading ? (
								<span>{greasycexAmount}</span>
							) : (
								<Triangle
									height="45"
									width="60"
									radius="100"
									color="#2f73f0"
									ariaLabel="loading"
									wrapperStyle
									wrapperClass
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FixedPotInfo;
