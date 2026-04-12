import React, { useState } from "react";
import "./Orders.css";
import { 
    FaCheck, 
    FaTimes, 
    FaTruck, 
    FaCoins, 
    FaBoxOpen, 
    FaClock, 
    FaHistory 
} from "react-icons/fa";

const Orders = () => {
  const [view, setView] = useState("pending");

  const [orders, setOrders] = useState([
    { id: 1, user: "Ahmed Ali", device: "iPhone 13", status: "Pending", price: 450, date: "2026-04-12" },
    { id: 2, user: "Sara Mohamed", device: "Dell XPS", status: "Accepted", price: 1200, date: "2026-04-12" },
    { id: 3, user: "Mona Hassan", device: "Old HP Laptop", status: "Out for Collection", price: 800, date: "2026-04-11" },
    { id: 4, user: "Toqa Ashraf", device: "Monitor", status: "Received", price: 300, date: "2026-04-10" },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    if(newStatus === 'Completed') alert("تم إضافة النقاط لحساب العميل بنجاح! 🎉");
  };

  const pendingOrders = orders.filter(o => o.status !== "Completed" && o.status !== "Rejected");
  const historyOrders = orders.filter(o => o.status === "Completed" || o.status === "Rejected");

  return (
    <div className="orders-manager-container">
      <div className="orders-header">
        <h2 className="title-modern">Order <span className="highlight">Workflow</span></h2>
        <div className="toggle-buttons">
          <button className={`btn-toggle ${view === "pending" ? "active" : ""}`} onClick={() => setView("pending")}>
            <FaClock /> Active Orders
          </button>
          <button className={`btn-toggle ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>
            <FaHistory /> Completed Log
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="bootstrap-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Device</th>
              <th>Points</th>
              <th>Current Status</th>
              <th>Actions / Steps</th>
            </tr>
          </thead>
          <tbody>
            {(view === "pending" ? pendingOrders : historyOrders).map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td><strong>{order.user}</strong></td>
                <td>{order.device}</td>
                <td>{order.price} pts</td>
                <td>
                  <span className={`table-badge ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="workflow-actions">
                    {order.status === "Pending" && (
                      <>
                        <button className="btn-sm btn-approve" onClick={() => updateStatus(order.id, "Accepted")} title="Accept Order"><FaCheck /></button>
                        <button className="btn-sm btn-reject" onClick={() => updateStatus(order.id, "Rejected")} title="Reject Order"><FaTimes /></button>
                      </>
                    )}
                    
                    {order.status === "Accepted" && (
                      <button className="btn-step btn-courier" onClick={() => updateStatus(order.id, "Out for Collection")}>
                        <FaTruck /> Dispatch Courier
                      </button>
                    )}

                    {order.status === "Out for Collection" && (
                      <button className="btn-step btn-receive" onClick={() => updateStatus(order.id, "Received")}>
                        <FaBoxOpen /> Mark as Received
                      </button>
                    )}

                    {order.status === "Received" && (
                      <button className="btn-step btn-points" onClick={() => updateStatus(order.id, "Completed")}>
                        <FaCoins /> Grant Points
                      </button>
                    )}

                    {view === "history" && <span className="done-text">Archived</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;