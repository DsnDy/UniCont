import { useContext, useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	query,
	doc,
	updateDoc,
	setDoc,
	where,
	getDoc
} from 'firebase/firestore';

import { fs } from '../../firebase';
import styles from './Students.module.scss';
import galka from '../../assets/galka.svg';
import krest from '../../assets/krest.svg';
import arrowSmall from '../../assets/arrowSmall.svg';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context';

function Main() {
	const [pairs, setPairs] = useState([]);
	const { students, setStudents } = useContext(AppContext);

	const [checkBox, setCheckBox] = useState();

	const navigate = useNavigate();

	const checkBoxRef = doc(fs, 'students', 'bNbHKUHXIZgzT1SeHNik');

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
	}, []);
	return (
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
							<h1 className='font-semibold text-2xl mr-3'>
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
						<h1 className='font-semibold text-2xl mr-3'>
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
						<h1 className='font-semibold text-2xl mr-3'>
							Березин Виталий Алескеевич
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
	);
}

export default Main;
