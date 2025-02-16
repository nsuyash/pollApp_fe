import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

const API_BASE_URL = "https://poll-app-be.vercel.app/polls";

const PollDetails = () => {
    const { pollId } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        fetchPoll();
    }, []);

    const fetchPoll = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${pollId}`);
            setPoll(response.data);
        } catch (error) {
            console.error("Error fetching poll details:", error);
        }
    };

    const votePoll = async (questionIndex, optionIndex) => {
        try {
            await axios.post(`${API_BASE_URL}/${pollId}/vote`, { questionIndex, optionIndex });
            fetchPoll();
        } catch (error) {
            console.error("Error voting on poll:", error);
        }
    };

    const deletePoll = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/${pollId}`);
            alert("Poll deleted successfully!");
            navigate("/"); // Redirect to home page after deletion
        } catch (error) {
            console.error("Error deleting poll:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container my-5">
                {poll ? (
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center text-primary">{poll.pollName}</h2>
                        {poll.questionAndOptions.map((q, qIndex) => (
                            <div key={qIndex} className="mt-3">
                                <p className="fw-bold fs-5">{q.question}</p>
                                {q.answer.map((opt, oIndex) => {
                                    const totalVotes = q.answer.reduce((acc, curr) => acc + curr.votes, 0) || 1;
                                    const votePercentage = ((opt.votes / totalVotes) * 100).toFixed(1);

                                    return (
                                        <div className="mb-3" key={oIndex}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-semibold">{opt.option}</span>
                                                <span className="text-muted">{opt.votes} votes</span>
                                            </div>
                                            <div className="progress" style={{ height: "8px" }}>
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: `${votePercentage}%` }}
                                                    aria-valuenow={opt.votes}
                                                    aria-valuemin="0"
                                                    aria-valuemax={totalVotes}
                                                ></div>
                                            </div>
                                            <button 
                                                className="btn btn-outline-success btn-sm mt-1 w-100"
                                                onClick={() => votePoll(qIndex, oIndex)}
                                            >
                                                Vote
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <button 
                            className="btn btn-danger mt-4 w-100"
                            onClick={deletePoll}
                        >
                            Delete Poll
                        </button>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </>
    );
};

export default PollDetails;
