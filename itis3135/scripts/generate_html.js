document.getElementById("generate-html").addEventListener("click", () => {
  const form = document.getElementById("intro-form");
  const coursesDiv = document.getElementById("courses");

  const firstName = form.firstName.value.trim();
  const middle = form.middleName.value.trim();
  const lastName = form.lastName.value.trim();
  const nickname = form.nickname.value.trim();
  const adjective = form.adjective.value.trim();
  const animal = form.animal.value.trim();
  const divider = form.divider.value.trim() || "★";
  const caption = form.caption.value.trim();
  const imageSrc = form.image.files[0]
    ? form.image.files[0].name
    : "images/intro-photo.png";
  const ackStatement = form.ackStatement.value.trim();
  const ackDate = form.ackDate.value.trim();
  const funnyThing = form.funnyThing.value.trim();
  const share = form.share.value.trim();

  const fullName = [firstName, middle, lastName].filter(Boolean).join(" ");
  const displayName = nickname
    ? `${fullName} (${nickname})`
    : fullName;

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
    .map((b) => `    &lt;li&gt;&lt;strong&gt;${b.label}:&lt;/strong&gt; ${b.value.trim()}&lt;/li&gt;`)
    .join("\n");

  const courses = Array.from(coursesDiv.querySelectorAll(".course-row"))
    .map((r) => {
      const inputs = r.querySelectorAll("input");
      return `    &lt;li&gt;&lt;strong&gt;${inputs[0].value.trim()} ${inputs[1].value.trim()} - ${inputs[2].value.trim()}:&lt;/strong&gt; ${inputs[3].value.trim()}&lt;/li&gt;`;
    })
    .join("\n");

  const extras = [
    funnyThing && `&lt;p&gt;&lt;strong&gt;Funny Thing:&lt;/strong&gt; ${funnyThing}&lt;/p&gt;`,
    share && `&lt;p&gt;&lt;strong&gt;Something to Share:&lt;/strong&gt; ${share}&lt;/p&gt;`
  ]
    .filter(Boolean)
    .join("\n");

  const acknowledgement =
    ackStatement || ackDate
      ? `&lt;p&gt;&lt;em&gt;${ackStatement}${ackDate ? ` (${ackDate})` : ""}&lt;/em&gt;&lt;/p&gt;`
      : "";

  const htmlOutput = `
&lt;h2&gt;Introduction HTML&lt;/h2&gt;
&lt;h3&gt;${displayName} ${divider} ${adjective} ${animal}&lt;/h3&gt;
&lt;figure&gt;
    &lt;img src="${imageSrc}" alt="Photo of ${displayName}" /&gt;
    &lt;figcaption&gt;${caption}&lt;/figcaption&gt;
&lt;/figure&gt;
&lt;ul&gt;
${bulletList}
&lt;/ul&gt;
&lt;h3&gt;Courses&lt;/h3&gt;
&lt;ul&gt;
${courses}
&lt;/ul&gt;
&lt;blockquote&gt;"${form.quote.value.trim()}" — ${form.author.value.trim()}&lt;/blockquote&gt;
${extras}
${acknowledgement}
`;

  document.querySelector("h1").textContent = "Introduction HTML";
  document.getElementById("form-section").innerHTML = `
    <pre><code class="language-html">${htmlOutput}</code></pre>
  `;

  hljs.highlightAll();
});
