import { Routes, Route, useNavigation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';

function App() {
	const { user } = useAuth();
	console.log(user);

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='home' element={<HomePage />} />
			</Route>
		</Routes>
	);
}

export default App;
