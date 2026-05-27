import { useEffect, useState } from "react";

import API from "./services/api";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {

  const [leads, setLeads] = useState([]);


  const fetchLeads = async () => {

    try {

      const res = await API.get("/leads");

      setLeads(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchLeads();
  }, []);


  return (
    <div>

      <Navbar />

      <div className="container">

        <Dashboard leads={leads} />

        <LeadForm fetchLeads={fetchLeads} />

        <LeadList
          leads={leads}
          fetchLeads={fetchLeads}
        />

      </div>

    </div>
  );
}

export default App;