import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import { showToast } from './utils/showToast';

const NewNews = () => {
	const navigate = useNavigate();

	const addNewsToDB = async (values) => {
		try {
			const response = await axios.post('/api/news', {
				title: values.title,
				body: values.body,
				author: values.author
			});
			console.log('response is', response);
			showToast('success', 'successfully added news post');
			navigate('/');
		} catch (error) {
			console.log('error is', error);
			showToast('error', 'something went wrong while creating the news post, try again later');
		}
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
			author: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().max(100, 'Must be 30 characters or less').required('Sorry, title is required'),
			body: Yup.string().max(500, 'Must be 500 characters or less').required('Sorry, body is required'),
			author: Yup.string().max(30, 'Name must be less than 30 characters').required('Sorry, author is required')
		}),
		onSubmit: (values, { resetForm }) => {
			addNewsToDB(values);
			resetForm();
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
					Add news
				</button>
			</form>
		</React.Fragment>
	);
};

export default NewNews;
