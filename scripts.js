// Constantes & variables
const prevBtn = document.querySelectorAll(".previous-step");        // Bouton sur page reservation qui ramene utilisateur sur page precedente
const nextBtn = document.querySelectorAll(".next-step");            // Bouton sur page reservation qui amene utilisateur sur page suivante
const progress = document.getElementById("progress");               // Progres
const formSteps = document.querySelectorAll(".form-step");          // Etapes de la reservation
const progressStep = document.querySelectorAll(".progress-step");   // Progres reservation

let formStepsNum = 0;   // Variable qui permet de savoir a quelle etape utilisateur se trouve

// Liste est cree lors d'un nouveau processus de reservation
// Lsite des services selectionnees
var ul = document.createElement("ul");
ul.className = "list-group";
ul.id = "listService";
document.getElementById("servicesSelectionne").appendChild(ul);

// Description des services offerts pour les services d'ongles naturels
let servicesOffertsOnglesNaturels = [
    {service: 'Manucure régulière', duree: '40min',  prix: '25.00$'},
    {service: 'Manucure française', duree: '50min', prix: '35.00$'},
    {service: 'Manucure shellac', duree: '30min', prix: '40.00$'},
    {service: 'Pédicure régulière', duree: '45min', prix: '35.00$'},
    {service: 'Pédicure française', duree: '55min', prix: '40.00$'},
    {service: 'Pédicure shellac', duree: '40min', prix: '50.00$'},
    {service: 'Pédi régulière + Manu régulière', duree: '85min', prix: '55.00$'},
    {service: 'Pédi française + Manu française', duree: '105min', prix: '70.00$'},
    {service: 'Pédi régulière + Manu shellac', duree: '75min', prix: '70.00$'},
    {service: 'Pédi shellac + Manu régulière', duree: '80min', prix: '70.00$'},
    {service: 'Pédi shellac + Manu shellac', duree: '70min', prix: '85.00$'}
]

// Description des services offerts pour les services d'ongles artificiels
let servicesOffertsOnglesArtificiels = [
    {service: "Extensions d'ongles ombrés (remplissage)", duree: '50min', prix: '55.00$'},
    {service: "Extensions d'ongles ombrés (ensemble complet)", duree: '40min', prix: '65.00$'},
    {service: "Ongles solaires (remplissage)", duree: '45min', prix: '45.00$'},
    {service: "Ongles solaires (ensemble complet)", duree: '40min', prix: '50.00$'},
    {service: "Acrylique (remplissage)", duree: '35min', prix: '45.00$'},
    {service: "Acrylique (ensemble complet)", duree: '30min', prix: '55.00$'},
    {service: "Trempage (remplissage)", duree: '40min', prix: '40.00$'},
    {service: "Trempage (ensemble complet)", duree: '40min', prix: '50.00$'},
    {service: "Enlèvement de faux ongles", duree: '5min', prix: '20.00$'}
]

// Description des services offerts pour les services pour enfants
let servicesOffertsEnfants = [
    {service: "Manucure régulière (enfant)", duree: '25min', prix: '15.00$'},
    {service: "Manucure shellac (enfant)", duree: '30min', prix: '30.00$'},
    {service: "Pédicure régulière (enfant)", duree: '30min', prix: '25.00$'},
    {service: "Pédicure shellac (enfant)", duree: '35min', prix: '40.00$'},
    {service: "Pédicure régulière + Manucure shellac (enfant)", duree: '60min', prix: '45.00$'},
    {service: "Pédicure shellac + Manucure shellac (enfant)", duree: '75min', prix: '65.00$'},
    {service: "Pédicure régulière + Manucure régulière (enfant)", duree: '55min', prix: '35.00$'},
    {service: "Pédicure shellac + Manucure régulière (enfant)", duree: '60min', prix: '50.00$'}
]

// Description des services offerts pour les services de autres soins
let servicesOffertsAutresSoins = [
    {service: "Changement de vernis régulier (main)", duree: '5min', prix: '10.00$'},
    {service: "Changement de vernis régulier (pieds)", duree: '10min', prix: '15.00$'},
    {service: "Changement de shellac (mains)", duree: '15min', prix: '20.00$'},
    {service: "Changement de shellac (pieds)", duree: '20min', prix: '25.00$'},
    {service: "Enlèvement de shellac", duree: '5min', prix: '10.00$'},
    {service: "Couper les ongles", duree: '10min', prix: '10.00$'},
    {service: "Réparation des ongles", duree: '10min', prix: '5.00$'},
    {service: "Design par ongle", duree: '10min', prix: '5.00$'}
]

// Ensemble des cartes des services
let cartesServicesNaturels = document.getElementById("cardsNaturels");
let cartesServicesArtificiels = document.getElementById("cardsArtificiels");
let cartesServicesEnfants = document.getElementById("cardsKids");
let cartesServicesAutresSoins = document.getElementById("autreSoins");

// Boutons des services
let btnServicesArtificiels = document.getElementById("btnArtificials");
let btnServicesNaturels = document.getElementById("btnNails");
let btnServicesEnfants = document.getElementById("btnKidsNails");
let btnServicesAutresSoins = document.getElementById("btnAutreSoins");

// Variables pour les composantes (container) de chaque groupe de service
let cardContainerNails, cardContainerArtificialNails, cardContainerKidsNails, cardContainerAutreSoins;

// Pour chaque boutons qui passe a une page suivante, alors on mets un event listener
// qui incremente le numero de l'etape et mets a jour la barre de progres et les etapes
// de la page de reservation.
nextBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressBar();
    });
});


// Pour chaque boutons qui passe a une page precedente, alors on mets un event listener
// qui decremente le numero de l'etape et mets a jour la barre de progres et les etapes
// de la page de reservation.
prevBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
    })
})


/**
 * Cette fonction est appelée pour mettre a jour les étapes de la page de réservation. 
 * Elle retire la classe 'form-step-active' à l'étape qui est appelée et ajoute cette 
 * classe a la prochaine étape, afin de passer d'une étape a une autre. 
 */
function updateFormSteps() {
    formSteps.forEach(formStep => {
        formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
        
    });
    formSteps[formStepsNum].classList.add("form-step-active");
}

/**
 * Cette fonction est appelée afin de mettre à jour la barre de progrès, qui se trouve
 * dans le diagramme, où se trouve les différentes étapes. Lorsqu'on passe à la prochaine
 * étape, alors le progrès de celui-ci est incrémenté. Sinon, il est décrémenté. 
 */
function updateProgressBar() {
    progressStep.forEach((progressSteps, idx) => {
        if (idx < (formStepsNum + 1)) {
            progressSteps.classList.add('progress-step-active');
        } else {
            progressSteps.classList.remove('progress-step-active');
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width = ((progressActive.length - 1) / (progressStep.length - 1)) * 100 + "%";
}


/**
 * Cette fonction est appelé lorsque le groupe de boutons qui affiche les services
 * d'ongles naturels est sélectionné. Alors, les cartes qui appartiennent aux autres
 * boutons sont alors caché. 
 * 
 * On attribue une valeur select au bouton sélectionné, afin de changer la couleur 
 * de celui-ci.  
 * @param {boolean} affiche (true) affiche les cartes, sinon cache
 */
function afficheServicesOnglesNaturels (affiche) {
    if (affiche) {

        // Affiche les cartes des ongles naturelss, cache les autres
        cartesServicesNaturels.style.display = "block";
        cartesServicesArtificiels.style.display = "none";
        cartesServicesEnfants.style.display = "none";
        cartesServicesAutresSoins.style.display = "none";

        // Change l'attribue des boutons pour le bouton des ongles naturels
        btnServicesArtificiels.setAttribute("class", "btn services");
        btnServicesNaturels.setAttribute("class", "btn services select");
        btnServicesEnfants.setAttribute("class", "btn services");
        btnServicesAutresSoins.setAttribute("class", "btn services");
    }
}


/**
 * Cette fonction est appelé lorsque le groupe de boutons qui affiche les services
 * d'ongles artificiels est sélectionné. Alors, les cartes qui appartiennent aux autres
 * boutons sont alors caché. 
 * 
 * On attribue une valeur select au bouton sélectionné, afin de changer la couleur 
 * de celui-ci.  
 * @param {boolean} affiche (true) affiche les cartes, sinon cache
 */
function afficheServicesOnglesArtificiels(affiche) {
    if (affiche) {

        // Affiche les cartes des ongles artficiels, cache les autres
        cartesServicesArtificiels.style.display = "block";
        cartesServicesNaturels.style.display = "none";
        cartesServicesEnfants.style.display = "none";
        cartesServicesAutresSoins.style.display = "none";

        // Change l'attribue des boutons pour le bouton des ongles artificiels
        btnServicesArtificiels.setAttribute("class", "btn services select");
        btnServicesNaturels.setAttribute("class", "btn services");
        btnServicesEnfants.setAttribute("class", "btn services");
        btnServicesAutresSoins.setAttribute("class", "btn services");
    }
}


/**
 * Cette fonction est appelé lorsque le groupe de boutons qui affiche les services
 * d'ongles pour enfants est sélectionné. Alors, les cartes qui appartiennent aux autres
 * boutons sont alors caché. 
 * 
 * On attribue une valeur select au bouton sélectionné, afin de changer la couleur 
 * de celui-ci.  
 * @param {boolean} affiche (true) affiche les cartes, sinon cache
 */
function afficheSericesEnfants(affiche) {
    if (affiche) {

        // Affiche les cartes des services pour enfants, cache les autres
        cartesServicesEnfants.style.display = "block";
        cartesServicesNaturels.style.display = "none";
        cartesServicesArtificiels.style.display = "none";
        cartesServicesAutresSoins.style.display = "none";

        // Change l'attribue des boutons pour le bouton des services pour enfants
        btnServicesArtificiels.setAttribute("class", "btn services");
        btnServicesNaturels.setAttribute("class", "btn services");
        btnServicesEnfants.setAttribute("class", "btn services select");
        btnServicesAutresSoins.setAttribute("class", "btn services");
    }
}


/**
 * Cette fonction est appelé lorsque le groupe de boutons qui affiche les autres services
 * est sélectionné. Alors, les cartes qui appartiennent aux autres boutons sont alors caché. 
 * 
 * On attribue une valeur select au bouton sélectionné, afin de changer la couleur 
 * de celui-ci.  
 * @param {boolean} affiche (true) affiche les cartes, sinon cache
 */
function afficheAutresServices(affiche) {
    if (affiche) {

        // Affiche les cartes des autres soins, cache les autres
        cartesServicesAutresSoins.style.display = "block";
        cartesServicesNaturels.style.display = "none";
        cartesServicesArtificiels.style.display = "none";
        cartesServicesEnfants.style.display = "none";

        // Change l'attribue des boutons pour le bouton des autres soins
        btnServicesArtificiels.setAttribute("class", "btn services");
        btnServicesNaturels.setAttribute("class", "btn services");
        btnServicesEnfants.setAttribute("class", "btn services");
        btnServicesAutresSoins.setAttribute("class", "btn services select");
    }
}


/**
 * Cette fonction est appelé lorsque la composante <body> est
 * chargé. Elle appelle plusieurs fonctions, qui crée des 
 * cartes pour chaque service offerts. 
 */
function loadServices() {
    servicesOnglesNaturels();
    servicesOnglesArtificiels();
    servicesEnfants();
    servicesAutresSoins();

    // // Charge le technicien, si c'est le cas
    // var valeur = localStorage.getItem("professionel");
    // var professionelChoisi = document.getElementById("technicien");

    // console.log(valeur);
    // for (let i=0; i < professionelChoisi.options.length; i++) {
    //     if (professionelChoisi.options[i].value == valeur) {
    //         professionelChoisi.options[i].selected = true;
    //     }
    // }
    // professionelChoisi.innerText = valeur;
}


/**
 * Cette fonction est appelé afin de crée une carte pour 
 * chaque services d'ongle naturels offerts.
 * @returns 
 */
function servicesOnglesNaturels() {
    if (cardContainerNails) {
        cartesServicesNaturels.replaceWith(cardContainerNails);
        return;
    }

    cardContainerNails = cartesServicesNaturels;
    servicesOffertsOnglesNaturels.forEach((task) => {
        creationCartesSoinsNaturels(task);
    });
}


/**
 * Cette fonction est appelé afin de crée une carte pour 
 * chaque services d'ongle artificiels offerts.
 * @returns 
 */
function servicesOnglesArtificiels() {
if (cardContainerArtificialNails) {
        cartesServicesArtificiels.replaceWith(cardContainerArtificialNails);
        return;
    }

    cardContainerArtificialNails = cartesServicesArtificiels;
    servicesOffertsOnglesArtificiels.forEach((task) => {
        creationCartesOnglesArtificiels(task);
    });
}


/**
 * Cette fonction est appelé afin de crée une carte pour 
 * chaque services offerts pour les enfants.
 * @returns 
 */
function servicesEnfants() {
    if (cardContainerKidsNails) {
        cartesServicesEnfants.replaceWith(cardContainerKidsNails);
        return;
    }
    
    cardContainerKidsNails = cartesServicesEnfants;
    servicesOffertsEnfants.forEach((task) => {
        creationCartesServicesEnfants(task);
    });
}


/**
 * Cette fonction est appelé afin de crée une carte pour 
 * chaque services de autre soins offerts.
 * @returns 
 */
function servicesAutresSoins() {
    if (cardContainerAutreSoins) {
        cartesServicesAutresSoins.replaceWith(cardContainerAutreSoins);
        return;
    }

    cardContainerAutreSoins = cartesServicesAutresSoins;
    servicesOffertsAutresSoins.forEach((task) => {
        creationCartesAutresSoins(task);
    });
}



/**
 * Cette fonction crée des cartes pour tout les services associés à 
 * l'ensemble du groupe d'ongles naturels.
 * @param {*} task 
 */
function creationCartesSoinsNaturels(task) {

    // Création d'un élément pour créé une carte
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    // Création d'un élément body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body pe-4 ps-4';
    cardBody.style.display = "inline-block";

    // Création d'une première rangée où le titre et le prix seront affichés
    let row1 = document.createElement('div');
    row1.className = "row";

    // Création d'un élément titre qui contient le titre du service
    let titre = document.createElement('h5');
    titre.innerText = task.service;
    titre.className = 'display-6 col-8 col-md-9 p-0 ps-2 card-title';

    // Création d'un élément prix qui contient le prix du service
    let prix = document.createElement("p");
    prix.innerText = task.prix;
    prix.className = 'col-4 col-md-3 card-text lead price';

    // Création d'une deuxième rangée où la durée et le bouton ajouté 
    // sont affichés
    let row2 = document.createElement('div');
    row2.className = "row";

    // Création d'un élément durée
    let duree = document.createElement('p');
    duree.innerText = task.duree;
    duree.className = 'display-6 col card-text mb-0'; 

    // Création d'un bouton retire
    let btnRetire = document.createElement('button');
    btnRetire.className = "col-4 col-md-3 btn btn-sm m-0 rmvBtn";
    btnRetire.innerHTML = "Retirer";
    btnRetire.type = "button";
    btnRetire.style.display = "none";
    
    // Ajoute les composantes 
    cardBody.appendChild(row1);
    row1.appendChild(titre);
    row1.appendChild(prix);
    cardBody.appendChild(row2);
    row2.appendChild(duree);   
    row2.appendChild(btnRetire);

    // Création d'un bouton ajout
    let btnAjouter = document.createElement('button');
    btnAjouter.className = 'col-4 col-md-3 btn btn-sm m-0 addBtn'; 
    btnAjouter.innerHTML = 'Ajouter';
    btnAjouter.type = "button";
    
    // Ajoute le service sélectionné dans la liste des services 
    // sélectionnées
    btnAjouter.onclick = () => {

        // Cache le bouton ajouté & affiche le bouton retiré
        btnAjouter.style.display = "none";
        btnRetire.style.display = "block";
        
        // Crée un élément de la liste
        var li = document.createElement('li');
        li.setAttribute('class','list-group-item');
        ul.appendChild(li);

        // Affiche la description du service sélectionné
        li.innerHTML=li.innerHTML + "<strong>" + titre.innerHTML +"</strong><br>Durée: " + duree.innerHTML + "<br>Prix: " + prix.innerHTML ;

        // Retire le service de la liste des services sélectionné
        btnRetire.onclick = () => {

            // Affiche à nouveau le bouton ajouté
            btnRetire.style.display = "none";
            btnAjouter.style.display = "block";

            // Retire l'élément de la liste des services sélectionnés
            var rmListService = document.getElementById("listService");
            var items = document.querySelectorAll("#listService li");
            
            for (let i = 0; i < items.length; i++) {
                if (items[i].innerHTML.includes(titre.innerHTML)) {
                    rmListService.removeChild(items[i]);
                    break;
                }
            }
        }
    }
   
    row2.appendChild(btnAjouter);
    card.appendChild(cardBody);
    cardContainerNails.appendChild(card);
}


/**
 * Cette fonction crée des cartes pour tout les services associés à 
 * l'ensemble du groupe d'ongles artificiels.
 * @param {*} task 
 */
function creationCartesOnglesArtificiels(task) {

    // Création d'un élément pour créé une carte
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    // Création d'un élément body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body pe-4 ps-4';
    cardBody.style.display = "inline-block";

    // Création d'une première rangée où le titre et le prix seront affichés
    let row1 = document.createElement('div');
    row1.className = "row";

    // Création d'un élément titre qui contient le titre du service
    let titre = document.createElement('h5');
    titre.innerText = task.service;
    titre.className = 'display-6 col-8 col-md-9 p-0 ps-2 card-title';

    // Création d'un élément prix qui contient le prix du service
    let prix = document.createElement("p");
    prix.innerText = task.prix;
    prix.className = 'col-4 col-md-3 card-text lead price';

    // Création d'une deuxième rangée où la durée et le bouton ajouté 
    // sont affichés
    let row2 = document.createElement('div');
    row2.className = "row";

    // Création d'un élément durée
    let duree = document.createElement('p');
    duree.innerText = task.duree;
    duree.className = 'display-6 col card-text mb-0';  

    // Création d'un bouton retire
    let btnRetire = document.createElement('button');
    btnRetire.className = "col-4 col-md-3 btn btn-sm m-0 rmvBtn";
    btnRetire.innerHTML = "Retirer";
    btnRetire.type = "button";
    btnRetire.style.display = "none";
    
    // Ajoute les composantes 
    cardBody.appendChild(row1);
    row1.appendChild(titre);
    row1.appendChild(prix);
    cardBody.appendChild(row2);
    row2.appendChild(duree);
    row2.appendChild(btnRetire);

    // Création d'un bouton ajout
    let btnAjouter = document.createElement('button');
    btnAjouter.className = 'col-4 col-md-3 btn btn-sm m-0 addBtn'; 
    btnAjouter.innerHTML = 'Ajouter';
    btnAjouter.type = "button";
    
    // Ajoute le service sélectionné dans la liste des services 
    // sélectionnées
    btnAjouter.onclick = () => {

        // Cache le bouton ajouté & affiche le bouton retiré
        btnAjouter.style.display = "none";
        btnRetire.style.display = "block";
        
        // Crée un élément de la liste
        var li = document.createElement('li');
        li.setAttribute('class','list-group-item');
        ul.appendChild(li);

        // Affiche la description du service sélectionné
        li.innerHTML=li.innerHTML + "<strong>" + titre.innerHTML +"</strong><br>Durée: " + duree.innerHTML + "<br>Prix: " + prix.innerHTML ;

        // Retire le service de la liste des services sélectionné
        btnRetire.onclick = () => {

            // Affiche à nouveau le bouton ajouté
            btnRetire.style.display = "none";
            btnAjouter.style.display = "block";

            // Retire l'élément de la liste des services sélectionnés
            var rmListService = document.getElementById("listService");
            var items = document.querySelectorAll("#listService li");
            
            for (let i = 0; i < items.length; i++) {
                if (items[i].innerHTML.includes(titre.innerHTML)) {
                    rmListService.removeChild(items[i]);
                    break;
                }
            }
        }
    }
   
    row2.appendChild(btnAjouter);
    card.appendChild(cardBody);
    cardContainerArtificialNails.appendChild(card);
}


/**
 * Cette fonction crée des cartes pour tout les services
 * offerts pour les enfants.
 * @param {*} task 
 */
function creationCartesServicesEnfants(task) {

    // Création d'un élément pour créé une carte
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    // Création d'un élément body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body pe-4 ps-4';
    cardBody.style.display = "inline-block";

    // Création d'une première rangée où le titre et le prix seront affichés
    let row1 = document.createElement('div');
    row1.className = "row";

    // Création d'un élément titre qui contient le titre du service
    let titre = document.createElement('h5');
    titre.innerText = task.service;
    titre.className = 'display-6 col-8 col-md-9 p-0 ps-2 card-title';

    // Création d'un élément prix qui contient le prix du service
    let prix = document.createElement("p");
    prix.innerText = task.prix;
    prix.className = 'col-4 col-md-3 card-text lead price';

    // Création d'une deuxième rangée où la durée et le bouton ajouté 
    // sont affichés
    let row2 = document.createElement('div');
    row2.className = "row";

    // Création d'un élément durée
    let duree = document.createElement('p');
    duree.innerText = task.duree;
    duree.className = 'display-6 col card-text mb-0';    

    // Création d'un bouton retire
    let btnRetire = document.createElement('button');
    btnRetire.className = "col-4 col-md-3 btn btn-sm m-0 rmvBtn";
    btnRetire.innerHTML = "Retirer";
    btnRetire.type = "button";
    btnRetire.style.display = "none";
    
    // Ajoute les composantes 
    cardBody.appendChild(row1);
    row1.appendChild(titre);
    row1.appendChild(prix);
    cardBody.appendChild(row2);
    row2.appendChild(duree);
    row2.appendChild(btnRetire);
    
    // Création d'un bouton ajout
    let btnAjouter = document.createElement('button');
    btnAjouter.className = 'col-4 col-md-3 btn btn-sm m-0 addBtn'; 
    btnAjouter.innerHTML = 'Ajouter';
    btnAjouter.type = "button";
    
    // Ajoute le service sélectionné dans la liste des services 
    // sélectionnées
    btnAjouter.onclick = () => {

        // Cache le bouton ajouté & affiche le bouton retiré
        btnAjouter.style.display = "none";
        btnRetire.style.display = "block";
        
        // Crée un élément de la liste
        var li = document.createElement('li');
        li.setAttribute('class','list-group-item');
        ul.appendChild(li);

        // Affiche la description du service sélectionné
        li.innerHTML=li.innerHTML + "<strong>" + titre.innerHTML +"</strong><br>Durée: " + duree.innerHTML + "<br>Prix: " + prix.innerHTML ;

        // Retire le service de la liste des services sélectionné
        btnRetire.onclick = () => {

            // Affiche à nouveau le bouton ajouté
            btnRetire.style.display = "none";
            btnAjouter.style.display = "block";

            // Retire l'élément de la liste des services sélectionnés
            var rmListService = document.getElementById("listService");
            var items = document.querySelectorAll("#listService li");
            
            for (let i = 0; i < items.length; i++) {
                if (items[i].innerHTML.includes(titre.innerHTML)) {
                    rmListService.removeChild(items[i]);
                    break;
                }
            }
        }
    }
   
    row2.appendChild(btnAjouter);
    card.appendChild(cardBody);
    cardContainerKidsNails.appendChild(card);
}


/**
 * Cette fonction crée des cartes pour tout les services
 * de autre soins offerts.
 * @param {*} task 
 */
function creationCartesAutresSoins(task) {

    // Création d'un élément pour créé une carte
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    // Création d'un élément body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body pe-4 ps-4';
    cardBody.style.display = "inline-block";

    // Création d'une première rangée où le titre et le prix seront affichés
    let row1 = document.createElement('div');
    row1.className = "row";

    // Création d'un élément titre qui contient le titre du service
    let titre = document.createElement('h5');
    titre.innerText = task.service;
    titre.className = 'display-6 col-8 col-md-9 p-0 ps-2 card-title';

    // Création d'un élément prix qui contient le prix du service
    let prix = document.createElement("p");
    prix.innerText = task.prix;
    prix.className = 'col-4 col-md-3 card-text lead price';

    // Création d'une deuxième rangée où la durée et le bouton ajouté 
    // sont affichés
    let row2 = document.createElement('div');
    row2.className = "row";

    // Création d'un élément durée
    let duree = document.createElement('p');
    duree.innerText = task.duree;
    duree.className = 'display-6 col card-text mb-0'; 

    // Création d'un bouton retire
    let btnRetire = document.createElement('button');
    btnRetire.className = "col-4 col-md-3 btn btn-sm m-0 rmvBtn";
    btnRetire.innerHTML = "Retirer";
    btnRetire.type = "button";
    btnRetire.style.display = "none";
    
    // Ajoute les composantes 
    cardBody.appendChild(row1);
    row1.appendChild(titre);
    row1.appendChild(prix);
    cardBody.appendChild(row2);
    row2.appendChild(duree);  
    row2.appendChild(btnRetire);

    // Création d'un bouton ajout
    let btnAjouter = document.createElement('button');
    btnAjouter.className = 'col-4 col-md-3 btn btn-sm m-0 addBtn'; 
    btnAjouter.innerHTML = 'Ajouter';
    btnAjouter.type = "button";
    
    // Ajoute le service sélectionné dans la liste des services 
    // sélectionnées
    btnAjouter.onclick = () => {

        // Cache le bouton ajouté & affiche le bouton retiré
        btnAjouter.style.display = "none";
        btnRetire.style.display = "block";
        
        // Crée un élément de la liste
        var li = document.createElement('li');
        li.setAttribute('class','list-group-item');
        ul.appendChild(li);

        // Affiche la description du service sélectionné
        li.innerHTML=li.innerHTML + "<strong>" + titre.innerHTML +"</strong><br>Durée: " + duree.innerHTML + "<br>Prix: " + prix.innerHTML ;

        // Retire le service de la liste des services sélectionné
        btnRetire.onclick = () => {

            // Affiche à nouveau le bouton ajouté
            btnRetire.style.display = "none";
            btnAjouter.style.display = "block";

            // Retire l'élément de la liste des services sélectionnés
            var rmListService = document.getElementById("listService");
            var items = document.querySelectorAll("#listService li");
            
            for (let i = 0; i < items.length; i++) {
                if (items[i].innerHTML.includes(titre.innerHTML)) {
                    rmListService.removeChild(items[i]);
                    break;
                }
            }
        }
    }
   
    row2.appendChild(btnAjouter);
    card.appendChild(cardBody);
    cardContainerAutreSoins.appendChild(card);
}

// Variables partagées pour la confirmation et la cancelation de la réservation
let prenom = document.getElementById("prenom");
let courriel = document.getElementById("courriel");


/**
 * Cette function est appelée lorsque l'utilisateur sélectionne le bouton
 * afin de confirmer sa réservation. Elle prend toutes les données 
 * précédement entré par l'utilisateur lorsque celui-ci effectue sa
 * réservation et sont insérés sur la page de confirmation.
 */
function confirmationReservation() {
    
    let nom = document.getElementById("nomFamille");
    
    let tel = document.getElementById("phone");
    let dateTime = document.getElementById("selectedDateTime");
    let technicien = document.getElementById("technicien");
    

    // Affiche tous les détails de la réservation
    document.getElementById("confirmationReservation").innerHTML = "Votre réservation a été reçue ave succès.<br>Une confirmation de la réservation a été envoyée à " + courriel.value;
    document.getElementById("numeroReservation").innerHTML = "Numéro de la réservation : #987654";
    document.getElementById("prenomReservation").innerHTML = "Merci " + prenom.value + "!";
    document.getElementById("nomFamilleReservation").innerHTML = "Nom de famille : " + nom.value;
    document.getElementById("courrielReservation").innerHTML = "Courriel : " + courriel.value;
    document.getElementById("telephoneReservation").innerHTML = "Téléphone : " + tel.value;
    document.getElementById("dateHeureReservation").innerHTML = "Date & Heure : " + dateTime.innerHTML;
    document.getElementById("technicienReservation").innerHTML = "Technicien(ne) : " + technicien.value;

    // Affiche tout les services sélectionnés
    var items = document.querySelectorAll("#listService li");
    var serviceReservation = document.getElementById("serviceReservation"); 
    serviceReservation.innerHTML = "<hr>";
    for (let i = 0; i < items.length; i++) {
        serviceReservation.innerHTML += items[i].innerHTML + "<hr>";
    }
}


/**
 * Cette fonction est appelé lorsque l'utilisateur sélectionne le bouton
 * afin d'annuler sa réservation. Elle prend en compte le prénom et le
 * courriel de celui-ci afin d'afficher un message personnalisé, dans un
 * modal. 
 */
function cancelReservation() {
    document.getElementById("prenomCancelReservation").innerHTML = prenom.value + ",<br>";
    document.getElementById("courrielCancelReservation").innerHTML = "Un courriel vous a été envoyé à " + courriel.value + " qui confirme l'annulation de votre réservation.";
    
}