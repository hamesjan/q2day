import "./Profile.css";

import ReadingStats from "./ReadingStats/ReadingStats";

const Profile = (props) => {
  return (
    <div className="profile__outer-wrapper">
      <div className="profile__table-wrapper">
        <div className="profile__table-left-column">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Hello"
            style={{
              height: "150px",
              width: "150px",
            }}
          ></img>
        </div>
        <div className="profile__table-right-column">
          <h1>{props.username}, 19</h1>
          <h2>Hello this is a description</h2>
        </div>
      </div>
      <ReadingStats />
    </div>
  );
};

export default Profile;
