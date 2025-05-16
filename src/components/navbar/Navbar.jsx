import React, { useContext, useState } from 'react';
import PoultryLogo from '../Asset/new_logo.jpg';
import cart_icon from '../Asset/cart_icon.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

function Navbar() {
    const [activemenu, setActiveMenu] = useState("shop");
    const { getTotalCartItem } = useContext(ShopContext);
    const [menu_control, setMenuControl] = useState(false);

    // State to manage dropdown visibility
    const [dropdown, setDropdown] = useState("");

    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img className='logo' src={PoultryLogo} alt="" />
                <p className="logo_name">POULTRY <br /> FARMS</p>
            </div>
            <div className={!menu_control ? "navbar_menu" : "hide_menu"}>
                <li className="catagory_menu" onClick={() => setActiveMenu("shop")}>
                    <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>Shop</Link>
                    {activemenu === "shop" ? <hr /> : <></>}
                </li>
                <li
                    className="catagory_menu"
                    onMouseEnter={() => setDropdown("meat")}
                    onMouseLeave={() => setDropdown("")}
                    onClick={() => setActiveMenu("meat")}
                >
                    <Link to='/meat' style={{ textDecoration: 'none', color: "inherit" }}>Meat</Link>
                    {activemenu === "meat" ? <hr /> : <></>}
                    {dropdown === "meat" && (
                        <ul className="dropdown_menu">
                            <li><Link to="/meat/live-chicken">Live Chicken</Link></li>
                            <li><Link to="/meat/fresh-meat">Fresh Meat</Link></li>
                            <li><Link to="/meat/cooked-meat">Cooked Meat</Link></li>
                        </ul>
                    )}
                </li>
                <li
                    className="catagory_menu"
                    onMouseEnter={() => setDropdown("eggs")}
                    onMouseLeave={() => setDropdown("")}
                    onClick={() => setActiveMenu("eggs")}
                >
                    <Link to='/eggs' style={{ textDecoration: 'none', color: "inherit" }}>Eggs</Link>
                    {activemenu === "eggs" ? <hr /> : <></>}
                    {dropdown === "eggs" && (
                        <ul className="dropdown_menu">
                            <li><Link to="/eggs/fresh-eggs">Fresh Eggs</Link></li>
                            <li><Link to="/eggs/live-chicken">Live Chicken</Link></li>
                            <li><Link to="/eggs/products-of-egg">Products of Egg</Link></li>
                        </ul>
                    )}
                </li>
                <li
                    className="catagory_menu"
                    onMouseEnter={() => setDropdown("tools")}
                    onMouseLeave={() => setDropdown("")}
                    onClick={() => setActiveMenu("tools")}
                >
                    <Link to='/tools' style={{ textDecoration: 'none', color: "inherit" }}>Tools</Link>
                    {activemenu === "tools" ? <hr /> : <></>}
                    {dropdown === "tools" && (
                        <ul className="dropdown_menu">
                            <li><Link to="/tools/feeder">Feeding Tools</Link></li>
                            <li><Link to="/tools/drinker">Watering Tools</Link></li>
                            <li><Link to="/tools/incubators">Breeding Tools</Link></li>
                        </ul>
                    )}
                </li>
            </div>

            <div className="login_cart">
                <Link to='/signup'><button className={activemenu === 'login' ? "loged login" : "login"} onClick={() => setActiveMenu("login")}>Login</button></Link>
                <div className={activemenu === 'cart' ? 'carting cartContent' : 'cartContent'} onClick={() => setActiveMenu("cart")}>
                    <Link to='/cart'><img className='cartIcon' src={cart_icon} alt="Cart" /></Link>
                    <div className="cart_count">{getTotalCartItem()}</div>
                </div>
            </div>

            <div className="menu_control" onClick={() => setMenuControl(!menu_control)}>
                <div className={menu_control ? "firstLine" : "firstCross"}></div>
                <div className={menu_control ? "secondLine" : "hideCros"}></div>
                <div className={menu_control ? "thirdLine" : "secondCross"}></div>
            </div>
        </div>
    );
}

export default Navbar;