import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function App(props) {
	const [entry, setEntry] = useState([]);
	const [quote, setQuote] = useState({});
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
				setQuote(data.quote[0]);
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
		<div className="JournalEntryPage">
			<div className="top date">
				{entry.time ? moment(entry.time).format('MMMM Do YYYY') : ''} <br />
			</div>

			<div className="top">
				<div className="quote">
					{Object.keys(quote) ? quote.text : ''} <br />-{' '}
					{Object.keys(quote) ? quote.author : 'unknown'}
				</div>
			</div>
			<div className="middle">
				<div className="col1">
					<p className="input-label">My Daily Diary</p>
					<div className="input-area feelings">
						<ul>
							{feelings?.includes(',')
								? feelings.split(',').map(item => {
										return <li key={item}>{item}</li>;
								  })
								: feelings}
						</ul>
					</div>
				</div>

				<div className="col2">
					<p className="input-label">How I'm taking care of myself today</p>
					<div className="input-area">
						<ul>
							{care?.includes(',')
								? care.split(',').map(item => {
										return <li key={item}>{item}</li>;
								  })
								: care}
						</ul>
					</div>
					<br />
					<p className="input-label">My goals for today</p>
					<div className="input-area">
						<ul>
							{goals?.includes(',')
								? goals.split(',').map(item => {
										return <li key={item}>{item}</li>;
								  })
								: goals}
						</ul>
					</div>
					<br />
					<p className="input-label">What I'm manifesting</p>
					<div className="input-area">
						<ul>
							{manifestations?.includes(',')
								? manifestations.split(',').map(item => {
										return <li key={item}>{item}</li>;
								  })
								: manifestations}
						</ul>
					</div>
				</div>
			</div>
			<div className="bottom">
				<Link to={`/${entry._id}/edit`}>
					<button className="update-button">Edit</button>
				</Link>
			</div>
		</div>
	);
}
