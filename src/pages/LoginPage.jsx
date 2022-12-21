import React, { useState, useEffect } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

import { auth, fs } from '../firebase';
import useAuth from '../hooks/useAuth';
import styles from './LoginPage.module.scss';

const Login = () => {
	const { setUser, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [key, setKey] = useState('');
	const [isRegister, setIsRegister] = useState(true);

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password).then(
				userCredential => {
					setUser(userCredential.user);
					alert('Вы успешно зарегистрировались');
					setDoc(doc(fs, 'users', userCredential.user.uid), {
						uid: userCredential.user.uid,
						userName,
						email
					});
					navigate('/');
				}
			);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password).then(
				userCredential => {
					setUser(userCredential.user);
					alert('Вы успешно вошли в аккаунт');
					navigate('/');
				}
			);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const handleChangeEmail = e => {
		setEmail(e.target.value);
	};
	const handleChangePassword = e => {
		setPassword(e.target.value);
	};
	const handleChangeKey = e => {
		setKey(e.target.value);
	};
	return (
		<div className='flex flex-1 justify-center bg-[#044DA0]'>
			<div className='m-auto p-10 w-[25%] rounded-2xl text-center bg-[#FFFFFF]'>
				<div className='mb-5'>
					{!isRegister && (
						<h2
							className='text-black text-xl font-medium text-center'
							onClick={() => setIsRegister(false)}>
							Регистрация
						</h2>
					)}
					{isRegister && (
						<h2
							className='text-black font-medium text-xl text-center'
							onClick={() => setIsRegister(true)}>
							Добро пожаловать!
						</h2>
					)}
				</div>
				<div className='flex flex-col text-left'>
					{isRegister && (
						<div className='flex justify-center flex-col text-left'>
							<h3 className='font-medium text-black mb-2 text-lg'>E-mail</h3>
							<input
								type='email'
								placeholder='Введите почту'
								value={email}
								onChange={handleChangeEmail}
								className={styles.input}
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Пароль</h3>
							<input
								type='password'
								placeholder='Введите пароль'
								value={password}
								onChange={handleChangePassword}
								className={styles.input}
							/>
							<button
								className='bg-[#044DA0] rounded-2xl p-3 text-white text-2xl font-semibold cursor-pointer hover:bg-[#0866D1] hover:text-white'
								onClick={signIn}>
								Войти
							</button>
						</div>
					)}
					{!isRegister && (
						<>
							<h3 className='font-medium text-black mb-2 text-lg'>E-mail</h3>
							<input
								type='email'
								placeholder='Введите почту'
								value={email}
								onChange={handleChangeEmail}
								className={styles.input}
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Ф.И.О.</h3>
							<input
								type='text'
								placeholder='Введите ваше ФИО'
								value={userName}
								onChange={e => setUserName(e.target.value)}
								className={styles.input}
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Пароль</h3>
							<input
								type='password'
								placeholder='Введите пароль'
								value={password}
								onChange={handleChangePassword}
								className={styles.input}
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Ключ</h3>
							<input
								type='text'
								placeholder='#'
								value={key}
								onChange={handleChangeKey}
								className={styles.input}
							/>
							<button
								className='bg-[#044DA0] rounded-2xl p-3 text-white text-2xl font-semibold cursor-pointer hover:bg-[#0866D1] hover:text-white'
								onClick={signUp}>
								Зарегистрироваться
							</button>
						</>
					)}
					<div className='flex justify-between mt-5'>
						<h2 className='text-[#044DA0] font-medium text-lg border-b-[1px] border-b-[#044DA0] cursor-pointer'>
							Забыли пароль?
						</h2>
						<h2
							className='text-[#044DA0] font-medium text-lg border-b-[1px] border-b-[#044DA0] cursor-pointer'
							onClick={() => setIsRegister(!isRegister)}>
							{isRegister ? 'Нет аккаунта?' : 'Есть аккаунт?'}
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
