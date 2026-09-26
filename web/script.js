

document.addEventListener ('scroll', () => {
  if (window.scrollY > window.innerHeight) {
    head.classList.add('compact') 
  } else {
    head.classList.remove('compact')
  }
})
