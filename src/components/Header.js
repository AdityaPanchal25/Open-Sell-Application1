import React from "react";
import "./style/header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {Link} from "react-router-dom"
import { useStateValue } from "./Stateprovider";
import { auth } from "./firebase";

function Header() {
  const [{basket , user},dispatch]=useStateValue();

  const handleAuthenticaton=()=>{
    if(user){
      auth.signOut();
    }
  }
  return (
    <div className="header">
    <Link to="/">
      <img
        className="header__logo"
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=""
      />
    </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchicon" />
      </div>
      <div className="header__nav">
        <Link to={!user &&'/login'}>
        <div onClick={handleAuthenticaton} className="header__option">
          <span className="header__optionLineOne">Hello ,{!user?'Guest':user.email}</span>
          <span className="header__optionLineTwo">{user?'Sign Out':'Sign In'}</span>
        </div>
        </Link>

<Link to="/orders">
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">Orders</span>
        </div>
</Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header_basketCount">{basket?.length}</span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
