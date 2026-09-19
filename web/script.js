

const body = document.body
const head = document.getElementById('neko-header')




const section1 = document.createElement('section')
section1.id = 'section1'


document.addEventListener ('scroll', () => {
  if (window.scrollY > window.innerHeight) {
    head.classList.add('compact') 
  } else {
    head.classList.remove('compact')
  }
})
