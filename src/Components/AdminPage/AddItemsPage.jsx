import React, { useState } from "react";

const AddItemsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    image: "",
    sizes: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    sizes: "",
    image: "",
  });

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    const requiredFields = [
      "name",
      "description",
      "category",
      "subcategory",
      "price",
      "image",
    ];
    const hasErrors =
      requiredFields.some((field) => !newFormData[field]) ||
      newFormData.sizes.length === 0;
    console.log(hasErrors);
    if (hasErrors) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          name: newFormData.name ? "" : "Name is required",
          description: newFormData.description ? "" : "Description is required",
          category: newFormData.category ? "" : "Category is required",
          subcategory: newFormData.subcategory ? "" : "Subcategory is required",
          price: newFormData.price ? "" : "Price is required",
          sizes: selectedSizes.length > 0 ? "" : "Sizes is required",
          image: newFormData.image ? "" : "Image is required",
        };
      });
    } else {
      {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sizes: selectedSizes,
        }));
      }
    }
    console.log("Form clicked");
  };
  const handleSizeChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      setErrors((err) => {
        return { ...err, image: "Please select an image" };
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setErrors((err) => {
        return { ...err, image: "" };
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: event.target.result,
      }));
    };
    reader.onerror = () => {
      setErrors((err) => {
        return { ...err, image: "Error reading file" };
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="w-[calc(100%-220px)] p-10">
      <h1 className="text-3xl font-semibold mb-5">Add Items</h1>
      <form
        onSubmit={handleAddItem}
        className="w-[400px] flex flex-col justify-center gap-5"
      >
        <FormField
          label="Item Name"
          name="name"
          type="text"
          value={formData.name}
          error={errors.name}
          setFormData={setFormData}
          setErrors={setErrors}
        />
        <FormField
          label="Item Description"
          name="description"
          type="text"
          value={formData.description}
          error={errors.description}
          setFormData={setFormData}
          setErrors={setErrors}
        />
        <FormField
          label="Item Category"
          name="category"
          type="text"
          value={formData.category}
          error={errors.category}
          setFormData={setFormData}
          setErrors={setErrors}
        />
        <FormField
          label="Item SubCategory"
          name="subcategory"
          type="text"
          value={formData.subcategory}
          error={errors.subcategory}
          setFormData={setFormData}
          setErrors={setErrors}
        />
        <FormField
          label="Item Price"
          name="price"
          type="number"
          value={formData.price}
          error={errors.price}
          setFormData={setFormData}
          setErrors={setErrors}
        />
        <div className="space-x-3">
          <label className="text-md font-semibold">Item Sizes :</label>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={size}
                  checked={selectedSizes.includes(size)}
                  onChange={handleSizeChange}
                  className="border rounded-lg"
                />
                <span>{size}</span>
              </div>
            ))}
          </div>
          {errors.sizes && <div className="text-red-500">{errors.sizes}</div>}
        </div>
        <div>
          <input type="file" name="image" onChange={handleImageChange} className="border rounded-full py-1 px-4"/>
          {errors.image !== "" && (
            <div className="text-red-500">{errors.image}</div>
          )}
        </div>
        {formData.image && (
          <div className="py-10 space-y-2">
            <h1>Preview Img</h1>
            <img
              src={formData.image}
              alt="preview-img"
              className="w-[300px] h-[300px]"
            />
          </div>
        )}
        <button
          type="submit"
          className="h-10 py-2 px-6 text-sm bg-zinc-700 text-white rounded-full"
        >
          Add item
        </button>
      </form>
    </section>
  );
};

export default AddItemsPage;

const FormField = ({
  label,
  name,
  type,
  value,
  error,
  setErrors,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && isNaN(value)) {
      setErrors((err) => ({ ...err, [name]: "Invalid price format" }));
    } else {
      console.log(value);
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      setErrors((err) => ({ ...err, [name]: "" }));
    }
  };
  return (
    <>
      <div className="space-x-3">
        <label className="text-md font-semibold">{label} :</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label}...`}
          className="border px-3 py-1 text-[12px] outline-none rounded-full"
        />
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </>
  );
};
