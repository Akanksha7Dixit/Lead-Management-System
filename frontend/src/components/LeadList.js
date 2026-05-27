import LeadCard from "./LeadCard";

function LeadList({ leads, fetchLeads }) {

  return (
    <div className="lead-list">

      {leads.map((lead) => (

        <LeadCard
          key={lead.id}
          lead={lead}
          fetchLeads={fetchLeads}
        />

      ))}

    </div>
  );
}

export default LeadList;