
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import authService from "../appWritefiles/auth";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  // Use useCallback to avoid unnecessary re-creation of function
  const checkAuthStatus = useCallback(async () => {
    if (authStatus === "loggedOut" && authentication) {
      return navigate("/login"); // Immediate redirect for logged-out users
    }

    try {
      const user = await authService.getPresentUser();
      if (authentication && !user) {
        navigate("/login");
      } else if (!authentication && user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate("/login");
    }
  }, [authStatus, authentication, navigate]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="w-8 h-8 animate-spin text-gray-500" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="126" />
        </svg>
        <span className="ml-2 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  return <>{children}</>;
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};
