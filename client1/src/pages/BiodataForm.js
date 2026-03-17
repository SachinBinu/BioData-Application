import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function BiodataForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: ""
  });

  const [file, setFile] = useState(null);

  const submit = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.gender ||
      !form.address ||
      !file
    ) {
      return alert("All fields are required");
    }

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    data.append("image", file);

    await API.post("/biodata", data);

    alert("Done");
    navigate("/biodata-list");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Biodata Form</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={e => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Phone"
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          style={styles.input}
          type="date"
          onChange={e => setForm({ ...form, dob: e.target.value })}
        />

        <select
          style={styles.input}
          onChange={e => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <textarea
          style={styles.textarea}
          placeholder="Address"
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

        <input
          style={styles.input}
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <button style={styles.button} onClick={submit}>
          Submit
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
    alignItems: "center"
  },
  container: {
    width: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};