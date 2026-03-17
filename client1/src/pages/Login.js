import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      return alert("All fields are required");
    }

    if (!form.email.includes("@")) {
      return alert("Enter a valid email");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/biodata");
      }

    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg === "User not found") {
        alert("User not found. Please register.");
      } else if (msg === "Wrong password") {
        alert("Incorrect password");
      } else {
        alert("Login failed");
      }
    }
  };

  const isDisabled = !form.email || !form.password;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Welcome to Biodata Application</h1>

      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
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
          Login
        </button>

        <p style={styles.text}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Click Me
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
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "40px"
},
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333"
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