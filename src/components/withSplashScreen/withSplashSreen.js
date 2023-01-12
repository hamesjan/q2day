import React, { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import "./splash-screen.css";

function LoadingMessage() {
  return (
    <div className="splash-screen">
      <h1 style={{ textWeight: "300" }}>q2day</h1>
      <div className="loading-dot">.</div>
    </div>
  );
}

const withSplashScreen = (WrappedComponent) => {
  const WithSplashScreen = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        setTimeout(async () => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }, []);

    if (loading) {
      return LoadingMessage();
    }

    return <WrappedComponent {...props} />;
  };

  return WithSplashScreen;
};

export default withSplashScreen;
