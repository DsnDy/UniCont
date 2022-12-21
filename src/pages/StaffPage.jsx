import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth, fs } from '../firebase';
import styles from '../components/StudentItem/StudentItem.module.scss';

function Staff() {
	const [prepods, setPrepods] = useState([]);
	const user = auth.currentUser;

	const fetchPrepods = async () => {
		const q = query(collection(fs, 'users'));

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setPrepods(newData.filter(prepod => prepod.email !== user.email));
		});
	};

	console.log(prepods);

	useEffect(() => {
		fetchPrepods();
	}, []);
	return (
		<div className='pt-12 pr-12 w-full'>
			<div className='flex flex-col'>
				<div className='mb-10'>
					<h1 className='font-semibold text-2xl'>Сотрудники</h1>
					<div className='mt-[30px] flex flex-col rounded-[20px] w-[60%]'>
						<div className='flex flex-row bg-[#0866D1] p-2 rounded-t-[20px] items-center'>
							<h3 className='font-semibold text-white flex-[2] text-center'>
								Сотрудник
							</h3>
							<h3 className='font-semibold text-white flex-[2] text-center'>
								E-mail
							</h3>
						</div>
						<div className={styles.content}>
							{prepods.map((prepod, key) => (
								<div key={key} className='flex flex-col'>
									<div className='flex flex-row'>
										<div className='flex flex-1 border-b border-r p-2'>
											<h1 className='font-semibold text-xl mr-5 pl-8'>
												{key + 1 + '. '}
											</h1>
											<h1 className='font-semibold text-lg mr-3'>
												{prepod.userName}
											</h1>
										</div>
										<div className='flex flex-1 border-b border-r pl-3 pt-2 pb-2'>
											<h1 className='font-medium text-xl mr-3'>
												{prepod.email}
											</h1>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Staff;
