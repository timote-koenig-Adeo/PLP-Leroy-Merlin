const searchbar = document.getElementById('searchbar');

const on_search = () => {
    document.getElementById('searchbar_container').style.backgroundColor = 'rgba(255,255,255,100%)';
    document.getElementById('overlay').style.display = "flex";
    document.getElementById('history_elements_container').style.display = "flex";
};

const off_search = () => {
    document.getElementById('searchbar_container').style.backgroundColor = 'rgba(255,255,255,0%)';
    document.getElementById('overlay').style.display = "none";
    document.getElementById('history_elements_container').style.display = "none";
};

document.addEventListener('click', function(event) {
    if (event.target === searchbar) {
        on_search();
    }
});

document.addEventListener('click', function(event) {
    if (event.target !== searchbar) {
        off_search()
    }
});