import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function App(props) {
	const [entries, setEntries] = useState([]);
	const [entry, setEntry] = useState({});
	const [selectedQuote, setSelectedQuote] = useState({});
	const [startDate, setStartDate] = useState(new Date('2021/01/01'));
	const [endDate, setEndDate] = useState(new Date('2021/02/28'));
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
		} finally {
			console.log(entry);
			console.log(entry._id);
			// await window.location.assign(`/${entry._id}`);
		}
	};

	return (
		<div className="new-entry-page">
			<div>
				{selectedQuote.text} - {selectedQuote.author}
			</div>
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
				<button className="submit-new-button">
					<input type="submit" value="Add New Entry" />
				</button>
			</form>

			{/* <DatePicker
				selected={startDate}
				onChange={date => setStartDate(date)}
				selectsStart
				startDate={startDate}
				endDate={endDate}
			/>
			<DatePicker
				selected={endDate}
				onChange={date => setEndDate(date)}
				selectsEnd
				startDate={startDate}
				endDate={endDate}
				minDate={startDate}
			/> */}
			{/* 
			{entries
				.filter(entry => {
					return (
						moment(entry.time).format('MM/DD/YYYY') >=
							moment(startDate).format('MM/DD/YYYY') &&
						moment(entry.time).format('MM/DD/YYYY') <=
							moment(endDate).format('MM/DD/YYYY')
					);
				})
				.map(entry => {
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
				})} */}
		</div>
	);
}
