import { useState } from "react";
import toast from "react-hot-toast";
import contact from "../../public/images/contact.png";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const postFormData = async () => {
    try {
      const response = await fetch(
        "https://subsmanager-be.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Successfully sent!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error Submitting form:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postFormData();
  };
  return (
    <div className="flex flex-1 xl:justify-center 2xl:justify-center">
      <div className="hidden lg:block">
        <img src={contact} alt="contact" className="mt-32" />
      </div>
      <div className="max-w-lg w-1/2 p-8 mt-20 mb-8 mx-auto xl:mx-0 flex-1 2xl:ml-40 2xl:mr-40">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 btn btn-primary text-white rounded-md  focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
