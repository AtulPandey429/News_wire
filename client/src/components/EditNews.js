import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getNewsItemById } from '../store/actions/index';
import Alert from 'react-bootstrap/Alert';
import { showToast } from './utils/showToast';

const EditNews = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [ inputValues, setInputValues ] = useState({
		title: '',
		body: '',
		author: ''
	});

	useEffect(
		() => {
			dispatch(getNewsItemById(id)).then((action) => {
				setInputValues({
					title: action.payload.newsItem ? action.payload.newsItem.title : '',
					body: action.payload.newsItem ? action.payload.newsItem.body : '',
					author: action.payload.newsItem ? action.payload.newsItem.author : ''
				});
			});
		},
		[ dispatch, id ]
	);

	const editNews = async (values) => {
		try {
			const response = await axios.patch(`/api/news/${id}`, {
				title: values.title,
				body: values.body,
				author: values.author
			});
			console.log('response is', response);
			showToast('success', 'successfully edited news post');
		} catch (error) {
			console.log('error is', error);
			// showToast('error', error.message);
			// showToast('error', error.response.data.info);
			showToast('error', 'something went wrong, please try again later');
		}
	};

	const formik = useFormik({
		initialValues: {
			title: inputValues.title,
			body: inputValues.body,
			author: inputValues.author
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			title: Yup.string().max(100, 'Must be 30 characters or less').required('Sorry, title is required'),
			body: Yup.string().max(500, 'Must be 500 characters or less').required('Sorry, body is required'),
			author: Yup.string().max(30, 'Name must be less than 30 characters').required('Sorry, author is required')
		}),
		onSubmit: (values, { resetForm }) => {
			editNews(values);
			navigate(`/news/${id}`);
		}
	});
	return (
		<React.Fragment>
			<form className="" onSubmit={formik.handleSubmit}>
				<div className="mt-4">
					<label htmlFor="title">Title</label>
					<input
						className="form-control"
						id="title"
						type="text"
						placeholder="News Headline ..."
						{...formik.getFieldProps('title')}
					/>
					{formik.touched.title && formik.errors.title ? (
						<Alert className="mt-3" variant="danger">
							{formik.errors.title}
						</Alert>
					) : null}
				</div>

				<div className="mt-4">
					<label htmlFor="author">Author Name</label>
					<input
						className="form-control"
						id="author"
						type="text"
						placeholder="John Doe"
						{...formik.getFieldProps('author')}
					/>
					{formik.touched.author && formik.errors.author ? (
						<Alert className="mt-3" variant="danger">
							{formik.errors.author}
						</Alert>
					) : null}
				</div>

				<div className="mt-4">
					<label htmlFor="body">Body</label>
					<textarea
						className="form-control"
						id="body"
						placeholder="News Body ..."
						{...formik.getFieldProps('body')}
					/>
					{formik.touched.body && formik.errors.body ? (
						<Alert className="mt-3" variant="danger">
							{formik.errors.body}
						</Alert>
					) : null}
				</div>

				<button className="btn btn-primary mt-4" type="submit">
					Edit news
				</button>
			</form>
		</React.Fragment>
	);
};

export default EditNews;
