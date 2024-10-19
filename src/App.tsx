import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/landing-page/LandingPage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/register" Component={Register} />
      </Routes>
    </Layout>
  );
}

export default App;
