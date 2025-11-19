// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [items, setItems] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [newItem, setNewItem] = useState({ name: "", price: "", category: "", inStock: true });
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("users");

//   const navigate = useNavigate();

//   const fetchAll = async () => {
//     try {
//       const [usersRes, itemsRes, ordersRes, paymentsRes] = await Promise.all([
//         api.get("/admin/users"),
//         api.get("/admin/items"),
//         api.get("/admin/orders"),
//         api.get("/admin/payments"),
//       ]);
//       setUsers(usersRes.data);
//       setItems(itemsRes.data);
//       setOrders(ordersRes.data);
//       setPayments(paymentsRes.data);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) setError("Unauthorized. Please login as admin.");
//       else setError("Failed to fetch admin data.");
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const deleteUser = async (id) => {
//     if (!confirm("Delete this user?")) return;
//     await api.delete(`/admin/users/${id}`);
//     fetchAll();
//   };

//   const deleteItem = async (id) => {
//     if (!confirm("Delete this item?")) return;
//     await api.delete(`/admin/items/${id}`);
//     fetchAll();
//   };

//   const updateItem = async (id, updated) => {
//     await api.put(`/admin/items/${id}`, updated);
//     fetchAll();
//   };

//   const addItem = async () => {
//     if (!newItem.name || !newItem.price) return alert("Name and price required");
//     await api.post("/admin/items", newItem);
//     setNewItem({ name: "", price: "", category: "", inStock: true });
//     fetchAll();
//   };

//   const deleteOrder = async (id) => {
//     if (!confirm("Delete this order?")) return;
//     await api.delete(`/admin/orders/${id}`);
//     fetchAll();
//   };

//   const updateOrderStatus = async (id, status) => {
//     await api.put(`/admin/orders/${id}`, { status });
//     fetchAll();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken"); 
//     navigate("/admin-login"); 
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-6 h-16 z-50">
//         <h1 className="text-2xl font-bold text-gray-800 tracking-tight">⚡ Admin Dashboard</h1>
//         <div className="flex gap-2 items-center">
//           {["users", "items", "orders", "payments"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 activeTab === tab
//                   ? "bg-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}

//           <button
//             onClick={handleLogout}
//             className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <div className="p-8 mt-[80px] max-w-6xl mx-auto">
//         {error && (
//           <p className="mb-6 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-sm">
//             {error}
//           </p>
//         )}

//         {activeTab === "users" && (
//           <section className="mb-12">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">👥 Users</h2>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
//               {users.length ? (
//                 users.map((u) => (
//                   <div
//                     key={u._id}
//                     className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">{u.name}</p>
//                       <p className="text-sm text-gray-500">{u.email}</p>
//                     </div>
//                     <button
//                       onClick={() => deleteUser(u._id)}
//                       className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-gray-500">No users found</p>
//               )}
//             </div>
//           </section>
//         )}

//         {activeTab === "items" && (
//           <section className="mb-12">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Items</h2>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
//               <div className="flex items-center gap-3 p-4 border-b">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={newItem.name}
//                   onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                   className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-green-500"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Price"
//                   value={newItem.price}
//                   onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                   className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Category"
//                   value={newItem.category}
//                   onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                   className="p-2 border rounded-lg w-36 focus:ring-2 focus:ring-green-500"
//                 />
//                 <button
//                   onClick={addItem}
//                   className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow-md"
//                 >
//                   Add
//                 </button>
//               </div>

//               {items.length ? (
//                 items.map((i) => (
//                   <div
//                     key={i._id}
//                     className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
//                   >
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="text"
//                         value={i.name}
//                         onChange={(e) => updateItem(i._id, { ...i, name: e.target.value })}
//                         className="p-2 border rounded-lg w-32 focus:ring-2 focus:ring-green-500"
//                       />
//                       <input
//                         type="number"
//                         value={i.price}
//                         onChange={(e) => updateItem(i._id, { ...i, price: e.target.value })}
//                         className="p-2 border rounded-lg w-24 focus:ring-2 focus:ring-green-500"
//                       />
//                       <input
//                         type="text"
//                         value={i.category || ""}
//                         onChange={(e) => updateItem(i._id, { ...i, category: e.target.value })}
//                         className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
//                       />
//                       <label className="flex items-center gap-2 text-sm text-gray-600">
//                         <input
//                           type="checkbox"
//                           checked={i.inStock}
//                           onChange={(e) =>
//                             updateItem(i._id, { ...i, inStock: e.target.checked })
//                           }
//                           className="w-4 h-4"
//                         />
//                         In Stock
//                       </label>
//                     </div>
//                     <button
//                       onClick={() => deleteItem(i._id)}
//                       className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-gray-500">No items found</p>
//               )}
//             </div>
//           </section>
//         )}

//         {activeTab === "orders" && (
//           <section className="mb-12">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Orders</h2>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
//               {orders.length ? (
//                 orders.map((o) => (
//                   <div
//                     key={o._id}
//                     className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         User: {o.userId?.name || o.userId}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Status: {o.status} | Province: {o.province}
//                       </p>
//                     </div>
//                     <div className="flex gap-2">
//                       {o.status !== "completed" && (
//                         <button
//                           onClick={() => updateOrderStatus(o._id, "completed")}
//                           className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
//                         >
//                           Complete
//                         </button>
//                       )}
//                       <button
//                         onClick={() => deleteOrder(o._id)}
//                         className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-gray-500">No orders found</p>
//               )}
//             </div>
//           </section>
//         )}

//         {activeTab === "payments" && (
//           <section className="mb-12">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">💳 Payments</h2>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
//               {payments.length ? (
//                 payments.map((p) => (
//                   <div
//                     key={p._id}
//                     className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         User: {p.userId?.name || p.userId}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Rs {p.amount} - Status: {p.status} - Method: {p.paymentMethod}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-gray-500">No payments found</p>
//               )}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", inStock: true });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const [usersRes, itemsRes, ordersRes, paymentsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/items"),
        api.get("/admin/orders"),
        api.get("/admin/payments"),
      ]);
      setUsers(usersRes.data);
      setItems(itemsRes.data);
      setOrders(ordersRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setError("Unauthorized. Please login as admin.");
      else setError("Failed to fetch admin data.");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ===== CRUD Handlers with Toasts =====
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    toast.info("User deleted");
    fetchAll();
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/admin/items/${id}`);
    toast.warn("Item deleted");
    fetchAll();
  };

  const updateItem = async (id, updated) => {
    await api.put(`/admin/items/${id}`, updated);
    toast.success("Item updated");
    fetchAll();
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return toast.error("Name and price required");
    await api.post("/admin/items", newItem);
    setNewItem({ name: "", price: "", category: "", inStock: true });
    toast.success("Item added successfully");
    fetchAll();
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    await api.delete(`/admin/orders/${id}`);
    toast.warn("Order deleted");
    fetchAll();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    toast.success("Order marked as completed");
    fetchAll();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.info("Logged out successfully");
    navigate("/admin-login");
  };

  // ===== Animations =====
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-6 h-16 z-50"
      >
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">⚡ Admin Dashboard</h1>
        <div className="flex gap-2 items-center">
          {["users", "items", "orders", "payments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition"
          >
            Logout
          </button>
        </div>
      </motion.nav>

      <div className="p-8 mt-[80px] max-w-6xl mx-auto">
        {error && (
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-6 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-sm"
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {activeTab === "users" && (
            <motion.section
              key="users"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">👥 Users</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                {users.length ? (
                  users.map((u) => (
                    <motion.div
                      key={u._id}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{u.name}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">No users found</p>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === "items" && (
            <motion.section
              key="items"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Items</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="flex items-center gap-3 p-4 border-b">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="p-2 border rounded-lg w-36 focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={addItem}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow-md"
                  >
                    Add
                  </button>
                </div>

                {items.length ? (
                  items.map((i) => (
                    <motion.div
                      key={i._id}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={i.name}
                          onChange={(e) => updateItem(i._id, { ...i, name: e.target.value })}
                          className="p-2 border rounded-lg w-32 focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="number"
                          value={i.price}
                          onChange={(e) => updateItem(i._id, { ...i, price: e.target.value })}
                          className="p-2 border rounded-lg w-24 focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={i.category || ""}
                          onChange={(e) => updateItem(i._id, { ...i, category: e.target.value })}
                          className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={i.inStock}
                            onChange={(e) => updateItem(i._id, { ...i, inStock: e.target.checked })}
                            className="w-4 h-4"
                          />
                          In Stock
                        </label>
                      </div>
                      <button
                        onClick={() => deleteItem(i._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">No items found</p>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === "orders" && (
            <motion.section
              key="orders"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Orders</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                {orders.length ? (
                  orders.map((o) => (
                    <motion.div
                      key={o._id}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          User: {o.userId?.name || o.userId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status: {o.status} | Province: {o.province}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {o.status !== "completed" && (
                          <button
                            onClick={() => updateOrderStatus(o._id, "completed")}
                            className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => deleteOrder(o._id)}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">No orders found</p>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === "payments" && (
            <motion.section
              key="payments"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">💳 Payments</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                {payments.length ? (
                  payments.map((p) => (
                    <motion.div
                      key={p._id}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          User: {p.userId?.name || p.userId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rs {p.amount} - Status: {p.status} - Method: {p.paymentMethod}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">No payments found</p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
