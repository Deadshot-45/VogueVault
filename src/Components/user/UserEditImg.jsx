import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";

const UserEditImg = ({ propData }) => {
  const { setUserImg, setError, setLoading, setEditImg } = propData;
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setError(null);
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserImg(img);
    setEditImg(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-6 relative"
      >
        <button
          type="button"
          onClick={() => setEditImg(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Update Profile Picture
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-black file:text-white
                hover:file:bg-gray-800
                cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setEditImg(false)}
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

export default UserEditImg;
