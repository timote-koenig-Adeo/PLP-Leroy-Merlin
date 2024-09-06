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