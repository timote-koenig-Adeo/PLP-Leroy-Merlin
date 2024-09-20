// function to show and hide hour drawer

const hourDrawer = document.querySelector(".hour-drawer-page")
const areaOfHourDrawer = document.querySelector(".hour-drawer-container")

const toggleDisplayHourDrawer = () => {
    hourDrawer.classList.toggle("hour-drawer-display-on")
    event.stopPropagation();
}

document.addEventListener('click', function (event) {

    const isHourDrawerDisplayed = window.getComputedStyle(hourDrawer).display !== 'none';

    if (isHourDrawerDisplayed && !areaOfHourDrawer.contains(event.target)) {
        hourDrawer.classList.remove("hour-drawer-display-on")
    }
});
