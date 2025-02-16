import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://poll-app-be.vercel.app/polls";

const CreatePolls = () => {
    const [pollName, setPollName] = useState("");
    const [questions, setQuestions] = useState([{ question: "", options: ["", ""] }]);
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        fetchPolls();
        const interval = setInterval(fetchPolls, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setPolls(response.data);
        } catch (error) {
            console.error("Error fetching polls:", error);
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addOption = (qIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    const removeOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[qIndex].options.length > 2) {
            updatedQuestions[qIndex].options.splice(oIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", ""] }]);
    };

    const createPoll = async () => {
        try {
            const response = await axios.post(API_BASE_URL, {
                pollName,
                questionAndOptions: questions.map(q => ({
                    question: q.question,
                    answer: q.options.map(option => ({ option, votes: 0 }))
                }))
            });
            setPolls([...polls, response.data]);
            setPollName("");
            setQuestions([{ question: "", options: ["", ""] }]);
        } catch (error) {
            console.error("Error creating poll:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-9">
                        <h2 className="mb-4">CREATE A POLL</h2>
                        <div className="card p-4 shadow-sm">
                            <div className="mb-3">
                                <label className="form-label">Poll Name</label>
                                <input type="text" className="form-control" value={pollName} onChange={(e) => setPollName(e.target.value)} />
                            </div>
                            {questions.map((q, qIndex) => (
                                <div key={qIndex} className="mb-4 border-bottom pb-3">
                                    <div className="mb-2">
                                        <label className="form-label">Question {qIndex + 1}</label>
                                        <input type="text" className="form-control" value={q.question} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} />
                                    </div>
                                    <label className="form-label">Options</label>
                                    {q.options.map((option, oIndex) => (
                                        <div className="input-group mb-2" key={oIndex}>
                                            <input type="text" className="form-control" value={option} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} />
                                            {q.options.length > 2 && (
                                                <button className="btn btn-danger btn-sm" onClick={() => removeOption(qIndex, oIndex)}>×</button>
                                            )}
                                        </div>
                                    ))}
                                    <button className="btn btn-secondary btn-sm" onClick={() => addOption(qIndex)}>+ Add Option</button>
                                </div>
                            ))}
                            <button className="btn btn-secondary btn-sm mb-3" onClick={addQuestion}>+ Add Question</button>
                            <button className="btn btn-dark w-100" onClick={createPoll}>Save Poll</button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h2>ACTIVE POLL</h2>
                        <div className="list-group mt-3">
                            {polls.map(poll => (
                                <Link 
                                    to={`/poll/${poll._id}`} 
                                    key={poll._id} 
                                    className="list-group-item list-group-item-action text-primary fw-bold"
                                >
                                    {poll.pollName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePolls;
