import { useContext, useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	query,
	doc,
	updateDoc,
	getDoc
} from 'firebase/firestore';

import { fs } from '../../firebase';
import styles from './Students.module.scss';
import galka from '../../assets/galka.svg';
import krest from '../../assets/krest.svg';
import arrowSmall from '../../assets/arrowSmall.svg';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context';
import Search from '../Home/Search';
import push from '../../assets/push.svg';
import prof from '../../assets/prof.svg';

function Main() {
	const [pairs, setPairs] = useState([]);
	const { students, setStudents } = useContext(AppContext);

	const [checkBox, setCheckBox] = useState();

	const navigate = useNavigate();

	const checkBoxRef = doc(fs, 'students', 'bNbHKUHXIZgzT1SeHNik');

	const getSession = async () => {
		const studentSession = await getDoc(checkBoxRef);
		setCheckBox(studentSession.data().session);
	};

	const handleChangeCheckBox = async () => {
		setCheckBox(!checkBox);
		if (checkBox) {
			await updateDoc(checkBoxRef, {
				session: false
			})
				.then(() => {
					console.log('false update');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (!checkBox) {
			await updateDoc(checkBoxRef, {
				session: true
			})
				.then(() => {
					console.log('true update');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const fetchData = async () => {
		const q = query(collection(fs, 'students'));

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setStudents(newData);
		});
	};

	const fetchPairs = async () => {
		const q = query(collection(fs, 'pairs'));
		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setPairs(newData);
		});
	};

	useEffect(() => {
		fetchData();
		fetchPairs();
		getSession();
	}, []);
	return (
		<div className='flex flex-row pb-14'>
			<div className='flex-[3]'>
				<div className='flex justify-end mb-[10px]'>
					<button className='cursor-pointer pt-1 pb-1 pl-6 pr-6 bg-[#0866D1] rounded-full'>
						<h1 className='text-white font-semibold text-base'>Фильтр</h1>
					</button>
				</div>
				<div className={styles.main}>
					<div className='flex flex-row bg-[#0866D1] p-5 rounded-t-[20px] items-center'>
						<h3 className='font-semibold text-white flex-[3] text-center'>
							Студент
						</h3>
						<h3 className='font-semibold text-white flex-[2] text-center'></h3>
						<h3 className='font-semibold text-white flex-1'>Допуск к сессии</h3>
					</div>
					<div className={styles.content}>
						{students.map((student, key) => (
							<div className={styles.cartStudent} key={key}>
								<div className='flex-[4] flex flex-row items-center'>
									<h1 className='font-semibold text-lg mr-3'>
										{student.FullName}
									</h1>
									<img
										onClick={() =>
											navigate(`/studentId:${student.id}`, {
												state: { student, pairs }
											})
										}
										src={arrowSmall}
										alt=''
										className='w-[25px] h-[25px] cursor-pointer'
									/>
								</div>
								<img
									className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
									alt=''
									src={checkBox ? galka : krest}
									onClick={handleChangeCheckBox}
								/>
							</div>
						))}
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Алиев Павел Игоревич
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={krest}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Березин Виталий Алекскеевич
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={galka}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Губанов Данил Михайлович
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={galka}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Иванова Светлана Ивановна
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={krest}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Киреев Кирилл Вадимович
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={krest}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Непомнящих Ян Геннадьевич
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={galka}
							/>
						</div>
						<div className={styles.cartStudent}>
							<div className='flex-[4] flex flex-row items-center'>
								<h1 className='font-semibold text-lg mr-3'>
									Романова Полина Сергеевна
								</h1>
								<img
									src={arrowSmall}
									alt=''
									className='w-[25px] h-[25px] cursor-pointer'
								/>
							</div>
							<img
								className='flex-1 items-center w-[40px] h-[40px] cursor-pointer'
								alt=''
								src={krest}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-1 flex-col items-center justify-start pl-[5%]'>
				<div className='flex justify-between w-full items-center mb-8'>
					<Search />
					<img className='cursor-pointer' src={push} alt='' />
					<img className='cursor-pointer' src={prof} alt='' />
				</div>
				<div className={styles.contentRight}>
					<div className='flex justify-between items-center mb-[30px]'>
						<h2 className='font-medium text-2xl'>Расписание</h2>
						<h3 className='font-medium text-base'>23.12.2022</h3>
					</div>
					<div className='flex flex-col items-center w-full'>
						<div className='flex justify-between w-full bg-[#F6FAFF] rounded-xl p-3 mb-4'>
							<span className='font-medium text-lg'>8:30 - 10:00</span>
							<span className='font-medium text-lg'>БИ.1-19-2</span>
							<span className='font-medium text-lg'>Д-512</span>
						</div>
						<div className='flex justify-between w-full bg-[#F6FAFF] rounded-xl p-3 mb-4'>
							<span className='font-medium text-lg'>10:10 - 11:40</span>
							<span className='font-medium text-lg'>ИС.1.20-1</span>
							<span className='font-medium text-lg'>В-203</span>
						</div>
						<div className='flex justify-between w-full bg-[#F6FAFF] rounded-xl p-3 mb-4'>
							<span className='font-medium text-lg'>12:10 - 13:40 </span>
							<span className='font-medium text-lg'>ПИ.1-22-2</span>
							<span className='font-medium text-lg'>Д-512</span>
						</div>
						<div className='flex justify-between w-full bg-[#F6FAFF] rounded-xl p-3 mb-4'>
							<span className='font-medium text-lg'>15:20 - 17:00</span>
							<span className='font-medium text-lg'>ТСЖ.2-19-1</span>
							<span className='font-medium text-lg'>А-422</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
