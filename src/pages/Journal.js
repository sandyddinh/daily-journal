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

	const filterByMonth = e => {
		const MM = e.target.id;
		let DD = '31';
		if (MM === '02') {
			DD = '28';
		} else if (MM % 2 === 0) {
			DD = '30';
		}
		setStartDate(new Date(`2021/${MM}/01`));
		setEndDate(new Date(`2021/${MM}/${DD}`));
	};

	return (
		<div className="JournalPage">
			<div className="from-to-calendar top">
				<DatePicker
					className="date-picker"
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
				<DatePicker
					className="date-picker"
					selected={endDate}
					onChange={date => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
			</div>
			<div className="middle">
				<div className="month-filter col1">
					<div id="01" className="month" onClick={filterByMonth}>
						January
					</div>
					<div id="02" className="month" onClick={filterByMonth}>
						February
					</div>
					<div id="03" className="month" onClick={filterByMonth}>
						March
					</div>
					<div id="04" className="month" onClick={filterByMonth}>
						April
					</div>
					<div id="05" className="month" onClick={filterByMonth}>
						May
					</div>
					<div id="06" className="month" onClick={filterByMonth}>
						June
					</div>
					<div id="07" className="month" onClick={filterByMonth}>
						July
					</div>
					<div id="08" className="month" onClick={filterByMonth}>
						August
					</div>
					<div id="09" className="month" onClick={filterByMonth}>
						September
					</div>
					<div id="10" className="month" onClick={filterByMonth}>
						October
					</div>
					<div id="11" className="month" onClick={filterByMonth}>
						November
					</div>
					<div id="12" className="month" onClick={filterByMonth}>
						December
					</div>
				</div>

				<div className="col2">
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
								<div key={entry._id} className="filtered-entries">
									<Link to={`/${entry._id}`}>
										{moment(entry.time).format('MM/DD/YYYY')}
									</Link>
								</div>
							);
						})
						.sort()}
				</div>
			</div>
			<div className="bottom">
				<Link to={`/new`}>
					<button className="new-button">New Journal Entry</button>
				</Link>
			</div>
		</div>
	);
}
