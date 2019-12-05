

function ajoutChamp() {
    var ajoutChamp = document.getElementById("ajoutChamp");
    if (ajoutChamp.value !== '') {
        var c = {
            id: champs.length + ajoutChamp.value,
            name: ajoutChamp.value,
            type: 1,
        };
        champs.push(c);
        window.localStorage.setItem('champs', JSON.stringify(champs));
        ajoutChamp.value = "";
        champPerso();
    }
}

function champPerso() {
    effaceEcran();
    champs = JSON.parse(window.localStorage.getItem('champs'));
    var html = '<div id="contenu-champs"><input type="text" size="33" id="ajoutChamp"> <input type="button" value="Ajout Champ" onClick="ajoutChamp()"><br><br>';
    champs.forEach(function (champ, index) {
        html += '<div><input type="text" size="33" id="' + champ.id + '" value="' + champ.name + '"> <input type="button" value="X" onClick="supprimeChamp(' + index + ')"></div>';

    });
    html += '<br><input type="button" value="Save ALL" onClick="saveChamps()"></div>';
    document.getElementById("games").insertAdjacentHTML('beforeend', html);

    document.getElementById("ma-bibliotheque").style.display = "block";
    document.getElementById("champs-perso").style.display = "none";
}

function supprimeChamp(index) {
    champs.splice(index, 1);
    sauvegardeChamps();
    champPerso();
}

function saveChamps() {
    champs.forEach(function (champ) {
        champ.name = document.getElementById(champ.id).value;
    });
    sauvegardeChamps();
    chargerBibliotheque();
}


function sauvegardeChamps() {
    window.localStorage.setItem('champs', JSON.stringify(champs));
}