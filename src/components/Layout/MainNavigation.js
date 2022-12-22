import { Link, useLocation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiUser } from "react-icons/bi";

const MainNavigation = (props) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.nav_div}>
          <Link to="/">
            <h1>q2day</h1>
          </Link>
          <div style={{ height: "30px" }} />
          {user ? (
            <Link to="/profile">
              <BiUser style={{ height: "50px", width: "50px" }} />
            </Link>
          ) : (
            <div />
          )}
        </div>
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
