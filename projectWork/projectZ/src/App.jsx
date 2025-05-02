
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appWritefiles/auth.js';
import { login, logout } from './store/authSlice.js';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const userData = await authService.getPresentUser();
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkUserStatus();
    }, [dispatch]);

    return loading ? (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">Loading...</span>
        </div>
    ) : (
        <div className='min-h-screen flex flex-col bg-slate-600'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;



