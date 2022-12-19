import React, { useEffect, useRef, useState } from 'react';

import styles from './StudentItem.module.scss';
import arrowSmall from '../../assets/arrowSmall.svg';
import arrowSmallUp from '../../assets/arrowSmallUp.svg';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc
} from 'firebase/firestore';
import { fs } from '../../firebase';

function Main({ student, pairs }) {
	const [isRes, setIsRes] = useState(false);
	const [isEduc, setIsEduc] = useState(false);
	const [pair, setPair] = useState();

	const [green, setGreen] = useState(false);
	const [rose, setRose] = useState(false);

	const [edu, setEdu] = useState('');

	const handleChangeEduc = educ => {
		setIsEduc(true);
		setEdu(educ);
	};

	const handleChangeEducation = async pair => {
		const btnRef = doc(fs, 'pairs', pair.id);
		if (rose) {
			await updateDoc(btnRef, {
				educ: 'В процессе'
			})
				.then(() => {
					console.log('rose update');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (green) {
			await updateDoc(btnRef, {
				educ: 'Изученно'
			})
				.then(() => {
					console.log('green update');
				})
				.catch(error => {
					console.log(error);
				});
		}
		console.log(pair.id);
	};

	return (
		<div className='flex flex-col'>
			{isEduc && (
				<div className='flex flex-col justify-center items-center'>
					<div className='flex mb-10'>
						<button
							className='p-4 bg-rose-400 rounded-2xl mr-10'
							onClick={() => {
								setRose(true);
								handleChangeEducation(pair);
							}}>
							<h2 className='font-semibold text-lg text-white'>В процессе</h2>
						</button>
						<button
							className='p-4 bg-green-500 rounded-2xl'
							onClick={() => {
								setGreen(true);
								handleChangeEducation(pair);
							}}>
							<h2 className='font-semibold text-lg text-white'>Изученно</h2>
						</button>
					</div>
					<button
						onClick={() => setIsEduc(false)}
						className='p-2 bg-slate-500 rounded-2xl'>
						<h2 className='font-semibold text-lg text-white'>Закрыть</h2>
					</button>
				</div>
			)}
			{!isEduc && (
				<>
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
								{pairs.map((pair, key) => (
									<div key={key} className='flex flex-col'>
										<div className='flex flex-row'>
											<div className='flex flex-1 border-b border-r p-2'>
												<h1 className='font-semibold text-xl mr-5 pl-8'>
													{key + 1 + '. '}
												</h1>
												<h1 className='font-semibold text-lg mr-3'>
													{pair.pair}
												</h1>
											</div>
											<div className='flex flex-1 border-b border-r pl-3 pt-2 pb-2'>
												<h1 className='font-medium text-xl mr-3'>
													{pair.hours}
												</h1>
											</div>
											<div
												className='flex flex-1 flex-col'
												onClick={() => {
													const educ = pair.educ;
													handleChangeEduc(educ);
													setPair(pair);
												}}>
												<div className='flex flex-1 border-b p-2 flex-row'>
													<h1 className='font-medium text-xl mr-3'>
														{pair.educ}
													</h1>
													<img
														src={isEduc ? arrowSmallUp : arrowSmall}
														alt=''
														className='ml-1'
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
								{pairs.map((pair, key) => (
									<div className='flex flex-col'>
										<div key={key} className='flex flex-row'>
											<div className='flex flex-1 border-b border-r p-2'>
												<h1 className='font-semibold text-xl mr-5 pl-8'>
													{key + 1 + '. '}
												</h1>
												<h1 className='font-semibold text-lg mr-3'>
													{pair.pair}
												</h1>
											</div>
											<div className='flex flex-1 border-b border-r pl-3 pt-2 pb-2'>
												<h1 className='font-medium text-xl mr-3'>
													{pair.type}
												</h1>
											</div>
											<div className='flex flex-1 flex-col'>
												<div className='flex flex-1 border-b p-2 flex-row'>
													<h1 className='font-medium text-xl mr-3'>
														{pair.res}
													</h1>
													<img
														src={isRes ? arrowSmallUp : arrowSmall}
														alt=''
														className='ml-1'
													/>
												</div>
												{isRes && (
													<div>
														<h1>123</h1>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Main;
