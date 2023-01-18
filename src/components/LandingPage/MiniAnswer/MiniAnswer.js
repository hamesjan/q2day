const MiniAnswer = (props) => {
  const date = new Date(props.timestamp);
  const dateString = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return (
    <div style={{ overflow: "hidden", padding: "2px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "40px",
        }}
      >
        <img
          src={props.profilePicURL}
          alt="Profile"
          style={{
            borderRadius: "50%",
            minHeight: "25px",
            border: "1px solid black",
            maxHeight: "25px",
            minWidth: "25px",
            maxWidth: "25px",
          }}
        />
        <div style={{ marginLeft: 15, textAlign: "start" }}>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              fontSize: "12px",
            }}
          >
            {props.name}
          </p>
          <p style={{ marginTop: "5px", fontSize: "12px" }}>{dateString}</p>
        </div>
      </div>
      <p
        style={{
          color: "black",
          textAlign: "start",
          fontSize: "20px",
          marginTop: "0px",
        }}
      >
        {props.answer}
      </p>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "grey",
          marginBottom: "16px",
        }}
      />
    </div>
  );
};

export default MiniAnswer;
