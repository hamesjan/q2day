import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import LastSeven from "./LastSeven/LastSeven";

import "./Profile.css";

const Profile = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="profile__outer-wrapper">
      <div className="profile__table-wrapper">
        <div className="profile__table-left-column">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Hello"
            style={{
              height: "125px",
              width: "125px",
            }}
          ></img>
        </div>
        <div className="profile__table-right-column">
          <h1>{props.username}, 19</h1>
          <h2>54 questions answered</h2>
          <h3>joined Dec 22, 2022</h3>
        </div>
      </div>
      <LastSeven questions={["helo", "haeijoij"]} />
    </div>
  );
};

export default Profile;
