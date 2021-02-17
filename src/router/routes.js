import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import JournalEntry from '../pages/JournalEntry';
import UpdateJournalEntry from '../pages/UpdateJournalEntry';
import NewJournalEntry from '../pages/NewJournalEntry';
import Journal from '../pages/Journal';

const routes = [
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: Journal,
		key: 'Journal',
		path: '/journal'
	},
	{
		Component: NewJournalEntry,
		key: 'NewJournalEntry',
		path: '/new'
	},
	{
		Component: UpdateJournalEntry,
		key: 'UpdateJournalEntry',
		path: '/:id/edit'
	},
	{
		Component: JournalEntry,
		key: 'JournalEntry',
		path: '/:id'
	},
	{
		Component: App,
		key: 'App',
		path: '/'
	}
];

export default routes;
