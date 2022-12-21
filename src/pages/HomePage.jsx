import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function HomePage() {
	const user = auth.currentUser;
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, []);
	return (
		<div className='pt-12 pr-12 w-full'>
			<h1 className='font-medium text-2xl'>
				Добро пожаловать в систему ЮниКонт!
				<br /> Воспользуйтесь навигационным баром для взаимодействия с системой.
				<br />В разделе «Студенты» представлен список всех студентов учебного
				заведения.
				<br /> В разделе «Сотрудники» Вы найдете всю необходимую информацию для
				связи с коллегами.
				<br /> Для смены аккаунта выйдите из системы.
			</h1>
		</div>
	);
}

export default HomePage;
