import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>MythLog</button> {/* sustituir más adelante por imagen logo */}
      </Link>  

      <Link to="/">Home</Link>

      <Link to="/gods">Explore Greek Gods</Link>

      <Link to="/about">About us</Link>
    </nav>
  )
}
