import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import profile from '../../assets/profile.svg';
import AppContext from '../../context';

function Profile() {
	const navigate = useNavigate();
	return (
		<img
			onClick={() => {
				navigate('userInfo');
			}}
			src={profile}
			alt='профиль'
			width={70}
			height={70}
			className='cursor-pointer'
		/>
	);
}

export default Profile;
