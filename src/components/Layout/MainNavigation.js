import { Link, useLocation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiUser } from "react-icons/bi";
import { useEffect, useState } from "react";

const MainNavigation = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 800;
    setIsMobile(isMobile);
  }, []);

  return (
    <div>
      <header className={classes.header}>
        {user ? (
          <div
            className={isMobile ? classes.nav_div_mobile : classes.nav_div_web}
          >
            <Link to="/home">
              <h1>q2day</h1>
            </Link>
            <div style={{ height: "30px" }} />
            <Link to="/profile">
              <BiUser style={{ height: "50px", width: "50px" }} />
            </Link>
          </div>
        ) : (
          <div />
        )}
      </header>
      {user ? (
        <h3
          className={classes.logout_btn}
          style={{
            position: "absolute",
            bottom: "50px",
            marginBottom: "30px",
            marginLeft: "43px",
            cursor: "pointer",
          }}
          onClick={logout}
        >
          Logout
        </h3>
      ) : (
        <div />
      )}
    </div>
  );
};

export default MainNavigation;
