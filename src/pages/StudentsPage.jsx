import React, { useContext } from 'react';

import Profile from '../components/Home/Profile';
import Search from '../components/Home/Search';
import AppContext from '../context';
import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';
import styles from './Students.module.scss';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fs } from '../firebase';
import { useEffect, useState } from 'react';
import Main from '../components/Students/Main';

const Students = () => {
	const user = auth.currentUser;
	const [students, setStudents] = useState([]);
	const [prepods, setPrepods] = useState([]);

	const fetchPrepods = async () => {
		const q = query(collection(fs, 'users'), where('email', '==', user.email));

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setPrepods(newData);
		});
	};

	const fetchStudents = async () => {
		const q = query(collection(fs, 'students'));

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setStudents(newData);
		});
	};

	useEffect(() => {
		fetchPrepods();
		fetchStudents();
	}, []);

	return (
		<div className='pt-12 pr-12 w-full'>
			<div className='flex flex-row justify-between'>
				{prepods.map(prepod => (
					<div className='flex flex-col'>
						<h1 className='font-semibold text-2xl'>{prepod.userName}</h1>
						<h3 className='font-medium text-lg'>{prepod.univ}</h3>
					</div>
				))}
				<div className='flex flex-row items-center'>
					<Search />
				</div>
			</div>
			<Main />
		</div>
	);
};

export default Students;
