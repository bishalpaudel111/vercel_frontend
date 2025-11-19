// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaSearch } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Header({ user, cart, province, setProvince, onLogout, onSearch }) {
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (!user) return;
//       try {
//         const res = await axios.get(`http://localhost:3001/api/users/profile`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (res.data && res.data.profileImage) {
//           setProfileImage(`http://localhost:3001${res.data.profileImage}`);
//         } else {
//           setProfileImage("/default-profile.png");
//         }
//       } catch {
//         setProfileImage("/default-profile.png");
//       }
//     };
//     fetchProfileImage();
//   }, [user]);

//   const logout = () => {
//     fetch("http://localhost:3001/api/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     }).then(() => {
//       onLogout();
//       navigate("/login");
//     });
//   };

//   const provinces = [
//     "Koshi",
//     "Madhesh",
//     "Bagmati",
//     "Gandaki",
//     "Lumbini",
//     "Karnali",
//     "Sudurpashchim",
//   ];

//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//     onSearch(e.target.value);
//   };

//   return (
//     <header className="fixed top-0 w-full bg-gradient-to-r from-red-600 via-blue-500 to-yellow-500 text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <button
//             aria-label="Toggle Menu"
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden text-3xl text-blue-700 hover:text-blue-900 transition-colors duration-300 ease-in-out select-none"
//           >
//             <span
//               className={`block w-8 h-1 bg-blue-700 mb-1 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""
//                 }`}
//             ></span>
//             <span
//               className={`block w-8 h-1 bg-blue-700 mb-1 rounded transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"
//                 }`}
//             ></span>
//             <span
//               className={`block w-8 h-1 bg-blue-700 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""
//                 }`}
//             ></span>
//           </button>

//           <h1 className="text-2xl sm:text-3xl font-extrabold cursor-pointer">
//             <Link to="/">FoodOrderNP</Link>
//           </h1>

//           <select
//             className="hidden md:block bg-white text-black rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base"
//             value={province}
//             onChange={(e) => setProvince(e.target.value)}
//             title="Select Province"
//           >
//             <option value="">Select Province</option>
//             {provinces.map((prov) => (
//               <option key={prov} value={prov}>
//                 {prov}
//               </option>
//             ))}
//           </select>

//           {province && (
//             <div className="hidden md:inline-block ml-2 sm:ml-4 font-semibold bg-green-700 px-4 sm:px-6 py-1 sm:py-2 rounded text-sm sm:text-base">
//               Province: {province}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center space-x-6">
//           <div className="relative text-gray-600">
//             <input
//               type="search"
//               name="search"
//               placeholder="Search food..."
//               value={searchInput}
//               onChange={handleSearchChange}
//               className="bg-white h-9 sm:h-10 px-10 sm:px-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black shadow-md w-full max-w-xs"
//             />
//             <FaSearch
//               className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
//               size={16}
//             />
//           </div>

//           <nav className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className="hover:text-yellow-300 font-semibold transition-colors duration-300"
//             >
//               Home
//             </Link>



//             <Link
//               to="/cart"
//               className="hover:text-yellow-300 font-semibold transition-colors duration-300"
//             >
//               Cart
//             </Link>


//             <Link
//               to="/about"
//               className="hover:text-yellow-300 font-semibold transition-colors duration-300"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               className="hover:text-yellow-300 font-semibold transition-colors duration-300"
//             >
//               Contact
//             </Link>

//             {user ? (
//               <>
//                 <img
//                   src={profileImage || "/default-profile.png"}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
//                   onClick={() => navigate("/profile")}
//                   title={`Hello, ${user.name}`}
//                 />
//                 <button
//                   onClick={logout}
//                   className="bg-white text-red-500 px-4 py-1 rounded font-semibold text-base hover:bg-red-100 transition-colors duration-300"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-white text-red-500 px-6 py-2 rounded font-semibold text-base hover:bg-red-100 transition-colors duration-300"
//               >
//                 Login
//               </Link>
//             )}

//             <div
//               className="relative cursor-pointer"
//               onClick={() => navigate("/cart")}
//               title="Cart"
//             >
//               <FaShoppingCart className="text-2xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
//                   {cart.reduce((a, c) => a + c.qty, 0)}
//                 </span>
//               )}
//             </div>
//           </nav>
//         </div>
//       </div>

//       <nav
//         className={`md:hidden fixed top-14 left-0 w-full bg-gradient-to-r bg-blue-500 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         <div className="flex flex-col space-y-4 px-6 py-6">
//           <Link
//             to="/"
//             className="text-xl font-bold px-3 py-1 rounded bg-yellow-500 text-gray-900 w-[90px]"

//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>

//           <Link
//             to="/cart"
//             className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out w-[150px]"

//             onClick={() => setMenuOpen(false)}
//           >
//             Cart
//           </Link>

//           <Link
//             to="/about"
//             className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out"

//             onClick={() => setMenuOpen(false)}
//           >
//             About
//           </Link>

//           <Link
//             to="/contact"
//             className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out w-[150px]"

//             onClick={() => setMenuOpen(false)}
//           >
//             Contact
//           </Link>

//           {user ? (
//             <>
//               <img
//                 src={profileImage || "/default-profile.png"}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full border-2 border-white cursor-pointer mb-2 mx-2"
//                 onClick={() => {
//                   navigate("/profile");
//                   setMenuOpen(false);
//                 }}
//                 title={`Hello, ${user.name}`}
//               />
//               <button
//                 onClick={() => {
//                   logout();
//                   setMenuOpen(false);
//                 }}
//                 className="bg-white text-black text-xl px-3 py-3 my-2 rounded font-semibold hover:bg-blue-600 transition-colors duration-[1200ms] w-[100px] ease-in-out"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className=" text-white text-2xl px-3 py-3 rounded font-bold hover:text-red-600 transition-colors duration-[1200ms] w-[100px] ease-in-out my-2"
//               onClick={() => setMenuOpen(false)}
//             >
//               Login
//             </Link>
//           )}

//         </div>
//       </nav>
//     </header>



//   );
// }


// working code 

// import { Link, useNavigate } from "react-router-dom";   
// import { FaShoppingCart, FaSearch } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Header({ user, cart, province, setProvince, onLogout, onSearch }) {
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [shakeCart, setShakeCart] = useState(false);
//   const prevCartLength = useState(cart.length)[0];

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (!user) return;
//       try {
//         const res = await axios.get(`http://localhost:3001/api/users/profile`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setProfileImage(res.data?.profileImage ? `http://localhost:3001${res.data.profileImage}` : "/default-profile.png");
//       } catch {
//         setProfileImage("/default-profile.png");
//       }
//     };
//     fetchProfileImage();
//   }, [user]);

//   const logout = () => {
//     fetch("http://localhost:3001/api/auth/logout", { method: "POST", credentials: "include" })
//       .then(() => {
//         onLogout();
//         toast.success("Logged out successfully!");
//         navigate("/login");
//       });
//   };

//   const provinces = ["Koshi","Madhesh","Bagmati","Gandaki","Lumbini","Karnali","Sudurpashchim"];
//   const handleSearchChange = (e) => { setSearchInput(e.target.value); onSearch(e.target.value); };

//   useEffect(() => { 
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (cart.length > prevCartLength) {
//       setShakeCart(true);
//       const timer = setTimeout(() => setShakeCart(false), 500);
//       return () => clearTimeout(timer);
//     }
//   }, [cart.length, prevCartLength]);

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
//       <header className={`fixed top-0 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white shadow-xl z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? "py-3 shadow-2xl" : "py-4"} hover:animate-header-glow`}>
//         <div className="flex items-center justify-between px-4">
//           <div className="flex items-center space-x-4">
//             <button aria-label="Toggle Menu" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-white hover:text-yellow-300 transition-colors duration-300 select-none">
//               <span className={`block w-8 h-1 bg-white mb-1 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
//               <span className={`block w-8 h-1 bg-white mb-1 rounded transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
//               <span className={`block w-8 h-1 bg-white rounded transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
//             </button>

//             <h1 className="text-2xl sm:text-3xl font-extrabold cursor-pointer hover:text-yellow-300 transition-colors duration-300">
//               <Link to="/">FoodOrderNP</Link>
//             </h1>

//             <select className="hidden md:block bg-white text-black rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow duration-300" value={province} onChange={(e) => setProvince(e.target.value)} title="Select Province">
//               <option value="">Select Province</option>
//               {provinces.map((prov) => (<option key={prov} value={prov}>{prov}</option>))}
//             </select>

//             {province && (
//               <div className="hidden md:inline-block ml-2 sm:ml-4 font-semibold bg-green-700 px-4 sm:px-6 py-1 sm:py-2 rounded text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow duration-300 animate-province-glow">
//                 Province: {province}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center space-x-6">
//             <div className="relative text-gray-600 group">
//               <input type="search" placeholder="Search food..." value={searchInput} onChange={handleSearchChange} className="bg-white h-9 sm:h-10 px-10 sm:px-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-glow text-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs group-hover:animate-search-glow"/>
//               <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-pink-400 animate-icon-glow" size={16}/>
//             </div>

//             <nav className="hidden md:flex items-center space-x-8">
//               {["Home","Cart","About","Contact"].map(item => (
//                 <Link key={item} to={item==="Home"?"/":`/${item.toLowerCase()}`} className="font-semibold text-white relative group">
//                   {item}
//                   <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               ))}

//               {user ? (
//                 <>
//                   <img src={profileImage || "/default-profile.png"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-110 transform transition-transform duration-300 animate-float" onClick={() => navigate("/profile")} title={`Hello, ${user.name}`}/>
//                   <button onClick={logout} className="px-4 py-2 rounded-md font-extrabold text-white text-base border border-white border-opacity-30 animate-gradient-pulse transition-all duration-300">Logout</button>
//                 </>
//               ) : (
//                 <Link to="/login" className="px-4 py-2 rounded-md font-extrabold text-white text-base border border-white border-opacity-30 animate-gradient-pulse transition-all duration-300">Login</Link>
//               )}

//               <div className={`relative cursor-pointer hover:scale-110 transition-transform duration-300 animate-float ${shakeCart?"animate-shake-cart":""} animate-cart-glow`} onClick={() => navigate("/cart")} title="Cart">
//                 <FaShoppingCart className="text-2xl animate-icon-glow"/>
//                 {cart.length>0 && <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold animate-pulse">{cart.reduce((a,c)=>a+c.qty,0)}</span>}
//               </div>
//             </nav>
//           </div>
//         </div>

//         <nav className={`md:hidden fixed top-16 left-0 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen?"translate-x-0":"-translate-x-full"} backdrop-blur-md`}>
//           <div className="flex flex-col space-y-4 px-6 py-6">
//             {["Home","Cart","About","Contact"].map((item,index)=>(<Link key={item} to={item==="Home"?"/":`/${item.toLowerCase()}`} className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-300 transition-colors duration-500 animate-bounce-menu" style={{animationDelay:`${index*0.1}s`}} onClick={()=>setMenuOpen(false)}>{item}</Link>))}
//             {user ? (
//               <>
//                 <img src={profileImage||"/default-profile.png"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white cursor-pointer mb-2 mx-2 hover:scale-110 transform transition-transform duration-300 animate-float" onClick={()=>{navigate("/profile");setMenuOpen(false);}} title={`Hello, ${user.name}`}/>
//                 <button onClick={()=>{logout();setMenuOpen(false);}} className="px-4 py-2 rounded-md font-extrabold text-white text-lg border border-white border-opacity-30 animate-gradient-pulse transition-all duration-300 w-full text-center">Logout</button>
//               </>
//             ) : (
//               <Link to="/login" className="px-4 py-2 rounded-md font-extrabold text-white text-lg border border-white border-opacity-30 animate-gradient-pulse transition-all duration-300 w-full text-center" onClick={()=>setMenuOpen(false)}>Login</Link>
//             )}
//           </div>
//         </nav>
//       </header>

//       <style>
//         {`
//           @keyframes float {0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
//           .animate-float{animation:float 3s ease-in-out infinite;}

//           @keyframes bounceMenu{0%{transform:translateX(-20px);opacity:0;}60%{transform:translateX(10px);opacity:1;}100%{transform:translateX(0);opacity:1;}}
//           .animate-bounce-menu{animation:bounceMenu 0.5s forwards;}

//           @keyframes shakeCart{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-5px);}40%,80%{transform:translateX(5px);} }
//           .animate-shake-cart{animation:shakeCart 0.5s ease-in-out;}

//           @keyframes pulseBtn{0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }
//           .animate-pulse{animation:pulseBtn 1s infinite;}

//           @keyframes headerGlow{0%,100%{box-shadow:0 0 15px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 25px 0 rgba(255,255,255,0.4);}}
//           .hover\\:animate-header-glow:hover{animation:headerGlow 2s infinite;}

//           @keyframes provinceGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,255,255,0.4);}}
//           .animate-province-glow{animation:provinceGlow 2s infinite;}

//           @keyframes cartGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,255,255,0.4);}}
//           .animate-cart-glow{animation:cartGlow 2s infinite;}

//           @keyframes searchGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,235,59,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,235,59,0.5);}}
//           .animate-search-glow{animation:searchGlow 2s infinite;}

//           @keyframes iconGlow{0%,100%{color:#f0f;}50%{color:#0ff;}}
//           .animate-icon-glow{animation:iconGlow 2s infinite;}

//           @keyframes gradientPulse{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
//           .animate-gradient-pulse{background-size:200% 200%; animation:gradientPulse 3s ease infinite; background-image: linear-gradient(270deg, #f87171, #fb7185, #facc15, #34d399, #3b82f6, #6366f1);}

//           .focus\\:shadow-glow:focus{box-shadow:0 0 12px 4px rgba(255,235,59,0.6);}

//           .shadow-neon{box-shadow: 0 0 5px #fff, 0 0 10px #f0f, 0 0 20px #0ff;}
//           .hover\\:shadow-neon-lg:hover{box-shadow: 0 0 10px #fff, 0 0 20px #f0f, 0 0 40px #0ff;}
//         `}
//       </style>
//     </>
//   );
// }


import { Link, useNavigate } from "react-router-dom";   
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header({ user, cart, province, setProvince, onLogout, onSearch }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shakeCart, setShakeCart] = useState(false);
  const prevCartLength = useState(cart.length)[0];

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:3001/api/users/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfileImage(res.data?.profileImage ? `http://localhost:3001${res.data.profileImage}` : "/default-profile.png");
      } catch {
        setProfileImage("/default-profile.png");
      }
    };
    fetchProfileImage();
  }, [user]);

  const logout = () => {
    fetch("http://localhost:3001/api/auth/logout", { method: "POST", credentials: "include" })
      .then(() => {
        onLogout();
        toast.success("Logged out successfully!");
        navigate("/login");
      });
  };

  const provinces = ["Koshi","Madhesh","Bagmati","Gandaki","Lumbini","Karnali","Sudurpashchim"];
  const handleSearchChange = (e) => { setSearchInput(e.target.value); onSearch(e.target.value); };

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > prevCartLength) {
      setShakeCart(true);
      const timer = setTimeout(() => setShakeCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cart.length, prevCartLength]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
      <header className={`fixed top-0 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white shadow-xl z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? "py-3 shadow-2xl" : "py-4"} hover:animate-header-glow`}>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button aria-label="Toggle Menu" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-white hover:text-yellow-300 transition-colors duration-300 select-none">
              <span className={`block w-8 h-1 bg-white mb-1 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
              <span className={`block w-8 h-1 bg-white mb-1 rounded transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`block w-8 h-1 bg-white rounded transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
            </button>

            <h1 className="text-2xl sm:text-3xl font-extrabold cursor-pointer hover:text-yellow-300 transition-colors duration-300">
              <Link to="/">FoodOrderNP</Link>
            </h1>

            <select className="hidden md:block bg-white text-black rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow duration-300" value={province} onChange={(e) => setProvince(e.target.value)} title="Select Province">
              <option value="">Select Province</option>
              {provinces.map((prov) => (<option key={prov} value={prov}>{prov}</option>))}
            </select>

            {province && (
              <div className="hidden md:inline-block ml-2 sm:ml-4 font-semibold bg-green-700 px-4 sm:px-6 py-1 sm:py-2 rounded text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow duration-300 animate-province-glow">
                Province: {province}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative text-gray-600 group">
              <input type="search" placeholder="Search food..." value={searchInput} onChange={handleSearchChange} className="bg-white h-9 sm:h-10 px-10 sm:px-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-glow text-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs group-hover:animate-search-glow"/>
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-pink-400 animate-icon-glow" size={16}/>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {["Home","Cart","About","Contact"].map(item => (
                <Link key={item} to={item==="Home"?"/":`/${item.toLowerCase()}`} className="font-semibold text-white relative group">
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              {user ? (
                <>
                  <img src={profileImage || "/default-profile.png"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-110 transform transition-transform duration-300 animate-float animate-profile-glow" onClick={() => navigate("/profile")} title={`Hello, ${user.name}`}/>
                  <button onClick={logout} className="px-4 py-2 rounded-md font-extrabold text-white text-base border border-white border-opacity-30 animate-login-logout transition-all duration-300">Logout</button>
                </>
              ) : (
                <Link to="/login" className="px-4 py-2 rounded-md font-extrabold text-white text-base border border-white border-opacity-30 animate-login-logout transition-all duration-300">Login</Link>
              )}

              <div className={`relative cursor-pointer hover:scale-110 transition-transform duration-300 animate-float ${shakeCart?"animate-shake-cart":""} animate-cart-glow`} onClick={() => navigate("/cart")} title="Cart">
                <FaShoppingCart className="text-2xl animate-icon-glow"/>
                {cart.length>0 && <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold animate-pulse">{cart.reduce((a,c)=>a+c.qty,0)}</span>}
              </div>
            </nav>
          </div>
        </div>

        <nav className={`md:hidden fixed top-16 left-0 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen?"translate-x-0":"-translate-x-full"} backdrop-blur-md`}>
          <div className="flex flex-col space-y-4 px-6 py-6">
            {["Home","Cart","About","Contact"].map((item,index)=>(<Link key={item} to={item==="Home"?"/":`/${item.toLowerCase()}`} className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-300 transition-colors duration-500 animate-bounce-menu" style={{animationDelay:`${index*0.1}s`}} onClick={()=>setMenuOpen(false)}>{item}</Link>))}
            {user ? (
              <>
                <img src={profileImage||"/default-profile.png"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white cursor-pointer mb-2 mx-2 hover:scale-110 transform transition-transform duration-300 animate-float animate-profile-glow" onClick={()=>{navigate("/profile");setMenuOpen(false);}} title={`Hello, ${user.name}`}/>
                <button onClick={()=>{logout();setMenuOpen(false);}} className="px-4 py-2 rounded-md font-extrabold text-white text-lg border border-white border-opacity-30 animate-login-logout transition-all duration-300 w-full text-center">Logout</button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-md font-extrabold text-white text-lg border border-white border-opacity-30 animate-login-logout transition-all duration-300 w-full text-center" onClick={()=>setMenuOpen(false)}>Login</Link>
            )}
          </div>
        </nav>
      </header>

      <style>
        {`
          @keyframes float {0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
          .animate-float{animation:float 3s ease-in-out infinite;}

          @keyframes bounceMenu{0%{transform:translateX(-20px);opacity:0;}60%{transform:translateX(10px);opacity:1;}100%{transform:translateX(0);opacity:1;}}
          .animate-bounce-menu{animation:bounceMenu 0.5s forwards;}

          @keyframes shakeCart{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-5px);}40%,80%{transform:translateX(5px);} }
          .animate-shake-cart{animation:shakeCart 0.5s ease-in-out;}

          @keyframes pulseBtn{0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }
          .animate-pulse{animation:pulseBtn 1s infinite;}

          @keyframes headerGlow{0%,100%{box-shadow:0 0 15px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 25px 0 rgba(255,255,255,0.4);}}
          .hover\\:animate-header-glow:hover{animation:headerGlow 2s infinite;}

          @keyframes provinceGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,255,255,0.4);}}
          .animate-province-glow{animation:provinceGlow 2s infinite;}

          @keyframes cartGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,255,255,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,255,255,0.4);}}
          .animate-cart-glow{animation:cartGlow 2s infinite;}

          @keyframes searchGlow{0%,100%{box-shadow:0 0 5px 0 rgba(255,235,59,0.2);}50%{box-shadow:0 0 15px 0 rgba(255,235,59,0.5);}}
          .animate-search-glow{animation:searchGlow 2s infinite;}

          @keyframes iconGlow{0%,100%{color:#f0f;}50%{color:#0ff;}}
          .animate-icon-glow{animation:iconGlow 2s infinite;}

          @keyframes gradientPulse{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
          .animate-gradient-pulse{background-size:200% 200%; animation:gradientPulse 3s ease infinite; background-image: linear-gradient(270deg, #f87171, #fb7185, #facc15, #34d399, #3b82f6, #6366f1);}

          @keyframes loginLogoutGlow{0%{background-color:#f87171;}25%{background-color:#fb7185;}50%{background-color:#34d399;}75%{background-color:#3b82f6;}100%{background-color:#facc15;}}
          .animate-login-logout{animation:loginLogoutGlow 2.5s infinite alternate;}

          @keyframes profileGlow{0%{box-shadow:0 0 5px #f0f;}25%{box-shadow:0 0 8px #fb7185;}50%{box-shadow:0 0 12px #34d399;}75%{box-shadow:0 0 8px #3b82f6;}100%{box-shadow:0 0 5px #facc15;}}
          .animate-profile-glow{animation:profileGlow 3s infinite alternate;}

          .focus\\:shadow-glow:focus{box-shadow:0 0 12px 4px rgba(255,235,59,0.6);}

          .shadow-neon{box-shadow: 0 0 5px #fff, 0 0 10px #f0f, 0 0 20px #0ff;}
          .hover\\:shadow-neon-lg:hover{box-shadow: 0 0 10px #fff, 0 0 20px #f0f, 0 0 40px #0ff;}
        `}
      </style>
    </>
  );
}
