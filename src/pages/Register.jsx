import React, { useEffect, useState } from 'react'
import { registerData } from '../data/login&RegisterData';
import UserForm from '../components/UserForm';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import api, { getCsrfToken } from '../../api/axiosInstance';
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
        alert("❌ Password must be 6 characters");
        setLoading(false);
        return;
        }
        
        if (formData.password !== formData.password_confirmation) {
        alert("❌ Passwords are not matching");
        setLoading(false);
        return;
        }

        try {

        // Get CSRF cookie first (required for Sanctum SPA auth)
        await getCsrfToken();
        
        // Call register API with correct endpoint
        const res = await api.post("/auth/register", formData);
        
        if (res.data.success) {
            const user = res.data.data?.user;
            
            if (user && user.mail_verify === false) {
                // Registration succeeded but email not yet verified
                setMsg("✅ Registration successful! Please check your email to verify your account.");
                setTimeout(() => {
                    navigate("/login");
                    setMsg("");
                    setLoading(false);
                }, 3000);
            } else {
                // Registration succeeded and email is verified (or no verification needed)
                setMsg(res.data.message || "✅ Registration successful!");
                setTimeout(() => {
                    navigate("/login");
                    setMsg("");
                    setLoading(false);
                }, 3000);
            }
        } else {
            setMsg(res.data.message || "Registration failed");
            setTimeout(() => {
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

            alert(detailMsg || mainMsg);
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
