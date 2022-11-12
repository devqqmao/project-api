// Define global variables
let pageCounter = 0
let overviewBtn
let result
let lists
let listResult



// Define main variables
const main = document.querySelector('.main')
const selectLists = document.querySelector('.selectLists')
const selectListsInput = document.querySelector('.selectListsInp')
const selectDatePublished = document.querySelector('.date')
const selectDateCurrent = document.querySelector('.checkbox')
const selectBtn = document.querySelector('.selectBtn')

const prevBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')

// Define API variables
const urlBase = 'https://api.nytimes.com/svc/books/v3/'
const keys = ['api-key=8eR1rJjkneJGbbGraRQO2GGjOA6DPube', 'api-key=V3WdCKljmza5FjUL6jbBH4AAXv4auCR7', 'api-key=eGlXfPKgFambhlggBaAGGRC1ZUr4Hc7g']
let urlApiKey = 'api-key=8eR1rJjkneJGbbGraRQO2GGjOA6DPube'


// Define website elements

// List names # 1
const urlBaseLists = 'lists/names.json?'

// List data # 2

// view: lists/{date}/{name} 
// params: offset = 0, 20, 40

// global

let urlListName
let urlListDate
let urlListBase
let urlListFinal


// Book Reviews Services # 3
const urlBaseReview = 'reviews.json?'

// isbn=9781524763138

// Define global variables
// let urlAuthor = 'author=Michelle+Obama'
// let urlIsbn = 'isbn=9781524763138'
// let urlTitle = 'title=Becoming'

// 4Best sellers history

// Define global variables
const historyAuthor = document.querySelector('.author')
const historyTitle = document.querySelector('.title')
const historyOffset = document.querySelector('.historyOffset')

const historyBtn = document.querySelector('.historyBtn')
const urlBaseHistory = 'lists/best-sellers/history.json?'

// params:
// &offset=20
// and with default
// &author=Stephen%20King
// or
// &title=Becoming
// or
// &isbn=234

// Define list name
const urlFinLists = urlBase + urlBaseLists + urlApiKey