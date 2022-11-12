// global variables
let pageCounter = 0
let overviewBtn
let result
let lists
let listResult

// defining variables
const main = document.querySelector('.main')
const selectLists = document.querySelector('.selectLists')
const selectListsInput = document.querySelector('.selectListsInp')
const selectDatePublished = document.querySelector('.date')
const selectDateCurrent = document.querySelector('.checkbox')
const selectBtn = document.querySelector('.selectBtn')

const prevBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')

// defining api variables
const urlBase = 'https://api.nytimes.com/svc/books/v3/'
const keys = ['api-key=8eR1rJjkneJGbbGraRQO2GGjOA6DPube', 'api-key=V3WdCKljmza5FjUL6jbBH4AAXv4auCR7', 'api-key=eGlXfPKgFambhlggBaAGGRC1ZUr4Hc7g']
let urlApiKey = 'api-key=8eR1rJjkneJGbbGraRQO2GGjOA6DPube'


// Defining site's elements

// 1List names
const urlBaseLists = 'lists/names.json?'

// 2List data
// view: lists/{date}/{name} 
// params: offset = 0, 20, 40

// defining global variables
let urlListName
let urlListDate
let urlListBase
let urlListFinal

// 3Book Reviews Services
const urlBaseReview = 'reviews.json?'

// isbn=9781524763138

// defining global variables
// let urlAuthor = 'author=Michelle+Obama'
// let urlIsbn = 'isbn=9781524763138'
// let urlTitle = 'title=Becoming'

// 4Best sellers history

// defining global variables
const historyAuthor = document.querySelector('.author')
const historyTitle = document.querySelector('.title')
const historyOffset = document.querySelector('.historyOffset')

const historyBtn = document.querySelector('.historyBtn')
const urlBaseHistory = 'lists/best-sellers/history.json?'

// replace ' ' with '%20'
// params:
// &offset=20
// and with default
// &author=Stephen%20King
// or
// &title=Becoming
// or
// &isbn=234

// 5Lists overview:

// defining global variables
// const urlBaseOverview = 'lists/overview.json'

// Get top 5 books for all the Best Sellers lists for specified date.
// params: published_date=2020-20-20

// Defining list name
const urlFinLists = urlBase + urlBaseLists + urlApiKey