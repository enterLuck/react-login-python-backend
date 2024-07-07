/* Import react third-party files */
import * as React from "react";

/* Import react third-party DOM files */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Import internal pages */
import Login from './Login';
import ClientDashboard from './ClientDashboard'
import EmployeeDashboard from './EmployeeDashboard'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

const App = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent server-side rendering mismatch
    return null;
  }

  return (
    <React.Fragment>
      <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/SignUp" element={<SignUp />} />
            </Routes>
      </Router>
    </React.Fragment>    
  );
}

export default App;
