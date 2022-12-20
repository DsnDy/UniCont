import React from 'react';
import { useLocation } from 'react-router-dom';
import Main from '../components/StudentItem/Main';

const StudentPage = () => {
	const location = useLocation();
	const student = location.state.student;
	const pairs = location.state.pairs;

	return (
		<div className='mt-[50px] w-full mr-20'>
			<div className='mb-[50px]'>
				<h1 className='font-semibold text-black text-2xl'>
					{student.FullName}
				</h1>
				<h3 className='text-gray-500 font-medium'>
					{student.group +
						', ' +
						student.course +
						', ' +
						student.education +
						', ' +
						student.typeEducation +
						', ' +
						student.educationMoney +
						', ' +
						student.educationDate}
				</h3>
			</div>
			<Main student={student} pairs={pairs} />
		</div>
	);
};

export default StudentPage;
