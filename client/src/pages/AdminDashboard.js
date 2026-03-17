import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/biodata/admin").then(res => setData(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        {data.length === 0 && (
          <p style={styles.empty}>No data found</p>
        )}

        {data.map(d => (
          <div key={d._id} style={styles.card}>
            
            <div style={styles.header}>
              {d.image && (
                <img
                  src={`http://localhost:5000/uploads/${d.image}`}
                  style={styles.image}
                  alt="profile"
                />
              )}
              <div>
                <p style={styles.name}>{d.fullName}</p>
                <p style={styles.email}>{d.email || d.userId?.email}</p>
              </div>
            </div>

            <div style={styles.details}>
              <p><span style={styles.label}>Phone:</span> {d.phone}</p>
              <p><span style={styles.label}>DOB:</span> {d.dob}</p>
              <p><span style={styles.label}>Gender:</span> {d.gender}</p>
              <p><span style={styles.label}>Address:</span> {d.address}</p>
            </div>

          </div>
        ))}

        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px"
  },
  container: {
    width: "600px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  empty: {
    textAlign: "center",
    color: "#888"
  },
  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  image: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0
  },
  email: {
    fontSize: "14px",
    color: "#666",
    margin: 0
  },
  details: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.6"
  },
  label: {
    fontWeight: "bold"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};