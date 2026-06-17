const SUPABASE_URL = "https://ujvgvxovpiuamftxevqi.supabase.co";
const SUPABASE_KEY = "sb_publishable_kw6rGwvniSwP3oLf87Zs3A_J54SvgoM";

let allPlayers = [];
let myTeam = [];
let usedNames = [];

const rugbyPositions = [
  "Prop",
  "Hooker",
  "Prop",
  "Scrumhalf",
  "Flyhalf",
  "Centre",
  "Winger"
];

const fieldPositions = [
  { top: "55px", left: "90px" },
  { top: "110px", left: "160px" },
  { top: "55px", left: "240px" },
  { top: "170px", left: "350px" },
  { top: "250px", left: "430px" },
  { top: "320px", left: "530px" },
  { top: "350px", left: "620px" }
];

async function getAllPlayers() {
  if (allPlayers.length > 0) return;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/playerss?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  allPlayers = await response.json();
}

async function newSelection() {
  await getAllPlayers();

  if (myTeam.length >= 7) {
    alert("Ton équipe est complète.");
    return;
  }

  const availablePlayers = allPlayers.filter(
    player => !usedNames.includes(player.name)
  );

  const countries = [...new Set(availablePlayers.map(player => player.country))];

  const randomCountry =
    countries[Math.floor(Math.random() * countries.length)];

  const playersFromCountry = availablePlayers
    .filter(player => player.country === randomCountry)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  document.getElementById("countryTitle").innerHTML =
    `Nationalité : <strong>${randomCountry}</strong>`;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  playersFromCountry.forEach(player => {
    const div = document.createElement("div");
    div.className = "choice";

    div.innerHTML = `
      <strong>${player.name}</strong><br>
      Poste : ${player.position}<br>
      Coupe du monde : ${player.world_cup}<br>
      Note : ${player.rating}
    `;

    div.onclick = () => choosePlayer(player);

    choices.appendChild(div);
  });
}

function choosePlayer(player) {
  if (myTeam.length >= 7) return;

  myTeam.push(player);
  usedNames.push(player.name);

  document.getElementById("choices").innerHTML = "";
  document.getElementById("countryTitle").innerHTML = "";

  showTeam();
}

function showTeam() {
  const field = document.getElementById("field");
  field.innerHTML = `<div class="posts"></div>`;

  myTeam.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player-circle";

    div.style.top = fieldPositions[index].top;
    div.style.left = fieldPositions[index].left;

    div.innerHTML = `
      <div class="player-number">${index + 1}</div>
      <div class="player-name">${player.name}</div>
      <div class="player-position">${rugbyPositions[index]}</div>
    `;

    field.appendChild(div);
  });
}

function playMatch() {
  if (myTeam.length < 7) {
    alert("Choisis 7 joueurs avant de jouer le match.");
    return;
  }

  const myPower = myTeam.reduce((total, p) => total + p.rating, 0);

  const opponent = [...allPlayers]
    .filter(player => !usedNames.includes(player.name))
    .sort(() => Math.random() - 0.5)
    .slice(0, 7);

  const opponentPower = opponent.reduce((total, p) => total + p.rating, 0);

  const myScore = Math.floor(myPower / 45) + Math.floor(Math.random() * 15);
  const opponentScore =
    Math.floor(opponentPower / 45) + Math.floor(Math.random() * 15);

  let message = "";

  if (myScore > opponentScore) message = "🏆 Victoire !";
  else if (myScore < opponentScore) message = "❌ Défaite.";
  else message = "🤝 Match nul.";

  document.getElementById("result").innerHTML = `
    <h2>${message}</h2>
    <p>Ton score : ${myScore}</p>
    <p>Score adverse : ${opponentScore}</p>
    <p>Puissance de ton équipe : ${myPower}</p>
    <p>Puissance adverse : ${opponentPower}</p>
  `;
}

function resetGame() {
  myTeam = [];
  usedNames = [];

  document.getElementById("choices").innerHTML = "";
  document.getElementById("countryTitle").innerHTML = "";
  document.getElementById("field").innerHTML = "";
  document.getElementById("result").innerHTML = "";
}

document.getElementById("newSelection").addEventListener("click", newSelection);
document.getElementById("playMatch").addEventListener("click", playMatch);
document.getElementById("reset").addEventListener("click", resetGame);
