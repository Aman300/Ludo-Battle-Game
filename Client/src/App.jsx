
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Login from "./views/auth/Login";
import Home from "./views/home/Home";
import Sidebar from "./components/Sidebar";
import Wallet from './views/home/Wallet';
import ReferEarn from './views/home/ReferEarn';
import Profile from './views/home/Profile';
import Support from './views/home/Support';
import TermLegal from './views/home/TermLegal';
import Games from './views/home/Games';
import PrivateRoutes from './utils/PrivateRoutes';

export default function App() {
  return (
    <>
    
    <BrowserRouter>
        <Routes>
          
          <Route path='/login' element={<Login />} />
          {/* <Route path='/signup' element={<Signup />} /> */}

          <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <div>
                <Sidebar />
                <div className='xl:ml-[300px]'>
                  <Outlet /> 
                </div>
                {/* <Footer/> */}
              </div>
            }
          >
            <Route path="/" element={<Home />} />            
            <Route path="/games" element={<Games />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/refer&earn" element={<ReferEarn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/term&legal" element={<TermLegal />} />
            
          </Route>
        </Route>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}