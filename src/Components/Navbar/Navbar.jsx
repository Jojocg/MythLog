import { Link } from "react-router-dom";
/* import './Navbar.css' */

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to="/gods">Explore Greek Gods</Link>
              <ul className="p-2">
                <li><Link to="/gods">See all deities</Link></li>
                <li><Link to="/gods/create">Create new deities</Link></li>
              </ul>
            </li>
            <li><a>About us</a></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl"><img src="/owl_logo.svg" alt="mythlog logo" className="h-12 mr-1.5"/>MythLog</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li>
            <details>
              <summary>Explore Greek Gods</summary>
              <ul className="p-2">
                <li><Link to="/gods">See all deities</Link></li>
                <li><Link to="/gods/create">Create new deities</Link></li>
              </ul>
            </details>
          </li>
          <li><a>About us</a></li>
        </ul>
      </div>
      {/* <div className="navbar-end">
    <a className="btn">Button</a>
  </div> */}
    </div>
  )
}
