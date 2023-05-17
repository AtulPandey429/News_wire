import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

import { getNewsItemById } from '../store/actions/index';
import { LinkContainer } from 'react-router-bootstrap';
import { showToast } from './utils/showToast';

const ShowNews = () => {
	const newsStore = useSelector((state) => state.news);
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(
		() => {
			dispatch(getNewsItemById(id));
		},
		[ dispatch, id ]
	);

	const deleteNews = async () => {
		try {
			const response = await axios.delete(`/api/news/${id}`);
			showToast('success', 'successfully deleted news post');
			navigate('/');
		} catch (error) {
			showToast('danger', 'something went wrong while deleting the post, try again later');
		}
	};

	return (
		<React.Fragment>
			{newsStore.newsItem ? (
				<div className="article_container">
					<h1>{newsStore.newsItem.title}</h1>
					<div style={{ background: `url(https://picsum.photos/1920/1080)` }} className="image" />
					<div className="author">
						<span>Created By: {newsStore.newsItem.author} | </span>
						<Moment format="YYYY/MM/DD">{newsStore.newsItem.createdAt}</Moment>
					</div>
					<div className="my-3 content">{newsStore.newsItem.body}</div>
					<LinkContainer to={`/news/${newsStore.newsItem._id}/edit`}>
						<button className="btn btn-warning mb-4">Edit</button>
					</LinkContainer>
					<button onClick={deleteNews} className="btn btn-danger mb-4 ms-3">
						Delete
					</button>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default ShowNews;
