// src/pages/Verify.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance"; // তোমার axios instance এখানে import করো
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import "../App.css"

const Verify = () => {
  const { id, hash } = useParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "fail"
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/auth/email/verify/${id}/${hash}`);
        if (res.status === 200) {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      } catch (error) {
        setStatus("fail");
      }
    };

    verifyEmail();
  }, [id, hash]);

  return (
    <div className="px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 ">
      <div className="bg-gradient-to-tr from-contestLight to-headerColor w-full min-h-screen flex items-center justify-center ">
        <div className="bg-white shadow-2xl rounded-xl p-10 max-w-lg w-full text-center transition-all duration-700 animate-fade-in">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin text-blue-600 mx-auto mb-6" size={48} />
            <h2 className="text-xl font-semibold text-gray-800">Verifying your email...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 mx-auto mb-6" size={60} />
            <h2 className="text-2xl font-bold text-green-600">Email Verified Successfully!</h2>
            <p className="text-gray-600 mt-2">Thank you for verifying your account.</p>
            <button
              className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </>
        )}

        {status === "fail" && (
          <>
            <XCircle className="text-red-500 mx-auto mb-6" size={60} />
            <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mt-2">The verification link is invalid or expired.</p>
            <button
              className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
              onClick={() => navigate("/resend-verification")}
            >
              Resend Email
            </button>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default Verify;
