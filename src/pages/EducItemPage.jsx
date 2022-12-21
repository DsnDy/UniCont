import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fs } from '../firebase';

const EducItemPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const pair = location.state;

	const [nan, setNan] = useState('-');
	const [one, setOne] = useState('1');
	const [two, setTwo] = useState('2');
	const [three, setThree] = useState('3');
	const [four, setFour] = useState('4');
	const [five, setFive] = useState('5');
	const [resZach, setResZach] = useState('Зачет');
	const [resNoneZach, setResNoneZach] = useState('Не зачет');
	const [resNanZach, setResNanZach] = useState('-');

	const [ekz, setEkz] = useState('Экзамен');
	const [zach, setZach] = useState('Зачет');

	const handleChangeEducation = async (nan, one, two, three, four, five) => {
		const btnRef = doc(fs, 'pairs', pair.id);
		if (nan) {
			await updateDoc(btnRef, {
				res: nan
			})
				.then(() => {
					console.log('nan update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (one) {
			await updateDoc(btnRef, {
				res: one
			})
				.then(() => {
					console.log('one update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (two) {
			await updateDoc(btnRef, {
				res: two
			})
				.then(() => {
					console.log('two update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (three) {
			await updateDoc(btnRef, {
				res: three
			})
				.then(() => {
					console.log('three update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (four) {
			await updateDoc(btnRef, {
				res: four
			})
				.then(() => {
					console.log('four update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (five) {
			await updateDoc(btnRef, {
				res: five
			})
				.then(() => {
					console.log('five update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const handleChangeZach = async (resZach, resNoneZach, resNanZach) => {
		const btnRef = doc(fs, 'pairs', pair.id);
		if (resZach) {
			await updateDoc(btnRef, {
				resZach: resZach
			})
				.then(() => {
					console.log('Зачет update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (resNoneZach) {
			await updateDoc(btnRef, {
				resZach: resNoneZach
			})
				.then(() => {
					console.log('Не зачет update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (resNanZach) {
			await updateDoc(btnRef, {
				resZach: resNanZach
			})
				.then(() => {
					console.log('- update');
					alert('Успешно');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const handleChangeType = async (ekz, zach) => {
		const btnRef = doc(fs, 'pairs', pair.id);
		if (ekz) {
			await updateDoc(btnRef, {
				type: ekz
			})
				.then(() => {
					console.log('ekz update');
					alert(
						'Успешно! Если вы сменили тип дисциплины, нажмите кнопку закрыть, чтобы поставить оценку'
					);
				})
				.catch(error => {
					console.log(error);
				});
		}
		if (zach) {
			await updateDoc(btnRef, {
				type: zach
			})
				.then(() => {
					console.log('zach update');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	return (
		<div className='flex flex-col mt-10 w-full'>
			<h2 className='font-semibold text-3xl text-black mb-5'>{pair.pair}</h2>
			{pair.type === 'Экзамен' && (
				<div className='flex mb-10 flex-row items-center'>
					<div className='flex items-center'>
						<h2 className='font-semibold text-xl text-black mr-5'>
							Поставьте оценку
						</h2>
						<div
							onClick={() => {
								setOne('-');
								handleChangeEducation(nan);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>-</span>
						</div>
						<div
							onClick={() => {
								setOne('1');
								handleChangeEducation(one);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>1</span>
						</div>
						<div
							onClick={() => {
								setOne('2');
								handleChangeEducation(two);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>2</span>
						</div>
						<div
							onClick={() => {
								setOne('3');
								handleChangeEducation(three);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>3</span>
						</div>
						<div
							onClick={() => {
								setOne('4');
								handleChangeEducation(four);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>4</span>
						</div>
						<div
							onClick={() => {
								setOne('5');
								handleChangeEducation(five);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>5</span>
						</div>
					</div>
				</div>
			)}
			{pair.type === 'Зачет' && (
				<div className='flex mb-10 flex-row items-center'>
					<div className='flex items-center'>
						<h2 className='font-semibold text-xl text-black mr-5'>
							Поставьте результат
						</h2>
						<div
							onClick={() => {
								setResZach('Зачет');
								handleChangeZach(resZach);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-[#4AA09E] rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>Зачет</span>
						</div>
						<div
							onClick={() => {
								setResNoneZach('Не зачет');
								handleChangeZach(resNoneZach);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-rose-500 rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>
								Не зачет
							</span>
						</div>
						<div
							onClick={() => {
								setResNanZach('-');
								handleChangeZach(resNanZach);
							}}
							className='pt-2 pb-2 pl-5 pr-5 bg-gray-500 rounded-2xl mr-5 text-center cursor-pointer'>
							<span className='text-white font-semibold text-3xxl'>-</span>
						</div>
					</div>
				</div>
			)}
			<div className='flex mb-10 flex-row items-center'>
				<div className='flex items-center'>
					<h2 className='font-semibold text-xl text-black mr-5'>
						Выберите тип
					</h2>
					<div
						onClick={() => {
							setEkz('Экзамен');
							handleChangeType(ekz);
						}}
						className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
						<span className='text-white font-semibold text-3xxl'>Экзамен</span>
					</div>
					<div
						onClick={() => {
							setZach('Зачет');
							handleChangeType(zach);
						}}
						className='pt-2 pb-2 pl-5 pr-5 bg-[#0866D1] rounded-2xl mr-5 text-center cursor-pointer'>
						<span className='text-white font-semibold text-3xxl'>Зачет</span>
					</div>
				</div>
			</div>
			<div className='flex'>
				<button
					onClick={() => navigate(-1)}
					className='pt-2 pb-2 pl-5 pr-5 bg-slate-500 rounded-2xl'>
					<h2 className='font-semibold text-lg text-white'>Закрыть</h2>
				</button>
			</div>
		</div>
	);
};

export default EducItemPage;
