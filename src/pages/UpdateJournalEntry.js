import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

export default function App(props) {
	const [entry, setEntry] = useState([]);
	const [quote, setQuote] = useState({});
	const [time, setTime] = useState('');
	const [feelings, setFeelings] = useState('');
	const [care, setCare] = useState('');
	const [manifestations, setManifestations] = useState('');
	const [goals, setGoals] = useState('');
	const [deleted, setDeleted] = useState(false);
	const dateInput = useRef(null);
	const feelingsInput = useRef(null);
	const careInput = useRef(null);
	const manifestationsInput = useRef(null);
	const goalsInput = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/journal/${props.match.params.id}`);
				const data = await response.json();
				setEntry(data);
				setTime(data.time);
				setFeelings(data.feelings);
				setCare(data.care);
				setManifestations(data.manifestations);
				setGoals(data.goals);
				setQuote(data.quote[0]);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [entry, deleted]);

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/journal/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			setDeleted(!deleted);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/journal');
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const dateValue = dateInput.current.value;
		try {
			const response = await fetch(`/api/journal/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					time: moment(dateValue).format(),
					feelings: feelingsInput.current.value,
					care: careInput.current.value,
					manifestations: manifestationsInput.current.value,
					goals: goalsInput.current.value
				})
			});
			const data = await response.json();
			setEntry([...entry, data]);
			setUpdated(!updated);
			console.log(updated);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign(`/${entry._id}`);
		}
	};

	return (
		<div className="UpdateJournalEntryPage">
			<div className="top">
				<div className="quote">
					{Object.keys(quote) ? quote.text : ''} <br />-{' '}
					{Object.keys(quote) ? quote.author : 'unknown'}
					{console.log(moment(time).format('MM/DD/YYYY'))}
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="top">
					<label>
						<input id="time" type="text" ref={dateInput} defaultValue={time} />
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
								defaultValue={feelings}
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
								defaultValue={care}
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
								defaultValue={goals}
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
								defaultValue={manifestations}
							/>
						</label>
					</div>
				</div>

				<div className="bottom">
					<button className="delete-button">
						<input type="submit" value="Update" />
					</button>
					<button onClick={handleDelete} className="delete-button">
						Delete
					</button>
				</div>
			</form>
		</div>
	);
}
