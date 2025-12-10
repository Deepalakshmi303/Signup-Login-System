import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/signup", form);
    alert(res.data.message);
    if (res.data.status === "ok") window.location.href = "/login";
  };

  return (
    <div className="center-container">
      <div className="form-box">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />

        <button onClick={submit}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
