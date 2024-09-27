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
        if (!activeCheckboxFilterList.includes(checkbox.id)) {
            if (checkbox.checked)
                activeClassCheckbox.push(checkbox.id);
        }
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
    updateFilterTag();
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
    updateFilterTag();
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
//                      Function for pills

const togglePillsFilter = (filterId) => {
    const checkbox = document.querySelector(`#${filterId}`)

    if (checkbox.checked === false) {
        checkbox.checked = true;
        toggleDrawerFilterButton(checkbox);
    }
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Function for MQM


const mqmQuestionArea = document.querySelector(".mqm-question-area")
const mqmCompleted = document.querySelector(".mqm-completed")
const mqmButtonNavigation = document.querySelectorAll(".mqm-button-navigation")
const mqmButtonValidation = document.querySelector("#mqm-applied-button")


const toggleMqmCheckbox = (checkboxId) => {
    const checkbox = document.querySelector(`#${checkboxId}`)
    const parent = checkbox.parentNode;

    checkbox.checked = !checkbox.checked;
    parent.classList.toggle("multi-question-module-element-checked");
}

const mqmValidation = () => {
    const mqmCheckboxList = document.querySelectorAll(".mqm-checkbox")

    mqmCheckboxList.forEach(mqmCheckbox => {
        let filterCheckboxId = mqmCheckbox.id.substring(4)
        let filterCheckbox = document.querySelector(`#${filterCheckboxId}`);

        filterCheckbox.checked = mqmCheckbox.checked

        if (!filterCheckbox.checked)
            activeCheckboxFilterList = removeElementFromList(activeCheckboxFilterList, filterCheckboxId)

        toggleDrawerFilterButton(filterCheckbox)
    })

    mqmButtonNavigation.forEach(button => {
        button.classList.add("flex-visible")
    })
    mqmButtonValidation.classList.add("hidden")

    mqmQuestionArea.classList.add("hidden")

    mqmCompleted.classList.add("flex-visible")
}

const mqmReset = () => {
    const mqmCheckboxList = document.querySelectorAll(".mqm-checkbox")
    let parent;

    mqmCheckboxList.forEach(mqmCheckbox => {
        mqmCheckbox.checked = false;

        parent = mqmCheckbox.parentNode;
        parent.classList.remove("multi-question-module-element-checked");
    })
    mqmButtonNavigation.forEach(button => {
        button.classList.remove("flex-visible")
    })
    mqmButtonValidation.classList.remove("hidden")

    mqmQuestionArea.classList.remove("hidden")

    mqmCompleted.classList.remove("flex-visible")

    resetFilter();
}

const mqmBack = () => {
    mqmButtonNavigation.forEach(button => {
        button.classList.remove("flex-visible")
    })
    mqmButtonValidation.classList.remove("hidden")

    mqmQuestionArea.classList.remove("hidden")

    mqmCompleted.classList.remove("flex-visible")
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
    updateFilterTag();
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
//                      Function to display/hide activate filter tag

const updateFilterTag = () => {
    const listContainer = document.querySelector(".activated-filter-list")

    listContainer.innerHTML = "<li class=\"reset-button-container\">\n" +
        "                <button id=\"Reset\" class=\"reset-button\" onclick=\"resetFilter()\">\n" +
        "                    Réinitialiser\n" +
        "                </button>\n" +
        "            </li>";
    activeCheckboxFilterList.forEach(checkbox => {
        listContainer.insertBefore(createFilterTagListElement(checkbox), listContainer.firstChild)
    })
}

const createFilterTagListElement = (checkbox) => {
    let newListTag = document.createElement('li');
    newListTag.classList.add("filter-tag")
    newListTag.id = `tag-${checkbox}`

    let newTextArea = document.createElement("span");
    newTextArea.classList.add("filter-tag-text")
    newTextArea.innerText = transcriptCheckbox(checkbox);

    newListTag.appendChild(newTextArea);

    let button = document.createElement("button");
    button.id = `button-${checkbox}`;
    button.className = 'filter-tag-button';
    button.innerText = 'X';
    button.onclick = function () {
        deleteTag(this);
    };

    newListTag.appendChild(button);

    return newListTag;
}

const transcriptCheckbox = (name) => {
    if (name === "twelve-volt")
        return "12V";
    if (name === "height-teen-volt")
        return "18V";
    if (name === "makita")
        return "Makita";
    if (name === "milwaukee")
        return "Milwaukee";
    if (name === "two-hundred")
        return "200€";
    if (name === "twenty")
        return "20€";
    if (name === "type-one")
        return "Type 1";
    if (name === "type-two")
        return "Type 2";
    return name;
}

const deleteTag = (tag) => {
    const filterName = tag.id.substring(7);

    const filterCheckbox = document.querySelector(`#${filterName}`)

    const filterButton = document.querySelector(`#${filterCheckbox.classList[1]}`);

    const sameClassCheckbox = document.querySelectorAll(`.${filterCheckbox.classList[1]}`);
    let isCheckboxClassActivated;

    activeCheckboxFilterList = removeElementFromList(activeCheckboxFilterList, filterName)

    filterCheckbox.checked = false;
    isCheckboxClassActivated = Array.from(sameClassCheckbox).some(checkbox => checkbox.checked)
    if (!isCheckboxClassActivated)
        filterButton.classList.remove("active-filter")

    activeFilterList = activeToggleFilterList.concat(activeCheckboxFilterList);
    updateProductDisplay(activeFilterList)
    updateFilterTag()
    displayResetButton()
}

//----------------------------------------------------------------------------------------------------------------------//
//                      Function pour display/hide drawer selon button

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
//                      Function to change page

const pageSelector = document.querySelector(".page-selector")
const pageSelectorLength = pageSelector.length;
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

const changePage = () => {
    const actualPage = + pageSelector.value;
    const productPageOne = document.querySelector(".one")
    const productPageTwo = document.querySelector(".two")
    if (actualPage === 2) {
        productPageTwo.classList.add("hidden")
        productPageTwo.classList.add("flex-visible")
    }
    if (actualPage === 1) {
        previousButton.classList.add("page-navigator-off")
        productPageOne.classList.remove("hidden")
        productPageTwo.classList.remove("flex-visible")
    } else
        previousButton.classList.remove("page-navigator-off")

    if (actualPage === + pageSelectorLength) {
        productPageOne.classList.add("hidden")
        productPageTwo.classList.add("flex-visible")
        nextButton.classList.add("page-navigator-off")
    } else
        nextButton.classList.remove("page-navigator-off")

}

const previousPage = () => {
    if (pageSelector.value > 1)
        pageSelector.value --;
    changePage()
}

const nextPage = () => {
    if (pageSelector.value < pageSelectorLength)
        pageSelector.value ++;
    changePage();
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

//----------------------------------------------------------------------------------------------------------------------//
//                     Functions pour ajouter/enlever une classe à tout les éléments d'une liste

const removeClassFromListElements = (list, className) => {
    list.forEach(element => {
        element.classList.remove(className);
    })
}
