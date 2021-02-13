import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
				console.log(props);
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
			<Link to={`/${entry._id}/edit`}>
				<button>Update Journal Entry</button>
			</Link>
			<h4>Today I am feeling..</h4>
			<ul>
				{feelings?.includes(',')
					? feelings.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: feelings}
			</ul>
			<br />
			<h4>How I'm taking care of myself..</h4>
			<ul>
				{care?.includes(',')
					? care.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: care}
			</ul>
			<br />
			<h4>What I'm manifesting.. </h4>
			<ul>
				{manifestations?.includes(',')
					? manifestations.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: manifestations}
			</ul>
			<br />
			<h4>My future goals..</h4>
			<ul>
				{goals?.includes(',')
					? goals.split(',').map(item => {
							return <li key={item}>{item}</li>;
					  })
					: goals}
			</ul>
		</div>
	);
}
