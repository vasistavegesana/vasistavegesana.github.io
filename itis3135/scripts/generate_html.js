document.getElementById("generate-html").addEventListener("click", () => {
  const form = document.getElementById("intro-form");
  const coursesDiv = document.getElementById("courses");

  // Build the HTML content from your form inputs
  const firstName = form.firstName.value.trim();
  const middle = form.middleName.value.trim();
  const lastName = form.lastName.value.trim();
  const nickname = form.nickname.value.trim();
  const adjective = form.adjective.value.trim();
  const animal = form.animal.value.trim();
  const divider = form.divider.value.trim() || "★";
  const caption = form.caption.value.trim();
  const imageFile = form.image.files[0]
    ? form.image.files[0].name
    : "images/intro-photo.png";

  const displayName = nickname
    ? `${firstName} ${middle} "${nickname}" ${lastName}`
    : `${firstName} ${middle} ${lastName}`;

  const bullets = [
    { label: "Personal Statement", value: form.personalStatement.value },
    { label: "Personal Background", value: form.personalBackground.value },
    { label: "Academic Background", value: form.academicBackground.value },
    { label: "Professional Background", value: form.professionalBackground.value },
    { label: "Programming/Software Background", value: form.softwareBackground.value },
    { label: "Academic Interests", value: form.academicInterests.value },
    { label: "Course Goals", value: form.courseGoals.value },
    { label: "Fun Fact", value: form.funFact.value }
  ].filter((b) => b.value.trim());

  const bulletList = bullets
    .map((b) => `    <li><strong>${b.label}:</strong> ${b.value.trim()}</li>`)
    .join("\n");

  const courses = Array.from(coursesDiv.querySelectorAll(".course-row")).map(
    (r) => {
      const inputs = r.querySelectorAll("input");
      return `    <li><strong>${inputs[0].value} ${inputs[1].value} - ${inputs[2].value}:</strong> ${inputs[3].value}</li>`;
    }
  ).join("\n");

  // Construct literal HTML (escaped with &lt; and &gt;)
  const htmlOutput = `
&lt;h2&gt;Introduction HTML&lt;/h2&gt;
&lt;h3&gt;${displayName} ${divider} ${adjective} ${animal}&lt;/h3&gt;
&lt;figure&gt;
    &lt;img src="images/${imageFile}" alt="Photo of ${displayName}" /&gt;
    &lt;figcaption&gt;${caption}&lt;/figcaption&gt;
&lt;/figure&gt;
&lt;ul&gt;
${bulletList}
&lt;/ul&gt;
&lt;h3&gt;Courses&lt;/h3&gt;
&lt;ul&gt;
${courses}
&lt;/ul&gt;
&lt;blockquote&gt;"${form.quote.value}" — ${form.author.value}&lt;/blockquote&gt;
`;

  // Replace the form with formatted HTML code
  document.querySelector("h1").textContent = "Introduction HTML";
  document.getElementById("form-section").innerHTML = `
    <pre><code class="language-html">${htmlOutput}</code></pre>
  `;

  hljs.highlightAll();
});
