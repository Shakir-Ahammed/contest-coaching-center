import React, { useEffect, useState } from 'react'
import { registerData } from '../data/login&RegisterData';
import UserForm from '../components/userForm';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/Loader';



const RegisterForm = () => {
    const navigate = useNavigate()
    const {msg, setMsg} = useStateContext();
    const {loading, setLoading} = useLoader();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("Registering...");
        if(formData.password.length < 6){
        alert("❌ Password must be 6 charecters");
        setLoading(false);
        return;
        }
        
        if (formData.password !== formData.password_confirmation) {
        alert("❌ Passwords are not matching");
        setLoading(false);
        return;
        }

        try {

        // Then call your register API
        const res = await api.post("/register", formData);
        if (res.data.data.user.mail_verify === false) {
            setMsg("❌ Registration failed. Please enter a verified email");
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 3000);
        }if (res.data.data.user.mail_verify === true) {
            setMsg(res.data.message);
            setTimeout(() => {
                navigate("/login");
                setMsg("");
                setLoading(false);
            }, 3000);
        }
        } catch (err) {
            let mainMsg = "Registration failed";
            let detailMsg = "";

            if (err.response?.data) {
                const data = err.response.data;

                mainMsg = data.message || mainMsg;

                if (data.errors) {
                if (data.errors.email) {
                    detailMsg = data.errors.email.join(", ");
                }
                }
            }

            setMsg(mainMsg);
            setLoading(false);

            setTimeout(() => setMsg(""), 3000);

            alert(detailMsg || "Please check your input");
            }

    };

    useEffect(() => {
        setMsg("");
        setLoading(false);
      }, [setMsg]);
  return (
    <div className='flex justify-center items-center w-full xl:h-auto p-3 flex-wrap space-y-4 relative'>
        {loading && <Loader message={msg} duration={3000} />}
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Register</h1>
      <UserForm data={registerData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default RegisterForm
