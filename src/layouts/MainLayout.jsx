import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AppContext from '../context';
import { AuthProvider } from '../hooks/useAuth';
import styles from '../styles.scss';

const MainLayout = () => {
	const [search, setSearch] = useState('');
	const [showInfo, setShowInfo] = useState(false);

	return (
		<AuthProvider>
			<AppContext.Provider
				value={{
					search,
					setSearch,
					showInfo,
					setShowInfo
				}}>
				<div className='flex flex-row bg-[#F6FAFF] rounded-3xl w-[80%]'>
					<Outlet />
				</div>
			</AppContext.Provider>
		</AuthProvider>
	);
};

export default MainLayout;
