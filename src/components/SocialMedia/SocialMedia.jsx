import "./SocialMedia.css";
import React from "react";
import telegramIcon from "../../assets/telegramIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import githubIcon from "../../assets/githubIcon.svg";
import discordIcon from "../../assets/discordIcon.svg";

const SocialMedia = () => {
	return (
		<div className="social-media-wrapper">
			<a
				href="https://github.com/ergflip/backend"
				target="_blank"
				rel="noreferrer"
			>
				<img src={githubIcon} alt="github" />
			</a>
			<a href="https://t.me/+Zb8XibNRKB4xZjk0" target="_blank" rel="noreferrer">
				<img src={telegramIcon} alt="telegram" />
			</a>
			<a
				href="https://twitter.com/grand_gambit"
				target="_blank"
				rel="noreferrer"
			>
				<img src={twitterIcon} alt="twitter" />
			</a>
			<a href="https://discord.gg/sEQtva9j" target="_blank" rel="noreferrer">
				<img src={discordIcon} alt="discord" />
			</a>
		</div>
	);
};

export default SocialMedia;
