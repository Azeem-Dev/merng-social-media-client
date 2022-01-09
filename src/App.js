import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <MenuBar />
      <div
        className="navbar below"
        style={{ border: "none", boxShadow: "none" }}
      >
        <div
          className="container"
          style={{
            position: "static",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
