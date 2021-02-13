import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function App(props) {
	const [entry, setEntry] = useState([]);
	const [selectedQuote, setSelectedQuote] = useState({});
    const [deleted, setDeleted] = useState(false);

	const dateInput = useRef(null);
	const feelingsInput = useRef(null);
	const careInput = useRef(null);
	const manifestationsInput = useRef(null);
	const goalsInput = useRef(null);

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
	}, [entry, didDelete]);


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
					goals: goalsInput.current.value
				})
			});
			const data = await response.json();
			console.log(data);
			await setEntry([data]);
			console.log(entry[0]);
			setEntries([...entries, data]);
			associateQuote();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="AppPage">
			{/* <div>{quotes.length ? selectRandomQuote() : ''}</div> */}
			<div>
				{selectedQuote.text} - {selectedQuote.author}
			</div>
			<div>TEST: {entry[0]?.length ? entry : ''} </div>
			<form onSubmit={handleSubmit}>
				<label>
					Date:
					<input id="time" type="text" ref={dateInput} />
				</label>
				<br />
				<label>
					Feelings:
					<input id="feelings" type="text" ref={feelingsInput} />
				</label>
				<br />
				<label>
					Care: <input id="care" type="text" ref={careInput} />
				</label>
				<br />
				<label>
					Manifestations:
					<input id="manifestations" type="text" ref={manifestationsInput} />
				</label>
				<br />
				<label>
					Goals: <input id="goals" type="text" ref={goalsInput} />
				</label>
				<br />
				<input type="submit" value="Add New Entry" />
			</form>

			{entries.map(entry => {
				return (
					<div key={entry._id}>
						<Link to={`/${entry._id}`}>
							{moment(entry.time).format('MMMM Do YYYY')}
						</Link>{' '}
						<br />
						How I'm feeling today.. {entry.feelings} <br />
						How I'm taking care of myself.. {entry.care} <br />
						What I'm manifesting.. {entry.manifestations} <br />
						My future goals.. {entry.goals}
					</div>
				);
			})}
		</div>
	);
}
