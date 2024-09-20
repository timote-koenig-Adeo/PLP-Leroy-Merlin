const allProduct = document.querySelectorAll(".product-card");
const allFilterButton = document.querySelectorAll(".filter-button");
const allCheckbox = document.querySelectorAll(".filter-drawer-checkbox");

const filterDrawer = document.querySelector(".filter-drawer");
const overlay = document.querySelector("body")

//----------------------------------------------------------------------------------------------------------------------//
//                      Fonction pour display/hide drawer selon button

// Detect click depending on filterDrawer

document.addEventListener('click', function (event) {

    const isDrawerDisplayed = window.getComputedStyle(filterDrawer).display !== 'none';

    if (isDrawerDisplayed && !filterDrawer.contains(event.target))
        hideFilterDrawer();
})


// Display/Hide filterDrawer

const displayFilterDrawer = (filterButton) => {
    const drawerCheckboxId = document.querySelector(`.${filterButton.id}-drawer`)

    filterDrawer.classList.add("flex-visible");
    overlay.classList.add("overlay-visible");
    drawerCheckboxId.classList.add("flex-visible");

    event.stopPropagation();
}

const hideFilterDrawer = () => {
    const allDrawerCheckbox = document.querySelectorAll(`.filter-drawer-category`)

    filterDrawer.classList.remove("flex-visible");
    overlay.classList.remove("overlay-visible");
    removeClassFromListElements(allDrawerCheckbox, "flex-visible")
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Function to change filter button style

// Change style open filter drawer button

const toggleDrawerFilterButtonStyle = (checkbox) => {
    const openFilterDrawerButton = document.getElementById(checkbox.classList[1]);
    const allSameClassCheckbox = document.querySelectorAll(`.${checkbox.classList[1]}`)

    const isFilterActivated = Array.from(allSameClassCheckbox).some(checkbox => checkbox.checked === true);

    if (isFilterActivated)
        openFilterDrawerButton.classList.add("active-filter");
    else
        openFilterDrawerButton.classList.remove("active-filter");
}

// Change style filter button

const toggleFilterButtonStyle = (button) => {
    button.classList.toggle("active-filter")
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Fonction pour reset tout les filtres

const resetFilter = () => {
    // Enlève l'état checked de toute les checkbox des filtres
    allCheckbox.forEach(element => {
        element.checked = false;
    })
    removeClassFromListElements(allFilterButton, "active-filter")
    displayAllProduct();
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Fonction pour afficher/cacher tout les produits

const displayAllProduct = () => {
    allProduct.forEach(element => {
        element.classList.add("display-product");
    })
}

const hideAllProduct = () => {
    allProduct.forEach(element => {
        element.classList.remove("display-product");
    })
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Fonction pour ajouter/enlever une classe à tout les éléments d'une liste

const removeClassFromListElements = (list, className) => {
    list.forEach(element => {
        element.classList.remove(className);
    })
}

const addClassFromListElements = (list, className) => {
    list.forEach(element => {
        element.classList.add(className);
    })
}
