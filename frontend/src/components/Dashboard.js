function Dashboard({ leads }) {

  const total = leads.length;

  const interested = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  const converted = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;


  return (
    <div className="dashboard">

      <div className="dashboard-card">
        <h3>Total Leads</h3>
        <p>{total}</p>
      </div>

      <div className="dashboard-card">
        <h3>Interested</h3>
        <p>{interested}</p>
      </div>

      <div className="dashboard-card">
        <h3>Converted</h3>
        <p>{converted}</p>
      </div>

    </div>
  );
}

export default Dashboard;