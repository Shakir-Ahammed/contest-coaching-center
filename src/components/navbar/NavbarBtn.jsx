import React, { useState } from 'react'
import api from "../../../api/axiosInstance"
import { useStateContext } from '../../context/ContextProvider';
import ConfirmModal from "../ConfirmModal"
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useLoader } from '../../context/LoaderContext';

const NavbarBtn = (props) => {
  const [click, setClick] = useState(false);
  const {showConfirm , setShowConfirm, setMsg, user, setUser, msg} = useStateContext();
  const {loading, setLoading} = useLoader();

  const handleLogout = async () => {
    setShowConfirm(true)
  };

  const confirmDelete = async() => {
    try {
    await api.post("/logout");
    localStorage.clear();
    setUser(null);
    setShowConfirm(false);
    setMsg("Logged out successfully");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsg("");
    }, 2000);
  } catch (err) {
    console.error("Logout error", err);
    setMsg("❌ Logout failed. Try again.");
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }};

  const cancelDelete = () => {
    setShowConfirm(false);
  };
  return (
    <div>

      {!user && (<Link to="/login"  className={`max-sm:py-2 max-sm:px-6 max-sm:rounded-none sm:py-2 sm:px-4 bg-${!user ? props.data.data.btnStyle.btnColor : "transparent"} px-6 py-4 text-white rounded-lg ${!user ? "hover:bg-headerColorHover" : " "}`}>{props.data.data.btnName}</Link>)}
      { loading &&(
        <Loader message={msg} duration={2000} />
      )}
        {user && (
          <div
            className="rounded-full w-10 aspect-square cursor-pointer relative"
            onClick={() => setClick(!click)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=86defe&color=fff&rounded=true`}
              alt="User Avatar"
              className="rounded-full w-10 aspect-square hover:bg-headerColor hover:w-12"
            />
            <div
              className={`${
                click ? "absolute" : "hidden"
              } min-h-40 min-w-32 bg-transparent text-headerColorHover top-10 right-0 rounded-md text-start p-2 text-lg shadow-lg`}
            >
              <span
                onClick={handleLogout}
                className="block w-full py-1 md:text-lg hover:rounded-md hover:bg-headerColor hover:text-white px-2 border-b-2 border-headerColor bg-white"
              >
                Logout
              </span>
            </div>
          </div>
        )}

        <ConfirmModal
          show={showConfirm}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Are you sure you want to logout?"
        />
    </div>
  )
}

export default NavbarBtn
