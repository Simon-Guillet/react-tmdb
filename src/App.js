import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Page/Home/Home';
import Login from './Page/Login/LoginPage';
import './App.css';

export function RequireAuth({ children }) {
    // Used to ensure the refreshToken is called once at a time
    // TODO Get user from local storage
    const user = localStorage.getItem('user');

    if (user === null) {
        window.location.href = '/login';
        return null;
    } else {
        return children;
    }
}

function App() {

//Navigation dans requireAuth
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
