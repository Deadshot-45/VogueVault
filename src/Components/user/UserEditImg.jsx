import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import useUpdateImg from "../../Hooks/UseUpdateImg";

const UserEditImg = ({ propData }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const {
    setUserImg,
    setError,
    setEditImg,
    setLoading: setParentLoading,
  } = propData;
  const [fileObject, setFileObject] = useState(null);
  const [preview, setPreview] = useState(null);
  const { error, loading, imgUpdate } = useUpdateImg();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      setError(null);

      // Create preview URL for local display
      if (preview) {
        URL.revokeObjectURL(preview); // Clean up previous preview URL
      }
      setPreview(URL.createObjectURL(file));
      setFileObject(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileObject) {
      setError("Please select an image first");
      return;
    }

    if (isLoggedIn) {
      setParentLoading(true);

      try {
        const result = await imgUpdate(isLoggedIn, fileObject);
        setParentLoading(false);

        if (result && !error) {
          console.log("Upload success:", result);

          // Update the user's avatar in the parent component
          if (result.data && result.data.avatar) {
            // Use the full URL to the image
            const imageUrl = result.data.avatar;

            setUserImg(imageUrl);
          }

          // Close the edit modal
          setEditImg(false);
        }
      } catch (err) {
        setParentLoading(false);
        console.error("Error updating image:", err);
        setError(err.message || "Failed to update image");
      }
    } else {
      // For non-logged in users, just use the preview URL
      setUserImg(preview);
      setEditImg(false);
    }
  };

  // Display any errors
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-6 relative">
          <button
            type="button"
            onClick={() => setEditImg(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setEditImg(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              name="file"
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
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UserEditImg.propTypes = {
  propData: PropTypes.shape({
    setUserImg: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setEditImg: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserEditImg;
