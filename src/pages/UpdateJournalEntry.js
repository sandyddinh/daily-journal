import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

export default function App(props) {
	const [entry, setEntry] = useState([]);
	const [time, setTime] = useState('');
	const [feelings, setFeelings] = useState('');
	const [care, setCare] = useState('');
	const [manifestations, setManifestations] = useState('');
	const [goals, setGoals] = useState('');
	const [deleted, setDeleted] = useState(false);
	const dateInput = useRef(null);
	const feelingsInput = useRef(null);
	const careInput = useRef(null);
	const manifestationsInput = useRef(null);
	const goalsInput = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/journal/${props.match.params.id}`);
				console.log(props);
				const data = await response.json();
				setEntry(data);
				setTime(data.time);
				setFeelings(data.feelings);
				setCare(data.care);
				setManifestations(data.manifestations);
				setGoals(data.goals);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [entry, deleted]);

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/journal/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			setDeleted(!deleted);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const dateValue = dateInput.current.value;
		try {
			const response = await fetch(`/api/journal/${props.match.params.id}`, {
				method: 'PUT',
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
			setEntry([...entry, data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="show-journal-entry">
			{entry.time ? moment(entry.time).format('MMMM Do YYYY') : ''} <br />
			<button onClick={handleDelete} className="delete-button">
				Delete Journal Entry
			</button>
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
			<form onSubmit={handleSubmit}>
				<label>
					Date:
					<input id="time" type="text" ref={dateInput} defaultValue={time} />
				</label>
				<br />
				<label>
					Feelings:
					<input
						id="feelings"
						type="text"
						ref={feelingsInput}
						defaultValue={feelings}
					/>
				</label>
				<br />
				<label>
					Care:{' '}
					<input id="care" type="text" ref={careInput} defaultValue={care} />
				</label>
				<br />
				<label>
					Manifestations:
					<input
						id="manifestations"
						type="text"
						ref={manifestationsInput}
						defaultValue={manifestations}
					/>
				</label>
				<br />
				<label>
					Goals:{' '}
					<input id="goals" type="text" ref={goalsInput} defaultValue={goals} />
				</label>
				<br />
				<button className="delete-button">
					<input type="submit" value="Update Journal Entry" />
				</button>
			</form>
		</div>
	);
}
