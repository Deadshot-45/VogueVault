import React from "react";
import { FaTimes } from "react-icons/fa";

const UserEditForm = ({ propData }) => {
  const { userInfo, setUserInfo, setEditUser, setLoading } = propData;
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    const [fieldName, subFieldName] = field.split(".");

    if (subFieldName) {
      setUserInfo({
        ...userInfo,
        [fieldName]: { ...userInfo[fieldName], [subFieldName]: value },
      });
    } else {
      setUserInfo({ ...userInfo, [field]: value });
    }

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!userInfo.name) {
      newErrors.name = "Name is required";
    }
    if (!userInfo.email) {
      newErrors.email = "Email is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(false);
      setEditUser(false);
    }
  };

  return (
    <div className="fixed inset-0 max-xm:absolute max-xm:w-[130%] max-xm:left-[-15%] p-4 max-xm:bg-transparent bg-black/80 backdrop-blur-sm z-5 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl p-6 relative"
      >
        <button
          type="button"
          onClick={() => setEditUser(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Edit Profile Information
        </h2>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={(e) => handleInputChange(e, "name")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange(e, "email")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={userInfo.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={userInfo.gender}
                onChange={(e) => handleInputChange(e, "gender")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={userInfo.address.street}
                  onChange={(e) => handleInputChange(e, "address.street")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={userInfo.address.city}
                  onChange={(e) => handleInputChange(e, "address.city")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={userInfo.address.state}
                  onChange={(e) => handleInputChange(e, "address.state")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={userInfo.address.zip}
                  onChange={(e) => handleInputChange(e, "address.zip")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => setEditUser(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
