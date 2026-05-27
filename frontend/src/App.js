import { useEffect, useState } from "react";

import API from "./services/api";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function App() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [sourceFilter, setSourceFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] = useState(false);


  const fetchLeads = async () => {

    try {

      setLoading(true);

      const res = await API.get("/leads");

      setLeads(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLeads();
  }, []);


  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =
      lead.name.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesSource =
      sourceFilter === "All"
      || lead.source === sourceFilter;

    const matchesStatus =
      statusFilter === "All"
      || lead.status === statusFilter;

    return (
      matchesSearch
      && matchesSource
      && matchesStatus
    );
  });


  return (
    <div>

      <Navbar />

      <div className="container">

        <Dashboard leads={leads} />

        <LeadForm
          fetchLeads={fetchLeads}
          setLeads={setLeads}
        />


        <div className="filters-container">

          <div className="search-wrapper">

            <input
              type="text"
              placeholder="Search leads..."
              className="search-input"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="filter-wrapper">

            <select
              className="filter-select"
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(e.target.value)
              }
            >

              <option value="All">
                All Sources
              </option>

              <option value="Call">
                Call
              </option>

              <option value="WhatsApp">
                WhatsApp
              </option>

              <option value="Field">
                Field
              </option>

            </select>


            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Interested">
                Interested
              </option>

              <option value="Not Interested">
                Not Interested
              </option>

              <option value="Converted">
                Converted
              </option>

            </select>

          </div>

        </div>


        {
          loading
            ? (
              <h2>Loading...</h2>
            )
            : (
              <LeadList
                leads={filteredLeads}
                fetchLeads={fetchLeads}
                setLeads={setLeads}
              />
            )
        }

      </div>


      <ToastContainer />

    </div>
  );
}

export default App;