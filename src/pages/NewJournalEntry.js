import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

export default function App(props) {
	const [entries, setEntries] = useState([]);
	const [entry, setEntry] = useState({});
	const [selectedQuote, setSelectedQuote] = useState({});
	const dateInput = useRef(null);
	const feelingsInput = useRef(null);
	const careInput = useRef(null);
	const manifestationsInput = useRef(null);
	const goalsInput = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://type.fit/api/quotes');
				const data = await response.json();
				const random = Math.floor(Math.random() * data.length);
				setSelectedQuote({ ...data[random] });
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/journal');
				const data = await response.json();
				setEntries(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		const dateValue = dateInput.current.value;
		try {
			const response = await fetch('/api/journal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					time: moment(dateValue).format(),
					feelings: feelingsInput.current.value,
					care: careInput.current.value,
					manifestations: manifestationsInput.current.value,
					goals: goalsInput.current.value,
					quote: selectedQuote
				})
			});
			const data = await response.json();
			await setEntry({ ...data });
			setEntries([...entries, data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="NewPage">
			<div className="top">
				<div className="quote">
					"{selectedQuote.text}" <br />- {selectedQuote.author}
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="top">
					<label>
						<input
							id="time"
							type="text"
							ref={dateInput}
							placeholder="MM/DD/YYYY"
							defaultValue={moment().format('MM/DD/YYYY')}
						/>
					</label>
				</div>

				<div className="middle">
					<div className="col1">
						<label>
							<span className="input-label">My daily diary</span>
							<br />
							<textarea
								id="feelings"
								type="text"
								ref={feelingsInput}
								placeholder="how are you feeling today? what are you grateful for? what new ideas do you have? what's something new you learned?"
							/>
						</label>
					</div>

					<div className="col2">
						<label>
							<span className="input-label">
								How I'm taking care of myself today
							</span>
							<br />
							<textarea
								id="care"
								type="text"
								ref={careInput}
								placeholder="meditation / yoga / exercise"
							/>
						</label>
						<br />
						<label>
							<span className="input-label">My goals for today</span>
							<br />
							<textarea
								id="goals"
								type="text"
								ref={goalsInput}
								placeholder="be specific"
							/>
						</label>
						<br />
						<label>
							<span className="input-label">What I'm manifesting</span>
							<br />
							<textarea
								id="manifestations"
								type="text"
								ref={manifestationsInput}
								placeholder="dream big!"
							/>
						</label>
					</div>
				</div>

				<div className="bottom">
					<button className="submit-new-button">
						<input type="submit" value="Add New Entry" />
					</button>
				</div>
			</form>

			{entry._id ? <Redirect to={`/${entry._id}`} /> : null}
		</div>
	);
}
