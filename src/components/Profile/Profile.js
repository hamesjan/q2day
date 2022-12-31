import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import LastSeven from "./LastSeven/LastSeven";

import "./Profile.css";

const Profile = (props) => {
  const [progress, setProgress] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="profile__outer-wrapper">
      <LastSeven
        progress={progress}
        setProgress={setProgress}
        username={props.username}
        uid={props.uid}
        dates={props.dates}
        answers={props.answers}
      />
    </div>
  );
};

export default Profile;
