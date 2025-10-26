import axios from "axios";
import { useState } from "react";

const useUpdateImg = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const imgUpdate = async (token, fileObject) => {
    setLoading(true);
    setError("");

    try {
      // Validate we have a file object, not a base64 string
      if (!fileObject || typeof fileObject === "string") {
        throw new Error("Invalid file format. Please select an image file.");
      }

      // Create a FormData object
      const formData = new FormData();
      formData.append("file", fileObject);

      // Debug check
      console.log("File being sent:", fileObject);

      const response = await axios.post(
        `http://localhost:5500/api/data/updateimg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Let axios set the correct Content-Type with boundary
          },
        }
      );

      setLoading(false);

      if (response.data.error) {
        setError(response.data.message);
        return null;
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload image";
      setError(errorMessage);
      console.error("Image upload error:", error);
      return null;
    }
  };

  return { error, loading, imgUpdate };
};

export default useUpdateImg;
