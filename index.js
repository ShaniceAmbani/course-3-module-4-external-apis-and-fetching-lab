const input = document.getElementById("state-input");
const button = document.getElementById("fetch-btn");
const results = document.getElementById("results");
const errorMessage = document.getElementById("error-message");

button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  results.innerHTML = "";

  // reset error every click
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  if (!state) {
    errorMessage.textContent = "Please enter a state abbreviation";
    errorMessage.classList.remove("hidden");
    input.value = "";
    return;
  }

  try {
    const response = await fetch(
      `https://api.weather.gov/alerts?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Network issue");
    }

    const data = await response.json();

    const alerts = data.features || [];

    // REQUIRED FORMAT (VERY IMPORTANT FOR TESTS)
    const title = document.createElement("h2");
    title.textContent =
      `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
    results.appendChild(title);

    // DISPLAY ALERTS
    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.properties.headline;
      results.appendChild(p);
    });

  } catch (error) {
    errorMessage.textContent = "Network issue";
    errorMessage.classList.remove("hidden");
  }

  input.value = "";
});