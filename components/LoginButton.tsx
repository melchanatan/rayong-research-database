import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <a
        className="button-outline button-outline--fill"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Logout
      </a>
    );
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
