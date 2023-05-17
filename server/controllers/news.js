const News = require('../models/news');

exports.newsIndex = async (req, res) => {
	try {
		const newsPosts = await News.find();
		res.status(200).json(newsPosts);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			info: error.message
		});
	}
};

exports.createNews = async (req, res) => {
	try {
		const newsObj = new News({
			title: req.body.title,
			body: req.body.body,
			author: req.body.author
		});
		await newsObj.save();
		res.status(200).json('ok');
	} catch (error) {
		console.log(error);
		res.status(400).json({
			info: error.message
		});
	}
};

exports.showNews = async (req, res) => {
	try {
		const newsPost = await News.findById(req.params.id);
		res.status(200).json(newsPost);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			info: error.message
		});
	}
};

exports.updateNews = async (req, res) => {
	try {
		await News.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			body: req.body.body,
			author: req.body.author
		});
		res.status(200).json('ok');
	} catch (error) {
		console.log(error);
		res.status(400).json({
			info: error.message
		});
	}
};

exports.deleteNews = async (req, res) => {
	try {
		await News.findByIdAndDelete(req.params.id);
		res.status(200).json('ok');
	} catch (error) {
		console.log(error);
		res.status(400).json({
			info: error.message
		});
	}
};
