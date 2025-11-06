import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./ContentListDisplay.css";
import ContentAdditionForm from "../ContentAdditionForm/ContentAdditionForm";

export default function ContentListDisplay() {
  const [contentData, setContentData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [insertPopup, setInsertPopup] = useState(false);
  const filterList = [10, 15, 25];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "content"));

      const finalData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.contentName.localeCompare(b.contentName));
      setContentData(finalData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (contentInfo) => {
    if (
      !contentInfo.contentName ||
      !contentInfo.chapterNo ||
      !contentInfo.category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Push new document to Firestore
      await addDoc(collection(db, "content"), {
        contentName: contentInfo.contentName,
        chapterNo: contentInfo.chapterNo,
        category: contentInfo.category,
        // createdAt: new Date(), // optional: for sorting later
      });

      alert("Content added successfully!");

      handleInsertPopup();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Check console for details.");
    }
  };

  const startingIndex = currentPage * currentFilter;
  const endingIndex = (currentPage + 1) * currentFilter;

  const requestFilterData = () => {
    let updatedContentData = [];
    if (searchInput) {
      updatedContentData = contentData.filter((data) => {
        return data.contentName.includes(searchInput);
      });
    } else {
      updatedContentData = contentData;
    }
    return updatedContentData.slice(startingIndex, endingIndex);
  };

  const handleInsertPopup = (e) => {
    setInsertPopup((prev) => !prev);
  };

  const filterData = requestFilterData();

  return (
    <>
      <div className="content-list-container">
        <div className="content-list-header">
          <input
            type="text"
            placeholder="Search content..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleInsertPopup}>Insert</button>
        </div>

        <table className="content-list-table">
          <thead>
            <tr>
              <th>Content Name</th>
              <th>Content Type</th>
              <th>Current Chapter</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((data) => (
              <tr key={data.id}>
                <td>{data.contentName}</td>
                <td>{data.contentType}</td>
                <td>{data.chapterNo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="content-list-footer">
          <div className="pagination-controls">
            <select
              value={currentFilter}
              onChange={(e) => setCurrentFilter(Number(e.target.value))}
            >
              {filterList.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>

            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span>{currentPage + 1}</span>

            <button
              disabled={(currentPage + 1) * currentFilter >= contentData.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

          <p>
            Showing {startingIndex + 1} -{" "}
            {Math.min(endingIndex, contentData.length)} of {contentData.length}
          </p>
        </div>
      </div>

      {insertPopup && (
        <ContentAdditionForm
          onClose={handleInsertPopup}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
