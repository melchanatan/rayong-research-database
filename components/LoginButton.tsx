import React from "react";
import { signIn, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return <div>LogoutButton</div>;
  } else
    return (
      <a
        className="button-outline"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Login
      </a>
    );
};

export default LoginButton;
