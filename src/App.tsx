import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/landing-page/LandingPage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import './App.css'
import Login from "./components/Login";

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Layout>
  );
}

export default App;
