// Variables 
// Trouve la date du présent
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //Janvier est 0, donc on doit ajouter un 1 pour qu'il soit 1
var yyyy = today.getFullYear();

// Ajoute un '0' comme préfix si le jour 
// ou le mois est inférieur à 10
if (dd < 10) {
  dd = '0' + dd
} 
if (mm < 10 ) {
  mm = '0' + mm
} 

// Trouve la date d'aujourd'hui
today = yyyy+'-'+mm+'-'+dd;

// La date minimum que l'on peut choisir est celle d'aujourd'hui
document.getElementById("date").setAttribute("min", today);

// Effectue le event listener lorsqu'un temps sur la page de réservation
// est sélectionné.
$('.cell').click( function() {
  $('.cell').removeClass('select');
  $(this).addClass('select');

  // Prends le temps et le jour en consideration
  getDateAndTime((this.innerHTML));
});


/**
 * Cette fonction est appelé afin d'afficher la date et l'heure sélectionnée 
 * par l'utilisateur sur la page de réservation. Elle convertit les valeurs 
 * entrées afin de créer une date qui correspond à ces valeurs afin d'afficher
 * la date et l'heure sous la forme : Lundi 10 Juin 2023 à 11h30.
 * @param {*} time 
 */
function getDateAndTime(time) {
  var date = document.getElementById("date").value;

  // Variables selon la date entrée
  let fields = date.split('-');
  let year = fields[0]; // année
  let month_tmp = fields[1]; // moiss
  let month = Number(month_tmp)-1;
  let day = fields[2]; // jour

  // Création d'une nouvelle date selon le jour entrée
  let jour = new Date(year, month, day);
  
  // Retire '0' si le jour sélectionné est plus petit que 10
  if (Number(day) < 10) {
    let fieldDay = day.split('0');
    day = fieldDay[1];
  }

  // Constantes pour les jours de la semaine et les mois dans une année
  const jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const mois = ["Janvier", "Février", "Mars", "Avil", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  // Insère la date et heure sous forme: Lundi 10 Juin 2023 à 11h30.
  document.getElementById("selectedDateTime").innerHTML = jours[jour.getDay()] + " " + day + " " + mois[month] + " " + year + " à " + time;
}


/**
 * Cette fonction appelle les différentes plages d'heures disponibles
 * écrite dans le fichier HTML booking.html, selon la date et le jour 
 * de la semaine choisi, afin de respecter les heures d'ouvertures de 
 * la compagnie. 
 */
function getAvailableTimeSlots() {

  // Retire la dernière heure sélectionné 
  $('.cell').removeClass('select');
  document.getElementById("selectedDateTime").innerHTML = "";
  
  // Variable afin de trouver la date entrée par l'utilisateur
  var dateChosen = document.getElementById("date").value;

  // Affiche les différentes heures de disponibilités
  if (dateChosen) {
    document.getElementById("dispoTime").style.display = "block";
    
  } else {
    document.getElementById("dispoTime").style.display = "none";
  }

  // Variables selon la date choisi
  var fields = dateChosen.split('-');
  var year = fields[0]; // année
  var month_tmp = fields[1];
  var month = Number(month_tmp) -1; // mois
  var day = fields[2]; // jour

  // Création d'une date selon la date choisie
  var timeDate = new Date(year, month, day);

  // Si le jour sélectionné est un dimanche
  if (timeDate.getDay() == 0) 
  {
    // Affiche les heures de disponibilités du dimanche
    document.getElementById("sundayHours").style.display = "block";

    // Cache les heures de disponibilités des jours de la semaine et du samedi
    document.getElementById("saturdayHours").style.display = "none";
    document.getElementById("weekdaysHours").style.display = "none";
  } 
  else if (timeDate.getDay() == 6) // Jour sélectionné est un samedi
  {
    
    // Affiche les heures de disponibilités du samedi
    document.getElementById("saturdayHours").style.display = "block";

    // Cache les heures de disponibilités des jours de la semaine et du dimanche
    document.getElementById("sundayHours").style.display = "none";
    document.getElementById("weekdaysHours").style.display = "none";
  } else // Jour sélectionné est un jour de la semaine 
  { 
  
    // Affiche les heures de disponibilités des jours de la semaine
    document.getElementById("weekdaysHours").style.display = "block";

    // Cache les heures de disponibilités des jours de la fin de semaine
    document.getElementById("sundayHours").style.display = "none";
    document.getElementById("saturdayHours").style.display = "none";
  }
}


