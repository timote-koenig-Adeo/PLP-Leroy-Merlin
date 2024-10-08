
//                                   SEARCHBAR

const searchbar = document.getElementById('searchbar');

const onSearch = () => {
    document.getElementById('searchbar-container').style.backgroundColor = 'rgba(255,255,255,100%)';
    document.getElementById('history-list').style.display = "flex";
    document.getElementById('history-list').style.zIndex = "4";
};

const offSearch = () => {
    document.getElementById('searchbar-container').style.backgroundColor = 'rgba(255,255,255,0%)';
    document.getElementById('history-list').style.display = "none";
    document.getElementById('history-list').style.zIndex = "-1";
};

document.addEventListener('click', function (event) {
    if (event.target === searchbar) {
        onSearch();
    }
    if (event.target !== searchbar) {
        offSearch()
    }
});

const appendHistory = (input, historyList) => {
    let newListItem = document.createElement('li');
    newListItem.classList.add('history-element');

    let historyLink = document.createElement('a');
    historyLink.classList.add('history-link');
    historyLink.href = "https://www.leroymerlin.fr/";
    historyLink.target = "_blank";

    let historyIcon = document.createElement('img');
    historyIcon.src = "img/clock-rotate-left-solid.svg";
    historyIcon.alt = "historique";
    historyIcon.height = 20;

    let historyInput = document.createElement('div');
    historyInput.textContent = input;
    historyInput.classList.add('history-input');

    historyLink.appendChild(historyIcon);
    historyLink.appendChild(historyInput);

    newListItem.appendChild(historyLink);

    historyList.insertBefore(newListItem, historyList.firstChild);
};

const inputIsOkay = (input) => {
    return input !== ""
}

document.getElementById('searchbar').addEventListener('keypress', function (event) {
    const historyList = document.getElementById('history-list');
    let input = document.getElementById('searchbar').value;

    if (event.key === 'Enter' && inputIsOkay(input)) {
        if (historyList.childElementCount === 6)
            historyList.removeChild(historyList.lastChild);
        if (historyList.childElementCount < 6)
            appendHistory(input, historyList);
        createSearchPage(input)
        offSearch()
    }
});

const createSearchPage = (searchedWord) => {
    let content = document.querySelector("#content")
    content.innerHTML = "";

    let titleArea = document.createElement("div")

    let title = document.createElement("h1")
    title.innerHTML = `${searchedWord}`

    let textArea = document.createElement("div")

    let text = document.createElement("span")
    text.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    titleArea.appendChild(title)

    textArea.appendChild(text)

    content.appendChild(titleArea)
    content.appendChild(textArea)
}

//----------------------------------------------------------------------------------------------------------------------//
//                                       OTHER

// show or hide burger-menu
const navigationItems = document.querySelectorAll('.navigation-list li');

navigationItems.forEach(item => {

    const menuId = item.dataset.menuId;
    const menu = document.getElementById(menuId);

    let isMenuHovered = false;
    let isItemHovered = false;
    const timeoutValue = 300;
    let openMenuTimeout;
    let closeMenuTimeout;

    // Ajout d'un délai pour le mouseover
    item.addEventListener('mouseover', () => {
        clearTimeout(closeMenuTimeout); // Annuler la fermeture en cas de survol rapide

        openMenuTimeout = setTimeout(() => {
            menu.classList.add('burger-menu-open');
            isItemHovered = true;
        }, timeoutValue);
    });

    item.addEventListener('mouseout', () => {
        clearTimeout(openMenuTimeout); // Annuler l'ouverture si on sort rapidement

        isItemHovered = false;
        closeMenuTimeout = setTimeout(() => {
            closeMenuIfNeeded();
        }, timeoutValue);
    });

    menu.addEventListener('mouseover', () => {
        clearTimeout(closeMenuTimeout); // Empêcher la fermeture si on survole le menu
        isMenuHovered = true;
    });

    menu.addEventListener('mouseout', () => {
        isMenuHovered = false;
        closeMenuTimeout = setTimeout(() => {
            closeMenuIfNeeded();
        }, timeoutValue);
    });

    function closeMenuIfNeeded() {
        if (!isMenuHovered && !isItemHovered) {
            menu.classList.remove('burger-menu-open');
        }
    }
});


const categoriesElements = document.querySelectorAll('.categories-list li');

categoriesElements.forEach(element => {

    const menuId = element.dataset.menuId;
    const menu = document.getElementById(menuId);
    let timeoutId; // Stocke l'ID du timeout pour pouvoir l'annuler si besoin

    element.addEventListener('mouseover', () => {
        // Annule le timeout précédent pour éviter des conflits
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Délai avant d'ajouter la classe
        timeoutId = setTimeout(() => {
            // Enlever la classe "categorie-navigation-on" de tous les autres menus
            categoriesElements.forEach(el => {
                const otherMenuId = el.dataset.menuId;
                const otherMenu = document.getElementById(otherMenuId);

                otherMenu.classList.remove('categorie-navigation-on');
            });

            menu.classList.add('categorie-navigation-on');
        }, 500);
    });

    // Annuler le timeout si on sort de l'élément avant que le délai soit écoulé
    element.addEventListener('mouseout', () => {
        clearTimeout(timeoutId);
    });
});

