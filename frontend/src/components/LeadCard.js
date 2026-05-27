import API from "../services/api";

import { toast } from "react-toastify";


function LeadCard({
  lead,
  fetchLeads,
  setLeads,
}) {


  const updateStatus = async (status) => {

    try {

      await API.put(
        `/leads/${lead.id}`,
        { status }
      );

      toast.info("Status Updated");


      setLeads((prev) =>
        prev.map((item) =>
          item.id === lead.id
            ? { ...item, status }
            : item
        )
      );

    } catch (error) {

      console.log(error);
    }
  };


  const deleteLead = async () => {

    try {

      await API.delete(
        `/leads/${lead.id}`
      );

      toast.error("Lead Deleted");


      setLeads((prev) =>
        prev.filter(
          (item) => item.id !== lead.id
        )
      );

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <div className="lead-card">

      <h3>{lead.name}</h3>

      <p>{lead.phone}</p>

      <p>{lead.source}</p>


      <select
        value={lead.status}
        onChange={(e) =>
          updateStatus(e.target.value)
        }
      >

        <option>Interested</option>

        <option>Not Interested</option>

        <option>Converted</option>

      </select>


      <button onClick={deleteLead}>
        Delete
      </button>

    </div>
  );
}

export default LeadCard;