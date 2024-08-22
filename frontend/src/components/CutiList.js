import { useState, useEffect } from "react";
import { fetchCutis, deleteCuti } from "../services/api"; // Adjust the import according to your API service
import { Link, useLocation } from "react-router-dom";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

const CutiList = () => {
  const location = useLocation();
  const [cutis, setCutis] = useState([]);
  const [filteredCutis, setFilteredCutis] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("tgl_cuti");
  const [sortDirection, setSortDirection] = useState("asc");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchCutisList = async (page = currentPage) => {
    try {
      const response = await fetchCutis(page, 10, nameFilter);
      setCutis(response.data.cutis);
      setFilteredCutis(response.data.cutis);
      const pagination = response.data.pagination || {};
      setTotalPages(pagination.last_page || 1);
    } catch (error) {
      console.error("Error fetching cutis:", error.message);
    }
  };

  useEffect(() => {
    fetchCutisList();
  }, [currentPage, nameFilter]);

  useEffect(() => {
    const filtered = cutis
      .filter((cuti) =>
        cuti.employee?.nama?.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortColumn === "lama_cuti") {
          // For numeric values, compare as numbers
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          // For string values, compare as strings
          return sortDirection === "asc"
            ? String(aValue).localeCompare(String(bValue), undefined, {
                sensitivity: "base",
              })
            : String(bValue).localeCompare(String(aValue), undefined, {
                sensitivity: "base",
              });
        }
      });
    setFilteredCutis(filtered);
  }, [nameFilter, cutis, sortColumn, sortDirection]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leave record?"
    );
    if (confirmed) {
      try {
        await deleteCuti(id);
        fetchCutisList();
        alert("Leave record deleted successfully.");
        setMessage("Employee deleted successfully.");
        setMessageType("success");
      } catch (error) {
        console.error("Error deleting leave record:", error.message);
        alert("Failed to delete leave record.");
        setMessage("Failed to delete employee.");
        setMessageType("error");
      }
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {location.state?.message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              location.state.messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {location.state.message}
          </div>
        )}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">Leave Records</h1>
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-start">
          <Link
            to="/cutis/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center space-x-2 mb-4 sm:mb-0"
          >
            <FiPlus size={20} />
            <span>Add Leave Record</span>
          </Link>
          <input
            type="text"
            placeholder="Search by employee name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => handleSort("tgl_cuti")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date{" "}
                  {sortColumn === "tgl_cuti" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("employee.nama")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee{" "}
                  {sortColumn === "employee.nama" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("lama_cuti")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Number of Days{" "}
                  {sortColumn === "lama_cuti" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("keterangan")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description{" "}
                  {sortColumn === "keterangan" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCutis.map((cuti) => (
                <tr key={cuti.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cuti.tgl_cuti}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cuti.employee?.nama || "N/A"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cuti.lama_cuti}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cuti.keterangan}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                    <Link
                      to={`/cutis/${cuti.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(cuti.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CutiList;
