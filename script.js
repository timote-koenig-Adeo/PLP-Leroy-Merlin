const searchbar = document.getElementById('searchbar');

const onSearch = () => {
    document.getElementById('searchbar_container').style.backgroundColor = 'rgba(255,255,255,100%)';
    document.getElementById('overlay').style.display = "flex";
    document.getElementById('history_list').style.display = "flex";
    document.getElementById('history_list').style.zIndex = "4";
    document.querySelector('.history_link').style.zIndex = '4';
};

const offSearch = () => {
    document.getElementById('searchbar_container').style.backgroundColor = 'rgba(255,255,255,0%)';
    document.getElementById('overlay').style.display = "none";
    document.getElementById('history_list').style.display = "none";
    document.getElementById('history_list').style.zIndex = "-1";
    document.querySelector('.history_link').style.zIndex = '-1';
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
    newListItem.classList.add('history_element');

    let historyLink = document.createElement('a');
    historyLink.classList.add('history_link');
    historyLink.href = "https://www.leroymerlin.fr/";
    historyLink.target = "_blank";

    let historyIcon = document.createElement('img');
    historyIcon.src = "img/clock-rotate-left-solid.svg";
    historyIcon.alt = "historique";
    historyIcon.height = 20;

    let historyInput = document.createElement('div');
    historyInput.textContent  = input;
    historyInput.classList.add('history_input');

    historyLink.appendChild(historyIcon);
    historyLink.appendChild(historyInput);

    newListItem.appendChild(historyLink);

    historyList.insertBefore(newListItem, historyList.firstChild);
};

const inputIsOkay = (input) => {
    return input !== ""
}

document.getElementById('searchbar').addEventListener('keypress', function(event) {
    const historyList = document.getElementById('history_list');
    let input = document.getElementById('searchbar').value;

    if (event.key === 'Enter' && inputIsOkay(input)) {
        if (historyList.childElementCount === 6)
            historyList.removeChild(historyList.lastChild);
        if (historyList.childElementCount < 6)
            appendHistory(input, historyList);
    }
});
