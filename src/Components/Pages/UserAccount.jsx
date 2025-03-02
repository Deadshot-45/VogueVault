import React, { useContext, useEffect, useState } from "react";
import { products } from "../../assets/frontend_assets/assets";
import { DataFile } from "../ContextFile/DataContext";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { userDetails } from "../../assets/UserDetails";
import UserEditImg from "../UserForm/UserEditImg";
import UserEditForm from "../UserForm/UserEditForm";

const UserAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(DataFile);
  const [editImg, setEditImg] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(userDetails);

  const handleEditUser = () => {
    setEditUser(true);
  };

  const handleLogOut = () => {
    setUser("");
    navigate("/SignIn");
  };

  
  const propData = {
    userImg: userImg,
    setUserImg: setUserImg,
    error: error,
    userImg: userImg,
    setUserImg:setUserImg,
    loading: loading,
    setLoading:setLoading,
    setEditImg: setEditImg,
    userInfo: userInfo,
    setEditUser: setEditUser,
    setUserInfo: setUserInfo,
  };

  return (
    <>
      <section className="w-full flex gap-20 mt-10 mb-24 relative">
        {editImg && (
          <UserEditImg
            propData={propData}
          />
        )}
        {editUser && <UserEditForm propData={propData}/>}
        <article className="flex flex-col gap-2 justify-center items-center py-4">
          <img
            src={userImg ? URL.createObjectURL(userImg) : products[0].image}
            alt="User -Img"
            className="w-[200px] h-[200px]  rounded-full"
          />

          <button
            onClick={() => setEditImg(true)}
            className="text-xl py-3 px-4 rounded-md"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={handleLogOut}
            className="bg-gray-800 active:bg-gray-950 text-white h-10 py-2 px-4 rounded-md"
          >
            LogOut
          </button>
        </article>
        <article className="w-[calc(100%-200px)]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-[#1a1a1]">
                Account Information
              </h3>
              <button
                onClick={handleEditUser}
                className="bg-gray-800 active:bg-gray-950 text-white  py-2 px-4 rounded-md"
              >
                Edit
              </button>
            </div>
            <div className="flex gap-6">
              <div className="w-[40%]">
                <h4 className="text-lg font-semibold text-[#1a1a1]">Name:</h4>
                <p className="text-lg text-[#1a1a1]">{userInfo.name}</p>
              </div>
              <div className="w-[40%]">
                <h4 className="text-lg font-semibold text-[#1a1a1]">Email:</h4>
                <p className="text-lg text-[#1a1a1]">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-[40%]">
                <h4 className="text-lg font-semibold text-[#1a1a1]">
                  Mobile Number:
                </h4>
                <p className="text-lg text-[#1a1a1]">+91 {userInfo.phone}</p>
              </div>
              <div className="w-[40%]">
                <h4 className="text-lg font-semibold text-[#1a1a1]">Gender:</h4>
                <p className="text-lg text-[#1a1a1]">{userInfo.gender}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-[40%]">
                <h4 className="text-lg font-semibold text-[#1a1a1]">
                  Address:
                </h4>
                <p className="text-lg text-[#1a1a1]">
                  {userInfo.address.street}, {userInfo.address.city},{" "}
                  {userInfo.address.state},{userInfo.address.pincode}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default UserAccount;
