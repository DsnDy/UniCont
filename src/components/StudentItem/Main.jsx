import React, { useEffect, useState } from 'react';

import styles from './StudentItem.module.scss';
import arrowSmall from '../../assets/arrowSmall.svg';
import { collection, getDocs, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { fs } from '../../firebase';

function Main() {
	const navigate = useNavigate();

	const [filteredPairs, setFilteredPairs] = useState([]);

	const fetchPairs = async () => {
		const q = query(collection(fs, 'pairs'));
		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setFilteredPairs(newData);
		});
	};

	useEffect(() => {
		fetchPairs();
	}, []);
	return (
		<div className='flex flex-col'>
			<div className='mb-10'>
				<h1 className='font-semibold text-2xl'>Дисциплины</h1>
				<div className={styles.main}>
					<div className='flex flex-row bg-[#0866D1] p-2 rounded-t-[20px] items-center'>
						<h3 className='font-semibold text-white flex-[2] text-center'>
							Предмет
						</h3>
						<h3 className='font-semibold text-white flex-[2] text-center'>
							Кол-во часов
						</h3>
						<h3 className='font-semibold text-white flex-[2]'></h3>
					</div>
					<div className={styles.content}>
						{filteredPairs.map((pair, key) => (
							<div key={key} className='flex flex-col'>
								<div className='flex flex-row'>
									<div className='flex flex-1 border-b border-r p-2'>
										<h1 className='font-semibold text-xl mr-5 pl-8'>
											{key + 1 + '. '}
										</h1>
										<h1 className='font-semibold text-lg mr-3'>{pair.pair}</h1>
									</div>
									<div className='flex flex-1 border-b border-r pl-3 pt-2 pb-2'>
										<h1 className='font-medium text-xl mr-3'>{pair.hours}</h1>
									</div>
									<div
										className='flex flex-1 flex-col'
										onClick={() =>
											navigate(`/pairs/pairItem:${pair.id}`, { state: pair })
										}>
										<div className='flex flex-1 border-b p-2 flex-row'>
											<h1 className='font-medium text-xl mr-3'>{pair.educ}</h1>
											<img
												src={arrowSmall}
												alt=''
												className='ml-1 cursor-pointer'
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<h1 className='font-semibold text-2xl'>Успеваемость</h1>
				<div className={styles.main}>
					<div className='flex flex-row bg-[#0866D1] p-2 rounded-t-[20px] items-center'>
						<h3 className='font-semibold text-white flex-[2] text-center'>
							Предмет
						</h3>
						<h3 className='font-semibold text-white flex-[2] text-center'>
							Тип
						</h3>
						<h3 className='font-semibold text-white flex-[2] text-center'>
							Результат
						</h3>
					</div>
					<div className={styles.content}>
						{filteredPairs.map((pair, key) => (
							<div key={key} className='flex flex-col'>
								<div key={key} className='flex flex-row'>
									<div className='flex flex-1 border-b border-r p-2'>
										<h1 className='font-semibold text-xl mr-5 pl-8'>
											{key + 1 + '. '}
										</h1>
										<h1 className='font-semibold text-lg mr-3'>{pair.pair}</h1>
									</div>
									<div className='flex flex-1 border-b border-r pl-3 pt-2 pb-2'>
										<h1 className='font-medium text-xl mr-3'>{pair.type}</h1>
									</div>
									<div
										className='flex flex-1 flex-col'
										onClick={() =>
											navigate(`/educations/pairItem:${pair.id}`, {
												state: pair
											})
										}>
										<div className='flex flex-1 border-b p-2 flex-row'>
											{pair.type === 'Экзамен' && (
												<h1 className='font-medium text-xl mr-3'>{pair.res}</h1>
											)}
											{pair.type === 'Зачет' && (
												<h1 className='font-medium text-xl mr-3'>
													{pair.resZach}
												</h1>
											)}
											<img
												src={arrowSmall}
												alt=''
												className='ml-1 cursor-pointer'
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
