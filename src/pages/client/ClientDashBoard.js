import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from "../../context/auth";
import ClientMenu from '../../components/ClientMenu';
const ClientDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row align-items-start">
                    <div className="col-md-3 d-flex align-items-start"> {/* Add d-flex and align-items-start */}
                        <ClientMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-65 p-3">
                            <h3 style={{ marginTop: 0 }}>Client Name: {auth?.user?.name}</h3>
                            <h3>Client Email: {auth?.user?.email}</h3>
                            <h3>Client Contact: {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default ClientDashboard;
