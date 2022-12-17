import React, { useState, useEffect } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

import { auth, fs } from '../firebase';
import useAuth from '../hooks/useAuth';

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
	const [isRegister, setIsRegister] = useState(false);

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password).then(
				userCredential => {
					setUser(userCredential.user);
					userCredential.user.displayName = userName;
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
		<div className='flex flex-1 justify-center bg-[#0866D1]'>
			<div className='m-auto p-4 rounded-2xl text-center bg-white'>
				<div className='flex flex-row mb-5'>
					<button
						className='p-3 mr-5 bg-black text-white text-3xl font-medium rounded-2xl hover:bg-[#0866D1] hover:text-white'
						onClick={() => setIsRegister(false)}>
						Регистрация
					</button>
					<button
						className='p-3 mr-5 bg-black text-white text-3xl font-medium rounded-2xl hover:bg-[#0866D1] hover:text-white'
						onClick={() => setIsRegister(true)}>
						Вход
					</button>
				</div>
				<div className='flex flex-col text-left'>
					{isRegister && (
						<>
							<h3 className='font-medium text-black mb-2 text-lg'>Почта</h3>
							<input
								type='email'
								placeholder='Введите почту'
								value={email}
								onChange={handleChangeEmail}
								className='mb-3 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Пароль</h3>
							<input
								type='password'
								placeholder='Введите пароль'
								value={password}
								onChange={handleChangePassword}
								className='mb-3 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<button
								className='bg-black rounded-2xl p-3 text-white text-xl font-semibold cursor-pointer hover:bg-[#0866D1] hover:text-white'
								onClick={signIn}>
								Войти
							</button>
						</>
					)}
					{!isRegister && (
						<>
							<h3 className='font-medium text-black mb-2 text-lg'>Почта</h3>
							<input
								type='email'
								placeholder='Введите почту'
								value={email}
								onChange={handleChangeEmail}
								className='mb-3 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Ф.И.О.</h3>
							<input
								type='text'
								placeholder='Введите ваше ФИО'
								value={userName}
								onChange={e => setUserName(e.target.value)}
								className='mb-3 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Пароль</h3>
							<input
								type='password'
								placeholder='Введите пароль'
								value={password}
								onChange={handleChangePassword}
								className='mb-3 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<h3 className='font-medium text-black mb-2 text-lg'>Ключ</h3>
							<input
								type='text'
								placeholder='#'
								value={key}
								onChange={handleChangeKey}
								className='mb-4 rounded-full p-2 text-gray-400 outline-none border-b-[1px] border-b-black'
							/>
							<button
								className='bg-black rounded-2xl p-3 text-white text-xl font-semibold cursor-pointer hover:bg-[#0866D1] hover:text-white'
								onClick={signUp}>
								Зарегистрироваться
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
