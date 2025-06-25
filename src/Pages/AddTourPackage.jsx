import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../Customhook/useAxiosSecure";
import UserAuthContext from "../Context/Context";

const PackageForm = ({ onCancel, onSubmit }) => {
  const { user } = useContext(UserAuthContext);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    departureDate: "",
    groupSize: "",
    difficulty: "Moderate",
    price: "",
    discount: "",
    description: "",
    highlights: [{ id: Date.now(), text: "" }],
    itinerary: [{ day: 1, title: "", description: "" }],
    included: [{ id: Date.now(), text: "" }],
    notIncluded: [{ id: Date.now(), text: "" }],
    images: "",
  });
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // this called{ [name]:value  } dynamic key and when i write actual code like{ title:value }is called static key
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index].text = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], { id: Date.now(), text: "" }],
    }); //add array empty string to load another input
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((items) => items.id !== index); // _ this means avoid element

    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const packageData = {
      ...formData,
      // Using preview URLs instead of actual upload
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      guideName: user?.email,

      guidePhoto: user?.photoURL,
      guideEmail: user?.email,
    };
    axiosSecure
      .post("/addtourpackage", packageData)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Data update successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Tour Package
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Package Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration*</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Departure Date*</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Group Size*</label>
            <input
              type="text"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Difficulty Level*
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price ($)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-gray-700 mb-2">Highlights*</label>
          {formData.highlights.map((highlight, index) => (
            <div key={highlight.id} className="flex items-center mb-2">
              <input
                type="text"
                defaultValue={highlight.text}
                onChange={(e) =>
                  handleArrayChange("highlights", index, e.target.value)
                }
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              {formData.highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("highlights", highlight.id)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("highlights")}
            className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            Add Highlight
          </button>
        </div>

        {/* Itinerary */}
        <div>
          <label className="block text-gray-700 mb-2">Itinerary*</label>
          {formData.itinerary.map((day, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Day</label>
                  <input
                    type="number"
                    value={day.day}
                    onChange={(e) => {
                      const newItinerary = [...formData.itinerary];
                      newItinerary[index].day = e.target.value;
                      setFormData({ ...formData, itinerary: newItinerary });
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => {
                      const newItinerary = [...formData.itinerary];
                      newItinerary[index].title = e.target.value;
                      setFormData({ ...formData, itinerary: newItinerary });
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={day.description}
                  onChange={(e) => {
                    const newItinerary = [...formData.itinerary];
                    newItinerary[index].description = e.target.value;
                    setFormData({ ...formData, itinerary: newItinerary });
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              {formData.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newItinerary = formData.itinerary.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, itinerary: newItinerary });
                  }}
                  className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                >
                  Remove Day
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const nextDay = formData.itinerary.length + 1;
              setFormData({
                ...formData,
                itinerary: [
                  ...formData.itinerary,
                  { day: nextDay, title: "", description: "" },
                ],
              });
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            Add Day
          </button>
        </div>

        {/* Included/Not Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">What's Included*</label>
            {formData.included.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleArrayChange("included", index, e.target.value)
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {formData.included.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("included", item.id)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("included")}
              className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              Add Item
            </button>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Not Included</label>
            {formData.notIncluded.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleArrayChange("notIncluded", index, e.target.value)
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {formData.notIncluded.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("notIncluded", item.id)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("notIncluded")}
              className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="">Image</label>
          <input
            type="text"
            name="images"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition"
          >
            Create Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
