import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FAQ from './pages/FAQ';
function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/faq' element={<FAQ />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
