import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRedux, logoutRedux } from '../redux/userSlice';
import {jwtDecode} from 'jwt-decode';


const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp < currentTime) {
                        // Token expired
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        dispatch(logoutRedux());
                    } else {
                        // Token is valid
                        const user = JSON.parse(localStorage.getItem('user'));
                        dispatch(loginRedux({data:user}));
                    }
                } catch (err) {
                    console.error('Error decoding token', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch(logoutRedux());
                    navigate('/login');
                }
            }
        };

        checkAuth();

        const interval = setInterval(checkAuth, 15 * 60 * 1000);

        return () => clearInterval(interval);
    
    }, [dispatch, navigate]);
};

export default useAuth;
