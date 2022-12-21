import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AppContext from '../context';
import { AuthProvider } from '../hooks/useAuth';

const MainLayout = () => {
	const [search, setSearch] = useState('');
	const [showInfo, setShowInfo] = useState(false);
	const [students, setStudents] = useState([]);

	return (
		<AuthProvider>
			<AppContext.Provider
				value={{
					search,
					setSearch,
					showInfo,
					setShowInfo,
					students,
					setStudents
				}}>
				<div className='flex flex-row bg-[#F6FAFF] rounded-3xl w-full'>
					<Outlet />
				</div>
			</AppContext.Provider>
		</AuthProvider>
	);
};

export default MainLayout;
