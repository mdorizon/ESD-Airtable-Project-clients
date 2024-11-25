import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientFormPage from "./page/ClientFormPage";
import AdminPage from "./page/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientFormPage />} />

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;