const allProduct = document.querySelectorAll(".product-card");
const allFilterButton = document.querySelectorAll(".filter-button");
const allCheckbox = document.querySelectorAll(".filter-drawer-checkbox");

const filterDrawer = document.querySelector(".filter-drawer");
const overlay = document.querySelector("body")

let activeFilterList = [];

//----------------------------------------------------------------------------------------------------------------------//
//                      Functions to display or not product

const updateProductDisplay = () => {
    if (activeFilterList.length === 0) {
        allProduct.forEach(product => {
            product.classList.add("display-product");
        })
    } else {
        allProduct.forEach(product => {
            product.classList.remove("display-product");
        })
        displayActiveProduct();
    }
}

const displayActiveProduct = () => {
    activeFilterList.forEach(filter => {
        const filteredProduct = document.querySelectorAll(`.${filter}`)

        filteredProduct.forEach(product => {
            product.classList.add("display-product");
        })
    })
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Function to change filter button style

// Change style open filter drawer button

const toggleDrawerFilterButton = (checkbox) => {
    const openFilterDrawerButton = document.getElementById(checkbox.classList[1]);

    const isFilterActivated = checkbox.checked;

    if (isFilterActivated) {
        openFilterDrawerButton.classList.add("active-filter");
        activeFilterList.push(`${checkbox.id}`)
    } else {
        openFilterDrawerButton.classList.remove("active-filter");
        activeFilterList = removeElementFromList(activeFilterList, checkbox.id)
    }
    updateProductDisplay();
    displayResetButton();
}

// Change style filter button

const toggleFilterButton = (button) => {

    if (!button.classList.contains("active-filter")) {
        button.classList.add("active-filter");
        activeFilterList.push(`${button.id}`)
    } else {
        button.classList.remove("active-filter");
        activeFilterList = removeElementFromList(activeFilterList, button.id)
    }
    updateProductDisplay();
    displayResetButton();
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Reset button action

// Function reset

const resetFilter = () => {
    allCheckbox.forEach(element => {
        element.checked = false;
    })
    removeClassFromListElements(allFilterButton, "active-filter")
    displayAllProduct();
    activeFilterList = [];
    displayResetButton()
}

// Display reset button

const displayResetButton = () => {
    const resetButton = document.querySelector(".reset-button")
    if (activeFilterList.length !== 0)
        resetButton.classList.add("flex-visible");
    else
        resetButton.classList.remove("flex-visible");
}

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
//                     Function to remove element from list

const removeElementFromList = (list, element) => {
    return list.filter((listElement) => listElement !== element)
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Functions pour afficher/cacher tout les produits

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
//                     Functions pour ajouter/enlever une classe à tout les éléments d'une liste

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
