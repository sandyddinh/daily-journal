import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function App(props) {
	return (
		<div className="AppPage">
			<h1>My Daily</h1>
			<p className="headline">
				Start your day with gratitude, happiness and positive affirmation.
			</p>
			<hr />

			<Link to={`/new`}>
				<button className="new-button">New Journal Entry</button>
			</Link>
			<Link to={`/journal`}>
				<button className="view-journal-button">View Journal</button>
			</Link>
		</div>
	);
}
