import { useState } from "react";
import { X } from "lucide-react";
import api from "../lib/axios.js"; 

const GuestFormModal = ({ type = "IN", onClose, onSuccess }) => {
  const [form, setForm] = useState({
    student_id: "",
    full_name: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "student_id") {
      // Only allow digits and hyphens for Student ID
      const cleaned = value.replace(/[^\d-]/g, '');
      // Limit to 10 characters
      const limited = cleaned.slice(0, 10);
      setForm(f => ({ ...f, [name]: limited }));
    } else {
      // For full name, allow any characters (no restrictions)
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.student_id.length !== 10) {
        setError("ID must be 10 characters: ####-#####");
        setTimeout(() => setError(""), 2000);
        return;
    }
    if (!form.full_name.trim()) {
        setError("Name required");
        setTimeout(() => setError(""), 2000);
        return;
    }

    setLoading(true);
    setError("");

    try {
        await api.post('/attendance/guest', {
            student_id: form.student_id,
            student_name: form.full_name
        });

        if (onSuccess) onSuccess(); 
        onClose();
        
    } catch (err) {
        const msg = err.response?.data?.error || "Registration failed.";
        setError(msg);
        setTimeout(() => setError(""), 2000);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Guest Registration</h3>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Student ID</label>
            <input
              type="text"
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              placeholder="2024-12345"
              maxLength={10}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white font-mono text-center focus:border-yellow-500 focus:outline-none"
              disabled={loading}
              required
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">Numbers and hyphen only (####-#####)</p>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white text-center focus:border-yellow-500 focus:outline-none"
              disabled={loading}
              required
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={loading || form.student_id.length !== 10 || !form.full_name.trim()}
            className="w-full p-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Register & Time " + type}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestFormModal;