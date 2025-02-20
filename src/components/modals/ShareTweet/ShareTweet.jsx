import "./ShareTweet.css";
import { TwitterShareButton } from "react-share";
const ShareTweet = ({ amountWon, tokenName, setShow }) => {
	function handleEverShare() {
		setShow(false);
		localStorage.setItem("dontShowTwitterShare", true);
	}

	return (
		<div className="share-tweet-wrapper">
			<TwitterShareButton
				title={`I just won ${amountWon} $${tokenName} playing Plinko at @grand_gambit. By sharing with you guys I am earning free plays\n\ngrandgambit.io/game/plinko\n\n`}
				url={"#Ergo"}
				hashtags={["Plinko"]}
			>
				<div className="share-tweet-container">
					<span className="share-tweet-text">
						Click here to share your win on twitter, you will get FREE plays for
						it.
					</span>
				</div>
			</TwitterShareButton>
			<div className="share-tweet-options">
				<span onClick={() => setShow(false)}>Not now</span>
				<span onClick={() => handleEverShare()}>
					I won't ever share, dont show
				</span>
			</div>
		</div>
	);
};

export default ShareTweet;
