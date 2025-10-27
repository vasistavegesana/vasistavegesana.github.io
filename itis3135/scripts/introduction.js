const form = document.getElementById("intro-form");
const result = document.getElementById("result");
const addBtn = document.getElementById("add-course");
const clearBtn = document.getElementById("clear");
const coursesDiv = document.getElementById("courses");

// ------------------- ADD / DELETE COURSES -------------------
function addCourse(prefill = {}) {
  const div = document.createElement("div");
  div.className = "course-row";
  div.innerHTML = `
    <input required name="dept" placeholder="Dept" value="${prefill.dept || ""}">
    <input required name="num" placeholder="Number" value="${prefill.num || ""}">
    <input required name="name" placeholder="Course Name" value="${prefill.name || ""}">
    <input required name="reason" placeholder="Reason" value="${prefill.reason || ""}">
    <button type="button" class="delete-course">Delete</button>
  `;
  div.querySelector(".delete-course").addEventListener("click", () => div.remove());
  coursesDiv.appendChild(div);
}

// Prefilled starter courses (Fall 2025)
[
  { dept: "CTCM", num: "2530", name: "Critical Thinking", reason: "Degree Requirement" },
  { dept: "INFO", num: "2130", name: "Intro to Business Computing", reason: "Degree requirement for minor" },
  { dept: "ITIS", num: "3135", name: "Front-End Web App Development", reason: "Very interested; skills for future endeavors" },
  { dept: "ITSC", num: "2175", name: "Logic and Algorithms", reason: "Degree requirement; want to learn more" },
  { dept: "STAT", num: "2122", name: "Intro to Prob & Stat", reason: "Degree Requirement" },
  { dept: "ITIS", num: "3688", name: "Computers & Their Impact on Society", reason: "Degree Requirement" }
].forEach(addCourse);

// Add new blank course
addBtn.addEventListener("click", () => addCourse());

// Delete existing course rows
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-course")) {
    e.target.closest(".course-row").remove();
  }
});

// ------------------- CLEAR BUTTON -------------------
clearBtn.addEventListener("click", () => {
  Array.from(form.querySelectorAll("input[type='text'], input[type='url'], input[type='date'], textarea"))
    .forEach((el) => (el.value = ""));
  Array.from(form.querySelectorAll("input[type='file']")).forEach((el) => (el.value = ""));
});

// ------------------- SHOW RESULT -------------------
const showResult = (d) => {
  const fullName = [d.firstName, d.middleName, d.lastName].filter(Boolean).join(" ");
  const displayName = d.nickname ? `${fullName} (${d.nickname})` : fullName;
  const divider = d.divider || "|";

  const bullets = [
    { label: "Personal Statement", value: d.personalStatement },
    { label: "Personal Background", value: d.personalBackground },
    { label: "Academic Background", value: d.academicBackground },
    { label: "Professional Background", value: d.professionalBackground },
    { label: "Programming/Software Background", value: d.softwareBackground },
    { label: "Academic Interests", value: d.academicInterests },
    { label: "Course Goals", value: d.courseGoals },
    { label: "Fun Fact", value: d.funFact }
  ];

  const bulletList = bullets
    .filter((b) => b.value)
    .map((b) => `<li><strong>${b.label}:</strong> ${b.value}</li>`)
    .join("");

  const courseList = d.courses
    .map((c) => `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`)
    .join("");

  result.innerHTML = `
    <div class="success-message" style="color: #00ff99; font-weight: bold; margin-bottom: 10px;">
      ✅ Form submitted successfully!
    </div>
    <h2>Introduction</h2>
    <figure>
      <img src="${d.pictureUrl}" alt="intro picture" style="max-width:250px; border-radius:8px;">
      <figcaption>${d.caption}</figcaption>
    </figure>
    <p><strong>${displayName}</strong> ${divider} <strong>${d.adjective} ${d.animal}</strong></p>
    <ul>${bulletList}</ul>
    <h3>Courses</h3>
    <ul>${courseList}</ul>
    <blockquote>“${d.quote}” — ${d.author}</blockquote>
    ${d.funnyThing ? `<p><strong>Funny Thing:</strong> ${d.funnyThing}</p>` : ""}
    ${d.share ? `<p><strong>Something to Share:</strong> ${d.share}</p>` : ""}
    <p><em>${d.ackStatement} (${d.ackDate})</em></p>
    <p><a href="#" id="reset-intro">Reset</a></p>
  `;

  form.hidden = true;
  result.hidden = false;

  document.getElementById("reset-intro").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
};

// ------------------- SUBMIT HANDLER -------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const fileInput = form.querySelector("input[type='file']");
  const imgUrl = fileInput.files[0]
    ? URL.createObjectURL(fileInput.files[0])
    : "images/intro-photo.png";

  const data = {
    firstName: form.firstName.value.trim(),
    middleName: form.middleName.value.trim(),
    nickname: form.nickname.value.trim(),
    lastName: form.lastName.value.trim(),
    ackStatement: form.ackStatement.value.trim(),
    ackDate: form.ackDate.value,
    adjective: form.adjective.value.trim(),
    animal: form.animal.value.trim(),
    divider: form.divider.value.trim(),
    pictureUrl: imgUrl,
    caption: form.caption.value.trim(),
    personalStatement: form.personalStatement.value.trim(),
    personalBackground: form.personalBackground.value.trim(),
    academicBackground: form.academicBackground.value.trim(),
    professionalBackground: form.professionalBackground.value.trim(),
    softwareBackground: form.softwareBackground.value.trim(),
    courseGoals: form.courseGoals.value.trim(),
    academicInterests: form.academicInterests.value.trim(),
    funFact: form.funFact.value.trim(),
    courses: Array.from(coursesDiv.querySelectorAll(".course-row")).map((r) => {
      const inputs = r.querySelectorAll("input");
      return {
        dept: inputs[0].value.trim(),
        num: inputs[1].value.trim(),
        name: inputs[2].value.trim(),
        reason: inputs[3].value.trim()
      };
    }),
    quote: form.quote.value.trim(),
    author: form.author.value.trim(),
    funnyThing: form.funnyThing.value.trim(),
    share: form.share.value.trim()
  };

  showResult(data);
});
