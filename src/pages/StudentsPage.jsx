import React from 'react';
import { auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fs } from '../firebase';
import { useEffect, useState } from 'react';
import Main from '../components/Students/Main';
import Search from '../components/Home/Search';

const Students = () => {
	const user = auth.currentUser;
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

	console.log(prepods);

	useEffect(() => {
		fetchPrepods();
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
			</div>
			<Main />
		</div>
	);
};

export default Students;
