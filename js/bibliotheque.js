let games = new Array();
let champs = new Array();
window.onload = function () {
    reset();
}

function reset() {
    if (Array.isArray(JSON.parse(window.localStorage.getItem('games'))) === false) {
        window.localStorage.setItem('games', JSON.stringify([]));
    }
    if (Array.isArray(JSON.parse(window.localStorage.getItem('champs'))) === false) {
        window.localStorage.setItem('champs', JSON.stringify([]));
    }
}

function chargerBibliotheque() {
    games = JSON.parse(window.localStorage.getItem('games'));
    champs = JSON.parse(window.localStorage.getItem('champs'));
    document.getElementById("champs-perso").style.display = "block";
    document.getElementById("ma-bibliotheque").style.display = "none";
    bibliotheque();
}


function bibliotheque() {
    effaceEcran();
    var html = '';
    if (games.length !== 0) {
        html += '<br><table><thead><tr><td>Action</td><td>Image</td><td>Nom</td>';
        champs.forEach(function (champ) {
            html += '<td>' + champ.name + '</td>';
        });
        html += '<td>info</td></tr></thead><tbody>';
        games.forEach(function (game, index) {
            html += afficheJeu(game, index, 1);
        });
        html += '</tbody><table>';
    } else {
        html = 'Pas de jeu';
    }
    document.getElementById("games").insertAdjacentHTML('beforeend', html);
}

function afficheJeu(game, index, mode) {
    var html = '<tr class="spacer"></tr>' +
        '<tr id="' + index + 'jeu"><td>' +
        '<div id="listeBouton">' +
        '<div id="bouton1">' +
        '<input type="image" id="boutonHaut" src="image/flecheSup.png" onClick="echange(' + index + ',' + (index - 1) + ')">' +
        '<input type="image" src="image/flecheInf.png" onClick="echange(' + index + ',' + (index + 1) + ')">' +
        '</div><div id="bouton2">' +
        '<input type="image" id="boutonHaut" src="image/poubelle.png" onClick="supprimerJeu(' + index + ')">';
    if (mode === 1) {
        html += '<input type="image" src="image/modifier.png" onClick="modifJeu(' + index + ')">';
    } else if (mode === 2) {
        html += '<input type="image" src="image/modifier.png" onClick="saveJeu(' + index + ')">';
    }
    html += '</div></div></td>' +
        '<td><img src=' + game.image + '> </td>' +
        '<td>' + (1 + index) + ': ' + game.name + ' </td>' ;
    champs.forEach(function (champ) {
        var v = '';
        if (game[champ.id] !== undefined) {
            v = game[champ.id];
        }
        if (mode === 1) {
            html += '<td>' + v + '</td>';
        } else if (mode === 2) {
            html += '<td><input type="text" id="' + champ.id + index + '" value="' + v + '"><input type="button" value="Sauvegarde" onClick="modifChamp(\'' + champ.id + '\',' + index + ')"></td>';
        }
    });
    return html += '<td><input type="image" id="boutonInfo" src="image/info.png" onClick="afficherInfo(' + index + ')"></td></tr>' + '<tr class="spacer"></tr>';
}

function modifChamp(type, index) {
    var c = {};
    c[type] = document.getElementById(type + index).value;
    Object.assign(games[index], c);
    sauvegardeJeu();
}

function effaceBibliotheque() {
    effaceEcran();
    window.localStorage.clear();
    reset();
}

function effaceEcran() {
    document.getElementById("games").innerHTML = "";
}

function echange(x, y) {
    if (games[y] !== undefined) {
        var b = games[y];
        games[y] = games[x];
        games[x] = b;
        bibliotheque();
    }
}

function sauvegardeJeu() {
    window.localStorage.setItem('games', JSON.stringify(games));
}

function supprimerJeu(index) {
    games.splice(index, 1);
    bibliotheque();
}

function modifJeu(index) {
    document.getElementById(index + "jeu").innerHTML = afficheJeu(games[index], index, 2);
}

function saveJeu(index) {
    document.getElementById(index + "jeu").innerHTML = afficheJeu(games[index], index, 1);
}

function afficherInfo(index) {
    var modal = document.getElementById("ma-boite-dialogue");
    document.getElementById("dialogue").textContent =games[index].deck;
    modal.style.display = "block";

    document.getElementsByClassName("fermeture")[0].addEventListener("click",function () {
        modal.style.display = "none";

    });;

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}