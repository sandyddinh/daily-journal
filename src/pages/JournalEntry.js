import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

export default function App(props) {
	const [entry, setEntry] = useState([]);
	const [feelings, setFeelings] = useState('');
	const [care, setCare] = useState('');
	const [manifestations, setManifestations] = useState('');
	const [goals, setGoals] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/journal/${props.match.params.id}`);
				const data = await response.json();
				setEntry(data);
				setFeelings(data.feelings);
				setCare(data.care);
				setManifestations(data.manifestations);
				setGoals(data.goals);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="show-journal-entry">
			{entry.time ? moment(entry.time).format('MMMM Do YYYY') : ''} <br />
			<h4>Today I am feeling..</h4>
			<ul>
				{entry.feelings !== ''
					? feelings.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: ''}
			</ul>
			<br />
			<h4>How I'm taking care of myself..</h4>
			<ul>
				{entry.care !== ''
					? care.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: ''}
			</ul>
			<br />
			<h4>What I'm manifesting.. </h4>
			<ul>
				{entry.manifestations !== ''
					? manifestations.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: ''}
			</ul>
			<br />
			<h4>My future goals..</h4>
			<ul>
				{entry.goals !== ''
					? goals.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: ''}
			</ul>
		</div>
	);
}
