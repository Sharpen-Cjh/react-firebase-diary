
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

function App() {

  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
    {isAuthReady ? (
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={user ? <Home /> :<Navigate replace={true}
          to='/Login'/>}></Route>
        <Route path='/Login' element={!user ? <Login /> : <Navigate replace={true}
          to='/'/>}></Route>
        <Route path='/SignUp' element={!user ? <SignUp /> :<Navigate replace={true}
        to='/'/>}></Route>
      </Routes>
    </BrowserRouter>
    ):'loading...'}
    </div>
  );
}

export default App;
