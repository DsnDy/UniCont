import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import exit from '../../assets/exit.svg';
import exitWhite from '../../assets/exitWhite.svg';
import home from '../../assets/home.svg';
import homeWhite from '../../assets/homeWhite.svg';
import students from '../../assets/students.svg';
import studentsWhite from '../../assets/studentsWhite.svg';
import staff from '../../assets/staff.svg';
import staffWhite from '../../assets/staffWhite.svg';
import faq from '../../assets/faq.svg';
import faqWhite from '../../assets/faqWhite.svg';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	return (
		<div className={styles.main}>
			<div className='w-full flex flex-col h-full items-center'>
				<Link to={'/'}>
					<img src={logo} alt='logo' />
				</Link>
				<div className='mt-[30px] flex flex-col justify-center items-center'>
					<Link to={'/'} className='w-full'>
						<button className='bg-[#EEEFEF] pt-3 pb-3 pl-4 pr-4 rounded-xl w-full mb-6'>
							<div className='flex flex-row items-center'>
								<img src={home} className='mr-4' alt='выход' />
								<h1 className='font-medium text-lg text-[#707070]'>Главная</h1>
							</div>
						</button>
					</Link>
					<Link to={'/students'}>
						<button className='bg-[#EEEFEF] pt-3 pb-3 pl-4 pr-4 rounded-xl w-full mb-6'>
							<div className='flex flex-row items-center mr-4 w-full'>
								<img src={students} className='mr-4' alt='выход' />
								<h1 className='font-medium text-lg text-[#707070]'>Студенты</h1>
							</div>
						</button>
					</Link>
					<Link to={'/staff'}>
						<button className='bg-[#EEEFEF] pt-3 pb-3 pl-4 pr-4 rounded-xl w-full mb-6'>
							<div className='flex flex-row items-center mr-4 w-full'>
								<img src={staff} className='mr-4' alt='выход' />
								<h1 className='font-medium text-lg text-[#707070]'>
									Сотрудники
								</h1>
							</div>
						</button>
					</Link>
					<Link to={'/faq'}>
						<button className='bg-[#EEEFEF] pt-3 pb-3 pl-4 pr-4 rounded-xl w-full mb-6'>
							<div className='flex flex-row items-center mr-6 w-full'>
								<img src={faq} className='mr-4' alt='выход' />
								<h1 className='font-medium text-lg text-[#707070]'>
									Справочная
								</h1>
							</div>
						</button>
					</Link>
					<button
						className='bg-[#EEEFEF] pt-3 pb-3 pl-4 pr-4 rounded-xl w-full mb-6'
						onClick={() => {
							signOut()
								.then(() => {
									navigate('/login');
									alert('Вы успешно вышли из аккаунта');
								})
								.catch(error => {
									alert(error);
								});
						}}>
						<div className='flex flex-row items-center mr-6 w-full'>
							<img src={exit} className='mr-4' alt='выход' />
							<h1 className='font-medium text-lg text-[#707070]'>Выход</h1>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
