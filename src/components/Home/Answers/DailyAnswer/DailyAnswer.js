import logo from "../../../../assets/images/google-icon.png";

const DailyAnswer = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "50px",
        }}
      >
        <img
          src={logo}
          alt="Profile"
          style={{
            borderRadius: "50%",
            minHeight: "50px",
            maxHeight: "50px",
            minWidth: "50px",
            maxWidth: "50px",
          }}
        />
        <div style={{ marginLeft: 15, textAlign: "start" }}>
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Name</p>
          <p style={{ marginTop: "5px" }}>Time uploaded</p>
        </div>
      </div>
      <p
        style={{
          color: "black",
          textAlign: "start",
          fontSize: "30px",
        }}
      >
        CAN THESE NUTS YUT BIASED I LOVE WATER BOTTLE LOTION PHONE AIRPODS
        AEIFJAOEIJF AOIEJ FOIAJE FOIAJE OFIJAWEO FIJAEOI FJAWEOIJ F
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

export default DailyAnswer;
