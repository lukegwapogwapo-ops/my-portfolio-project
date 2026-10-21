const API_URL = "https://api.balldontlie.io/v1/teams";

const teamResults = document.getElementById("teamResults");
const teamSearch = document.getElementById("teamSearch");
const searchBtn = document.getElementById("searchBtn");
const exploreBtn = document.getElementById("exploreBtn");

let teams = [];


// Get teams from BALLDONTLIE API
fetch(API_URL, {
    headers: {
        "Authorization": "d1cba5c8-472a-4f88-b569-4046f3289ee1"
    }
})
    .then(response => {

        if (!response.ok) {
            throw new Error("API request failed: " + response.status);
        }

        return response.json();
    })
    .then(data => {

        console.log("NBA Teams API:", data);

        teams = data.data;

        displayTeams(teams);
    })
    .catch(error => {

        console.error("Error:", error);

        teamResults.innerHTML =
            "<p>Unable to load NBA teams.</p>";
    });


// Display teams
function displayTeams(teamList) {

    teamResults.innerHTML = "";

    if (teamList.length === 0) {

        teamResults.innerHTML =
            "<p>No teams found.</p>";

        return;
    }

    teamList.forEach(team => {

        const card = document.createElement("div");

        card.classList.add("team-card");

        card.innerHTML = `
            <h3>${team.full_name}</h3>
            <p class="abbreviation">${team.abbreviation}</p>
            <p class="conference">
                ${team.conference} Conference
            </p>
            <p class="conference">
                ${team.division} Division
            </p>
        `;

        teamResults.appendChild(card);
    });
}


// Search teams
searchBtn.addEventListener("click", () => {

    const searchTerm =
        teamSearch.value.toLowerCase().trim();

    const filteredTeams = teams.filter(team =>
        team.full_name.toLowerCase().includes(searchTerm) ||
        team.abbreviation.toLowerCase().includes(searchTerm)
    );

    displayTeams(filteredTeams);
});


// Search when pressing Enter
teamSearch.addEventListener("keypress", event => {

    if (event.key === "Enter") {
        searchBtn.click();
    }
});


// Explore Teams button
exploreBtn.addEventListener("click", () => {

    document.getElementById("teams").scrollIntoView({
        behavior: "smooth"
    });

});