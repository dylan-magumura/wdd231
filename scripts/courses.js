// scripts/course.js

// Grab DOM elements
const courseList = document.getElementById("course-list");
const creditsDisplay = document.getElementById("credits");
const allBtn = document.getElementById("all-btn");
const cseBtn = document.getElementById("cse-btn");
const wddBtn = document.getElementById("wdd-btn");

// Function to render courses
function displayCourses(filteredCourses) {
  // Clear current list
  courseList.innerHTML = "";

  // Build course cards
  filteredCourses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    // add special class if completed
    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number} - ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p>${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    courseList.appendChild(courseCard);
  });

  // Calculate total credits
  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Event listeners for filters
allBtn.addEventListener("click", () => displayCourses(courses));
cseBtn.addEventListener("click", () => {
  const cseCourses = courses.filter(course => course.subject === "CSE");
  displayCourses(cseCourses);
});
wddBtn.addEventListener("click", () => {
  const wddCourses = courses.filter(course => course.subject === "WDD");
  displayCourses(wddCourses);
});

// Default view: show all
displayCourses(courses);
