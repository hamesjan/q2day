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
            minHeight: props.isMobile ? "25px" : "40px",
            border: "1px solid white",
            maxHeight: props.isMobile ? "25px" : "40px",
            minWidth: props.isMobile ? "25px" : "40px",
            maxWidth: props.isMobile ? "25px" : "40px",
          }}
        />
        <div
          style={{
            marginLeft: 15,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: props.isMobile ? "15px" : "35px",
              color: "#FFFFFF",
              fontWeight: "20",
            }}
          >
            {props.name}
          </p>
          <p
            style={{
              fontSize: props.isMobile ? "12px" : "20px",
              color: "#FFFFFF",
              marginLeft: props.isMobile ? "5px" : "15px",
              fontWeight: "100",
            }}
          >
            {dateString}
          </p>
        </div>
      </div>
      <p
        style={{
          color: "black",
          textAlign: "start",
          fontSize: props.isMobile ? "15px" : "35px",
          color: "#FFFFFF",
          fontWeight: "150",
          marginBottom: "10px",
          marginTop: "10px",
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
