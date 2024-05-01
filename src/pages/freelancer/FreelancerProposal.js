import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/Layout";
import { Select, Spin, message } from "antd";
import FreelancerMenu from '../../components/FreelancerMenu';

const { Option } = Select;

const FreelancerProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "delivered",
        "cancel",
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/proposals/getAll");
            console.log("reac");
            console.log(data);
            setProposals(data.proposals);
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch proposals");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async (proposalId, value) => {
        setLoading(true);
        try {
            const { data } = await axios.put(`/api/v1/proposal/status-proposal`, {
                proposalId: proposalId,
                status: value,
            });
            message.success("Proposal status updated successfully");
            fetchProposals();
        } catch (error) {
            console.log(error);
            message.error("Failed to update proposal status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title={"Proposals"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row align-items-start">
                    <div className="col-md-3 d-flex align-items-start">
                        <FreelancerMenu />
                    </div>
                    <div className="col-md-9">
                        sfsfwer
                        <div className="mt-5 row dashboard" style={{ alignItems: 'flex-start' }}>
                            <div className="col-md-12">
                                <h1 className="text-center">Proposals</h1>
                                {loading ? (
                                    <Spin size="large" />
                                ) : (
                                    proposals.map((proposal, index) => (
                                        <div className="border shadow" key={proposal._id}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Deadline</th>
                                                        {/* Add more table headings as needed */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {proposal.selected}
                                                        </td>
                                                        <td>
                                                            {proposal.amount}

                                                        </td>
                                                        <td>
                                                            {proposal.deadline}

                                                        </td>
                                                        {/* Render other data fields */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* Render additional details */}
                                        </div>
                                    ))
                                )}
                                {proposals.length === 0 && <p>No proposals available.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerProposals;
