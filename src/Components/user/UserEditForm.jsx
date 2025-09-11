import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import useUpdateUser from "../../Hooks/UseUpdateUser";
import { AuthContext } from "../../Context/AuthContext";

const UserEditForm = ({ propData }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { userInfo, setUserInfo, setEditUser, setLoading } = propData;
  const [errors, setErrors] = React.useState({});
  const { updateUser } = useUpdateUser();

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserInfo({ ...userInfo, [field]: value });

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
    if (isLoggedIn) {
      setLoading(false);
      setEditUser(false);
      return updateUser(isLoggedIn, userInfo);
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(false);
      setEditUser(false);
    }
  };

  const inputFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Age", name: "age", type: "number" },
    { label: "Phone Number", name: "mobile", type: "number" },
    { label: "Gender", name: "gender", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="fixed inset-0 max-xm:absolute max-xm:w-[130%] max-xm:left-[-15%] p-4 max-xm:bg-transparent bg-black/80 backdrop-blur-sm z-1000 flex items-center justify-center">
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
          {inputFields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={userInfo[field.name]}
                onChange={(e) => handleInputChange(e, field.name)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
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
      </form>
    </div>
  );
};
UserEditForm.propTypes = {
  propData: PropTypes.shape({
    userInfo: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    setEditUser: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserEditForm;
