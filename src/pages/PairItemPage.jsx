import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fs } from '../firebase';

function PairItem() {
	const location = useLocation();
	const navigate = useNavigate();

	const pair = location.state;

	const [filteredPair, setFilteredPair] = useState([]);

	const fetchPair = async () => {
		const unsub = onSnapshot(doc(fs, 'pairs', pair.id), doc => {
			setFilteredPair({ ...doc.data() });
		});
		return unsub;
	};

	useEffect(() => {
		fetchPair();
	}, []);

	const handleChangeEducation = async () => {
		const btnRef = doc(fs, 'pairs', pair.id);
		if (filteredPair.educ === 'Изученно') {
			await updateDoc(btnRef, {
				educ: 'В процессе'
			})
				.then(() => {
					console.log('rose update');
					alert('Успешно!');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (filteredPair.educ === 'В процессе') {
			await updateDoc(btnRef, {
				educ: 'Изученно'
			})
				.then(() => {
					console.log('green update');
					alert('Успешно!');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};
	return (
		<div className='flex flex-col mt-20 items-center w-full'>
			<h2 className='font-semibold text-3xl text-black mb-5'>{pair.pair}</h2>
			<div className='flex mb-10'>
				<button
					className='p-4 bg-rose-400 rounded-2xl mr-10'
					onClick={handleChangeEducation}>
					<h2 className='font-semibold text-lg text-white'>В процессе</h2>
				</button>
				<button
					className='p-4 bg-green-500 rounded-2xl'
					onClick={handleChangeEducation}>
					<h2 className='font-semibold text-lg text-white'>Изученно</h2>
				</button>
			</div>
			<button
				onClick={() => navigate(-1)}
				className='p-2 bg-slate-500 rounded-2xl'>
				<h2 className='font-semibold text-lg text-white'>Закрыть</h2>
			</button>
		</div>
	);
}

export default PairItem;
