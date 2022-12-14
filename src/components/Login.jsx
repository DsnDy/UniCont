import React, { useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const { setUser, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [key, setKey] = useState('');
	const [isRegister, setIsRegister] = useState(false);

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user);
				alert('good');
				console.log(userCredential.user);
			})
			.catch(error => {
				console.log(error);
				alert(error);
			});
	};

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user);
				alert('Вы успешно вошли в аккаунт');
			})
			.catch(error => {
				console.log(error);
				alert(error);
			});
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
		<div className='flex w-screen min-h-screen justify-center'>
			<div className='m-auto bg-[#0866D1] p-4 rounded-2xl text-center'>
				<div className='flex flex-row'>
					<h1
						className='mb-4 mr-5 text-white text-3xl font-medium'
						onClick={() => setIsRegister(false)}>
						Регистрация
					</h1>
					<h1
						className='mb-4 text-white text-3xl font-medium'
						onClick={() => setIsRegister(true)}>
						Вход
					</h1>
				</div>
				<div className='flex flex-col text-left'>
					<h3 className='font-medium text-white mb-2 text-lg'>Почта</h3>
					<input
						type='text'
						placeholder='Введите почту'
						value={email}
						onChange={handleChangeEmail}
						className='mb-3 rounded-full p-2 text-gray-400'
					/>
					<h3 className='font-medium text-white mb-2 text-lg'>Пароль</h3>
					<input
						type='text'
						placeholder='Введите пароль'
						value={password}
						onChange={handleChangePassword}
						className='mb-3 rounded-full p-2 text-gray-400'
					/>
					<h3 className='font-medium text-white mb-2 text-lg'>Ключ</h3>
					<input
						type='text'
						placeholder='#'
						value={key}
						onChange={handleChangeKey}
						className='mb-4 rounded-full p-2 text-gray-400'
					/>
					{isRegister && (
						<button
							className='bg-white rounded-2xl p-2 text-black text-xl font-semibold'
							onClick={signIn}>
							Войти
						</button>
					)}
					{!isRegister && (
						<button
							className='bg-white rounded-2xl p-2 text-black text-xl font-semibold'
							onClick={signUp}>
							Зарегистрироваться
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
