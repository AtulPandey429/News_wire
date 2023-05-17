import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { showToast } from './utils/showToast';

const PageNotFound = () => {
	const navigate = useNavigate();
	useEffect(
		() => {
			navigate('/');
			showToast('error', 'sorry, this page is not available');
		},
		[ navigate ]
	);
	return <React.Fragment />;
};
export default PageNotFound;
