
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appWritefiles/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    try {
      const existingUser = await authService.getPresentUser();
      if (existingUser) {
        dispatch(authLogin(existingUser));  // Update Redux store
        navigate("/");  // Redirect if already logged in
      }
    } catch (err) {
      console.error("No active session:", err);
    }
  };

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const existingUser = await authService.getPresentUser();
      if (existingUser) {
        setError("You are already logged in!");
        setLoading(false);
        return;
      }

      // Proceed with login
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getPresentUser();
        dispatch(authLogin(userData)); 
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-4 text-center" aria-live="polite">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email format",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


