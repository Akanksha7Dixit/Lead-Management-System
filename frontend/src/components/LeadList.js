import LeadCard from "./LeadCard";


function LeadList({
  leads,
  fetchLeads,
  setLeads,
}) {

  if (leads.length === 0) {

    return (
      <h2>
        No leads found
      </h2>
    );
  }


  return (
    <div className="lead-list">

      {leads.map((lead) => (

        <LeadCard
          key={lead.id}
          lead={lead}
          fetchLeads={fetchLeads}
          setLeads={setLeads}
        />

      ))}

    </div>
  );
}

export default LeadList;