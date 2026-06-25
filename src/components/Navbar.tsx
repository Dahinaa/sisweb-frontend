import { NavLink } from "react-router-dom";
import productLogoUrl from "../assets/react.svg";

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [
    "block py-2 text-sm font-medium transition-colors",
    isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700",
  ].join(" ");
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 border-b">
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
        <NavLink to="/" className="flex items-center">
          <img src={productLogoUrl} alt="Logo" className="mr-3 h-6 w-6" />

          <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">
            My Product Store
          </span>
        </NavLink>

        <div className="flex items-center w-auto">
          <ul className="flex flex-row items-center font-medium space-x-8">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Inicio
              </NavLink>
            </li>

            <li>
              <NavLink to="/products" className={navLinkClass}>
                Productos
              </NavLink>
            </li>

            <li>
              <div className="flex items-center">
                <NavLink
                  to="/login"
                  className="inline-flex items-center justify-end text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none focus:ring-offset-2"
                >
                  Log in
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;