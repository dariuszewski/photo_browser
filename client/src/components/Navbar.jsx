import '../css/Navbar.css';
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        if (window.location.pathname === path) {
            window.location.reload();
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" onClick={() => handleNavClick('/')}>Photo Browser</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" onClick={() => handleNavClick('/')}>Home</Link>
                <Link to="/favourites">Favourites</Link>
            </div>
        </nav>
    );
}

export default NavBar;