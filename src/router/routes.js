import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import JournalEntry from '../pages/JournalEntry';
import UpdateJournalEntry from '../pages/UpdateJournalEntry';
import NewJournalEntry from '../pages/NewJournalEntry';

const routes = [
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: Home,
		key: 'Home',
		path: '/home'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
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
