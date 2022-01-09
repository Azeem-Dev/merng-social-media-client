import { useState, useEffect } from "react";
import "./MenuBar.css";
import { NavLink, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/windowResizeHandler";
import { getUserDataFromMemory } from "../../utils/getUserData";
import { Avatar } from "antd";
const MenuBar = () => {
  const [user, setUser] = useState(undefined);

  const { height, width } = useWindowDimensions();
  const [flex, setFlex] = useState(width > 768 ? true : false);
  let location = useLocation();

  useEffect(() => {
    setFlex(width > 768 ? true : false);
  }, [width]);

  useEffect(() => {
    let userInfo = getUserDataFromMemory();
    setUser(userInfo);
  }, [location]);
  const currentOpenedTab = location.pathname.split("/")[1];
  return (
    <nav className="navbar" style={{ marginBottom: "20px" }}>
      <div className="container">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            data-toggle="open-navbar1"
            onClick={() => setFlex((prevvalue) => !prevvalue)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <NavLink to="/">
            <h4>
              Social<span>Media</span>
            </h4>
          </NavLink>
        </div>

        <div
          className="navbar-menu"
          id="open-navbar1"
          style={{ display: `${flex ? "flex" : "none"}` }}
        >
          <ul className="navbar-nav">
            <li className={currentOpenedTab === "" ? "active" : ""}>
              <NavLink to="/">Home</NavLink>
            </li>
            {user?.id == null ? (
              <>
                <li className={currentOpenedTab === "login" ? "active" : ""}>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li className={currentOpenedTab === "register" ? "active" : ""}>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className={currentOpenedTab === "login" ? "active" : ""}>
                  <NavLink
                    to="/logout"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                  <p
                    style={{
                      color: "#CBD4C2",
                      margin: "0",
                    }}
                  >
                    {user.username}
                  </p>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default MenuBar;
