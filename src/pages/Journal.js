import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function App(props) {
	const [entries, setEntries] = useState([]);
	const [startDate, setStartDate] = useState(new Date('2021/01/01'));
	const [endDate, setEndDate] = useState(new Date('2021/02/28'));

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

	return (
		<div className="AppPage">
			<h1>These are all the Journal Entries</h1>

			<Link to={`/new`}>
				<button className="new-button">New Journal Entry</button>
			</Link>

			<DatePicker
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
			/>

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
				})}
		</div>
	);
}
