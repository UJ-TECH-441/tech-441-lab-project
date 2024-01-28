const express = require('express');
const handler = require('../handlers/handler-mindreader');

module.exports = app => {
	app.get('/predictions', async (req, res, next) => {
		try {
			const messages = handler.makePredictions();
			res.json({ messages });
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.post('/rating', async (req, res, next) => {
		try {
			if (!req.body.star) return res.sendStatus(400);
			const data = handler.rating(req.body.star);
			res.json(data);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});
};
