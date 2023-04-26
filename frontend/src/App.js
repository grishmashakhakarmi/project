import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UpdateView from "./components/UpdateView";
import Dashboard from "./home/Dashboard";
import Profile from "./profile/Profile";
import Login from "./authentication/Login";
import Logout from "./authentication/Logout";
import Register from "./authentication/Register";
import PrivateRoute from "./routes/PrivateRoute";


const AuthContext = React.createContext(null);


function App() {
  const [authContext, setAuthContext] = useState(localStorage.getItem("jwt"));
  return(
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route exact path="/update-view" element={<PrivateRoute> <UpdateView /> </PrivateRoute>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/profile" element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
