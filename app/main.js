// -------------------- Define list names --------------------

// Define fetchAndDecode for list names
function fetchAndDecode(inserturl, func) {
  fetch(inserturl).then(response => {
    if (response.status === 429) {
      urlApiKey = selectKey(urlApiKey)
    } else if (response.status === 404) {
      empty()
    } else if (!response.ok) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  }).then(response => {
    lists = response
    func()
  }).catch(e => {
    console.log('Error:', e)
  })
}

// Build list names 
function defLists() {
  for (i = 0;i < lists.results.length;i++) {
    const option = document.createElement('option')
    selectLists.appendChild(option)
    option.textContent = lists.results[i]['list_name']
    option.setAttribute('value', lists.results[i]['list_name_encoded'])
  }
  init()
}
// -------------------- handlers --------------------
// empty json handler
function empty() {
  const para = document.createElement('p')
  main.appendChild(para)
  para.textContent = 'Nothing to display :('
}

// 429 error handler
function selectKey(urlApiKey) {
  for (key of keys) {
    if (key !== urlApiKey) {
      url = key
      break
    }
  }
  return url
}

// Display
function display() {
  check = listResult
  while (main.firstChild) {
    main.removeChild(main.firstChild)
  }
  for (i = 0;i < 10;i++) {
    if (check.results.books[i]) {
      console.log('check inside display', check)
      draw(check)
    } else {
      break
    }
  }
  hover()
  overviewBtnClick()
}

// Draw
function draw(data) {
  console.log('3')
  console.log('draw data:', data)
  const section = document.createElement('section')
  const para = document.createElement('p')
  const paraa = document.createElement('p')
  const h2 = document.createElement('h2')
  const imgcont = document.createElement('div')
  const div = document.createElement('div')
  const divl = document.createElement('div')
  const divr = document.createElement('div')
  const overlay = document.createElement('div')

  const paraover = document.createElement('p')
  const paraover2 = document.createElement('p')
  const overviewBtn = document.createElement('button')

  main.appendChild(section)
  section.appendChild(div)
  div.appendChild(divl)
  div.appendChild(divr)
  divl.appendChild(para)
  divr.appendChild(h2)
  divr.appendChild(paraa)
  section.appendChild(imgcont)
  imgcont.appendChild(overlay)
  overlay.appendChild(paraover)
  overlay.appendChild(paraover2)
  overlay.appendChild(overviewBtn)

  div.setAttribute('class', 'top')
  divl.setAttribute('class', 'divl')
  divr.setAttribute('class', 'divr')
  h2.setAttribute('class', 'title')
  para.setAttribute('class', 'rank')
  paraa.setAttribute('class', 'author')
  imgcont.setAttribute('class', 'imgcont')
  overlay.setAttribute('class', 'overlay')
  paraover.setAttribute('class', 'paraover')
  paraover2.setAttribute('class', 'paraover2')
  overviewBtn.setAttribute('class', 'overviewBtn')

  overviewBtn.textContent = 'Learn more'


  console.log('1')
  json = data.results.books
  console.log('jsoncheck', json)
  console.log(i)
  isbnReview = json[i]['primary_isbn13']
  overviewBtn.setAttribute('isbn13', isbnReview)
  console.log('urlcheck', json[i].book_image)
  imgcont.style.backgroundImage = `url(${json[i].book_image})`

  section.style.maxWidth = json[i].book_image_width + 'px'
  section.style.minWidth = 340 + 'px'

  imgcont.style.height = json[i].book_image_height + 'px'
  imgcont.style.minHeight = 450 + 'px'
  imgcont.style.minWidth = json[i].book_image_width + 'px'

  overlay.style.minHeight = 450 + 'px'
  overlay.style.height = json[i].book_image_height + 'px'
  overlay.style.minWidth = 340 + 'px'
  overlay.style.maxWidth = json[i].book_image_width + 'px'

  overlay.style.visibility = 'visible'

  if (json[i].weeks_on_list === 0) {
    paraover.textContent = 'Weeks on list: X'
  } else {
    paraover.textContent = 'Weeks on list: ' + json[i].weeks_on_list
  }
  if (json[i].description === '') {
    paraover2.textContent = 'This amazing book unfortunately has no description. :('
  } else {
    paraover2.textContent = json[i].description
  }

  h2.textContent = json[i].title
  para.textContent = `#${json[i].rank} Rank`
  paraa.textContent = json[i].author

}

// Define hover
function hover() {

  const overlayarr = document.querySelectorAll('.imgcont')
  for (el of overlayarr) {
    el.childNodes[0].addEventListener('mouseenter', handler)
    el.childNodes[0].addEventListener('mouseleave', handler)
    function handler(e) {
      if (e.target.style.backgroundColor === 'rgba(0, 0, 0, 0.8)') {
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        e.target.childNodes[0].style.visibility = 'hidden'
        e.target.childNodes[1].style.visibility = 'hidden'
        e.target.childNodes[2].style.visibility = 'hidden'
      } else {
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        e.target.childNodes[0].style.visibility = 'visible'
        e.target.childNodes[1].style.visibility = 'visible'
        e.target.childNodes[2].style.visibility = 'visible'
      }
    }
  }
}

// Define overviewBtnClick
function overviewBtnClick() {
  const btnarr = document.querySelectorAll('.overviewBtn')
  for (el of btnarr) {
    el.onclick = function (e) {
      let isbn = 'isbn=' + e.target.getAttribute('isbn13')
      const reviewUrl = urlBase + urlBaseReview + isbn + '&' + urlApiKey
      fetch(reviewUrl).then(response => {
        if (response.status === 429) {
          urlApiKey = selectKey(urlApiKey)
        } else if (response.status === 404) {
          empty()
        } else if (!response.ok) {
          throw new Error(response.status)
        } else {
          return response.json()
        }
      }).then(response => {
        openReviewLink(response, e)
      }).catch(e => console.log('Error:', e))
    }
  }
}

// Define openReviewLink
function openReviewLink(response, e) {
  if (!response.num_results) {
    e.target.textContent = 'No results :('
    setTimeout(() => {
      e.target.textContent = 'Learn more'
    }, 3000)
  } else {
    window.open(response.results[0].url)
  }
}

// Define next button
function nextFn() {
  console.log('4', listResult)
  pageCounter += 1
  json = listResult.results.books
  console.log()

  if (pageCounter - json.length / 10 < 0) {
    while (main.firstChild) {
      main.removeChild(main.firstChild)
    }

    console.log('json', json)
    for (i = pageCounter * 10;i < (pageCounter + 1) * 10;i++) {
      if (json[i]) {
        draw(listResult)
      } else {
        break
      }
    }

    hover()
    overviewBtnClick()

  } else {
    pageCounter -= 1
  }



}

// Define prev btn
function prevFn() {
  if (pageCounter !== 0) {
    pageCounter -= 1
    json = listResult.results.books

    while (main.firstChild) {
      main.removeChild(main.firstChild)
    }
    console.log('json', json)
    for (i = pageCounter * 10;i < (pageCounter + 1) * 10;i++) {
      if (json[i]) {
        draw(listResult)
      } else {
        break
      }
    }

    hover()
    overviewBtnClick()

  } else {
    pageCounter = 0
  }
}

// Define listGroupFn
function listGroupFn() {

  pageCounter = 0
  let counter = 0
  if (selectListsInput.value === '') {
    urlListName = selectLists.value.toLowerCase().replace('  ', '-')
  } else {
    for (let i = 0;i < lists.results.length;i++) {
      if ((lists.results[i]['list_name'].toLowerCase().trim()).indexOf(selectListsInput.value.toLowerCase().trim()) !== -1) {
        urlListName = lists.results[i]['list_name_encoded']
        selectLists[i].setAttribute('selected', 'selected')
        counter++
      } else if (i === lists.results.length - 1 && counter === 0) {
        urlListName = 'manga'
        selectLists[14].setAttribute('selected', 'selected')
        selectListsInput.value = 'Manga'
      }
    }
  }

  if (selectDateCurrent.checked) {
    urlListDate = 'current'
  } else {
    if (selectDatePublished.value === '') {
      urlListDate = 'current'
    } else {
      urlListDate = selectDatePublished.value
    }
  }

  urlListBase = `lists/${urlListDate}/${urlListName}?`

  urlListFinal = urlBase + urlListBase + urlApiKey

  fetch(urlListFinal).then(response => {
    if (response.status === 429) {
      urlApiKey = selectKey(urlApiKey)
    } else if (response.status === 404) {
      empty()
    } else if (!response.ok) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  }).then(response => {
    listResult = response
    display()
  }).catch(e => {
    console.log(e)
  })

  selectListsInput.value = ''

  if (selectDateCurrent.checked) {
    selectDatePublished.value = ''
  }
  selectDateCurrent.value = ''

}