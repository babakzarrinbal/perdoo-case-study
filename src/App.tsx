import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Boilerplate } from "./views/boiler-plate/Boilerplate";
import CharactersList from "./views/characters/list";
import CharacterDetail from "./views/characters/detail";
import Episodes from "./views/episodes/list";
import EpisodeDetail from "./views/episodes/detail";
import Locations from "./views/locations/list";
import LocationDetail from "./views/locations/detail";
// import other components

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/characters-list">Characters List</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/episodes-list">Episodes List</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/locations-list">Locations List</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: "20px" }}>
          <div
            className="site-layout-content"
            style={{ background: "#fff", padding: 24, minHeight: 280 }}
          >
            <Routes>
              <Route path="/" element={<Boilerplate />} />
              <Route path="/characters-list" element={<CharactersList />} />
              <Route path="/characters/:id" element={<CharacterDetail />} />
              <Route path="/episodes-list" element={<Episodes />} />
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
              <Route path="/locations-list" element={<Locations />} />
              <Route path="/locations/:id" element={<LocationDetail />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Rick and Morty Explorer Full Stack Web Engineer | Case Study for
          Perdoo by Babak Zarrinbal
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
