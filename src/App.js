import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Users from "./components/UserList";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userEmail, ] = useState("harish@gmail.com");
  const [userPassword, setUserPassword] = useState("12345678");

  const handleLogin = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === userEmail && password === userPassword) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          resolve({ email });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const handlePasswordChange = async (newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserPassword(newPassword);
        resolve();
      }, 1000);
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/users" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/users" replace />
            ) : (
              <Login onSubmit={handleLogin} />
            )
          }
        />

        <Route
          path="/reset-password"
          element={
            <PasswordReset
              currentPassword={userPassword}
              onPasswordChange={handlePasswordChange}
            />
          }
        />

        <Route
          path="/users"
          element={
            isLoggedIn ? <Users onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/create-user"
          element={
            isLoggedIn ? <CreateUser /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/edit-user"
          element={
            isLoggedIn ? <EditUser /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
