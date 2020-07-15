const mainContainer = document.querySelector('.main-container')
const addButton = document.querySelector('.plus')
const addMenu = document.querySelector('.popup')
const closeButton = document.querySelector('.close')
const earningButton = document.querySelector('.button-choice-earnings')
const expensesButton = document.querySelector('.button-choice-expenses')
const iconsG = document.querySelector('.icons-g')
const iconsR = document.querySelector('.icons-r')
const confirmButton = document.querySelector('.confirm')
const deleteAll = document.querySelector('.delete-all-button')
const incomeAmount = document.querySelector('.income-amount')
const expensesAmount = document.querySelector('.expenses-amount')
const allAmount = document.querySelector('.all-amount')


document.addEventListener('DOMContentLoaded', getLists)
closeButton.addEventListener('click', closePopup)
addButton.addEventListener('click', openPopup)
earningButton.addEventListener('click', earningIconsAdd)
expensesButton.addEventListener('click', expensesIconsAdd)
deleteAll.addEventListener('click', deleteAllLists)

let income
if (localStorage.getItem('sums') === null) {
    income = 0
} else {
    incs = JSON.parse(localStorage.getItem('incs'))
    income = incs[incs.length - 1]
}
incomeAmount.innerHTML = income


let expenses
if (localStorage.getItem('sums') === null) {
    expenses = 0
} else {
    exps = JSON.parse(localStorage.getItem('exps'))
    expenses = exps[exps.length - 1]
}
expensesAmount.innerHTML = expenses

let all
if (localStorage.getItem('sums') === null) {
    all = 0
} else {
    all = income - expenses
}
allAmount.innerHTML = all


let green = 0
let style = ''
let div = document.querySelectorAll('.icon-green'),
    result;
for (let i = 0; i < div.length; i++) {
    result = div[i];
    result.addEventListener('click', function() {
        this.style.transform='scale(1.2)'
        this.style.border='2px solid black'
        green++
        for (let i=0; i < div.length; i++) {
            if (div[i].style.transform !=='scale(1.2)' ) {
                div[i].disabled=true
            }
        }
        style=this.childNodes[0].classList.value
        addToList()
        return style
        return green
    });
}

let divr = document.querySelectorAll('.icon-red'),
    resultr;
for (let i=0; i < divr.length; i++) {
    resultr=divr[i];
    resultr.addEventListener('click', function() {
        this.style.transform='scale(1.2)'
        this.style.border='2px solid black'
        console.log(this)
        style=this.childNodes[0].classList.value
        for (let i=0; i < divr.length; i++) {
            if (divr[i].style.transform !=='scale(1.2)' ) {
                divr[i].disabled=true
            }
        }
        addToList()
        return style
    });
}


function earningIconsAdd() {
    iconsG.style.display = 'flex'
    expensesButton.disabled = true
}

function expensesIconsAdd() {
    iconsR.style.display = 'flex'
    earningButton.disabled = true
}

function openPopup() {
    if (mainContainer.style.transform = 'translateX(0px)') {
        mainContainer.style.transform = 'translateX(-20vw)'
        addMenu.style.transform = 'translateX(7vw)'
        iconsG.style.display = 'none'
        iconsR.style.display = 'none'
    }
}


function addToList() {
    confirmButton.addEventListener('click', function append() {
        let date = new Date;
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let codeDate = day + '.' + month;
        const inputValue = document.querySelector('.amount')
        const inputDesc = document.querySelector('.description')
        const item = document.createElement('div')
        item.classList.add('item')
        const itemContent = document.createElement('div')
        itemContent.classList.add('item-content')
        const itemIconContainer = document.createElement('p')
        itemIconContainer.innerHTML = '<i class="' + style + '"></i>'
        const amountIcon = document.createElement('i')
        amountIcon.classList.add('fas', 'fa-euro-sign')
        if (green > 0) {
            itemIconContainer.classList.add('item-icon')
        } else {
            itemIconContainer.classList.add('item-icon-minus')
        }
        const itemAmount = document.createElement('p')
        if (green > 0) {
            itemAmount.classList.add('item-amount')
            let plusvalue = '+' + ' ' + inputValue.value
            itemAmount.innerHTML = plusvalue
            income += +inputValue.value
            saveLocalListSums(plusvalue)
        } else {
            itemAmount.classList.add('item-amount-minus')
            let minusvalue = '-' + ' ' + inputValue.value
            itemAmount.innerHTML = minusvalue
            expenses += +inputValue.value
            saveLocalListSums(minusvalue)
        }

        const itemDesc = document.createElement('p')
        itemDesc.classList.add('item-desc')
        itemDesc.innerHTML = inputDesc.value
        const dateContainer = document.createElement('div')
        dateContainer.classList.add('date-container')
        const itemDate = document.createElement('p')
        itemDate.classList.add('item-date')
        itemDate.innerHTML = codeDate
        itemContent.appendChild(itemIconContainer)
        itemContent.appendChild(itemAmount)
        itemAmount.appendChild(amountIcon)
        itemContent.appendChild(itemDesc)
        dateContainer.appendChild(itemDate)
        item.appendChild(itemContent)
        item.appendChild(dateContainer)
        mainContainer.appendChild(item)
        incomeAmount.innerHTML = income
        expensesAmount.innerHTML = expenses
        green = 0
        all = income - expenses
        confirmButton.removeEventListener('click', append)
        closePopup()
        saveLocalLists(inputDesc.value)
        saveLocalIcons('<i class="' + style + '"></i>')
        saveLocalListDate(codeDate)
        inputValue.value = 0
        inputDesc.value = ''
        allAmount.innerHTML = all
        saveLocalSums(all)
        saveLocalIncome(income)
        saveLocalExpenses(expenses)
    })
}

function closePopup() {
    mainContainer.style.transform = 'translateX(0px)'
    addMenu.style.transform = 'translateY(-850px)'
    expensesButton.disabled = false
    earningButton.disabled = false
    let divr = document.querySelectorAll('.icon-red')
    for (let i=0; i < divr.length; i++) {
        divr[i].disabled = false
        divr[i].style.border = '1px solid #7e7f97'
        divr[i].style.transform = 'scale(1)'
    }
    let div = document.querySelectorAll('.icon-green')
    for (let i=0; i < div.length; i++) {
        div[i].disabled = false
        div[i].style.border = '1px solid #7e7f97'
        div[i].style.transform = 'scale(1)'
    }
}

// storage

function saveLocalLists(list) {
    let lists
    if (localStorage.getItem('lists') === null) {
        lists = []
    } else {
        lists = JSON.parse(localStorage.getItem('lists'))
    }
    lists.push(list)
    localStorage.setItem('lists', JSON.stringify(lists))
}

function saveLocalIcons(icon) {
    let icons
    if (localStorage.getItem('icons') === null) {
        icons = []
    } else {
        icons = JSON.parse(localStorage.getItem('icons'))
    }
    icons.push(icon)
    localStorage.setItem('icons', JSON.stringify(icons))
}

function saveLocalListSums(listSum) {
    let listSums
    if (localStorage.getItem('listSums') === null) {
        listSums = []
    } else {
        listSums = JSON.parse(localStorage.getItem('listSums'))
    }
    listSums.push(listSum)
    localStorage.setItem('listSums', JSON.stringify(listSums))
}

function saveLocalListDate(listDate) {
    let listDates
    if (localStorage.getItem('listDates') === null) {
        listDates = []
    } else {
        listDates = JSON.parse(localStorage.getItem('listDates'))
    }
    listDates.push(listDate)
    localStorage.setItem('listDates', JSON.stringify(listDates))
}



function getLists() {
    let lists
    let icons
    let listSums
    let listDates
    if (localStorage.getItem('lists') === null) {
        lists = []
        icons = []
        listSums = []
        listDates = []
    } else {
        lists = JSON.parse(localStorage.getItem('lists'))
        icons = JSON.parse(localStorage.getItem('icons'))
        listSums = JSON.parse(localStorage.getItem('listSums'))
        listDates = JSON.parse(localStorage.getItem('listDates'))
    }
    let styleCounter = 0
    lists.forEach(function (list, icon, listSum, listDate) {
        styleCounter++
        const item = document.createElement('div')
        item.classList.add('item')
        const itemContent = document.createElement('div')
        itemContent.classList.add('item-content')
        const itemIconContainer = document.createElement('p')
        itemIconContainer.innerHTML = icons[icon]
        const itemAmount = document.createElement('p')
        itemAmount.innerHTML = (listSums.length > 0 ) ? listSums[styleCounter - 1] : listSums[0]
        const amountIcon = document.createElement('i')
        amountIcon.classList.add('fas', 'fa-euro-sign')
        const itemDate = document.createElement('p')
        if (listSums.length > 0) {
            itemDate.classList.add('item-date')
            itemDate.innerHTML = listDates[styleCounter - 1]
            if (listSums[styleCounter - 1].includes('-')) {
                itemIconContainer.classList.add('item-icon-minus')
                itemAmount.classList.add('item-amount-minus')
            } else {
                itemIconContainer.classList.add('item-icon')
                itemAmount.classList.add('item-amount')
            }
        } else {
            itemDate.classList.add('item-date')
            itemDate.innerHTML = listDates[0]
            if (listSums[0].includes('-')) {
                itemIconContainer.classList.add('item-icon-minus')
                itemAmount.classList.add('item-amount-minus')
            } else {
                itemIconContainer.classList.add('item-icon')
                itemAmount.classList.add('item-amount')
            }
        }
        const itemDesc = document.createElement('p')
        itemDesc.classList.add('item-desc')
        itemDesc.innerHTML = list
        const dateContainer = document.createElement('div')
        dateContainer.classList.add('date-container')
        itemContent.appendChild(itemIconContainer)
        itemContent.appendChild(itemAmount)
        itemAmount.appendChild(amountIcon)
        itemContent.appendChild(itemDesc)
        dateContainer.appendChild(itemDate)
        item.appendChild(itemContent)
        item.appendChild(dateContainer)
        mainContainer.appendChild(item)
    })
}

// SUMS STORAGE

function saveLocalSums(sum) {
    let sums
    if (localStorage.getItem('sums') === null) {
        sums = []
    } else {
        sums = JSON.parse(localStorage.getItem('sums'))
    }
    sums.push(sum)
    localStorage.setItem('sums', JSON.stringify(sums))
}

function saveLocalIncome(inc) {
    let incs
    if (localStorage.getItem('incs') === null) {
        incs = []
    } else {
        incs = JSON.parse(localStorage.getItem('incs'))
    }
    incs.push(inc)
    localStorage.setItem('incs', JSON.stringify(incs))
}

function saveLocalExpenses(exp) {
    let exps
    if (localStorage.getItem('exps') === null) {
        exps = []
    } else {
        exps = JSON.parse(localStorage.getItem('exps'))
    }
    exps.push(exp)
    localStorage.setItem('exps', JSON.stringify(exps))
}

function deleteAllLists() {
    localStorage.clear()
    location.reload()
}


