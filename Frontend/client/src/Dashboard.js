import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard")
      .then(res => {
        if (res.data.status !== "ok") {
          window.location.href = "/login";
        } else {
          setUser(res.data);
        }
      });
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <p>Email: {user.email}</p>

      <button onClick={() => {
        axios.get("http://localhost:5000/logout");
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
