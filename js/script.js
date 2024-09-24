const allProduct = document.querySelectorAll(".product-card");
const allCheckboxButton = document.querySelectorAll(".specific-filter-list li button");
const allCheckbox = document.querySelectorAll(".filter-drawer-checkbox");

const filterDrawer = document.querySelector(".filter-drawer");
const overlay = document.querySelector("body")

let activeToggleFilterList = [];
let activeCheckboxFilterList = [];
let activeFilterList = [];

//----------------------------------------------------------------------------------------------------------------------//
//                      Functions to display or not product

const updateProductDisplay = (list) => {
    if (list.length === 0) {
        allProduct.forEach(product => {
            product.classList.add("display-product");
        })
    } else {
        allProduct.forEach(product => {
            product.classList.remove("display-product");
        })
        displayActiveProduct(list);
    }
}

const displayActiveProduct = (list) => {
    list.forEach(filter => {
        const filteredProduct = document.querySelectorAll(`.${filter}`)

        filteredProduct.forEach(product => {
            product.classList.add("display-product");
        })
    })
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Function to change filter button style

// Change style open filter drawer button

const toggleDrawerFilterButton = (button) => {
    const openFilterDrawerButton = document.getElementById(`${button.classList[1]}`);
    const checkboxList = document.querySelectorAll(`.filter-drawer-checkbox.${button.classList[1]}`);
    let activeClassCheckbox = [];

    checkboxList.forEach(checkbox => {
        if (checkbox.checked)
            activeClassCheckbox.push(checkbox.id);
        else
            activeCheckboxFilterList = removeElementFromList(activeCheckboxFilterList, checkbox.id)
    })

    if (activeClassCheckbox.length !== 0) {
        openFilterDrawerButton.classList.add("active-filter")
    } else {
        openFilterDrawerButton.classList.remove("active-filter");
    }

    activeCheckboxFilterList = activeCheckboxFilterList.concat(activeClassCheckbox);
    activeFilterList = activeToggleFilterList.concat(activeCheckboxFilterList);
    hideFilterDrawer();
    updateProductDisplay(activeFilterList);
    displayResetButton();
}

const resetDrawerFilterButton = (button) => {
    const openFilterDrawerButton = document.getElementById(`${button.classList[1]}`);
    const checkboxList = document.querySelectorAll(`.filter-drawer-checkbox.${button.classList[1]}`);

    checkboxList.forEach(checkbox => {
        checkbox.checked = false;
        activeCheckboxFilterList = removeElementFromList(activeCheckboxFilterList, checkbox.id);
    })
    openFilterDrawerButton.classList.remove("active-filter");

    activeFilterList = activeToggleFilterList.concat(activeCheckboxFilterList);
    updateProductDisplay(activeFilterList);
    displayResetButton();
}

//  set the statue of checkbox with activeCheckboxFilterList

const updateCheckbox = () => {
    allCheckbox.forEach(checkbox => {
        checkbox.checked = activeCheckboxFilterList.includes(checkbox.id);
    })
}

// Change style filter button

const toggleFilterButton = (button) => {

    if (!button.classList.contains("active-filter")) {
        button.classList.add("active-filter");
        activeToggleFilterList.push(`${button.id}`)
    } else {
        button.classList.remove("active-filter");
        activeToggleFilterList = removeElementFromList(activeToggleFilterList, button.id)
    }
    activeFilterList = activeToggleFilterList.concat(activeCheckboxFilterList);
    updateProductDisplay(activeFilterList);
}

//----------------------------------------------------------------------------------------------------------------------//
//                     Reset button action

// Function reset

const resetFilter = () => {
    allCheckbox.forEach(element => {
        element.checked = false;
    })
    removeClassFromListElements(allCheckboxButton, "active-filter")
    displayAllProduct();
    if (activeToggleFilterList.length !== 0)
        updateProductDisplay(activeToggleFilterList);
    activeCheckboxFilterList = [];
    displayResetButton()
}

// Display reset button

const displayResetButton = () => {
    const resetButton = document.querySelector(".reset-button")
    if (activeCheckboxFilterList.length !== 0)
        resetButton.classList.add("flex-visible");
    else
        resetButton.classList.remove("flex-visible");
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Fonction pour display/hide drawer selon button

// Detect click depending on filterDrawer

document.addEventListener('click', function (event) {

    const isDrawerDisplayed = window.getComputedStyle(filterDrawer).display !== 'none';

    if (isDrawerDisplayed && !filterDrawer.contains(event.target)) {
        hideFilterDrawer();
        updateCheckbox();
        }
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
