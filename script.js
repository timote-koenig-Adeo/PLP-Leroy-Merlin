const searchbar = document.getElementById('searchbar');

const onSearch = () => {
    document.getElementById('searchbar-container').style.backgroundColor = 'rgba(255,255,255,100%)';
    document.getElementById('history-list').style.display = "flex";
    document.getElementById('history-list').style.zIndex = "4";
    document.querySelector('.history-link').style.zIndex = '4';
};

const offSearch = () => {
    document.getElementById('searchbar-container').style.backgroundColor = 'rgba(255,255,255,0%)';
    document.getElementById('history-list').style.display = "none";
    document.getElementById('history-list').style.zIndex = "-1";
    document.querySelector('.history-link').style.zIndex = '-1';
};

document.addEventListener('click', function(event) {
    if (event.target === searchbar) {
        onSearch();
    }
});

document.addEventListener('click', function(event) {
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
    historyInput.textContent  = input;
    historyInput.classList.add('history-input');

    historyLink.appendChild(historyIcon);
    historyLink.appendChild(historyInput);

    newListItem.appendChild(historyLink);

    historyList.insertBefore(newListItem, historyList.firstChild);
};

const inputIsOkay = (input) => {
    return input !== ""
}

document.getElementById('searchbar').addEventListener('keypress', function(event) {
    const historyList = document.getElementById('history-list');
    let input = document.getElementById('searchbar').value;

    if (event.key === 'Enter' && inputIsOkay(input)) {
        if (historyList.childElementCount === 6)
            historyList.removeChild(historyList.lastChild);
        if (historyList.childElementCount < 6)
            appendHistory(input, historyList);
    }
});


// show or hide burger-menu
const navigationItems = document.querySelectorAll('.navigation-list li');

navigationItems.forEach(item => {

    const menuId = item.dataset.menuId;
    const menu = document.getElementById(menuId);

    let isMenuHovered = false;
    let isItemHovered = false;

    item.addEventListener('mouseover', () => {
        menu.classList.add('burger-menu-open');
        isItemHovered = true;
    });

    item.addEventListener('mouseout', () => {
        isItemHovered = false;
        setTimeout(() => {
            closeMenuIfNeeded();
        }, 0);
    });

    menu.addEventListener('mouseover', () => {
        isMenuHovered = true;
    });

    menu.addEventListener('mouseout', () => {
        isMenuHovered = false;
        setTimeout(() => {
            closeMenuIfNeeded();
        }, 0);
    });

    function closeMenuIfNeeded() {
        if (!isMenuHovered && !isItemHovered) {
            menu.classList.remove('burger-menu-open');
        }
    }
});

