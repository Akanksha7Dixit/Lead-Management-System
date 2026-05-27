import API from "../services/api";

function LeadCard({ lead, fetchLeads }) {

  const updateStatus = async (status) => {

    await API.put(
      `/leads/${lead.id}`,
      { status }
    );

    fetchLeads();
  };


  const deleteLead = async () => {

    await API.delete(
      `/leads/${lead.id}`
    );

    fetchLeads();
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