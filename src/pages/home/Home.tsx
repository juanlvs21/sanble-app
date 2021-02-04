import React, { useEffect } from "react";

// Layout
import Layout from "../../layouts/Main";

// Hooks
import useAuth from "../../hooks/useAuth";

const Home: React.FC = () => {
  const { session } = useAuth();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <Layout>
      <h1>
        Bienvenido
        {session && <b> {session.user.name}</b>}
      </h1>
    </Layout>
  );
};

export default Home;
