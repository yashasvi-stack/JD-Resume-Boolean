async function generate() {
  const jd = document.getElementById("jd").value.trim();
  if (!jd) return alert("Paste JD first");

  const res = await fetch("https://vigaccenture.app.n8n.cloud/webhook/jd-boolean", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd })
  });

  const data = await res.json();
  renderOutput(data);
}

async function generateFromResume() {
  const fileInput = document.getElementById("resumeFile");
  if (!fileInput.files.length) {
    alert("Please upload a resume file");
    return;
  }

  const formData = new FormData();
  formData.append("resume", fileInput.files[0]);
  formData.append("source", "resume");

  const res = await fetch("https://vigaccenture.app.n8n.cloud/webhook/jd-boolean", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  renderOutput(data);
}

function renderOutput(data) {
  document.getElementById("output").classList.remove("hidden");

  document.getElementById("role").textContent = data.role;
  document.getElementById("skills").textContent = data.skills.join(", ");
  document.getElementById("experience").textContent = data.experience;
  document.getElementById("location").textContent = data.location;

  document.getElementById("role_boolean").textContent = data.role_boolean;
  document.getElementById("skills_boolean").textContent = data.skills_boolean;
  document.getElementById("experience_boolean").textContent = data.experience_boolean;
  document.getElementById("location_boolean").textContent = data.location_boolean;
  document.getElementById("final_boolean").textContent = data.final_boolean;
}

function copyBoolean() {
  navigator.clipboard.writeText(
    document.getElementById("final_boolean").textContent
  );
  alert("Boolean copied!");
}

function refreshUI() {
  document.getElementById("jd").value = "";
  document.getElementById("resumeFile").value = "";
  document.getElementById("output").classList.add("hidden");
}
