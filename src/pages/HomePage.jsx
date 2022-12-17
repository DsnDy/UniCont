import React, { useContext } from 'react';

import Main from '../components/Home/Main';
import Profile from '../components/Home/Profile';
import Search from '../components/Home/Search';
import AppContext from '../context';
import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';
import styles from './HomePage.module.scss';

const HomePage = () => {
	const user = auth.currentUser;

	console.log(user);

	return (
		<div className='pt-12 pr-12 w-full'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col'>
					<h1 className='font-semibold text-2xl'>{user.displayName}</h1>
					<h3 className='font-medium text-lg'>{user.email}</h3>
				</div>
				<div className='flex flex-row items-center'>
					<Search />
					<Profile />
				</div>
			</div>
			<Main />
		</div>
	);
};

export default HomePage;
