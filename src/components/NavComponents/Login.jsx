
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { FaEye, FaEyeSlash, FaUser, FaPhone, FaHome, FaEnvelope, FaLock } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^9\d{9}$/;
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
// axios.defaults.withCredentials = true;

// export default function Login({ onLogin }) {
//   const [mode, setMode] = useState("login");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     toast.info(`Welcome! Please ${mode === "login" ? "login" : "register"} 🎉`, {
//       position: "top-center",
//       autoClose: 2000,
//     });
//   }, [mode]);

//   const validateRegister = () => {
//     if (!name.trim()) return "Name is required.";
//     if (!emailRegex.test(email)) return "Invalid email format.";
//     if (!phoneRegex.test(phone)) return "Invalid Nepali phone number.";
//     if (!passwordRegex.test(password))
//       return "Password must be 8+ chars with uppercase, lowercase, number & special char.";
//     if (!address.trim()) return "Address is required.";
//     return null;
//   };

//   const validateLogin = () => {
//     if (!emailRegex.test(email)) return "Invalid email format.";
//     if (!password) return "Password is required.";
//     return null;
//   };

//   const submit = async () => {
//     setLoading(true);
//     const url =
//       mode === "register"
//         ? `${BASE_URL}/api/users/register`
//         : `${BASE_URL}/api/users/login`;

//     const body =
//       mode === "register"
//         ? { name, email, phone, password, address }
//         : { email, password };

//     const err = mode === "register" ? validateRegister() : validateLogin();
//     if (err) {
//       toast.error(err);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(url, body);
//       if (mode === "register") {
//         toast.success(
//           res.data.message ||
//             "Registration successful 🎉. Check your email for OTP."
//         );
//         navigate("/verify-otp", { state: { email } });
//       } else {
//         const user = res.data.user;
//         if (!user || !user.token) {
//           throw new Error("Token missing in response");
//         }
//         localStorage.setItem("token", user.token);
//         toast.success("Login successful 🎉");
//         onLogin(user);
//         navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data?.message || "Server error");
//       } else if (error.request) {
//         toast.error("No response from server. Possible CORS issue.");
//       } else {
//         toast.error("Request setup error.");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 mt-[48px]"
//       style={{
//         backgroundImage:
//           "url('https://www.shutterstock.com/image-photo/variety-nepalese-traditional-dumpling-momos-600w-1844667388.jpg')",
//       }}
//     >
//       <ToastContainer />
//       <div className="w-full max-w-xl bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl p-10 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
//         <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700 tracking-wide drop-shadow-lg">
//           {mode === "login" ? "Login" : "Register"}
//         </h2>

//         {mode === "register" && (
//           <>
//             <div className="relative mb-4">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition duration-200"
//                 disabled={loading}
//               />
//             </div>
//             <div className="relative mb-4">
//               <FaPhone className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 placeholder="Phone (e.g. 98xxxxxxxx)"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
//                 disabled={loading}
//               />
//             </div>
//             <div className="relative mb-4">
//               <FaHome className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
//                 disabled={loading}
//               />
//             </div>
//           </>
//         )}

//         <div className="relative mb-4">
//           <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
//             disabled={loading}
//           />
//         </div>

//         <div className="relative mb-6">
//           <FaLock className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
//             disabled={loading}
//           />
//           <span
//             className="absolute right-3 top-3 text-gray-600 cursor-pointer text-xl hover:text-green-600 transition duration-200"
//             onClick={() => setShowPassword((prev) => !prev)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {mode === "login" && (
//           <div className="text-right text-sm mb-4">
//             <Link
//               to="/forgot-password"
//               className="text-green-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         )}

//         <button
//           onClick={submit}
//           disabled={loading}
//           className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg animate-pulse hover:animate-none"
//           }`}
//         >
//           {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
//         </button>

//         <p className="text-sm text-center mt-4 text-gray-700">
//           {mode === "login" ? (
//             <>
//               Don’t have an account?{" "}
//               <span
//                 className="text-green-700 font-semibold underline cursor-pointer hover:text-green-800"
//                 onClick={() => setMode("register")}
//               >
//                 Register
//               </span>
//             </>
//           ) : (
//             <>
//               Already registered?{" "}
//               <span
//                 className="text-green-700 font-semibold underline cursor-pointer hover:text-green-800"
//                 onClick={() => setMode("login")}
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import { FaEye, FaEyeSlash, FaUser, FaPhone, FaHome, FaEnvelope, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^9\d{9}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
axios.defaults.withCredentials = true;

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    toast.info(`Welcome! Please ${mode === "login" ? "login" : "register"} 🎉`, {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
      transition: Slide,
    });
  }, [mode]);

  const validateRegister = () => {
    if (!name.trim()) return "Name is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!phoneRegex.test(phone)) return "Invalid Nepali phone number.";
    if (!passwordRegex.test(password))
      return "Password must be 8+ chars with uppercase, lowercase, number & special char.";
    if (!address.trim()) return "Address is required.";
    return null;
  };

  const validateLogin = () => {
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!password) return "Password is required.";
    return null;
  };

  const submit = async () => {
    setLoading(true);
    const url =
      mode === "register"
        ? `${BASE_URL}/api/users/register`
        : `${BASE_URL}/api/users/login`;

    const body =
      mode === "register"
        ? { name, email, phone, password, address }
        : { email, password };

    const err = mode === "register" ? validateRegister() : validateLogin();
    if (err) {
      toast.error(err, { position: "top-center", theme: "colored" });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(url, body);
      if (mode === "register") {
        toast.success(
          res.data.message ||
            "Registration successful 🎉. Check your email for OTP.",
          { position: "top-center", theme: "colored" }
        );
        navigate("/verify-otp", { state: { email } });
      } else {
        const user = res.data.user;
        if (!user || !user.token) {
          throw new Error("Token missing in response");
        }
        localStorage.setItem("token", user.token);
        toast.success("Login successful 🎉", {
          position: "top-center",
          theme: "colored",
        });
        onLogin(user);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Server error", {
          position: "top-center",
          theme: "colored",
        });
      } else if (error.request) {
        toast.error("No response from server. Possible CORS issue.", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.error("Request setup error.", {
          position: "top-center",
          theme: "colored",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 mt-[48px]"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/variety-nepalese-traditional-dumpling-momos-600w-1844667388.jpg')",
      }}
    >
      <ToastContainer />
      <div className="w-full max-w-xl bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl p-10 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700 tracking-wide drop-shadow-lg">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {mode === "register" && (
          <>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition duration-200"
                disabled={loading}
              />
            </div>
            <div className="relative mb-4">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Phone (e.g. 98xxxxxxxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                disabled={loading}
              />
            </div>
            <div className="relative mb-4">
              <FaHome className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                disabled={loading}
              />
            </div>
          </>
        )}

        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            disabled={loading}
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            disabled={loading}
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer text-xl hover:text-green-600 transition duration-200"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {mode === "login" && (
          <div className="text-right text-sm mb-4">
            <Link
              to="/forgot-password"
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg animate-pulse hover:animate-none"
          }`}
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-700">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-green-700 font-semibold underline cursor-pointer hover:text-green-800"
                onClick={() => setMode("register")}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span
                className="text-green-700 font-semibold underline cursor-pointer hover:text-green-800"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
