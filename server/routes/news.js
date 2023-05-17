const express = require('express'),
	router = express.Router();

const News = require('../models/news'),
	newsContorller = require('../controllers/news.js');

router.get('/api/news', newsContorller.newsIndex);

router.post('/api/news', newsContorller.createNews);

router.get('/api/news/:id', newsContorller.showNews);

router.patch('/api/news/:id', newsContorller.updateNews);

router.delete('/api/news/:id', newsContorller.deleteNews);

module.exports = router;
