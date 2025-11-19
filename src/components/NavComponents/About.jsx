// const About = () => {
//   return (
//     <div className="max-w-6xl mx-[2px] p-4 sm:p-6 text-gray-800 mt-[90px]">
//       <section className="mb-8">
//         <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">About Us</h1>
//         <p className="mb-4 text-base sm:text-2xl">
//           FoodOrderNP is recently opened ecommerce website in Nepal that delivers food from all seven provinces of Nepal. As a pioneer food delivery service provider, we are making life easier through online ordering.
//         </p>
//         <p className="mb-4 text-base sm:text-xl">
//           We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Nepali food to high French cuisine by placing a simple order online through our website, mobile app or over the phone. Then just sit back, relax, and wait for your order to arrive.
//         </p>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//         <section className="p-6 bg-white rounded-md shadow-md w-full">
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">FoodOrderNP Pvt. Ltd.</h3>
//           <ul className="list list-inside space-y-3 text-base sm:text-lg">
//             <li><strong>Business:</strong> Delivery of food, grocery and daily essentials</li>
//             <li><strong>Registered Authority:</strong> Office of Company Registrar</li>
//             <li><strong>Registration Certificate Number:</strong> 71876/066/067</li>
//             <li><strong>VAT/PAN Registration Number:</strong> 304326017</li>
//           </ul>
//         </section>

//         <section className="p-6 bg-white rounded-md shadow-md w-full">
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Office Locations</h3>
//           <ul className="list list-inside space-y-3 text-base sm:text-lg">
//             <li><strong>Registered Office:</strong> Lokanthali-01,Bhaktapur</li>
//             <li><strong>Head Office:</strong> New Road, Kathmandu, Nepal</li>
//             <li><strong>Branches/Outlets:</strong> Pokhara, Sindhuli, Butwal</li>
//           </ul>
//         </section>

//         <section className="p-6 bg-white rounded-md shadow-md w-full">
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Contact Information</h3>
//           <p className="text-base sm:text-lg mb-3"><strong>Email:</strong> <a href="mailto:info@foodmandu.com" className="text-blue-600 hover:underline">info@FoodOrderNP.com</a></p>
//           <p className="text-base sm:text-lg mb-3"><strong>Phone:</strong> 5970477,, 9803301192</p>
//           <p className="text-base sm:text-lg">
//             <strong>Social Media:</strong>
//             <a href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="ml-3 text-blue-600 hover:underline">Facebook</a>
//             <a href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ==" target="_blank" rel="noreferrer" className="ml-3 text-pink-600 hover:underline">Instagram</a>
//             <a href="https://x.com/OrderNp40588" target="_blank" rel="noreferrer" className="ml-3 text-blue-400 hover:underline">Twitter</a>
//             <a href="https://www.youtube.com/channel/UCOYaufNqNg3LSaIWUSxqrtA" target="_blank" rel="noreferrer" className="ml-3 text-black hover:underline">Youtube</a>
//           </p>
//         </section>

//         <section className="p-6 bg-white rounded-md shadow-md w-full">
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Complaint Handling</h3>
//           <p className="text-base sm:text-lg mb-3"><strong>Contact Person/Unit:</strong> Customer Care Department</p>
//           <p className="text-base sm:text-lg mb-3"><strong>Email:</strong> <a href="mailto:support@foodmandu.com" className="text-blue-600 hover:underline">support@FoodOrderNP.com</a></p>
//           <p className="text-base sm:text-lg"><strong>Telephone:</strong> 9815898401, 9803301192</p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About;



// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";

// const About = () => {
//   const [copied, setCopied] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleCopy = (text, type) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     toast.success(`${type} copied to clipboard!`, { position: "top-right", autoClose: 2000 });
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

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
//         toast.success(data.message, { position: "top-right" });
//         setFormData({ name: "", email: "", message: "" });
//         setIsPopupOpen(false);
//       } else {
//         toast.error(data.message, { position: "top-right" });
//       }
//     } catch (err) {
//       toast.error("Server error", { position: "top-right" });
//     }
//   };


//   return (
//     <div className="max-w-6xl mx-[2px] p-4 sm:p-6 text-gray-800 mt-[90px] relative">
//       <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 text-red-600 text-center animate-pulse">
//         About Us
//       </h1>
//       <section className="mb-8 space-y-4">
//         <p className="text-base sm:text-2xl">
//           FoodOrderNP is recently opened ecommerce website in Nepal that delivers food from all seven provinces of Nepal. As a pioneer food delivery service provider, we are making life easier through online ordering.
//         </p>
//         <p className="text-base sm:text-xl">
//           We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Nepali food to high French cuisine by placing a simple order online through our website, mobile app or over the phone. Then just sit back, relax, and wait for your order to arrive.
//         </p>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="p-6 bg-white rounded-xl shadow-xl w-full hover:shadow-2xl transition-shadow duration-300"
//         >
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">FoodOrderNP Pvt. Ltd.</h3>
//           <ul className="list-inside space-y-3 text-base sm:text-lg">
//             <li><strong>Business:</strong> Delivery of food, grocery and daily essentials</li>
//             <li><strong>Registered Authority:</strong> Office of Company Registrar</li>
//             <li><strong>Registration Certificate Number:</strong> 71876/066/067</li>
//             <li><strong>VAT/PAN Registration Number:</strong> 304326017</li>
//           </ul>
//         </motion.section>

//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="p-6 bg-white rounded-xl shadow-xl w-full hover:shadow-2xl transition-shadow duration-300"
//         >
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Office Locations</h3>
//           <ul className="list-inside space-y-3 text-base sm:text-lg">
//             <li><strong>Registered Office:</strong> Lokanthali-01, Bhaktapur</li>
//             <li><strong>Head Office:</strong> New Road, Kathmandu, Nepal</li>
//             <li><strong>Branches/Outlets:</strong> Pokhara, Sindhuli, Butwal</li>
//           </ul>
//         </motion.section>

//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="p-6 bg-white rounded-xl shadow-xl w-full hover:shadow-2xl transition-shadow duration-300"
//         >
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Contact Information</h3>
//           <p className="text-base sm:text-lg mb-3 cursor-pointer" onClick={() => handleCopy("info@FoodOrderNP.com", "Email")}>
//             <strong>Email:</strong> <span className="text-blue-600 hover:underline">info@FoodOrderNP.com</span>
//           </p>
//           <p className="text-base sm:text-lg mb-3 cursor-pointer" onClick={() => handleCopy("5970477, 9803301192", "Phone")}>
//             <strong>Phone:</strong> 5970477, 9803301192
//           </p>
//           <p className="text-base sm:text-lg">
//             <strong>Social Media:</strong>
//             <a href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="ml-3 text-blue-600 hover:underline hover:scale-110 transition-transform">Facebook</a>
//             <a href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ==" target="_blank" rel="noreferrer" className="ml-3 text-pink-600 hover:underline hover:scale-110 transition-transform">Instagram</a>
//             <a href="https://x.com/OrderNp40588" target="_blank" rel="noreferrer" className="ml-3 text-blue-400 hover:underline hover:scale-110 transition-transform">Twitter</a>
//             <a href="https://www.youtube.com/channel/UCOYaufNqNg3LSaIWUSxqrtA" target="_blank" rel="noreferrer" className="ml-3 text-black hover:underline hover:scale-110 transition-transform">Youtube</a>
//           </p>
//         </motion.section>

//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="p-6 bg-white rounded-xl shadow-xl w-full hover:shadow-2xl transition-shadow duration-300"
//         >
//           <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Complaint Handling</h3>
//           <p className="text-base sm:text-lg mb-3 cursor-pointer" onClick={() => handleCopy("Customer Care Department", "Contact Person")}>
//             <strong>Contact Person/Unit:</strong> Customer Care Department
//           </p>
//           <p className="text-base sm:text-lg mb-3 cursor-pointer" onClick={() => handleCopy("support@FoodOrderNP.com", "Email")}>
//             <strong>Email:</strong> <span className="text-blue-600 hover:underline">support@FoodOrderNP.com</span>
//           </p>
//           <p className="text-base sm:text-lg cursor-pointer" onClick={() => handleCopy("9815898401, 9803301192", "Phone")}>
//             <strong>Telephone:</strong> 9815898401, 9803301192
//           </p>
//         </motion.section>
//       </div>

//       <motion.button
//         className="fixed bottom-8 right-8 bg-red-600 text-white font-bold px-6 py-4 rounded-full shadow-xl hover:bg-red-700 z-50 animate-bounce"
//         onClick={() => setIsPopupOpen(true)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         Contact Us
//       </motion.button>

//       <AnimatePresence>
//         {isPopupOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-2xl relative"
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.5 }}
//             >
//               <button
//                 className="absolute top-3 right-3 text-gray-600 font-bold text-xl"
//                 onClick={() => setIsPopupOpen(false)}
//               >
//                 &times;
//               </button>
//               <h3 className="text-2xl font-semibold mb-4 text-center">Send us a Message</h3>
//               <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   required
//                   className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={handleFormChange}
//                   required
//                   className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
//                 />
//                 <textarea
//                   name="message"
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={handleFormChange}
//                   required
//                   className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
//                   rows={4}
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="bg-red-600 text-white py-3 rounded-md font-bold hover:bg-red-700 transition-colors"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <ToastContainer />
//     </div>
//   );
// };

// export default About;


import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [copied, setCopied] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${type} copied to clipboard!`, { position: "top-right", autoClose: 2000 });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message, { position: "top-right" });
        setFormData({ name: "", email: "", message: "" });
        setIsPopupOpen(false);
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch {
      toast.error("Server error", { position: "top-right" });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto p-4 sm:p-6 mt-[90px] text-gray-800">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 text-red-600 text-center animate-pulse">
        About Us
      </h1>

      <section className="mb-8 space-y-4 text-gray-700">
        <p className="text-base sm:text-2xl">
          FoodOrderNP is recently opened ecommerce website in Nepal that delivers food from all seven provinces of Nepal. As a pioneer food delivery service provider, we are making life easier through online ordering.
        </p>
        <p className="text-base sm:text-xl">
          We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Nepali food to high French cuisine by placing a simple order online through our website, mobile app or over the phone. Then just sit back, relax, and wait for your order to arrive.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[{
          title: "FoodOrderNP Pvt. Ltd.",
          content: [
            "Business: Delivery of food, grocery and daily essentials",
            "Registered Authority: Office of Company Registrar",
            "Registration Certificate Number: 71876/066/067",
            "VAT/PAN Registration Number: 304326017"
          ]
        },{
          title: "Office Locations",
          content: [
            "Registered Office: Lokanthali-01, Bhaktapur",
            "Head Office: New Road, Kathmandu, Nepal",
            "Branches/Outlets: Pokhara, Sindhuli, Butwal"
          ]
        },{
          title: "Contact Information",
          content: [
            "Email: info@FoodOrderNP.com",
            "Phone: 5970477, 9803301192",
            "Social Media: Facebook, Instagram, Twitter, Youtube"
          ]
        },{
          title: "Complaint Handling",
          content: [
            "Contact Person/Unit: Customer Care Department",
            "Email: support@FoodOrderNP.com",
            "Telephone: 9815898401, 9803301192"
          ]
        }].map((section, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">{section.title}</h3>
            <ul className="list-inside space-y-3 text-base sm:text-lg text-gray-800">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>

      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white font-bold px-6 py-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl z-50 animate-bounce transition-all duration-300"
        onClick={() => setIsPopupOpen(true)}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us
      </motion.button>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 rounded-3xl p-6 w-11/12 max-w-md shadow-2xl border border-purple-200 relative"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 font-bold text-xl hover:text-red-600 transition-colors"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-6 text-center text-purple-700">Send us a Message</h3>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                {["name", "email", "message"].map((field, idx) => (
                  <div key={idx} className="relative">
                    {field !== "message" ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleFormChange}
                        placeholder=" "
                        required
                        className="peer border-2 border-gray-300 rounded-xl p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 hover:shadow-lg transition-all duration-300"
                      />
                    ) : (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleFormChange}
                        placeholder=" "
                        rows={4}
                        required
                        className="peer border-2 border-gray-300 rounded-xl p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 hover:shadow-lg transition-all duration-300"
                      ></textarea>
                    )}
                    <label className="absolute left-4 -top-2.5 text-gray-400 text-sm bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm">
                      {field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Your Message"}
                    </label>
                  </div>
                ))}
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default About;
