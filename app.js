let employees = JSON.parse(localStorage.getItem("employees")) || [];
let currentPage = 1;
const pageSize = 5;

// Form submission event listener
document.getElementById("employee-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const about = document.getElementById("about").value;
  const joining_date = document.getElementById("joining_date").value;

  // Add the new employee to the array
  employees.push({ name, position, about, joining_date });
  localStorage.setItem("employees", JSON.stringify(employees));

  // Clear form inputs
  document.getElementById("employee-form").reset();

  // Render the updated employee table
  renderTable();

  // Show the Employee Listing page
  showPage("list");
});

// Render the employee table
function renderTable() {
  const tableBody = document.getElementById("employee-table");
  tableBody.innerHTML = ""; // Clear existing table rows
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedEmployees = employees.slice(start, end);

  paginatedEmployees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.about}</td>
      <td>${employee.joining_date}</td>
      <td><button onclick="deleteEmployee(${start + index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Update pagination info
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(employees.length / pageSize)}`;
}

// Delete an employee
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
}

// Handle page changes
function changePage(delta) {
  const maxPage = Math.ceil(employees.length / pageSize);
  currentPage = Math.min(Math.max(currentPage + delta, 1), maxPage);
  renderTable();
}

// Toggle navigation menu visibility for mobile
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("hidden");
}

// Show the specified page and hide others
function showPage(page) {
  document.querySelectorAll(".page").forEach((section) => {
    section.classList.add("hidden"); // Hide all sections
  });
  document.getElementById(page).classList.remove("hidden"); // Show the requested section
}

// Search employees by name
document.getElementById("search").addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  employees = allEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue)
  );
  currentPage = 1; // Reset to the first page
  renderTable();
});

// Initial render
renderTable();
