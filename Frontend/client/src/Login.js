import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/login", form);
    alert(res.data.message);
    if (res.data.status === "ok") window.location.href = "/dashboard";
  };

  return (
    <div className="center-container">
      <div className="form-box">
        <h2>Login</h2>

        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />

        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
