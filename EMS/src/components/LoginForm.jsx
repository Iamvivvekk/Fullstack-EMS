import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

const LoginForm = ({ role, title, subTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(!isLoading);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />
      <div className="flex-1 flex justify-center items-center ">
        <div className="max-w-md w-full animate-fade-in">
          <Link to="/login" className="flex items-center group mb-6">
            <ArrowLeftIcon
              size={16}
              className=" text-slate-500 group-hover:text-slate-700 transition-colors duration-200"
            />
            <p className="text-slate-500 text-md ml-2 group-hover:text-slate-700 duration-200 transition-colors ">
              Back to portal
            </p>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-medium text-zinc-800">
            {title}
          </h2>
          <p className="text-sm sm:text-base mt-2  text-slate-500">
            {subTitle}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-light text-sm text-slate-400 mb-2">
                Email Address
              </label>
              <input
                className="pr-11"
                required
                value={email}
                type="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="john@gmail.com"
              />
            </div>
            <div>
              <label className="block font-light text-sm text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  className="pr-11"
                  required
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="********"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/3 -translate-0.5 hover:text-slate-500 transition-colors duration-200"
                >
                  {showPassword ? <EyeOffIcon  size={18}/> : <EyeIcon  size={18}/>}{" "}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-indigo-600 to-indigo-500  px-auto py-3 rounded-md text-white text-sm font-semibold hover:to-indigo-600 transition-colors duration-200 cursor-pointer shadow-lg shadow-indigo-500/25 disabled:opacity-60 flex items-center justify-center"
            >
              {isLoading && (
                <Loader2Icon className="animate-spin h-4 w-4 mr-4 " />
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
