
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import authService from '../../appWritefiles/auth.js';
import { logout } from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogoutBtn({ className = '' }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logoutHandler = async () => {
        if (loading) return;

        // Confirm before logging out
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        setLoading(true);
        setError(null);

        try {
            await authService.logout();
            dispatch(logout());
            navigate('/login'); // Redirect after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                className={`inline-flex items-center px-6 py-2 text-sm font-medium transition-colors rounded-full ${className} ${
                    loading 
                        ? 'bg-red-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                onClick={logoutHandler}
                disabled={loading}
                aria-live="polite"
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" strokeDasharray="31.4 31.4" />
                        </svg>
                        Logging Out...
                    </>
                ) : (
                    "Logout"
                )}
            </button>
            
            {error && (
                <div className="absolute top-full mt-2 text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
}

LogoutBtn.propTypes = {
    className: PropTypes.string
};

export default LogoutBtn;
