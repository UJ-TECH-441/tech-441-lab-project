const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const handler = require('../handlers/handler-mindreader');

router.get('/readmymind', asyncHandler(async (req, res, next) => {
	try {
		const messages = handler.read();
		res.json({ messages });
	} catch (err) {
		// Error handling
		console.error(err);
		res.sendStatus(500);
	}
}));

router.get('/rating', asyncHandler(async (req, res, next) => {
	try {
		const messages = handler.rating(req.query.stars);
		res.json({ messages });
	} catch (err) {
		// Error handling
		console.error(err);
		res.sendStatus(500);
	}
}));

module.exports = router;
