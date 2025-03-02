import React from "react";

const UserEditImg = ({propData}) => {
    const { error, userImg, loading, setEditImg, setUserImg} = propData
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userImg) {
          setLoading(false);
          setEditImg(false);
        }
      };
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          setError("Please upload a valid image file");
          return;
        }
        setUserImg(file);
        setError(null);
      };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full absolute flex flex-col gap-3 justify-center items-center backdrop-blur-xl"
    >
      <input
        type="file"
        onChange={handleImageChange}
        className="h-10 p-2 border border-gray-400 rounded-lg"
      />
      {userImg && (
        <img
          src={URL.createObjectURL(userImg)}
          alt="User -Img"
          className="w-[200px] h-[200px]  rounded-full"
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button
          type="Submit"
          className="bg-gray-800 active:bg-gray-950 text-white  py-3 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setEditImg(false)}
          className="bg-gray-800 active:bg-gray-950 text-white  py-3 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEditImg;
