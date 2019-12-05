let tab = new Array();

function recherche() {
    var recherche = document.getElementById("games");
    effaceEcran();
    var rechercheJeu = document.getElementById("recherche");
    ajaxGet("https://www.giantbomb.com/api/search/?api_key=5583051d990fdd62cedb6800e082d3df6386a144&format=json&query=\"" + rechercheJeu.value + "\"&resources=game&limit=50", function (reponse) {
        var games = JSON.parse(reponse).results;
        if (games.length !== 0) {
            games.forEach(function (game, index) {
                tab[index] = {
                    id: game.id,
                    name: game.name,
                    image: game.image.icon_url,
                    deck:game.deck,
                };
                recherche.insertAdjacentHTML('beforeend', '<div class="dispositionRecherche" id='+game.id+'>' +
                    '<img class="imageRecherche" src='+game.image.icon_url+'> '+ (1+index )+': '+game.name +' ' +
                    '<input class="boutonAjouterRecherche" type="button" value="Ajouter" onClick="ajouterJeu('+index+')">' +
                    '</div>');
            });
        } else {
            recherche.insertAdjacentHTML('beforeend', 'Aucun result');
        }
    });
    rechercheJeu.value = "";
}

function ajouterJeu(thisgame) {
    var g = tab[thisgame];
    var biliotheque = JSON.parse(window.localStorage.getItem('games'));
    if (Array.isArray(biliotheque) === false) {
        biliotheque = new Array();
    }
    biliotheque.push(g);
    window.localStorage.setItem('games', JSON.stringify(biliotheque));

}

function afficherCacher() {
    if (document.getElementById("formulaire").style.display == "none") {
        document.getElementById("formulaire").style.display = "block";
        document.getElementById("boutton-cacher").value = "-";
    } else {
        document.getElementById("formulaire").style.display = "none";
        document.getElementById("boutton-cacher").value = "+";
    }
}

function ajouterJeuPersonnel() {
    var modal = document.getElementById("ma-boite-dialogue");
    const file = document.getElementById("files").files[0];
    var reader = new FileReader();
    var nom=document.getElementById("nom-form").value;
    var deck=document.getElementById("description-form").value;
    if(nom=="" || document.getElementById("description-form").value=="" || document.getElementById("files").files.length == 0){
        document.getElementById("dialogue").textContent ="Votre jeu n'a pas pu être ajouté";
    }
    else if (file.type.indexOf('image') == 0) {
        reader.onload = function (event) {
            var image = new Image();
            image.src = event.target.result;
            image.onload = function () {
                var maxWidth = 80,
                    maxHeight = 80,
                    imageWidth = image.width,
                    imageHeight = image.height;
                if (imageWidth > imageHeight) {
                    if (imageWidth > maxWidth) {
                        imageHeight *= maxWidth / imageWidth;
                        imageWidth = maxWidth;
                    }
                } else {
                    if (imageHeight > maxHeight) {
                        imageWidth *= maxHeight / imageHeight;
                        imageHeight = maxHeight;
                    }
                }
                var canvas = document.createElement('canvas');
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                image.width = imageWidth;
                image.height = imageHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
                var g = {
                    name: nom,
                    image: canvas.toDataURL(file.type),
                    deck:deck
                }
                var bibliotheque = JSON.parse(window.localStorage.getItem('games'));
                if (Array.isArray(bibliotheque) === false) {
                    bibliotheque = new Array();
                }
                bibliotheque.push(g);
                window.localStorage.setItem('games', JSON.stringify(bibliotheque));
            }
        }
        reader.readAsDataURL(file);
        document.getElementById("dialogue").textContent ="Votre jeu a bien été ajouté";
    }
    else{
        document.getElementById("dialogue").textContent ="Votre jeu n'a pas pu être ajouté";
    }
    modal.style.display = "block";
    document.getElementsByClassName("fermeture")[0].addEventListener("click",function () {
        modal.style.display = "none";
    });;
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementById("nom-form").value="";
    document.getElementById("description-form").value="";
    document.getElementById("files").value="";
}
