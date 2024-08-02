import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import CreateProject from './pages/CreateProject';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import Settings from './pages/Settings';
import Inbox from './pages/Inbox';


function App() {

  const {user, authIsReady} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      {user && <Sidebar />}
      <div className="container">
      <Navbar />
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route exact path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/projects/:id" element={user ? <ProjectDetails /> : <Navigate to="/login" />} />
          <Route path="/createproject" element={user ? <CreateProject /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/inbox" element={user ? <Inbox /> : <Navigate to="/login" />} />
        </Routes>
        </div>
        
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
