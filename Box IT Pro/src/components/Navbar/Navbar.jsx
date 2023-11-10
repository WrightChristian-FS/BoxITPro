import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ page }) {
  const navItems = ["HOME", "ASSETS", "PEOPLE"];
  return (
    <nav className="nav flex-column">
      <section className="d-flex align-items-center" id="branding">
        <img width={50} height={50} src="/box-minimalistic.svg" alt="Brand" />
        <h2>BoxIT Pro</h2>
      </section>
      <section className="mt-4" id="nav-links">
        <ul className="p-0">
          {navItems.map((item) => {
            return (
              <li
                key={item.toLowerCase()}
                className={`${page == item ? "highlight" : ""} nav-link d-flex`}
              >
                <img
                  height={40}
                  width={40}
                  src={`/${item.toLowerCase()}.png`}
                  alt={item}
                />
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-auto" id="nav-profile">
        <a href="#">
          <img width={150} height={150} src="/profile.jpg" alt="Profile" />
        </a>
      </section>
    </nav>
  );
}

export default Navbar;
