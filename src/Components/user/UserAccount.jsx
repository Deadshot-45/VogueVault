/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { products } from "../../assets/frontend_assets/assets";
import { FaRegEdit } from "react-icons/fa";
import UserEditImg from "../user/UserEditImg";
import UserEditForm from "../user/UserEditForm";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../Hooks/UseGetUser";
import UseLogout from "../../Hooks/UseLogout";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { resetStorage } from "../../Utils/StorageReset";

const UserAccount = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, setUser } = useContext(AuthContext);
  const { setCart, setCartCount, setCartTotal, setIsCart } =
    useContext(DataContext);
  const [editImg, setEditImg] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const {
    data,
    loading,
    setLoading,
    getUser,
    error: tokenError,
  } = useGetUser();
  const { success, logOut } = UseLogout();
  useEffect(() => {
    isLoggedIn && getUser(isLoggedIn);
    isLoggedIn && navigate("/signin", { replace: true });
  }, [isLoggedIn]);

  useEffect(() => {
    if (tokenError === "invalid token") {
      setError(tokenError);
      toast.error(tokenError);
      // Clear auth data
      setUser(null);
      setIsLoggedIn("");

      // Clear cart data from state
      setCart([]);
      setCartCount(0);
      setCartTotal(0);
      setIsCart(false);

      // Clear localStorage data
      resetStorage();
      navigate("/signin", { replace: true });
    }
  }, [tokenError]);

  useEffect(() => {
    if (success) {
      console.log(success);
      toast(success);
      // Clear auth data
      setUser(null);
      setIsLoggedIn("");

      // // Clear cart data from state
      setCart([]);
      setCartCount(0);
      setCartTotal(0);
      setIsCart(false);

      // // Clear localStorage data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      localStorage.removeItem("carttotal");
      localStorage.removeItem("shipping");
      localStorage.removeItem("gst");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("Coupon");
      navigate("/signin", { replace: true });
    }
  }, [success]);

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name })
      );
      setUser(data);
      setUserInfo(data);
      setUserImg(data.avatar);
    }
  }, [data]);

  const handleEditUser = useCallback(() => {
    // Add input validation here
    setEditUser(true);
  }, [setEditUser]);

  const handleLogout = () => {
    logOut(isLoggedIn);
  };

  const propData = useMemo(() => {
    return {
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
  }, [userInfo, userImg, error, loading]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:max-2xl:px-8 2xl:px-12 py-8">
        <section className="w-full flex flex-col lg:flex-row gap-8 lg:gap-20 mt-10 mb-24 relative">
          {editImg && <UserEditImg propData={propData} />}
          {editUser && <UserEditForm propData={propData} />}

          {/* Profile Image Section */}
          <article className="flex flex-col items-center lg:items-start gap-4 py-4">
            <div className="relative group">
              <img
                src={userImg ? userImg : products[0].image}
                alt="User-Img"
                loading="lazy"
                className="w-[200px] h-[200px] rounded-full object-cover shadow-lg group-hover:shadow-xl z-2 transition-shadow duration-200"
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
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Name
                  </h4>
                  <p className="text-base text-gray-900">
                    {userInfo.name || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </h4>
                  <p className="text-base text-gray-900">
                    {userInfo.email || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Mobile Number
                  </h4>
                  <p className="text-base text-gray-900">
                    +91 {userInfo.mobile || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Age
                  </h4>
                  <p className="text-base text-gray-900">
                    {userInfo.age || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Gender
                  </h4>
                  <p className="text-base text-gray-900">
                    {userInfo.gender || "N/A"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Address
                  </h4>
                  <p className="text-base text-gray-900">
                    {userInfo.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default UserAccount;
