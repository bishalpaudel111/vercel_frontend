
// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { FaPlus, FaMinus, FaShoppingCart, FaFireAlt, FaLeaf, FaDrumstickBite, FaCoffee, FaUtensils } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <ToastContainer position="top-center" autoClose={1500} />

//       {recs && recs.length > 0 && (
//         <section className="mt-8">
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//             Recommended For You
//           </h2>
//           <p className="text-center text-gray-600 mb-6 text-lg">
//             Based on your orders in <span className="font-semibold text-green-800">{province || "your province"}</span>
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item._id || item.id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && <p className="text-gray-600 mt-6 text-center italic">No recommendations yet. Add some orders to get personalized suggestions!</p>}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">Browse by Category</h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[{ label: "All", value: "all", icon: <FaUtensils /> }, { label: "Veg", value: "veg", icon: <FaLeaf /> }, { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> }, { label: "Beverages", value: "beverage", icon: <FaCoffee /> }].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${
//                 category === cat.value ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-green-100"
//               }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />) : <p className="text-gray-600 text-center col-span-full italic">No items found.</p>}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`);
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`);
//     }
//   };

//   const categoryIcons = { veg: <FaLeaf className="text-green-600" />, "non-veg": <FaDrumstickBite className="text-red-600" />, beverage: <FaCoffee className="text-yellow-600" /> };

//   return (
//     <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="relative w-full h-48 overflow-hidden">
//         <img src={item.img || item.image || "https://via.placeholder.com/150"} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
//         <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-bold rounded shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-1">Rs. {item.price}</p>
//         <p className="text-gray-500 text-sm mb-3">{item.features || `Taste: ${item.taste || "Delicious"}`}</p>
//         {quantity === 0 ? (
//           <button onClick={handleAdd} className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold w-full flex justify-center items-center gap-2">
//             <FaShoppingCart /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button onClick={handleDecrease} className="flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition">
//               <FaMinus />
//             </button>
//             <span className="font-semibold text-gray-800 text-lg">{quantity}</span>
//             <button onClick={handleAdd} className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full hover:bg-green-700 transition">
//               <FaPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };





// // working code 


// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaPlus,
//   FaMinus,
//   FaShoppingCart,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// // 🔊 Success sound effect
// const playSuccessSound = () => {
//   const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
//   audio.play();
// };

// export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <p className="text-center text-gray-600 mb-6 text-lg">
//             Based on your orders in{" "}
//             <span className="font-semibold text-green-800">{province || "your province"}</span>
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item._id || item.id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${
//                 category === cat.value
//                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//               }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: "🛒" });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: "➖" });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   return (
//     <div className="bg-gradient-to-br from-green-100 via-white to-green-50 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
//       <div className="relative w-full h-48 overflow-hidden">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold rounded shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-4 text-center">
//         <h3 className="font-extrabold text-xl mb-1 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-1 text-lg">Rs. {item.price}</p>
//         <p className="text-gray-500 text-sm mb-3">{item.features || `Taste: ${item.taste || "Delicious"}`}</p>

//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-md"
//           >
//             <FaShoppingCart /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition hover:scale-110 shadow"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-bold text-gray-800 text-lg">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full hover:bg-green-700 transition hover:scale-110 shadow"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };








// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaPlus,
//   FaMinus,
//   FaShoppingCart,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
//   audio.play();
// };

// export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <p className="text-center text-gray-600 mb-6 text-lg">
//             Based on your orders in{" "}
//             <span className="font-semibold text-green-800">{province || "your province"}</span>
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item._id || item.id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${
//                 category === cat.value
//                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//               }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: "🛒" });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: "➖" });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-2 text-lg">Rs. {item.price}</p>
//         <p className="text-gray-500 text-sm mb-4">{item.features || `Taste: ${item.taste || "Delicious"}`}</p>

//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-lg"
//           >
//             <FaShoppingCart /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition hover:scale-110 shadow-lg"
//             >
//               <FaMinus />
//             </button>
//             <span className="font-bold text-gray-800 text-lg">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full hover:bg-green-700 transition hover:scale-110 shadow-lg"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };






// // working code 

// // import React, { useState } from "react";
// // import { toast, ToastContainer, Bounce } from "react-toastify";
// // import {
// //   FaCartPlus,
// //   FaMinusSquare,
// //   FaFireAlt,
// //   FaLeaf,
// //   FaDrumstickBite,
// //   FaCoffee,
// //   FaUtensils,
// // } from "react-icons/fa";
// // import "react-toastify/dist/ReactToastify.css";

// // const playSuccessSound = () => {
// //   const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
// //   audio.play();
// // };

// // export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [category, setCategory] = useState("all");
// //   const [sortOrder, setSortOrder] = useState("default");

// //   let filteredItems = defaultFoodItems.filter((item) => {
// //     const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
// //     const matchesCategory = category === "all" ? true : item.category === category;
// //     return matchesSearch && matchesCategory;
// //   });

// //   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
// //   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

// //   const itemsPerPage = 8;
// //   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
// //   const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// //   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
// //   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

// //   return (
// //     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
// //       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

// //       {recs && recs.length > 0 && (
// //         <section className="mt-8 animate-fadeIn">
// //           <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
// //             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
// //           </h2>
// //           <p className="text-center text-gray-600 mb-6 text-lg">
// //             Based on your orders in{" "}
// //             <span className="font-semibold text-green-800">{province || "your province"}</span>
// //           </p>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
// //             {recs.map((item) => (
// //               <FoodItem key={item._id || item.id} item={item} addToCart={addToCart} />
// //             ))}
// //           </div>
// //         </section>
// //       )}

// //       {recs && recs.length === 0 && (
// //         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
// //           No recommendations yet. Add some orders to get personalized suggestions!
// //         </p>
// //       )}

// //       <section className="mt-12">
// //         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
// //           Browse by Category
// //         </h2>
// //         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
// //           {[
// //             { label: "All", value: "all", icon: <FaUtensils /> },
// //             { label: "Veg", value: "veg", icon: <FaLeaf /> },
// //             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
// //             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
// //           ].map((cat) => (
// //             <button
// //               key={cat.value}
// //               onClick={() => {
// //                 setCategory(cat.value);
// //                 setCurrentPage(1);
// //               }}
// //               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${
// //                 category === cat.value
// //                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
// //                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
// //               }`}
// //             >
// //               {cat.icon} {cat.label}
// //             </button>
// //           ))}
// //           <select
// //             value={sortOrder}
// //             onChange={(e) => setSortOrder(e.target.value)}
// //             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
// //           >
// //             <option value="default">Sort by</option>
// //             <option value="low-high">Price: Low → High</option>
// //             <option value="high-low">Price: High → Low</option>
// //           </select>
// //         </div>
// //       </section>

// //       <section>
// //         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
// //           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
// //         </h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //           {currentItems.length > 0 ? (
// //             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
// //           ) : (
// //             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
// //           )}
// //         </div>
// //         {filteredItems.length > itemsPerPage && (
// //           <div className="flex justify-center mt-8 gap-4">
// //             <button
// //               onClick={handlePrev}
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 rounded-lg font-semibold transition ${
// //                 currentPage === 1
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
// //               }`}
// //             >
// //               Previous
// //             </button>
// //             <span className="px-4 py-2 font-semibold text-gray-700">
// //               Page {currentPage} of {totalPages}
// //             </span>
// //             <button
// //               onClick={handleNext}
// //               disabled={currentPage === totalPages}
// //               className={`px-4 py-2 rounded-lg font-semibold transition ${
// //                 currentPage === totalPages
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
// //               }`}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// // const FoodItem = ({ item, addToCart }) => {
// //   const [quantity, setQuantity] = useState(0);

// //   const handleAdd = () => {
// //     setQuantity(quantity + 1);
// //     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
// //     playSuccessSound();
// //     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
// //   };

// //   const handleDecrease = () => {
// //     if (quantity > 0) {
// //       setQuantity(quantity - 1);
// //       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
// //     }
// //   };

// //   const categoryIcons = {
// //     veg: <FaLeaf className="text-green-600" />,
// //     "non-veg": <FaDrumstickBite className="text-red-600" />,
// //     beverage: <FaCoffee className="text-yellow-600" />,
// //   };

// //   return (
// //     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
// //       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
// //         <img
// //           src={item.img || item.image || "https://via.placeholder.com/150"}
// //           alt={item.name}
// //           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
// //         />
// //         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full shadow flex items-center gap-1">
// //           {categoryIcons[item.category]} {item.category?.toUpperCase()}
// //         </span>
// //         {item.popular && (
// //           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
// //             <FaFireAlt /> Popular
// //           </span>
// //         )}
// //       </div>
// //       <div className="p-5 text-center">
// //         <h3 className="font-extrabold text-xl mb-2 text-gray-800">{item.name}</h3>
// //         <p className="text-green-700 font-bold mb-2 text-lg">Rs. {item.price}</p>
// //         <p className="text-gray-500 text-sm mb-4">{item.features || `Taste: ${item.taste || "Delicious"}`}</p>

// //         {quantity === 0 ? (
// //           <button
// //             onClick={handleAdd}
// //             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
// //           >
// //             <FaCartPlus className="animate-bounce" /> Add to Cart
// //           </button>
// //         ) : (
// //           <div className="flex justify-between items-center gap-4">
// //             <button
// //               onClick={handleDecrease}
// //               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
// //             >
// //               <FaMinusSquare />
// //             </button>
// //             <span className="font-bold text-gray-800 text-xl">{quantity}</span>
// //             <button
// //               onClick={handleAdd}
// //               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
// //             >
// //               <FaCartPlus />
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// // final work code


// // import React, { useState } from "react";
// // import { toast, ToastContainer, Bounce } from "react-toastify";
// // import {
// //   FaCartPlus,
// //   FaMinusSquare,
// //   FaFireAlt,
// //   FaLeaf,
// //   FaDrumstickBite,
// //   FaCoffee,
// //   FaUtensils,
// // } from "react-icons/fa";
// // import "react-toastify/dist/ReactToastify.css";

// // const playSuccessSound = () => {
// //   const audio = new Audio(
// //     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
// //   );
// //   audio.play();
// // };

// // export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [category, setCategory] = useState("all");
// //   const [sortOrder, setSortOrder] = useState("default");

// //   let filteredItems = defaultFoodItems.filter((item) => {
// //     const matchesSearch = searchTerm
// //       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
// //       : true;
// //     const matchesCategory = category === "all" ? true : item.category === category;
// //     return matchesSearch && matchesCategory;
// //   });

// //   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
// //   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

// //   const itemsPerPage = 8;
// //   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
// //   const currentItems = filteredItems.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
// //   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

// //   return (
// //     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
// //       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

// //       {/* Recommendation Section */}
// //       {recs && recs.length > 0 && (
// //         <section className="mt-8 animate-fadeIn">
// //           <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
// //             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
// //           </h2>
// //           <p className="text-center text-gray-600 mb-6 text-lg">
// //             Based on your orders in{" "}
// //             <span className="font-semibold text-green-800">{province || "your province"}</span>
// //           </p>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
// //             {recs.map((item) => (
// //               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
// //             ))}
// //           </div>
// //         </section>
// //       )}

// //       {recs && recs.length === 0 && (
// //         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
// //           No recommendations yet. Add some orders to get personalized suggestions!
// //         </p>
// //       )}

// //       {/* Category & Sorting */}
// //       <section className="mt-12">
// //         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
// //           Browse by Category
// //         </h2>
// //         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
// //           {[
// //             { label: "All", value: "all", icon: <FaUtensils /> },
// //             { label: "Veg", value: "veg", icon: <FaLeaf /> },
// //             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
// //             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
// //           ].map((cat) => (
// //             <button
// //               key={cat.value}
// //               onClick={() => {
// //                 setCategory(cat.value);
// //                 setCurrentPage(1);
// //               }}
// //               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${
// //                 category === cat.value
// //                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
// //                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
// //               }`}
// //             >
// //               {cat.icon} {cat.label}
// //             </button>
// //           ))}
// //           <select
// //             value={sortOrder}
// //             onChange={(e) => setSortOrder(e.target.value)}
// //             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
// //           >
// //             <option value="default">Sort by</option>
// //             <option value="low-high">Price: Low → High</option>
// //             <option value="high-low">Price: High → Low</option>
// //           </select>
// //         </div>
// //       </section>

// //       {/* All Food Items */}
// //       <section>
// //         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
// //           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
// //         </h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //           {currentItems.length > 0 ? (
// //             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
// //           ) : (
// //             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
// //           )}
// //         </div>
// //         {filteredItems.length > itemsPerPage && (
// //           <div className="flex justify-center mt-8 gap-4">
// //             <button
// //               onClick={handlePrev}
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 rounded-lg font-semibold transition ${
// //                 currentPage === 1
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
// //               }`}
// //             >
// //               Previous
// //             </button>
// //             <span className="px-4 py-2 font-semibold text-gray-700">
// //               Page {currentPage} of {totalPages}
// //             </span>
// //             <button
// //               onClick={handleNext}
// //               disabled={currentPage === totalPages}
// //               className={`px-4 py-2 rounded-lg font-semibold transition ${
// //                 currentPage === totalPages
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
// //               }`}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// // const FoodItem = ({ item, addToCart }) => {
// //   const [quantity, setQuantity] = useState(0);

// //   const handleAdd = () => {
// //     setQuantity(quantity + 1);
// //     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
// //     playSuccessSound();
// //     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
// //   };

// //   const handleDecrease = () => {
// //     if (quantity > 0) {
// //       setQuantity(quantity - 1);
// //       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
// //     }
// //   };

// //   const categoryIcons = {
// //     veg: <FaLeaf className="text-green-600" />,
// //     "non-veg": <FaDrumstickBite className="text-red-600" />,
// //     beverage: <FaCoffee className="text-yellow-600" />,
// //   };

// //   const featureKeys = Object.keys(item).filter(
// //     (key) => !["id", "_id", "name", "price", "img", "image"].includes(key)
// //   );

// //   return (
// //     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
// //       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
// //         <img
// //           src={item.img || item.image || "https://via.placeholder.com/150"}
// //           alt={item.name}
// //           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
// //         />
// //         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-bold rounded-full shadow flex items-center gap-1">
// //           {categoryIcons[item.category]} {item.category?.toUpperCase()}
// //         </span>
// //         {item.popular && (
// //           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
// //             <FaFireAlt /> Popular
// //           </span>
// //         )}
// //       </div>
// //       <div className="p-5 text-center">
// //         <h3 className="font-extrabold text-xl mb-2 text-gray-800">{item.name}</h3>
// //         <p className="text-green-700 font-bold mb-2 text-lg">Rs. {item.price}</p>
// //         <div className="flex flex-wrap justify-center gap-2 mb-3">
// //           {featureKeys.map((key) => (
// //             <span
// //               key={key}
// //               className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
// //             >
// //               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
// //             </span>
// //           ))}
// //         </div>
// //         {quantity === 0 ? (
// //           <button
// //             onClick={handleAdd}
// //             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
// //           >
// //             <FaCartPlus className="animate-bounce" /> Add to Cart
// //           </button>
// //         ) : (
// //           <div className="flex justify-between items-center gap-4">
// //             <button
// //               onClick={handleDecrease}
// //               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
// //             >
// //               <FaMinusSquare />
// //             </button>
// //             <span className="font-bold text-gray-800 text-xl">{quantity}</span>
// //             <button
// //               onClick={handleAdd}
// //               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
// //             >
// //               <FaCartPlus />
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };





// good code
// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {/* Recommendation Section */}
//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       {/* Category & Sorting */}
//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${
//                 category === cat.value
//                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//               }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       {/* All Food Items */}
//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   // Feature keys to show (exclude technical keys)
//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "img", "image"].includes(key)
//   );

//   // Badge colors based on feature type
//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-3 text-lg md:text-xl">Rs. {item.price}</p>
//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };







// final working code 


// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {/* Recommendation Section */}


//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>


//         </section>
//       )} 





//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       {/* Category & Sorting */}
//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       {/* All Food Items */}
//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   // Feature keys to show (exclude technical keys)
//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "img", "image"].includes(key)
//   );

//   // Badge colors based on feature type
//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-3 text-lg md:text-xl">Rs. {item.price}</p>

//       {/* <p className="text-gray-500 text-sm mb-4">{item.features || `Taste: ${item.taste || "Delicious"}`}</p> */}


//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };








// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                   ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({ id: item._id || item.id, name: item.name, price: item.price, img: item.img || item.image });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "img", "image"].includes(key)
//   );

//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-3 text-lg md:text-xl">Rs. {item.price}</p>
//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[
//             { label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> },
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                 ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                 : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({
//       id: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       img: item.img || item.image,
//       taste: item.taste
//     });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "taste", "img", "image"].includes(key)
//   );

//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>
//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-2 text-lg md:text-xl">Rs. {item.price}</p>
//         {item.taste && <p className="text-yellow-700 font-semibold mb-3 text-md md:text-lg">Taste: {item.taste}</p>}
//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[{ label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> }
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                 ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                 : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({
//       id: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       img: item.img || item.image,
//       taste: item.taste,
//     });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "taste", "img", "image"].includes(key)
//   );

//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>


//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-2 text-lg md:text-xl">Rs. {item.price}</p>
//         {item.taste && <p className="text-yellow-700 font-semibold mb-3 text-md md:text-lg">Taste: {item.taste}</p>}
//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>


//     </div>
//   );
// };





// good and final working code 
// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[{ label: "All", value: "all", icon: <FaUtensils /> },
//             { label: "Veg", value: "veg", icon: <FaLeaf /> },
//             { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//             { label: "Beverages", value: "beverage", icon: <FaCoffee /> }
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                 ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                 : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({
//       id: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       img: item.img || item.image,
//       taste: item.taste,
//     });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "taste", "img", "image"].includes(key)
//   );

//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>

//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-2 text-lg md:text-xl">Rs. {item.price}</p>
//         {item.taste && <p className="text-yellow-700 font-semibold mb-3 text-md md:text-lg">Taste: {item.taste}</p>}
//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




//  working code latest tihar 
// import React, { useState } from "react";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import {
//   FaCartPlus,
//   FaMinusSquare,
//   FaFireAlt,
//   FaLeaf,
//   FaDrumstickBite,
//   FaCoffee,
//   FaUtensils,
// } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const playSuccessSound = () => {
//   const audio = new Audio(
//     "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
//   );
//   audio.play();
// };

// export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   let filteredItems = defaultFoodItems.filter((item) => {
//     const matchesSearch = searchTerm
//       ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;
//     const matchesCategory = category === "all" ? true : item.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
//   else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//   const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

//   return (
//     <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
//       <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

//       {recs && recs.length > 0 && (
//         <section className="mt-8 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
//             <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {recs.map((item) => (
//               <FoodItem key={item.id || item._id} item={{...item}} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>
//       )}

//       {recs && recs.length === 0 && (
//         <p className="text-gray-600 mt-6 text-center italic animate-bounce">
//           No recommendations yet. Add some orders to get personalized suggestions!
//         </p>
//       )}

//       <section className="mt-12">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
//           Browse by Category
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
//           {[{ label: "All", value: "all", icon: <FaUtensils /> },
//           { label: "Veg", value: "veg", icon: <FaLeaf /> },
//           { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
//           { label: "Beverages", value: "beverage", icon: <FaCoffee /> }
//           ].map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => {
//                 setCategory(cat.value);
//                 setCurrentPage(1);
//               }}
//               className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
//                 ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
//                 : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
//                 }`}
//             >
//               {cat.icon} {cat.label}
//             </button>
//           ))}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="low-high">Price: Low → High</option>
//             <option value="high-low">Price: High → Low</option>
//           </select>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
//           {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {currentItems.length > 0 ? (
//             currentItems.map((item) => (
//               <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
//             ))
//           ) : (
//             <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
//           )}
//         </div>
//         {filteredItems.length > itemsPerPage && (
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 font-semibold text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// const FoodItem = ({ item, addToCart }) => {
//   const [quantity, setQuantity] = useState(0);

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//     addToCart({
//       id: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       img: item.img || item.image,
//       taste: item.taste,
//     });
//     playSuccessSound();
//     toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
//   };

//   const handleDecrease = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//       toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
//     }
//   };

//   const categoryIcons = {
//     veg: <FaLeaf className="text-green-600" />,
//     "non-veg": <FaDrumstickBite className="text-red-600" />,
//     beverage: <FaCoffee className="text-yellow-600" />,
//   };

//   const featureKeys = Object.keys(item).filter(
//     (key) => !["id", "_id", "name", "price", "taste", "img", "image"].includes(key)
//   );

//   const badgeColor = (key) => {
//     switch (key) {
//       case "category":
//         return "bg-green-100 text-green-800";
//       case "taste":
//         return "bg-yellow-100 text-yellow-800";
//       case "popular":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
//       <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
//         <img
//           src={item.img || item.image || "https://via.placeholder.com/150"}
//           alt={item.name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
//           {categoryIcons[item.category]} {item.category?.toUpperCase()}
//         </span>
//         {item.popular && (
//           <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
//             <FaFireAlt /> Popular
//           </span>
//         )}
//       </div>

//       <div className="p-5 text-center">
//         <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
//         <p className="text-green-700 font-bold mb-2 text-lg md:text-xl">Rs. {item.price}</p>
//         <p className="text-gray-600 mb-2">Taste: <span className="font-semibold">{item.taste || "N/A"}</span></p>


//         <div className="flex flex-wrap justify-center gap-2 mb-3">
//           {featureKeys.map((key) => (
//             <span
//               key={key}
//               className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
//             >
//               {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
//             </span>
//           ))}
//         </div>
//         {quantity === 0 ? (
//           <button
//             onClick={handleAdd}
//             className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
//           >
//             <FaCartPlus className="animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex justify-between items-center gap-4">
//             <button
//               onClick={handleDecrease}
//               className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaMinusSquare />
//             </button>
//             <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
//             <button
//               onClick={handleAdd}
//               className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
//             >
//               <FaCartPlus />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




import React, { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import {
  FaCartPlus,
  FaMinusSquare,
  FaFireAlt,
  FaLeaf,
  FaDrumstickBite,
  FaCoffee,
  FaUtensils,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const playSuccessSound = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
  );
  audio.play();
};

export default function Home({ addToCart, recs, defaultFoodItems, searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  let filteredItems = defaultFoodItems
    .filter((item) => {
      const matchesSearch = searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = category === "all" ? true : item.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const prefOrder = { high: 3, medium: 2, low: 1 };
      const aPref = a.preference ? prefOrder[a.preference] || 0 : 0;
      const bPref = b.preference ? prefOrder[b.preference] || 0 : 0;
      return bPref - aPref;
    });

  if (sortOrder === "low-high") filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  else if (sortOrder === "high-low") filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
      <ToastContainer position="top-center" autoClose={2000} transition={Bounce} theme="colored" />

      {recs && recs.length > 0 && (
        <section className="mt-8 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-700 tracking-wide flex justify-center items-center gap-2">
            <FaFireAlt className="text-red-500 animate-pulse" /> Recommended For You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recs.map((item) => (
              <FoodItem key={item.id || item._id} item={{ ...item }} addToCart={addToCart} />
            ))}
          </div>
        </section>
      )}

      {recs && recs.length === 0 && (
        <p className="text-gray-600 mt-6 text-center italic animate-bounce">
          No recommendations yet. Add some orders to get personalized suggestions!
        </p>
      )}

      <section className="mt-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
          Browse by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
          {[{ label: "All", value: "all", icon: <FaUtensils /> },
          { label: "Veg", value: "veg", icon: <FaLeaf /> },
          { label: "Non-Veg", value: "non-veg", icon: <FaDrumstickBite /> },
          { label: "Beverages", value: "beverage", icon: <FaCoffee /> }
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-300 ${category === cat.value
                ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:scale-105"
                }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="default">Sort by</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
          {category === "all" ? "All Food Items" : `${category.toUpperCase()} Items`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
          )}
        </div>
        {filteredItems.length > itemsPerPage && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
                }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white animate-fadeIn"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

const FoodItem = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    addToCart({
      id: item._id || item.id,
      name: item.name,
      price: item.price,
      img: item.img || item.image,
      taste: item.taste,
    });
    playSuccessSound();
    toast.success(`${item.name} added! Quantity: ${quantity + 1}`, { icon: <FaCartPlus /> });
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      toast.info(`${item.name} decreased! Quantity: ${quantity - 1}`, { icon: <FaMinusSquare /> });
    }
  };

  const categoryIcons = {
    veg: <FaLeaf className="text-green-600" />,
    "non-veg": <FaDrumstickBite className="text-red-600" />,
    beverage: <FaCoffee className="text-yellow-600" />,
  };

  const featureKeys = Object.keys(item).filter(
    (key) => !["id", "_id", "name", "price", "taste", "img", "image", "preference"].includes(key)
  );

  const badgeColor = (key) => {
    switch (key) {
      case "category":
        return "bg-green-100 text-green-800";
      case "taste":
        return "bg-yellow-100 text-yellow-800";
      case "popular":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-green-100">
      <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
        <img
          src={item.img || item.image || "https://via.placeholder.com/150"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm md:text-xs font-bold rounded-full shadow flex items-center gap-1">
          {categoryIcons[item.category]} {item.category?.toUpperCase()}
        </span>
        {item.popular && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm md:text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
            <FaFireAlt /> Popular
          </span>
        )}
      </div>

      <div className="p-5 text-center">
        <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-gray-800">{item.name}</h3>
        <p className="text-green-700 font-bold mb-2 text-lg md:text-xl">Rs. {item.price}</p>
        <p className="text-gray-600 mb-2">Taste: <span className="font-semibold">{item.taste || "Delicious"}</span></p>

        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {featureKeys.map((key) => (
            <span
              key={key}
              className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm ${badgeColor(key)}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}: {String(item[key])}
            </span>
          ))}
        </div>
        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200 font-semibold w-full flex justify-center items-center gap-2 shadow-2xl"
          >
            <FaCartPlus className="animate-bounce" /> Add to Cart
          </button>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleDecrease}
              className="flex items-center justify-center bg-red-500 text-white w-12 h-12 rounded-lg hover:bg-red-600 transition hover:scale-125 shadow-2xl text-2xl"
            >
              <FaMinusSquare />
            </button>
            <span className="font-bold text-gray-800 text-xl md:text-2xl">{quantity}</span>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-lg hover:bg-green-700 transition hover:scale-125 shadow-2xl text-2xl"
            >
              <FaCartPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
