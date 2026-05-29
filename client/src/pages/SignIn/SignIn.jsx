import React from "react";

const SignIn = () => {
  const handleSignIn = () => {
    // Redirect user to the Google OAuth authentication page
    window.location.href = "/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign In</h1>
      <button
        onClick={handleSignIn}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
