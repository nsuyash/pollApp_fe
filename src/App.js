import "bootstrap/dist/css/bootstrap.min.css"
import pollMaker from './pollMaker.svg'
import Header from "./components/Header";
import { Link } from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <main className="container mt-5">
        <div className="row">
            <div className="col-md-6">
              <p className="display-4"><strong>POLL MAKER APP - CREATE POLLS WITH MULTIPLE OPTIONS</strong></p>
              <p>Quick Polling App lets users create polls with multiple options, vote instantly, and view real-time results. Simple, fast, and efficient for instant decision-making.</p>
            </div>
            <div className="col-md-6">
              <img src={pollMaker} alt="poll maker" className="img-fluid" />
            </div>
        </div>
        <Link to="/poll/create"><p className="btn btn-dark py-2 px-5 fs-6">Create Poll</p></Link>
      </main>
    </>
  );
}

export default App;
