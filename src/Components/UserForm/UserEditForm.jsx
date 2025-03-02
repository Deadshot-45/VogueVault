import React from "react";

const UserEditForm = ({ propData }) => {
  const { userInfo, setUserInfo, setEditUser , setLoading } = propData;
  const [errors, setErrors] = React.useState({});

  
  const handleInputChange = (e,field) => {
  const { value } = e.target;

  const [fieldName, subFieldName] = field.split('.');
  console.log(subFieldName);

  if (subFieldName) {
    setUserInfo({
      ...userInfo,
      [fieldName]: { ...userInfo[fieldName], [subFieldName]: value },
    });
  } else {
    setUserInfo({ ...userInfo, [field]: value });
  }

  if (errors[field]) {
    setErrors({ ...errors, [field]: null });
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
      setEditUser (false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full absolute flex flex-wrap flex-col gap-3 justify-center items-center backdrop-blur-xl border"
    >
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={(e)=>handleInputChange(e,"name")}
          placeholder="name"
          className={`border p-2 rounded-sm ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="flex flex-col gap-1">
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={(e)=>handleInputChange(e,"email")}
          placeholder="email"
          className={`border p-2 rounded-sm ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
      </div>
      <div className="flex gap-3">
        <input
          type="number"
          name="phone"
          value={userInfo.phone}
          onChange={(e)=>handleInputChange(e,"phone")}
          placeholder="phone"
          className="border p-2 rounded-sm"
        />
        <input
          type="text"
          name="gender"
          value={userInfo.gender}
          onChange={(e)=>handleInputChange(e,"gender")}
          placeholder="gender"
          className="border p-2 rounded-sm"
        />
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          name="street"
          value={userInfo.address.street}
          onChange={(e)=>handleInputChange(e,"address.street")}
          placeholder="street"
          className="border p-2 rounded-sm"
        />
        <input
          type="text"
          name="city"
          value={userInfo.address.city}
          onChange={(e)=>handleInputChange(e,"address.city")}
          placeholder="city"
          className="border p-2 rounded-sm"
        />
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          name="state"
          value={userInfo.address.state}
          onChange={(e)=>handleInputChange(e,"address.state")}
          placeholder="state"
          className="border p-2 rounded-sm"
        />
        <input
          type="text"
          name="pincode"
          value={userInfo.address.pincode}
          onChange={(e)=>handleInputChange(e,"address.pincode")}
          placeholder="pincode"
          className="border p-2 rounded-sm"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="Submit"
          className="bg-gray-800 active:bg-gray-950 text-white  py-3 px-4 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setEditUser (false)}
          className="bg-gray-800 active:bg-gray-950 text-white  py-3 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;