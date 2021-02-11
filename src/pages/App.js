import React, { useEffect, useState, useRef } from 'react';

export default function App(props) {
	const [entries, setEntries] = useState([]);
	const dateInput = useRef(null);
	const feelingsInput = useRef(null);
	const careInput = useRef(null);
	const manifestationsInput = useRef(null);
	const goalsInput = useRef(null);

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
		const feelingsValue = feelingsInput.current.value;
		const careValue = careInput.current.value;
		const manifestationsValue = manifestationsInput.current.value;
		const goalsValue = goalsInput.current.value;
		try {
			const response = await fetch('/api/journal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: dateValue,
					feelings: [feelingsValue],
					care: [careValue],
					manifestations: [manifestationsValue],
					goals: [goalsValue]
				})
			});
			const data = await response.json();
			setEntries([...entries, data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="AppPage">
			{entries.map(entry => {
				return (
					<div key={entry._id}>
						{entry.time} <br />
						How I'm feeling today.. {entry.feelings} <br />
						How I'm taking care of myself.. {entry.care} <br />
						What I'm manifesting.. {entry.manifestations} <br />
						My future goals.. {entry.goals}
					</div>
				);
			})}
			<form onSubmit={handleSubmit}>
				<label>
					Date: <input type="text" ref={dateInput} />
				</label>
				<br />
				<label>
					Feelings: <input type="text" ref={feelingsInput} />
				</label>
				<br />
				<label>
					Care: <input type="text" ref={careInput} />
				</label>
				<br />
				<label>
					Manifestations: <input type="text" ref={manifestationsInput} />
				</label>
				<br />
				<label>
					Goals: <input type="text" ref={goalsInput} />
				</label>
				<br />
				<input type="submit" value="Add New Entry" />
			</form>
		</div>
	);
}
