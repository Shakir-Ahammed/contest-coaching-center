import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UserForm from '../components/userForm';
import { loginData } from '../data/login&RegisterData';
import api from "../../api/axiosInstance"
import { useStateContext } from '../context/ContextProvider';
import Loader from '../components/Loader';
import { useLoader } from '../context/LoaderContext';


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const {msg, setMsg, setUser } = useStateContext()
  const {loading, setLoading} = useLoader();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("Logging in...");
  setLoading(true);

  try {
    const res = await api.post('/login', form);
    if (res.status === 200 || res.status === 201) {
      const { user, access_token, refresh_token } = res.data.data;
      setMsg(res.data.message || "Login Successful");
      user && setUser(user);
      access_token && localStorage.setItem("access_token", access_token);
      refresh_token && localStorage.setItem("refresh_token", refresh_token);

      // শুধু message এবং progress animation শেষ হলে hide
      setTimeout(() => {
        navigate("/");
        setMsg("");
        setLoading(false);
      }, 2000); // duration টা match করবে Loader এর duration‑এর সাথে
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    setMsg("❌ Login failed. Try again.");
    // fail হলেও একই delay ব্যবহার:
    setTimeout(() => {
      setLoading(false);
      setMsg("");
    }, 2000);
  }
};

  useEffect(() => {
    setMsg("");
    setLoading(false);
  }, [setMsg]);

  return (
      <div className='flex justify-center items-center w-full flex-wrap px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 space-y-4 relative'>
         {loading && <Loader message={msg} duration={2000} />}
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Sign in</h1>
      <UserForm data={loginData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Login
