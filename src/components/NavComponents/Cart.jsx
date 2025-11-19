
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
// const ESEWA_GATEWAY = import.meta.env.VITE_ESEWA_GATEWAY || "https://esewa.com.np";
// const PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE || "your_product_code";

// export default function Cart({ updateQty, deleteItem, clearCart, user, province, cartItems }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const saveOrderAndItems = async (transaction_uuid) => {
//     try {
//       if (!user?._id) throw new Error("User not logged in");

//       // Only call admin endpoint if token exists
//       const adminToken = localStorage.getItem("adminToken");
//       if (adminToken) {
//         await Promise.all(
//           cartItems.map(async (item) => {
//             await axios.post(
//               `${BASE_URL}/api/admin/items`,
//               {
//                 name: item.name,
//                 price: item.price,
//                 category: item.category || "General",
//                 inStock: true,
//               },
//               {
//                 headers: { Authorization: `Bearer ${adminToken}` },
//               }
//             );
//           })
//         );
//       }

//       // Save order
//       const orderRes = await axios.post(
//         `${BASE_URL}/api/order/submit`,
//         {
//           userId: user._id,
//           items: cartItems.map((i) => ({
//             id: i._id || i.id,
//             name: i.name,
//             price: i.price,
//             qty: i.qty,
//             img: i.img,
//           })),
//           totalPrice: total,
//           province,
//           name: user.name,
//           email: user.email,
//           transaction_uuid,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           withCredentials: true,
//         }
//       );

//       return orderRes.data.order;
//     } catch (err) {
//       console.error("Error saving order/items:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   const handleEsewaPayment = async () => {
//     if (!cartItems.length) return alert("Cart is empty.");
//     if (!user?._id) return alert("Please login before checkout.");

//     try {
//       setLoading(true);

//       console.log("Initializing eSewa payment...", {
//         items: cartItems,
//         totalPrice: total,
//         userId: user._id,
//       });

//       const initRes = await axios.post(`${BASE_URL}/initialize-esewa`, {
//         items: cartItems.map((item) => ({
//           itemId: item._id || item.id,
//           name: item.name,
//           price: item.price,
//           qty: item.qty,
//         })),
//         totalPrice: total,
//         userId: user._id,
//       });

//       if (!initRes.data.success) {
//         console.error("Payment initialization failed:", initRes.data);
//         alert("Payment initialization failed.");
//         setLoading(false);
//         return;
//       }

//       const { signature, signed_field_names } = initRes.data.payment;
//       const transaction_uuid = initRes.data.purchasedItemData._id;

//       await saveOrderAndItems(transaction_uuid);

//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       localStorage.setItem("province", province);

//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = `${ESEWA_GATEWAY}/api/epay/main/v2/form`;

//       const fields = {
//         amount: total,
//         tax_amount: 0,
//         failure_url: `${window.location.origin}/payment-failure`,
//         product_delivery_charge: 0,
//         product_service_charge: 0,
//         product_code: PRODUCT_CODE,
//         signature,
//         signed_field_names,
//         success_url: `${window.location.origin}/payment-success?transaction_uuid=${transaction_uuid}`,
//         total_amount: total,
//         transaction_uuid,
//       };

//       Object.entries(fields).forEach(([key, value]) => {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = value;
//         form.appendChild(input);
//       });

//       document.body.appendChild(form);
//       form.submit();
//     } catch (err) {
//       console.error("eSewa payment error:", err.response?.data || err.message);
//       alert("Failed to process eSewa payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-[90px]">
//       <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <button
//             onClick={clearCart}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
//           >
//             Clear Cart
//           </button>

//           <table className="w-full border-collapse border border-gray-300 text-center">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Item</th>
//                 <th className="border border-gray-300 p-2">Price (Rs.)</th>
//                 <th className="border border-gray-300 p-2">Quantity</th>
//                 <th className="border border-gray-300 p-2">Total</th>
//                 <th className="border border-gray-300 p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id || item.id}>
//                   <td className="border border-gray-300 p-2">{item.name}</td>
//                   <td className="border border-gray-300 p-2">{item.price}</td>
//                   <td className="border border-gray-300 p-2">
//                     <div className="flex justify-center items-center gap-2">
//                       <button
//                         className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                         onClick={() => updateQty(item.id || item._id, -1)}
//                         disabled={item.qty === 1}
//                       >
//                         -
//                       </button>
//                       <span>{item.qty}</span>
//                       <button
//                         className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                         onClick={() => updateQty(item.id || item._id, 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="border border-gray-300 p-2">{item.price * item.qty}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       onClick={() => deleteItem(item.id || item._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="text-right mt-4 text-lg font-bold">Total: Rs. {total}</div>

//           <button
//             className={`mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={handleEsewaPayment}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Checkout with eSewa"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


// working code
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
// const ESEWA_GATEWAY = import.meta.env.VITE_ESEWA_GATEWAY || "https://esewa.com.np";
// const PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE || "your_product_code";

// export default function Cart({ updateQty, deleteItem, clearCart, user, province, cartItems }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [localCart, setLocalCart] = useState([]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setLocalCart(storedCart);
//   }, []);

//   // Sync cart to localStorage whenever cartItems or localCart change
//   useEffect(() => {
//     const currentCart = cartItems.length ? cartItems : localCart;
//     localStorage.setItem("cartItems", JSON.stringify(currentCart));
//   }, [cartItems, localCart]);

//   const items = cartItems.length ? cartItems : localCart;
//   const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const saveOrderAndItems = async (transaction_uuid) => {
//     if (!user?._id) throw new Error("User not logged in");

//     const adminToken = localStorage.getItem("adminToken");
//     if (adminToken) {
//       await Promise.all(
//         items.map(async (item) => {
//           await axios.post(
//             `${BASE_URL}/api/admin/items`,
//             { name: item.name, price: item.price, category: item.category || "General", inStock: true },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//           );
//         })
//       );
//     }

//     const orderRes = await axios.post(
//       `${BASE_URL}/api/order/submit`,
//       {
//         userId: user._id,
//         items: items.map((i) => ({
//           id: i._id || i.id,
//           name: i.name,
//           price: i.price,
//           qty: i.qty,
//           img: i.img || "",
//         })),
//         totalPrice: total,
//         province,
//         name: user.name,
//         email: user.email,
//         transaction_uuid,
//       },
//       { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, withCredentials: true }
//     );
//     return orderRes.data.order;
//   };

//   const handleEsewaPayment = async () => {
//     if (!items.length) return toast.error("Cart is empty");
//     if (!user?._id) return toast.error("Please login before checkout");

//     try {
//       setLoading(true);

//       const initRes = await axios.post(`${BASE_URL}/initialize-esewa`, {
//         items: items.map((item) => ({ itemId: item._id || item.id, name: item.name, price: item.price, qty: item.qty })),
//         totalPrice: total,
//         userId: user._id,
//       });

//       if (!initRes.data.success) {
//         setLoading(false);
//         return toast.error("Payment initialization failed");
//       }

//       const { signature, signed_field_names } = initRes.data.payment;
//       const transaction_uuid = initRes.data.purchasedItemData._id;

//       await saveOrderAndItems(transaction_uuid);

//       // Save cart and province locally for persistence
//       localStorage.setItem("cartItems", JSON.stringify(items));
//       localStorage.setItem("province", province);

//       // Submit eSewa form
//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = `${ESEWA_GATEWAY}/api/epay/main/v2/form`;
//       const fields = {
//         amount: total,
//         tax_amount: 0,
//         failure_url: `${window.location.origin}/payment-failure`,
//         product_delivery_charge: 0,
//         product_service_charge: 0,
//         product_code: PRODUCT_CODE,
//         signature,
//         signed_field_names,
//         success_url: `${window.location.origin}/payment-success?transaction_uuid=${transaction_uuid}`,
//         total_amount: total,
//         transaction_uuid,
//       };
//       Object.entries(fields).forEach(([key, value]) => {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = value;
//         form.appendChild(input);
//       });
//       document.body.appendChild(form);
//       form.submit();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to process eSewa payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-[90px] px-4">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">Your Cart</h2>
//       {items.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10 animate-pulse">Your cart is empty</p>
//       ) : (
//         <>
//           <button
//             onClick={clearCart}
//             className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 mb-6"
//           >
//             <FaTrash /> Clear Cart
//           </button>
//           <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
//             <table className="w-full text-center border-collapse">
//               <thead className="bg-green-100 text-gray-700 text-sm uppercase tracking-wide">
//                 <tr>
//                   <th className="p-3 border-b">Item</th>
//                   <th className="p-3 border-b">Price (Rs.)</th>
//                   <th className="p-3 border-b">Quantity</th>
//                   <th className="p-3 border-b">Total</th>
//                   <th className="p-3 border-b">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700">
//                 {items.map((item) => (
//                   <tr key={item._id || item.id} className="hover:bg-green-50 transition-all duration-300">
//                     <td className="p-3 border-b flex items-center gap-3 justify-center">
//                       <img
//                         src={item.img || "https://via.placeholder.com/40"}
//                         alt={item.name}
//                         className="w-12 h-12 object-cover rounded-lg shadow-sm"
//                       />
//                       {item.name}
//                     </td>
//                     <td className="p-3 border-b">{item.price}</td>
//                     <td className="p-3 border-b">
//                       <div className="flex justify-center items-center gap-2">
//                         <button
//                           className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                           onClick={() => updateQty(item.id || item._id, -1)}
//                           disabled={item.qty === 1}
//                         >
//                           <FaMinus />
//                         </button>
//                         <span className="font-semibold text-gray-800">{item.qty}</span>
//                         <button
//                           className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                           onClick={() => updateQty(item.id || item._id, 1)}
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="p-3 border-b font-bold">{item.price * item.qty}</td>
//                     <td className="p-3 border-b">
//                       <button
//                         onClick={() => deleteItem(item.id || item._id)}
//                         className="text-red-600 hover:text-red-800 transition-all duration-200"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
//             <div className="text-xl font-bold text-gray-800">Total: Rs. {total}</div>
//             <button
//               onClick={handleEsewaPayment}
//               disabled={loading}
//               className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 ${
//                 loading ? "opacity-50 cursor-not-allowed animate-pulse" : "animate-bounce"
//               }`}
//             >
//               <FaShoppingCart /> {loading ? "Processing..." : "Checkout with eSewa"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const ESEWA_GATEWAY = import.meta.env.VITE_ESEWA_GATEWAY || "https://esewa.com.np";
const PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE || "your_product_code";

export default function Cart({ updateQty, deleteItem, clearCart, user, province, cartItems }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setLocalCart(storedCart);
  }, []);

  useEffect(() => {
    const currentCart = cartItems.length ? cartItems : localCart;
    localStorage.setItem("cartItems", JSON.stringify(currentCart));
  }, [cartItems, localCart]);

  const items = cartItems.length ? cartItems : localCart;
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleQtyChange = (id, delta) => {
    updateQty(id, delta);
    const updatedCart = items.map((item) =>
      item.id === id || item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setLocalCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id);
    const updatedCart = items.filter((item) => item.id !== id && item._id !== id);
    setLocalCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    setLocalCart([]);
    localStorage.removeItem("cartItems");
    toast.success("Cart cleared successfully");
  };

  const saveOrderAndItems = async (transaction_uuid) => {
    if (!user?._id) throw new Error("User not logged in");
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      await Promise.all(
        items.map(async (item) => {
          await axios.post(
            `${BASE_URL}/api/admin/items`,
            { name: item.name, price: item.price, category: item.category || "General", inStock: true },
            { headers: { Authorization: `Bearer ${adminToken}` } }
          );
        })
      );
    }
    const orderRes = await axios.post(
      `${BASE_URL}/api/order/submit`,
      {
        userId: user._id,
        items: items.map((i) => ({
          id: i._id || i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          img: i.img || "",
        })),
        totalPrice: total,
        province,
        name: user.name,
        email: user.email,
        transaction_uuid,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, withCredentials: true }
    );
    return orderRes.data.order;
  };

  const handleEsewaPayment = async () => {
    if (!items.length) return toast.error("Cart is empty");
    if (!user?._id) return toast.error("Please login before checkout");
    try {
      setLoading(true);
      const initRes = await axios.post(`${BASE_URL}/initialize-esewa`, {
        items: items.map((item) => ({ itemId: item._id || item.id, name: item.name, price: item.price, qty: item.qty })),
        totalPrice: total,
        userId: user._id,
      });
      if (!initRes.data.success) {
        setLoading(false);
        return toast.error("Payment initialization failed");
      }
      const { signature, signed_field_names } = initRes.data.payment;
      const transaction_uuid = initRes.data.purchasedItemData._id;
      await saveOrderAndItems(transaction_uuid);
      localStorage.setItem("cartItems", JSON.stringify(items));
      localStorage.setItem("province", province);
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `${ESEWA_GATEWAY}/api/epay/main/v2/form`;
      const fields = {
        amount: total,
        tax_amount: 0,
        failure_url: `${window.location.origin}/payment-failure`,
        product_delivery_charge: 0,
        product_service_charge: 0,
        product_code: PRODUCT_CODE,
        signature,
        signed_field_names,
        success_url: `${window.location.origin}/payment-success?transaction_uuid=${transaction_uuid}`,
        total_amount: total,
        transaction_uuid,
      };
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      toast.error("Failed to process eSewa payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-[90px] px-4">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10 animate-pulse">Your cart is empty</p>
      ) : (
        <>
          <button
            onClick={handleClearCart}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 mb-6"
          >
            <FaTrash /> Clear Cart
          </button>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
            <table className="w-full text-center border-collapse">
              <thead className="bg-green-100 text-gray-700 text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-3 border-b">Item</th>
                  <th className="p-3 border-b">Price (Rs.)</th>
                  <th className="p-3 border-b">Quantity</th>
                  <th className="p-3 border-b">Total</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {items.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-green-50 transition-all duration-300">
                    <td className="p-3 border-b flex items-center gap-3 justify-center">
                      <img
                        src={item.img || "https://via.placeholder.com/40"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      {item.name}
                    </td>
                    <td className="p-3 border-b">{item.price}</td>
                    <td className="p-3 border-b">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                          onClick={() => handleQtyChange(item.id || item._id, -1)}
                          disabled={item.qty === 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold text-gray-800">{item.qty}</span>
                        <button
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                          onClick={() => handleQtyChange(item.id || item._id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border-b font-bold">{item.price * item.qty}</td>
                    <td className="p-3 border-b">
                      <button
                        onClick={() => handleDeleteItem(item.id || item._id)}
                        className="text-red-600 hover:text-red-800 transition-all duration-200"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
            <div className="text-xl font-bold text-gray-800">Total: Rs. {total}</div>
            <button
              onClick={handleEsewaPayment}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed animate-pulse" : "animate-bounce"
              }`}
            >
              <FaShoppingCart /> {loading ? "Processing..." : "Checkout with eSewa"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}






