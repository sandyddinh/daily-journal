import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

export default function App(props) {
	const [entry, setEntry] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/journal/${props.match.params.id}`);
				const data = await response.json();
				setEntry(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const createList = str => {
		const splitStr = str.split(',');
		console.log(splitStr);
		splitStr.map(item => {
			return <li>{item}</li>;
		});
	};

	return (
		<div className="show-journal-entry">
			{entry.time ? moment(entry.time).format('MMMM Do YYYY') : ''} <br />
			<h4>Today I am feeling..</h4>
			<ul>{entry.feelings ? createList(entry.feelings) : ''}</ul>
			<br />
			<h4>How I'm taking care of myself..</h4>
			<ul>{entry.care ? createList(entry.care) : ''}</ul>
			<br />
			<h4>What I'm manifesting.. </h4>
			<ul>{entry.manifestations ? createList(entry.manifestations) : ''}</ul>
			<br />
			<h4>My future goals..</h4>
			<ul>{entry.goals ? createList(entry.goals) : ''}</ul>
		</div>
	);
}
