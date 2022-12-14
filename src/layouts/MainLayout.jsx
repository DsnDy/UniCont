import { Outlet, useNavigate } from 'react-router-dom';

import AppContext from '../context';
import NavBar from '../components/NavBar';
import useAuth, { AuthProvider } from '../hooks/useAuth';
import { useEffect } from 'react';

const MainLayout = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (user) {
			navigate('/home');
		}
	}, [user]);

	return (
		<AuthProvider>
			<AppContext.Provider value={{}}>
				{user && <NavBar />}
				<div className='content'>
					<Outlet />
				</div>
			</AppContext.Provider>
		</AuthProvider>
	);
};

export default MainLayout;
