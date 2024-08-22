import { useState, useEffect } from "react";
import { fetchEmployees, deleteEmployee } from "../services/api";
import { Link, useLocation } from "react-router-dom";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

const EmployeeList = () => {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [firstThreeEmployees, setFirstThreeEmployees] = useState([]);
  const [latestThreeEmployees, setLatestThreeEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("nama");
  const [sortDirection, setSortDirection] = useState("asc");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchEmployeesList = async (page = currentPage) => {
    try {
      const response = await fetchEmployees(page, 10, nameFilter);
      const allEmployees = response.data.employees;
      setEmployees(allEmployees);
      setFilteredEmployees(allEmployees);
      setTotalPages(response.pagination.last_page);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const fetchEmployeesList2 = async (all = true) => {
    try {
      const response = await fetchEmployees(null, null, null, all);
      const allEmployees = response.data.employees;

      setFirstThreeEmployees(allEmployees.slice(0, 3));

      setLatestThreeEmployees(allEmployees.slice(-3));
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployeesList();
    fetchEmployeesList2();
  }, [currentPage, nameFilter]);

  useEffect(() => {
    const filtered = employees
      .filter((emp) =>
        emp.nama.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortColumn === "sisa_cuti") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          return sortDirection === "asc"
            ? String(aValue).localeCompare(String(bValue), undefined, {
                sensitivity: "base",
              })
            : String(bValue).localeCompare(String(aValue), undefined, {
                sensitivity: "base",
              });
        }
      });
    setFilteredEmployees(filtered);
  }, [nameFilter, employees, sortColumn, sortDirection]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      try {
        await deleteEmployee(id);
        fetchEmployeesList();
        alert("Employee deleted successfully.");
        setMessage("Employee deleted successfully.");
        setMessageType("success");
      } catch (error) {
        console.error("Error deleting employee:", error.message);
        alert("Failed to delete employee.");
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
        <h1 className="text-3xl font-bold mb-4">Employees</h1>
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-start">
          <Link
            to="/employees/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center space-x-2 mb-4 sm:mb-0"
          >
            <FiPlus size={20} />
            <span>Add Employee</span>
          </Link>
          <input
            type="text"
            placeholder="Search by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mb-8">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => handleSort("no_induk")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee ID{" "}
                  {sortColumn === "no_induk" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("nama")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name{" "}
                  {sortColumn === "nama" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("alamat")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address{" "}
                  {sortColumn === "alamat" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("tgl_lahir")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date of Birth{" "}
                  {sortColumn === "tgl_lahir" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("tgl_bergabung")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Join Date{" "}
                  {sortColumn === "tgl_bergabung" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th
                  onClick={() => handleSort("sisa_cuti")}
                  className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining Leave{" "}
                  {sortColumn === "sisa_cuti" &&
                    (sortDirection === "asc" ? "🔼" : "🔽")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.no_induk}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.nama}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.alamat}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.tgl_lahir}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.tgl_bergabung}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.sisa_cuti}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                    <Link
                      to={`/employees/${emp.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(emp.id)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {/* First Three Employees Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">First Three Employees</h2>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Employee ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Join Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {firstThreeEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.no_induk}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.tgl_bergabung}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.nama}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Latest Three Employees Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Latest Three Employees</h2>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Employee ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Join Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestThreeEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.no_induk}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.tgl_bergabung}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.nama}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
