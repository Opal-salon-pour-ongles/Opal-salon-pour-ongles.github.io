// Variables - chaque page de pagination
let page1 = document.getElementById("galleryPage1");
let page2 = document.getElementById("galleryPage2");
let page3 = document.getElementById("galleryPage3");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");


/**
 * Cette function est appelé lorsque le premier item des page de 
 * pagination est sélectionné. Alors, les images de la première 
 * page de la gallerie sont affichés tandis que les images des 
 * deuxièmes et troisièmes pages sont cachés. 
 */
function affichePage1() {
    
    // Affiche page 1
    page1.style.display = "block";

    // Cache pages 2 & 3
    page2.style.display = "none";
    page3.style.display = "none";

    // Mets un focus sur la page 1
    item1.setAttribute("class", "page-link select");
    item2.setAttribute("class", "page-link");
    item3.setAttribute("class", "page-link");
}


/**
 * Cette function est appelé lorsque le deuxième item des page de 
 * pagination est sélectionné. Alors, les images de la deuxième 
 * page de la gallerie sont affichés tandis que les images des 
 * première et troisièmes pages sont cachés. 
 */
function affichePage2() {
    
    // Affiche page 2
    page2.style.display = "block";

    // Cache pages 1 & 3
    page1.style.display = "none";
    page3.style.display = "none";

    // Mets un focus sur la page 2
    item1.setAttribute("class", "page-link");
    item2.setAttribute("class", "page-link select");
    item3.setAttribute("class", "page-link");
}


/**
 * Cette function est appelé lorsque le troisième item des page de 
 * pagination est sélectionné. Alors, les images de la troisième 
 * page de la gallerie sont affichés tandis que les images des 
 * première et deuxième pages sont cachés. 
 */
function affichePage3() {
    
    // Affiche page 3
    page3.style.display = "block";

    // Cache pages 1 & 2
    page1.style.display = "none";
    page2.style.display = "none";

    // Mets un focus sur la page 3
    item1.setAttribute("class", "page-link");
    item2.setAttribute("class", "page-link");
    item3.setAttribute("class", "page-link select");
}