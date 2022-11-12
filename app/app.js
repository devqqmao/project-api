
fetchAndDecode(urlFinLists, defLists)

// Initializing
function init() {
  console.log('init')
  prevBtn.addEventListener('click', prevFn)
  nextBtn.addEventListener('click', nextFn)

  listGroupFn()

  selectBtn.addEventListener('click', listGroupFn)
}

