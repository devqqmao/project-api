// Build starting view
fetchAndDecode(urlFinLists, defLists)

// Init
function init() {
  prevBtn.addEventListener('click', prevFn)
  nextBtn.addEventListener('click', nextFn)

  listGroupFn()

  selectBtn.addEventListener('click', listGroupFn)
}

