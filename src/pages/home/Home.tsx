import React from "react";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";

const Home: React.FC = () => {
  return (
    <Layout tabBar={<TabBar />}>
      <h1>Home</h1>
    </Layout>
  );
};

export default Home;
