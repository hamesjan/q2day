import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MainNavigation = (props) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <p>q2day</p>
          <h5>answer me</h5>
        </div>
      </Link>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <nav>
          <ul>
            <li>
              <Link to="/profile">
                <p
                  style={{
                    color: "black",
                    fontSize: "25px",
                    paddingBottom: "20px",
                  }}
                >
                  Profile
                </p>
              </Link>
            </li>
            <li>
              {" "}
              {user ? <button onClick={logout}>Logout</button> : <div />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
