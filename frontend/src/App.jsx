import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SharedWithMe from "./pages/SharedWithMe";
import FileView from "./pages/FileView";
import Layout from "./components/Layout";

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        Loading...
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Layout>
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/file/:id"
          element={
            <Layout>
              <FileView />
            </Layout>
          }
        />
        <Route
          path="/shared"
          element={
            <Layout>
              <SharedWithMe />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
