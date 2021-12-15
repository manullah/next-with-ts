import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      Homepage <br></br>
      {JSON.stringify(session)}
    </>
  );
};

export default Home;
