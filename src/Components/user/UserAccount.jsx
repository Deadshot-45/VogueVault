import React, { useContext, useState } from "react";
import { products } from "../../assets/frontend_assets/assets";
import { FaRegEdit } from "react-icons/fa";
import { userDetails } from "../../assets/UserDetails";
import UserEditImg from "../user/UserEditImg";
import UserEditForm from "../user/UserEditForm";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [editImg, setEditImg] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(userDetails);

  const handleEditUser = () => {
    setEditUser(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

  const propData = {
    userImg,
    setUserImg,
    error,
    setError,
    loading,
    setLoading,
    setEditImg,
    userInfo,
    setEditUser,
    setUserInfo,
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      <section className="w-full flex flex-col lg:flex-row gap-8 lg:gap-20 mt-10 mb-24 relative">
        {editImg && <UserEditImg propData={propData} />}
        {editUser && <UserEditForm propData={propData} />}

        {/* Profile Image Section */}
        <article className="flex flex-col items-center lg:items-start gap-4 py-4">
          <div className="relative group">
            <img
              src={userImg ? userImg : products[0].image}
              alt="User-Img"
              className="w-[200px] h-[200px] rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-200"
            />
            <button
              onClick={() => setEditImg(true)}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <FaRegEdit className="text-gray-600 hover:text-gray-900" />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="button"
            onClick={handleLogout}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            Log Out
          </button>
        </article>

        {/* User Information Section */}
        <article className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Account Information
              </h3>
              <button
                onClick={handleEditUser}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                <p className="text-base text-gray-900">{userInfo.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Email
                </h4>
                <p className="text-base text-gray-900">{userInfo.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Mobile Number
                </h4>
                <p className="text-base text-gray-900">+91 {userInfo.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Gender
                </h4>
                <p className="text-base text-gray-900">{userInfo.gender}</p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Address
                </h4>
                <p className="text-base text-gray-900">
                  {userInfo.address.street}, {userInfo.address.city},{" "}
                  {userInfo.address.state}, {userInfo.address.zip}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default UserAccount;
