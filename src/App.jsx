import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/LoginPage';
import Students from './pages/StudentsPage';
import Staff from './pages/StaffPage';
import Faq from './pages/FaqPage';
import UserInfo from './pages/UserInfo';
import NavBar from './components/Navbar/NavBar';
import useAuth from './hooks/useAuth';

function App() {
	const user = useAuth();

	const ProtectedRoute = ({ children }) => {
		if (!user) {
			return <Navigate to='/login' />;
		}
		return children;
	};

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route
					index
					element={
						<ProtectedRoute>
							<NavBar />
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path='login' element={<Login />} />
				<Route
					path='students'
					element={
						<>
							<NavBar />
							<Students />
						</>
					}
				/>
				<Route
					path='staff'
					element={
						<>
							<NavBar />
							<Staff />
						</>
					}
				/>
				<Route
					path='faq'
					element={
						<>
							<NavBar />
							<Faq />
						</>
					}
				/>
				<Route
					path='userInfo'
					element={
						<>
							<NavBar />
							<UserInfo />
						</>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
