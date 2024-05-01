import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import FreelancerMenu from "../../components/FreelancerMenu"; // Import FreelancerMenu component

const FreelancerOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/freelancer/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/freelancer/update-order`, {
                orderId: orderId,
                status: value,
            });
            fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"Freelancer Orders"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row align-items-start">
                    <div className="col-md-3 d-flex align-items-start">
                        <FreelancerMenu />
                    </div>
                    <div className="col-md-9"> {/* Adjusted column size */}
                        <div className="mt-5">
                            <h1 className="text-center">Freelancer Orders</h1>
                            {orders.map((order, index) => (
                                <div className="border shadow mb-3" key={order._id}>
                                    {/* Render order details */}
                                    <p>Order Details</p>
                                    {/* Example: <p>{order.property}</p> */}
                                    {/* Example: <button onClick={() => handleChange(order._id, newValue)}>Change Status</button> */}
                                </div>
                            ))}
                            {orders.length === 0 && <p>No orders available.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerOrders;
