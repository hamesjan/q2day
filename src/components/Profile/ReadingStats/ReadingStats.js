import "./ReadingStats.css";

const ReadingStats = () => {
  return (
    <div className="profile__reading-stats">
      <div className="profile__books-this-month">
        <h1>0</h1>
        <h2>books this month</h2>
      </div>

      <div className="profile__minutes-this-month">
        <h1>0</h1>
        <h2>minutes this month</h2>
      </div>

      <div className="profile__days-in-a-row">
        <h1>0</h1>
        <h2>days in a row</h2>
      </div>
    </div>
  );
};

export default ReadingStats;
