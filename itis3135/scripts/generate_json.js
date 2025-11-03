document.getElementById("generate-json").addEventListener("click", () => {
  const form = document.getElementById("intro-form");
  const coursesDiv = document.getElementById("courses");

  // Generate object using your form data
  const data = {
    firstName: form.firstName.value.trim(),
    preferredName: form.nickname.value.trim(),
    middleInitial: form.middleName.value.trim(),
    lastName: form.lastName.value.trim(),
    divider: form.divider.value.trim(),
    mascotAdjective: form.adjective.value.trim(),
    mascotAnimal: form.animal.value.trim(),
    image: form.image.files[0]
      ? form.image.files[0].name
      : "images/intro-photo.png",
    imageCaption: form.caption.value.trim(),
    personalStatement: form.personalStatement.value.trim(),
    personalBackground: form.personalBackground.value.trim(),
    professionalBackground: form.professionalBackground.value.trim(),
    academicBackground: form.academicBackground.value.trim(),
    subjectBackground: form.softwareBackground.value.trim(),
    primaryComputer: "MacBook Pro (Personal Computer)",
    courses: Array.from(coursesDiv.querySelectorAll(".course-row")).map((r) => {
      const inputs = r.querySelectorAll("input");
      return {
        department: inputs[0].value.trim(),
        number: inputs[1].value.trim(),
        name: inputs[2].value.trim(),
        reason: inputs[3].value.trim()
      };
    }),
    links: [
      { name: "GitHub", href: "https://github.com/" },
      { name: "GitHub Page", href: "https://github.io/" },
      { name: "freeCodeCamp", href: "https://www.freecodecamp.org/" },
      { name: "Codecademy", href: "https://www.codecademy.com/" },
      { name: "LinkedIn", href: "https://linkedin.com/" }
    ]
  };

  // Replace page content with formatted JSON
  const formattedJSON = JSON.stringify(data, null, 2);
  document.querySelector("h1").textContent = "Introduction JSON";
  document.getElementById("form-section").innerHTML = `
    <pre><code class="language-json">${formattedJSON}</code></pre>
  `;

  // Apply syntax highlighting
  hljs.highlightAll();
});
