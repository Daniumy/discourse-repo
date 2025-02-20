import "./GamesRoot.css";
import phoneTurnedRight from "../../assets/phoneTurnedRight.png";
import rouletteBlueEpic from "../../assets/rouletteBlueEpic3.png";
import cardwarImage from "../../assets/cardwarImage.png";
import coinflipImage from "../../assets/coinflipImage.png";
import dicesImage from "../../assets/dicesImage.png";
import rouletteImage from "../../assets/rouletteImage2.png";
import russianRouletteImage from "../../assets/russianRouletteImage2.png";
import tensideDice from "../../assets/tensideDice3-removebg-preview.png";
import openSource from "../../assets/openSource.png";
// import bitcoinConnections from "../../assets/worldBlockchain1.png";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import lightBulb from "../../assets/lightBulbIcon.png";
import gifSticker from "../../assets/gifSticker.webp";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import GameCard from "../../components/GameCard/GameCard";
import { Link } from "react-router-dom";
import plinkoImage from "../../assets/plinkoImage.png";

const gamesInfo = [
	{
		url: "plinko",
		img: plinkoImage,
		title: "Plinko",
	},
	{
		url: "roulette",
		img: rouletteImage,
		title: "Roulette",
	},
	{
		url: "coinflip",
		img: coinflipImage,
		title: "Coinflip",
	},
	{
		url: "cardwar",
		img: cardwarImage,
		title: "Card War",
	},
	{
		url: "russianroulette",
		img: russianRouletteImage,
		title: "Russian Roulette",
	},
	{
		url: "diceroll",
		img: dicesImage,
		title: "Dice Roll",
	},
	{
		url: "onetoten",
		img: tensideDice,
		title: "One to ten",
	},
];

export default function GamesRoot({ setInsideGame }) {
	useEffect(() => {
		setInsideGame(false);
	}, []);

	return (
		<div className="games-root-wrapper">
			<div className="carousel-wrapper">
				<Carousel
					width={"100vw"}
					autoPlay={true}
					interval={6000}
					infiniteLoop
					showStatus={false}
					showArrows={true}
					showThumbs={false}
					renderArrowPrev={(clickHandler, hasPrev) => {
						return (
							<div className={"prevArrow"} onClick={clickHandler}>
								<img src={leftArrow} style={{ width: 50 }} />
							</div>
						);
					}}
					renderArrowNext={(clickHandler, hasNext) => {
						return (
							<div className={"nextArrow"} onClick={clickHandler}>
								<img src={rightArrow} style={{ width: 50 }} />
							</div>
						);
					}}
					useKeyboardArrows={true}
				>
					{/* <div className="carousel-page">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								<span style={{ color: "#91e1f9" }}>Plinko</span> is here! 🎉
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle">
									Play now one of the most popular games amongst the crypto
									casino space!
								</h2>
								<h3 className="carousel-page--left-subtitle">
									Multiply your bet up to 1000x!{" "}
									<a
										href="https://grandgambit.io/game/plinko"
										target={"_blank"}
										rel="noreferrer"
									>
										here
									</a>
								</h3>
							</div>
						</div>
						<div className="carousel-page--right">
							<img
								className="carousel-page--right--img"
								src={plinkoWelcomeIcon}
							/>
						</div>
					</div> */}
					{/* <div className="carousel-page6">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								<span style={{ color: "#91e1f9" }}>$GIF </span>launches on May 4th
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle">
									To celebrate we will be doing events for the month of May with $GIF.
									<br />
									- Bonus 10% extra $GIF on wins
									<br />- NFT Giveaways for those who play
								</h2>
								<h3 className="carousel-page--left-subtitle">
									SWAP $GIF NOW, ON{" "}
									<a href="https://dex.crooks-fi.com/" rel="noopener nofollow">
										CROOKS-FI.COM
									</a>
								</h3>
							</div>
						</div>
						<div className="carousel-page--right">
							<img className="carousel-page--right--img5" src={gifSticker} />
						</div>
					</div> */}
					<div className="carousel-page6">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								<span style={{ color: "#91e1f9" }}>Name </span>your wallet address
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle">
									Make sure you choose the <span className="cyan-color">fanciest</span> username you come up with
								</h2>
								<h3 className="carousel-page--left-subtitle">
									<Link to={"/address-name"}>here</Link>
								</h3>
							</div>
						</div>
						<div className="carousel-page--right">
							<img className="carousel-page--right--img5" src={lightBulb} />
						</div>
					</div>
					<div className="carousel-page">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								You can now play your favorite games on <span style={{ color: "#91e1f9" }}>Android</span> too!
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle">
									Smaller device, same amount of fun, pick up your phone and start playing!
								</h2>
								<h3 className="carousel-page--left-subtitle">
									Mobile wallets{" "}
									<a href="https://ergoplatform.org/en/ergo-wallet-app/" target={"_blank"} rel="noreferrer">
										here
									</a>
								</h3>
							</div>
						</div>
						<div className="carousel-page--right">
							<img className="carousel-page--right--img" src={phoneTurnedRight} />
						</div>
					</div>
					{/* Roulette's one */}
					{/* <div className="carousel-page2">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								Play our most popular game,{" "}
								<span style={{ color: "#91e1f9" }}>Roulette</span>
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<a
									href="https://grandgambit.io/"
									target={"_blank"}
									rel="noreferrer"
									className="carousel-page--left-playnow"
								>
									Play now!
								</a>
							</div>
						</div>
						<div className="carousel-page--right">
							<img
								className="carousel-page--right--img2"
								src={rouletteBlueEpic}
							/>
						</div>
					</div> */}
					{/* <div className="carousel-page3">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title-ergo">
								<span style={{ color: "#91e1f9" }}>Grand Gambit</span> is on the{" "}
								<span style={{ color: "#f2a833" }}>Ergo </span>
								blockchain
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle-ergo">
									Ergo is a highly secure, private and decentralized blockchain
									that provides a stable and scalable platform to build
									applications.
								</h2>
								<h3 className="carousel-page--left-subtitle-ergo">
									Overall making it a cost-effective and secure choice for
									online casino applications.
								</h3>
							</div>
						</div>
						<div className="carousel-page--right">
							<img
								className="carousel-page--right--img3"
								src={bitcoinConnections}
							/>
						</div>
					</div> */}
					<div className="carousel-page4">
						<div className="carousel-page--left">
							<h1 className="carousel-page--left-title">
								Gambling can be <span style={{ color: "#91e1f9" }}>fun</span> and{" "}
								<span style={{ color: "#91e1f9" }}>fair</span>
							</h1>
							<div className="carousel-page--left-bottomwrapper">
								<h2 className="carousel-page--left-subtitle">
									To achieve more fairness anyone can check the code and maybe get some ideas for their own project!
								</h2>
								<a
									className="carousel-page--left-code"
									target="_blank"
									rel="noreferrer"
									href="https://github.com/ergflip/backend"
								>
									Code
								</a>
							</div>
						</div>
						<div className="carousel-page--right">
							<img className="carousel-page--right--img4" src={openSource} />
						</div>
					</div>
				</Carousel>
			</div>
			<div className="games-wrapper">
				{gamesInfo.map((game, index) => (
					<Link to={`/game/${game.url}`} className="game-card-link" style={{ textDecoration: "none" }} key={index}>
						<GameCard img={game.img} title={game.title} url={game.url} />
					</Link>
				))}
			</div>
		</div>
	);
}
