import { useState } from "react";
import { X } from "lucide-react";
import "./ContentAdditionForm.css";

export default function ContentAdditionForm({ onClose, onSubmit }) {
  const [contentInfo, setContentInfo] = useState({
    contentName: "",
    chapterNo: "",
    contentType: "",
  });

  const handleContentUpdate = (e) => {
    const { name, value } = e.target;
    setContentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) onSubmit(contentInfo);

    setContentInfo({
      contentName: "",
      chapterNo: "",
      contentType: "",
    });
  };

  return (
    <div className="popup-overlay">
      <form className="popup-content" onSubmit={handleSubmit}>
        <X size={20} onClick={onClose} />

        <h3
          style={{
            marginBottom: "0.5rem",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          Add New Content
        </h3>

        <input
          type="text"
          name="contentName"
          value={contentInfo.contentName}
          onChange={handleContentUpdate}
          placeholder="Enter Content Name"
        />
        <input
          type="text"
          name="chapterNo"
          value={contentInfo.chapterNo}
          onChange={handleContentUpdate}
          placeholder="Enter Chapter No"
        />
        <input
          type="text"
          name="contentType"
          value={contentInfo.contentType}
          onChange={handleContentUpdate}
          placeholder="Enter contentType"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
