import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader, Lock, Mail, User } from 'lucide-react'
import AuthImagePattern from "../components/AuthImagePattern";
import logo from '../assets/live.png';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const  LoginPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });
  const {isLoggingIn,login}=useAuthStore();
  const validateForm = () => {
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!/\S+@+\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format ");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 charater.");
    }
    return true;
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success===true){
    login(formData);
    }
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8 -mt-10">
            <div className="flex flex-col items-center gap-2 group">
              {/* <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary"/>
              </div> */}

              <div className="  avatar">
                <div className="w-20 rounded-full">
                  <img alt="Logo" src={logo} />
                </div>
              </div>

              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="spa-y-6 ">
            {/* Full Name */}
            {/* <div className="form-control mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-5 pl-0 flex items-center pointer-events-none">
                  <User className="size-7 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered w-full pl-20 bg-transparent"}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div> */}
            {/* Email */}
            <div className="form-control mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-5 pl-0 flex items-center pointer-events-none">
                  <Mail className="size-7 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered w-full pl-20 bg-transparent"}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-5 pl-0 flex items-center pointer-events-none">
                  <Lock className="size-7 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={"input input-bordered w-full pl-20 bg-transparent"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-5 pr-0 flex items-center cursor-pointer "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-7 text-base-content/40" />
                  ) : (
                    <Eye className="size-7 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* Sign Up */}
          <div className="text-center -mt-5">
            <p className="text-base-content/50">
              Create an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthImagePattern
        title="Welcome Back"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  )
}

export default LoginPage
