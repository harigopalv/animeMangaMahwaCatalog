import { useState } from "react";
import { X } from "lucide-react";
import { loginAdmin } from "../../loginAdmin";

export default function LoginComponent({ onClose, setLoggedInfo }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <div className="popup-overlay">
      <form className="popup-content">
        <X size={20} onClick={onClose} />

        <h3
          style={{
            marginBottom: "0.5rem",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          Login
        </h3>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            updateEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            updatePassword(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => loginAdmin(email, password, setLoggedInfo)}
        >
          Login
        </button>
      </form>
    </div>
  );
}
