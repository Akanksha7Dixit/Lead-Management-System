import { useState } from "react";
import API from "../services/api";

function LeadForm({ fetchLeads }) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/leads", formData);

      setFormData({
        name: "",
        phone: "",
        source: "Call",
      });

      fetchLeads();

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <form className="lead-form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <select
        name="source"
        value={formData.source}
        onChange={handleChange}
      >
        <option>Call</option>
        <option>WhatsApp</option>
        <option>Field</option>
      </select>

      <button type="submit">
        Add Lead
      </button>

    </form>
  );
}

export default LeadForm;