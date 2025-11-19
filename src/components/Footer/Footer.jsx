
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="m-1 bg-gray-200 rounded-xs text-black pt-10 pb-6 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">

//         <div>
//           <h3 className="text-lg font-semibold mb-3">We're FoodorderNP</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/about" className="hover:underline">About Us</Link>
//             </li>
            
//             <li>
//               <Link to="/delivery-charges" className="hover:underline">Delivery Charges
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Get Help</h3>
//           <ul className="space-y-2">
//             <li>Service Hour: 08:00 AM to 9:00 PM (NST)</li>
//             <li>
//               <Link to="/how-to-order" className="hover:underline">How to Order?</Link>
//             </li>
//             <li>
//               <Link to="/faqs" className="hover:underline">FAQs</Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:underline">Contact Us</Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Call Us</h3>
//           <p className="mb-2">Our helpline stays the same across all seven provinces for seamless support.</p>
//           <p>Contact Numbers:</p>
//           <ul className="space-y-1 mt-1">
//             <li>9815895401</li>
//             <li>9746803923</li>
//             <li>9803301192</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
//           <div className="flex space-x-4 mb-4">
//             <a
//               href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-black hover:text-blue-500"
//               aria-label="Facebook"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="https://x.com/OrderNp40588"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-black hover:text-blue-400"
//               aria-label="Twitter"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ=="
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-black hover:text-pink-500"
//               aria-label="Instagram"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://www.youtube.com/channel/UCOYaufNqNg3LSaIWUSxqrtA"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-black hover:text-red-600"
//               aria-label="YouTube"
//             >
//               <FaYoutube />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
//         Terms of Usage | Privacy Policy <br />
//         © 2020 Foodmandu Pvt. Ltd. All Rights Reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const handleToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <footer
      className="relative m-2 rounded-2xl pt-16 pb-12 px-8 font-sans overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 1.5s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 animate-gradientShift"></div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle animate-particle" style={{ top: "10%", left: "5%" }}></div>
        <div className="particle animate-particle" style={{ top: "50%", left: "80%" }}></div>
        <div className="particle animate-particle" style={{ top: "70%", left: "30%" }}></div>
        <div className="particle animate-particle" style={{ top: "20%", left: "60%" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 text-base text-white">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-lg animate-pulse">
            We're FoodorderNP
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/about"
                className="hover:text-gradientHover transition duration-700 ease-in-out font-medium drop-shadow-md"
                onClick={() => handleToast("Navigating to About Us")}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/delivery-charges"
                className="hover:text-gradientHover transition duration-700 ease-in-out font-medium drop-shadow-md"
                onClick={() => handleToast("Navigating to Delivery Charges")}
              >
                Delivery Charges
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-400 to-cyan-400 drop-shadow-lg animate-pulse">
            Get Help
          </h3>
          <ul className="space-y-3">
            <li>Service Hour: 08:00 AM to 9:00 PM (NST)</li>
            <li>
              <Link
                to="/how-to-order"
                className="hover:text-gradientHover transition duration-700 ease-in-out font-medium drop-shadow-md"
                onClick={() => handleToast("Navigating to How to Order")}
              >
                How to Order?
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-gradientHover transition duration-700 ease-in-out font-medium drop-shadow-md"
                onClick={() => handleToast("Navigating to FAQs")}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gradientHover transition duration-700 ease-in-out font-medium drop-shadow-md"
                onClick={() => handleToast("Navigating to Contact Us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 drop-shadow-lg animate-pulse">
            Call Us
          </h3>
          <p className="mb-1">Helpline stays same across all provinces.</p>
          <p>Contact Numbers:</p>
          <ul className="space-y-1 mt-2">
            <li className="hover:text-gradientHover cursor-pointer transition duration-700" onClick={() => handleToast("Calling 9815895401")}>9815895401</li>
            <li className="hover:text-gradientHover cursor-pointer transition duration-700" onClick={() => handleToast("Calling 9746803923")}>9746803923</li>
            <li className="hover:text-gradientHover cursor-pointer transition duration-700" onClick={() => handleToast("Calling 9803301192")}>9803301192</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 drop-shadow-lg animate-pulse">
            Connect with Us
          </h3>
          <div className="flex space-x-6 mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white shadow-lg hover:text-sky-400 hover:scale-125 transition-all duration-500 hover:shadow-xl"
              aria-label="Facebook"
            >
              <FaFacebookF size={28} />
            </a>
            <a
              href="https://x.com/OrderNp40588"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white shadow-lg hover:text-sky-400 hover:scale-125 transition-all duration-500 hover:shadow-xl"
              aria-label="Twitter"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white shadow-lg hover:text-sky-400 hover:scale-125 transition-all duration-500 hover:shadow-xl"
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCOYaufNqNg3LSaIWUSxqrtA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white shadow-lg hover:text-sky-400 hover:scale-125 transition-all duration-500 hover:shadow-xl"
              aria-label="YouTube"
            >
              <FaYoutube size={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/50 pt-6 text-center text-base drop-shadow-md text-white">
        Terms of Usage | Privacy Policy <br />
        © 2020 Foodmandu Pvt. Ltd. All Rights Reserved.
      </div>

      <ToastContainer />

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          background: linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7));
          background-size: 200% 200%;
          animation: gradientShift 20s ease infinite;
        }
        .hover\\:text-gradientHover:hover {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(90deg, #FFD700, #FF4500, #FF69B4);
          transition: all 0.7s ease;
        }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 70%);
          opacity: 0.8;
        }
        @keyframes particleAnim {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.5; }
          100% { transform: translateY(0) translateX(0); opacity: 0.8; }
        }
        .animate-particle {
          animation: particleAnim 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
