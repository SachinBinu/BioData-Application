import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return alert("All fields are required");
    }

    if (!form.email.includes("@")) {
      return alert("Enter a valid email");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert("Register failed");
    }
  };

  const isDisabled =
    !form.name || !form.email || !form.password || !form.confirmPassword;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          style={{
            ...styles.button,
            background: isDisabled ? "#ccc" : "#007bff",
            cursor: isDisabled ? "not-allowed" : "pointer"
          }}
          disabled={isDisabled}
          onClick={submit}
        >
          Register
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/")}>
            Login
          </span>
        </p>
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
    width: "350px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
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
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold"
  },
  text: {
    marginTop: "15px"
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold"
  }
};