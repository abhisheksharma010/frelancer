import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/ContractDetailPage.css";
import Layout from '../components/Layout';
import { useAuth } from '.././context/auth';

const ContractDetailContainer = () => {
    const { id } = useParams();
    const [user, setAuth] = useAuth();
    const [contract, setContract] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [freelancer, setFreelancer] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState(0);
    const [deadline, setDeadline] = useState(new Date());
    const [previousProposal, setPreviousProposal] = useState(null);
    const [showPreviousProposal, setShowPreviousProposal] = useState(false);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contractResponse = await axios.get(`/contracts/${id}`);
                setContract(contractResponse.data.contract);
                setClient(contractResponse.data.client);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        console.log("nahi hua");

        fetchContract();

        if (!previousProposal && user._id) {
            fetchPreviousProposal();
        }
    }, [id, previousProposal, user._id]);

    const fetchPreviousProposal = async () => {
        try {
            const response = await axios.get('/proposals/get');
            console.log("nahi hua");
            console.log(response);


            setPreviousProposal(response.data.previousProposal);
        } catch (error) {
            console.error(error);
        }
    };

    const togglePreviousProposal = () => {
        if (!previousProposal || user._id) {
            console.log("Called");
            fetchPreviousProposal();
        }
        console.log("yoyo  hua");
        console.log(previousProposal);

        setShowPreviousProposal(!showPreviousProposal);
    };

    const handleSubmitProposal = async () => {
        try {
            const proposalData = {
                freelancer: user._id,
                project: id,
                message,
                amount,
                deadline
            };
            const response = await axios.post('/proposals/add', proposalData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout title={"All Products - Best offers "}>
            <div className='content'>
                <div className="contract-detail-container">
                    {contract && (
                        <div className="contract-detail-card">
                            <h2 className="category">{contract.category}</h2>
                            <div className="contract-details">
                                <h3>{contract.title}</h3>
                                <p>Description: {contract.description}</p>
                                <p>Amount: {contract.amount}</p>
                                <p>Deadline: {contract.deadline}</p>
                                <p>Status: {contract.status}</p>
                            </div>
                        </div>
                    )}
                    {client && (
                        <div className="client-detail-card">
                            <h2>Client Details</h2>
                            <p>Name: {client.name}</p>
                            <p>Email: {client.email}</p>
                            <p>Phone: {client.phone}</p>
                        </div>
                    )}
                </div>
                <div className="proposal-form-container">
                    <div className="proposal-form">
                        <h2>Submit Proposal</h2>
                        {/* <label className="proposal-label">Freelancer:</label>
                        <input
                            className="proposal-input"
                            type="text"
                            value={freelancer}
                            onChange={(e) => setFreelancer(e.target.value)}
                        /> */}
                        <label className="proposal-label">Message:</label>
                        <textarea
                            className="proposal-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <label className="proposal-label">Amount:</label>
                        <input
                            className="proposal-input"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                        <label className="proposal-label">Deadline:</label>
                        <input
                            className="proposal-input"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <button className="submit-proposal-button btn btn-success" onClick={handleSubmitProposal}>Submit Proposal</button>
                    </div>

                </div>
            </div>
            {showPreviousProposal && previousProposal && (
                <div className="previous-proposal">
                    <h2>Your Previous Proposal</h2>
                    <p>Message: {previousProposal.message}</p>
                    <p>Amount: {previousProposal.amount}</p>
                    <p>Deadline: {previousProposal.deadline}</p>
                </div>
            )}
            <button className="toggle-previous-proposal-btn" onClick={togglePreviousProposal}>
                {showPreviousProposal ? 'Hide Previous Proposal' : 'Show Previous Proposal'}
            </button>
        </Layout>
    );
};

export default ContractDetailContainer;
