import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import SubsManager from './pages/SubsManager';
function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/faq' element={<FAQ />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/subsmanager' element={<SubsManager />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
