import { useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";


function LeadForm({
  fetchLeads,
  setLeads,
}) {

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


    if (formData.phone.length !== 10) {

      toast.error(
        "Phone number must be 10 digits"
      );

      return;
    }


    try {

      const response = await API.post(
        "/leads",
        formData
      );


      toast.success(
        "Lead Added Successfully"
      );


      setLeads((prev) => [
        response.data,
        ...prev,
      ]);


      setFormData({
        name: "",
        phone: "",
        source: "Call",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };


  return (

    <form
      className="lead-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={handleChange}
        required
      />


      <input
        type="number"
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