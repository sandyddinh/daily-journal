import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function App(props) {
	return (
		<div className="AppPage">
			<video autoPlay muted loop controls>
				<source
					src="https://res.cloudinary.com/dxuoqqfve/video/upload/v1613608880/ezgif.com-gif-maker_pqsjh6.mp4"
					type="video/mp4"
				/>
			</video>
			<h1>My Daily</h1>
			<p className="headline">
				Start your day with gratitude, happiness and positive affirmation.
			</p>
			<hr />

			<Link to={`/journal`}>
				<button className="view-journal-button">View Journal</button>
			</Link>

			<Link to={`/new`}>
				<button className="new-button">New Journal Entry</button>
			</Link>
		</div>
	);
}
