import "./GamblingHelp.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { customStyles } from "../../components/BetAmount/BetAmountUtils";

const options = [
	{ value: 0, label: "Never" },
	{ value: 1, label: "Sometimes" },
	{ value: 2, label: "Most of the time" },
	{ value: 3, label: "Almost always" },
];

const GamblingHelp = () => {
	const [selectedOption, setSelectedOption] = useState([]);
	const [totalScore, setTotalScore] = useState(0);

	function handleSelectedOption(value, index) {
		const newSelectedOption = [...selectedOption];
		newSelectedOption[index] = value;
		setSelectedOption(newSelectedOption);
	}

	useEffect(() => {
		setTotalScore(
			selectedOption.reduce((acc, curr) => {
				if (curr !== undefined) {
					return acc + curr;
				}
				return acc;
			}, 0)
		);
	}, [selectedOption]);

	function textBasedOnScore() {
		if (totalScore >= 0 && totalScore <= 5) {
			return "Looks like you have no issue with gambling";
		}
		if (totalScore > 5 && totalScore <= 7) {
			return "You are alright, but you should be careful";
		}
		if (totalScore > 7) {
			return "Your gambling might be causing problems for you or those closest to you";
		}
	}

	return (
		<div className="gambling-help-wrapper">
			<div
				className={
					totalScore <= 7
						? "gambling-help-questions-wrapper show"
						: "gambling-help-questions-wrapper hide"
				}
			>
				<h1 className="gambling-help-title">
					Reply to this <span className="cyan-color">questionnaire</span> to
					check your gambling behaviour
				</h1>
				<div className="gambling-help-question-wrapper">
					<span>Do you bet more than you can afford to lose?</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 0)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
				<div className="gambling-help-question-wrapper">
					<span>
						Have you tried to win back money you have lost (chasing losses)?
					</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 1)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
				<div className="gambling-help-question-wrapper">
					<span>
						Have you borrowed money or sold anything to get money to gamble?
					</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 2)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
				<div className="gambling-help-question-wrapper">
					<span>
						Has your gambling caused you any health problems, including feelings
						of stress or anxiety?
					</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 3)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
				<div className="gambling-help-question-wrapper">
					<span>
						Has your gambling caused any financial problems for you or your
						household?
					</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 4)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
				<div className="gambling-help-question-wrapper">
					<span>
						Have you ever felt guilty about the way you gamble or what happens
						when you gamble?
					</span>
					<Select
						className="gambling-help-select"
						onChange={({ value }) => handleSelectedOption(value, 5)}
						options={options}
						placeholder={<div>Choose one option</div>}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
			</div>

			<h2
				className={
					totalScore > 7
						? "dangerous-gambling-zone show"
						: "dangerous-gambling-zone hide"
				}
			>
				{textBasedOnScore()}
			</h2>
			<div
				className={
					totalScore > 7
						? "gambling-help-contact-us show"
						: "gambling-help-contact-us hide"
				}
			>
				If you feel like you need any help, please contact me at any of my
				socials. I have a person academically trained to help you break free
				from this habit.<br></br>
				Privacy will be a priority and you will be taught to have a more
				rational control of your emotions.
			</div>
		</div>
	);
};

export default GamblingHelp;
