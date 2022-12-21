import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/LoginPage';
import Students from './pages/StudentsPage';
import Staff from './pages/StaffPage';
import Faq from './pages/FaqPage';
import NavBar from './components/Navbar/NavBar';
import useAuth from './hooks/useAuth';
import StudentItemPage from './pages/StudentItemPage';
import PairItem from './pages/PairItemPage';
import EducItemPage from './pages/EducItemPage';

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
					path=':studentId'
					element={
						<>
							<NavBar />
							<StudentItemPage />
						</>
					}
				/>
				<Route
					path='pairs/:pairItem'
					element={
						<>
							<NavBar />
							<PairItem />
						</>
					}
				/>
				<Route
					path='educations/:pairItem'
					element={
						<>
							<NavBar />
							<EducItemPage />
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
			</Route>
		</Routes>
	);
}

export default App;
