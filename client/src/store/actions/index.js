import axios from 'axios';

const getNewsItemsHelper = async () => {
	try {
		const response = await axios.get('/api/news');
		return {
			news: response.data
		};
	} catch (error) {
		throw error;
	}
};

const getNewsItemByIdHelper = async (id) => {
	try {
		const response = await axios.get(`/api/news/${id}`);
		return {
			newsItem: response.data
		};
	} catch (error) {
		throw error;
	}
};

export const getNewsItems = () => {
	return {
		type: 'get_news',
		payload: getNewsItemsHelper()
	};
};

export const getNewsItemById = (id) => {
	return {
		type: 'get_news_by_id',
		payload: getNewsItemByIdHelper(id)
	};
};
