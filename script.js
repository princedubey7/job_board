let jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Bangalore",
    salary: "60000",
    description: "Looking for a React developer with 2+ years of experience."
  },
  {
  title: "Software Tester (QA)",
  company: "AssureSoft",
  location: "Noida",
  salary: 48000,
  description: "Manual and automation testing, writing test cases and identifying bugs."
},
  {
    title: "UI/UX Designer",
    company: "Designify",
    location: "Mumbai",
    salary: "50000/month",
    description: "Creative designer needed for mobile and web apps."
  },
   {
    title: "Backend Developer",
    company: "CodeCraft Ltd.",
    location: "Hyderabad",
    salary: 70000,
    description: "Node.js developer needed with knowledge of REST APIs and MongoDB."
  },
  {
    title: "Data Analyst",
    company: "DataWiz Analytics",
    location: "Mumbai",
    salary: 55000,
    description: "Fresher/Experienced analyst required. Skills: Excel, SQL, Power BI."
  },
  {
    title: "Android App Developer",
    company: "MobileMart Pvt. Ltd.",
    location: "Delhi",
    salary: 50000,
    description: "Kotlin/Java Android dev for creating e-commerce apps."
  },
  {
    title: "Digital Marketing Executive",
    company: "BuzzReach",
    location: "Chennai",
    salary: 40000,
    description: "SEO, Social Media Marketing, and Email Campaigns."
  }
];

function displayJobs(filter = "") {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase()) ||
    job.location.toLowerCase().includes(filter.toLowerCase())
  );

  filteredJobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";
    const formattedSalary = job.salary
      ? `₹${parseInt(job.salary).toLocaleString("en-IN")}/month`
      : "Not specified";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong></p>
      <p class="location">${job.location}</p>
      <p><strong>Salary:</strong> ${formattedSalary}</p>
      <p>${job.description}</p>
      <button onclick="openApplyModal('${job.title}', '${job.company}')">Apply</button>
    `;
    jobList.appendChild(card);
  });
}

function addJob() {
  if (!localStorage.getItem("loggedInUser")) {
    alert("Please login to add a job.");
    return;
  }

  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const location = document.getElementById("location").value;
  const salary = document.getElementById("salary").value;
  const description = document.getElementById("description").value;

  if (title && company && location && salary && description) {
    jobs.push({ title, company, location, salary, description });
    displayJobs();
    document.getElementById("jobTitle").value = "";
    document.getElementById("company").value = "";
    document.getElementById("location").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("description").value = "";
  } else {
    alert("Please fill all fields");
  }
}

function toggleModal(show) {
  document.getElementById("authModal").style.display = show ? "flex" : "none";
}

function register() {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  if (email && password) {
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      alert("User already exists!");
      return;
    }
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered! Now log in.");
  }
}

function login() {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email] && users[email] === password) {
    localStorage.setItem("loggedInUser", email);
    toggleModal(false);
    updateAuthUI();
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  updateAuthUI();
}

function updateAuthUI() {
  const loggedIn = localStorage.getItem("loggedInUser");
  document.getElementById("loginBtn").style.display = loggedIn ? "none" : "inline-block";
  document.getElementById("logoutBtn").style.display = loggedIn ? "inline-block" : "none";
}

document.getElementById("loginBtn").onclick = () => toggleModal(true);
document.getElementById("logoutBtn").onclick = logout;
document.getElementById("searchInput").addEventListener("input", (e) => {
  displayJobs(e.target.value);
});

updateAuthUI();
displayJobs();

function openApplyModal(jobTitle, company) {
  selectedJob = { title: jobTitle, company: company };
  document.getElementById("applyModal").style.display = "flex";
}

function closeApplyModal() {
  document.getElementById("applyModal").style.display = "none";
  document.getElementById("applicantName").value = "";
  document.getElementById("applicantEmail").value = "";
  document.getElementById("resumeLink").value = "";
}

function submitApplication() {
  const name = document.getElementById("applicantName").value.trim();
  const email = document.getElementById("applicantEmail").value.trim();
  const resume = document.getElementById("resumeLink").value.trim();

  if (!name || !email || !resume) {
    alert("Please fill all fields.");
    return;
  }

  // You can also store applications to localStorage here if needed
  alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
  closeApplyModal();
}

let selectedJob = null;
