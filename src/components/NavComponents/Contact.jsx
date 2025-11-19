
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Contact() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/send`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//       const data = await res.json();
//       if (res.status === 200) {
//         toast.success(data.message);
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         toast.error(data.message);
//       }
//     } catch {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="mt-20 px-4">
//       <h2 className="text-4xl font-bold mb-10 text-red-600 text-center">Contact Us</h2>
//       <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
//         <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} required className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"/>
//         <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleFormChange} required className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"/>
//         <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleFormChange} required className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" rows={5}></textarea>
//         <button type="submit" className="bg-red-600 text-white py-3 rounded-md font-bold hover:bg-red-700 transition-colors">Send Message</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }


import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots, FaSpinner, FaCheck } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorShake(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        setFormData({ name: "", email: "", message: "" });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error(data.message);
        triggerErrorShake();
      }
    } catch {
      toast.error("Server error");
      triggerErrorShake();
    }

    setLoading(false);
  };

  const triggerErrorShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  const iconVariants = {
    focused: { scale: 1.2, rotate: [0, 10, -10, 0] },
    initial: { scale: 1, rotate: 0 },
  };

  return (
    <div className="mt-20 px-4 py-16 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-xl shadow-2xl">
      <h2 className="text-4xl font-extrabold mb-12 text-blue-800 text-center animate-bounce">
        Contact Us
      </h2>

      <motion.form
        onSubmit={handleFormSubmit}
        className="max-w-lg mx-auto flex flex-col gap-6 p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Name Input */}
        <div className="relative">
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-lg pointer-events-none"
            variants={iconVariants}
            initial="initial"
            whileFocus="focused"
          >
            <FaUser />
          </motion.div>
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            className="w-full pl-12 pr-4 border-2 border-transparent bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-xl transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-lg pointer-events-none"
            variants={iconVariants}
            initial="initial"
            whileFocus="focused"
          >
            <FaEnvelope />
          </motion.div>
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleFormChange}
            required
            className="w-full pl-12 pr-4 border-2 border-transparent bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-xl transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        {/* Message Textarea */}
        <div className="relative">
          <motion.div
            className="absolute left-4 top-4 text-blue-500 text-lg pointer-events-none"
            variants={iconVariants}
            initial="initial"
            whileFocus="focused"
          >
            <FaCommentDots />
          </motion.div>
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleFormChange}
            required
            rows={5}
            className="w-full pl-12 pr-4 border-2 border-transparent bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-xl transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          ></motion.textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className={`${
            success
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          } text-white py-3 rounded-xl font-bold shadow-lg transition-transform duration-300 flex justify-center items-center gap-2`}
          animate={errorShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: loading || success ? 1 : 1.07 }}
          whileTap={{ scale: loading || success ? 1 : 0.95 }}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Sending...
            </>
          ) : success ? (
            <>
              <FaCheck /> Sent!
            </>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </motion.form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
