import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="text-center bg-dark">
            <Link to="/" style={{textDecoration: "none"}}><h1 className="py-4 text-light">QUICK POLLING APP</h1></Link>
        </header>
    )
}

export default Header;