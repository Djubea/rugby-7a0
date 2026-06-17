const joueurs = [
  { name: "John Eales", country: "Australia", position: "Lock", rating: 86 },
  { name: "Agustin Pichot", country: "Argentina", position: "Scrum-half", rating: 90 },
  { name: "Brian O'Driscoll", country: "Ireland", position: "Centre", rating: 91 },
  { name: "Serge Blanco", country: "France", position: "Fullback", rating: 88 },
  { name: "Jonah Lomu", country: "New Zealand", position: "Wing", rating: 94 },
  { name: "Richie McCaw", country: "New Zealand", position: "Flanker", rating: 93 },
  { name: "Thierry Dusautoir", country: "France", position: "Flanker", rating: 92 }
];

let equipe = [];
let dejaChoisis = [];

function tirerJoueur() {
  const disponibles = joueurs.filter(
    joueur => !dejaChoisis.includes(joueur.name)
  );

  if (disponibles.length === 0) {
    alert("Tous les joueurs ont été utilisés !");
    return;
  }

  const joueur =
    disponibles[Math.floor(Math.random() * disponibles.length)];

  dejaChoisis.push(joueur.name);

  const liste = document.getElementById("players");

  liste.innerHTML = `
    <li>
      <strong>${joueur.name}</strong><br>
      Pays : ${joueur.country}<br>
      Poste : ${joueur.position}<br>
      Note : ${joueur.rating}
    </li>
  `;
}

document
  .getElementById("load")
  .addEventListener("click", tirerJoueur);
