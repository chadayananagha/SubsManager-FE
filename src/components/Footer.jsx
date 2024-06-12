import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <Link className="link link-hover" to="/about">
          About us
        </Link>
        <Link to="/contact" className="link link-hover">
          Contact
        </Link>
        <Link to="/faq" className="link link-hover">
          FAQ
        </Link>
        <Link className="link link-hover">Help</Link>
      </nav>
      <img
        src="/images/logofooter.png"
        alt="logo"
        className="opacity-40  w-36 "
      />
      <aside>
        <p>Copyright © 2024 - All right reserved by Share & Subs</p>
      </aside>
    </footer>
  );
};

export default Footer;
