import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function BiodataList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/biodata/me").then(res => {
      setData(res.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>My Biodata</h2>

        {data.length === 0 && (
          <p style={styles.empty}>No biodata found</p>
        )}

        {data.map(item => (
          <div key={item._id} style={styles.card}>
            
            <div style={styles.header}>
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  style={styles.image}
                  alt="profile"
                />
              )}
              <div>
                <p style={styles.name}>{item.fullName}</p>
                <p style={styles.email}>{item.email}</p>
              </div>
            </div>

            <div style={styles.details}>
              <p><span style={styles.label}>Phone:</span> {item.phone}</p>
              <p><span style={styles.label}>DOB:</span> {item.dob}</p>
              <p><span style={styles.label}>Gender:</span> {item.gender}</p>
              <p><span style={styles.label}>Address:</span> {item.address}</p>
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
    width: "500px"
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
    objectFit: "cover",
    border: "2px solid #eee"
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