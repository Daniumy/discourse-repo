import "./Plinko.css";
import { Engine, Body, Bodies, Composite, Runner, World, Events, Render } from "./MatterJS";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import {
	availableRisks,
	availableRows,
	getBucketColor,
	getBucketText,
	getRiskColor,
	ballsOptions,
	placeholderStyles,
	getPinSize,
	getPinGap,
	getBallSize,
	getFriction,
	getFrictionAir,
	simulationSpeedValues,
	simulationSpeedMobileArray,
	simulationSpeedDesktopArray,
} from "./PlinkoUtils";
import PlinkoResults from "./PlinkoResults";
import { fromLongToActualCurrencyValue } from "../../components/utils";
import { useSubscription } from "react-stomp-hooks";
import plinkoPinHit from "../../assets/plinkoPinHit.mp3";
import ballBucketHit from "../../assets/ballBucketHit.mp3";
import Confetti from "react-confetti";
import ShareTweet from "../../components/modals/ShareTweet/ShareTweet";
import gifSticker from "../../assets/gifSticker.webp";
import gifIcon from "../../assets/gifIcon.png";
import gifBanner from "../../assets/gifBanner.png";

const pinHit = new Audio(plinkoPinHit);
const bucketHit = new Audio(ballBucketHit);
pinHit.volume = 0.5;
bucketHit.volume = 0.5;

const otherCategory = 0x0001;
const ballCategory = 0x0002;

const Plinko = ({
	setInsideGame,
	selectedRisk,
	setSelectedRisk,
	selectedCoin,
	selectedBet,
	connectedAddress,
	startPlay,
	setNautilusLoading,
	ergoPayConnectedAddress,
	setBetStarted,
	setRefreshPotFromResult,
}) => {
	const scene = useRef();
	const engine = useRef(Engine.create());

	useEffect(() => {
		setInsideGame("plinko");
		if (localStorage.getItem("dontShowTwitterShare")) setNoMostrarTwitter(true);
	}, []);

	function getWalletAddress() {
		if (ergoPayConnectedAddress) return ergoPayConnectedAddress;
		else if (connectedAddress) return connectedAddress;
		else return "";
	}

	useSubscription(`/user/${getWalletAddress()}/plinko`, ({ body }) => {
		const obj = JSON.parse(body);
		setBetStarted(false);
		dealWithResultReceived(obj);
	});

	const [pinRows, setPinRows] = useState(8);
	const [selectedBalls, setSelectedBalls] = useState(ballsOptions[0]);
	const [results, setResults] = useState([]);
	const [ballSize, setBallSize] = useState(0);
	const [confetti, setConfetti] = useState([]);
	const [playIsHappening, setPlayIsHappening] = useState(false);
	const [currentSimulationSpeed, setCurrentSimulationSpeed] = useState({
		value: 0,
		label: "1",
	});
	const [winPlayReceived, setWinPlayReceived] = useState([]);
	const [noMostrarTwitter, setNoMostrarTwitter] = useState(false);

	function handleRowSelectorClicked(value) {
		setPinRows(value);
	}

	function handleSelectRisk(risk) {
		setSelectedRisk(risk);
	}

	function getSimulationSpeed(arrayIndex) {
		return window.innerWidth > 1000 ? simulationSpeedDesktopArray[arrayIndex] : simulationSpeedMobileArray[arrayIndex];
	}

	function handleModifySimulationSpeed(value) {
		//change engine.current.timing.timeScale by multiplying it by valye

		setCurrentSimulationSpeed(value);

		engine.current.timing.timeScale = getSimulationSpeed(value.value);
	}

	function dealWithResultReceived(resultReceived) {
		for (let i = 0; i < resultReceived.length; i++) {
			setTimeout(() => {
				const ball = Bodies.circle(
					scene.current.offsetWidth / 2,
					scene.current.getBoundingClientRect().top - 40,
					ballSize,
					{
						collisionFilter: { category: ballCategory, mask: otherCategory },
						restitution: 0,
						friction: getFriction(),
						frictionAir: getFrictionAir(),
						label: i,
					}
				);

				World.add(engine.current.world, [ball]);

				// let latestRowTreated = [...Array(resultReceived.length).fill(-1)];
				let latestRowTreated = -1;
				Events.on(engine.current, "collisionStart", function (event) {
					const pairs = event.pairs;
					pairs.forEach((pair) => {
						//check if the ball collides with a pin
						if (pair.bodyA === ball || pair.bodyB === ball) {
							const isBucket = pair.bodyA.label === "bucket";
							const resultForThisBall = resultReceived[i];

							if (isBucket) {
								bucketHit.play();
								//add to the previous confetti array a new element with the position of the ball
								setConfetti((prev) => [
									...prev,
									{
										x: pair.bodyB.position.x,
										y: pair.bodyB.position.y + 20,
									},
								]);

								setResults((prev) => [
									{
										bet: fromLongToActualCurrencyValue(resultForThisBall.betAmount, selectedCoin) + " " + selectedCoin,
										payout: resultForThisBall.payout,
										profit: fromLongToActualCurrencyValue(resultForThisBall.profit, selectedCoin),
									},
									...prev,
								]);
								World.remove(engine.current.world, ball);
								//Simulate a shaking/vibrating sensation to the pair.bodyA Body
								Body.scale(pair.bodyA, 1.1, 1.1);
								setTimeout(() => {
									Body.scale(pair.bodyA, 0.92, 0.92);
								}, 200);

								if (pair.bodyB.label === resultReceived.length - 1) {
									setPlayIsHappening(false);
									const winPlayReceivedAux = resultReceived.reduce((acc, curr) => acc + curr.profit, 0);
									if (winPlayReceivedAux > 0)
										setWinPlayReceived([fromLongToActualCurrencyValue(winPlayReceivedAux, selectedCoin), selectedCoin]);
									setTimeout(() => {
										setConfetti([]);
										setRefreshPotFromResult(true);
									}, 3000);
								}
							} else {
								pinHit.play();
								const pinRow = pair.bodyA.label;

								if (pinRow <= latestRowTreated) return;
								latestRowTreated = pinRow;

								const width = scene.current.offsetWidth;
								const directionAux = width > 1500 ? 4.25 : width > 1000 ? 3.5 : 3.25;

								const direction = resultForThisBall.results[pinRow] === 0 ? -directionAux : directionAux;

								Body.setVelocity(ball, {
									x: 0,
									y: 0,
								});
								Body.setAngularVelocity(ball, 0);
								Body.setAngle(ball, 0);

								Body.setVelocity(ball, {
									x: ball.velocity.x + direction * getSimulationSpeed(currentSimulationSpeed.value),
									y: ball.velocity.y,
								});
								//Now we specify an angular velocity that pushes the ball to the left or right
								Body.setAngularVelocity(ball, direction * 0.01);
							}
						}
					});
				});
			}, i * 1000);
		}
	}

	async function handlePlayClicked() {
		setNautilusLoading(true);
		setPlayIsHappening(true);
		const resultReceived = await startPlay(
			selectedCoin,
			selectedBet,
			selectedBalls.value,
			"receivePlinkoPlay",
			pinRows
		).catch(() => setPlayIsHappening(false));

		if (resultReceived) {
			dealWithResultReceived(resultReceived);
		} else {
			setPlayIsHappening(false);
		}
	}

	useEffect(() => {
		const gameSize = {
			w: scene.current.offsetWidth,
			h: scene.current.offsetHeight,
		};

		const cw = gameSize.w;
		const ch = gameSize.h;

		const startPins = 3;
		const pinSize = getPinSize(cw);
		const pinGap = getPinGap(cw);
		setBallSize(getBallSize(cw));

		const pins = [];

		for (let l = 0; l < pinRows; l++) {
			const linePins = startPins + l;
			const lineWidth = linePins * pinGap;
			for (let i = 0; i < linePins; i++) {
				const pin = Bodies.circle(cw / 2 - lineWidth / 2 + i * pinGap + pinGap / 2, 100 + l * pinGap, pinSize, {
					isStatic: true,
					label: l,
					collisionFilter: { category: otherCategory, mask: ballCategory },
					render: {
						fillStyle: "cyan",
						strokeStyle: "blue",
						lineWidth: 2,
					},
				});
				pins.push(pin);
			}
		}

		const buckets = [];
		const pinsInFinalRow = pinRows + 1;

		for (let i = 0; i < pinsInFinalRow; i++) {
			const x = cw / 2 - (pinsInFinalRow * pinGap) / 2 + i * pinGap + 13;
			const w = pinGap - 2;
			const h = 20;
			const y = 100 + pinRows * pinGap;

			//I want it so that the first and last third of buckets are kinda green and the second third is yellowish, having them all gradient
			const bucketColor = getBucketColor(i + 1, pinsInFinalRow);
			const bucketText = getBucketText(i, pinsInFinalRow - 1, selectedRisk);

			const bucket = Bodies.rectangle(x, y, w, h, {
				isStatic: true,
				label: "bucket",
				collisionFilter: { category: otherCategory, mask: ballCategory },
				render: {
					fillStyle: bucketColor,
					text: {
						content: bucketText,
						color: "black",
						size: cw < 450 ? 10 : cw < 1001 ? 12 : 15,
						family: "Papyrus",
					},
				},
			});
			buckets.push(bucket);
		}

		const render = Render.create({
			element: scene.current,
			engine: engine.current,
			options: {
				width: cw,
				height: ch,
				wireframes: false,
				background: "transparent",
			},
		});

		engine.current.timing = {
			timestamp: 0,
			timeScale: getSimulationSpeed(currentSimulationSpeed.value),
			lastDelta: 0,
			lastElapsed: 0,
		};

		World.add(engine.current.world, pins);
		World.add(engine.current.world, buckets);

		Render.run(render);
		const runner = Runner.create({
			isFixed: true,
		});
		Runner.run(runner, engine.current);
		return () => {
			// destroy Matter
			Render.stop(render);
			Runner.stop(runner);
			World.clear(engine.current.world);
			Composite.clear(engine.current.world);
			Engine.clear(engine.current);
			render.canvas.remove();
			render.canvas = null;
			render.context = null;
			render.textures = {};
		};
	}, [pinRows, selectedRisk]);

	return (
		<div ref={scene} className="plinko-wrapper">
			<div
				className={
					(!ergoPayConnectedAddress && !connectedAddress) || !selectedBet || !selectedCoin || playIsHappening
						? "play-button-plinko disabled"
						: "play-button-plinko"
				}
				onClick={handlePlayClicked}
			>
				Play
			</div>
			{confetti.map((c, index) => (
				<Confetti
					key={index}
					confettiSource={{ x: c.x, y: c.y, w: 1, h: 1 }}
					numberOfPieces={20}
					gravity={0.2}
					initialVelocityY={-1}
					initialVelocityX={-1}
					run={c}
					tweenDuration={1000}
				/>
			))}
			<PlinkoResults results={results} setResults={setResults} />
			{winPlayReceived.length > 0 && !noMostrarTwitter && (
				<ShareTweet
					show={winPlayReceived}
					setShow={setWinPlayReceived}
					amountWon={winPlayReceived[0]}
					tokenName={winPlayReceived[1]}
				/>
			)}
			{/* <img src={gifSticker} alt="gifSticker" className="gif-sticker" /> */}


			{/* <img src={gifBanner} alt="gifBanner" className="gif-banner" /> */}
			{!playIsHappening && (
				<div className="row-selector-wrapper">
					<div className="row-selector-title">Rows</div>
					{availableRows.map((row) => (
						<div
							className={row === pinRows ? "row-selector chosen" : "row-selector"}
							key={row}
							onClick={() => handleRowSelectorClicked(row)}
						>
							{row}
						</div>
					))}
				</div>
			)}
			{!playIsHappening ? (
				<div className="risk-ballamount-wrapper">
					<div className="risk-selector-wrapper">
						<div className="risk-selector-title">Risk</div>
						{availableRisks.map((risk) => (
							<div
								className={risk === selectedRisk ? "risk-selector chosen" : "risk-selector"}
								style={{ backgroundColor: getRiskColor(risk) }}
								key={risk}
								onClick={() => {
									handleSelectRisk(risk);
								}}
							>
								{risk}
							</div>
						))}
					</div>
					<div className="ball-amount-wrapper">
						<div className="ball-amount-title">Balls amount</div>
						<Select
							menuPlacement={window.innerWidth > 1000 ? "bottom" : "top"}
							className="ball-select"
							onChange={(value) => setSelectedBalls(value)}
							options={ballsOptions}
							placeholder="1"
							styles={placeholderStyles}
							value={selectedBalls}
							isSearchable={false}
						/>
					</div>
					<div className="simulation-speed-select">
						<div className="ball-amount-title">Balls speed</div>
						<Select
							menuPlacement={window.innerWidth > 1000 ? "bottom" : "top"}
							className="ball-select"
							onChange={(value) => handleModifySimulationSpeed(value)}
							options={simulationSpeedValues}
							placeholder="1"
							styles={placeholderStyles}
							value={currentSimulationSpeed}
							isSearchable={false}
						/>
					</div>
				</div>
			) : (
				<div className="current-play-plinko">
					You are going to play <span className="cyan-color">{selectedBalls.value} balls</span> of{" "}
					<span className="cyan-color">
						{fromLongToActualCurrencyValue(selectedBet, selectedCoin)} {selectedCoin}
					</span>{" "}
					each
				</div>
			)}
		</div>
	);
};

export default Plinko;
