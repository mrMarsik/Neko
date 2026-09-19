

const body = document.body
body.style.backgroundColor = 'gray'



const neko = document.createElement('div')
neko.id = 'neko'



const background = document.createElement('div')
background.style.height = '4000px'
background.style.width = '4000px'
background.style.backgroundColor = 'black'



background.append(neko)



const buttonToBottom = document.createElement('button')
buttonToBottom.addEventListener('click', () => {
  window.scrollTo({
    top: body.scrollHeight - window.innerHeight,
    left: 0,
    behavior: 'smooth',
  })
})
buttonToBottom.style.width = '100%'
buttonToBottom.style.height = '40px'



const buttonToTop = document.createElement('button')
buttonToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
})
buttonToTop.style.width = '100%'
buttonToTop.style.height = '40px'

window.addEventListener('scroll', () => {
  buttonToTop.innerHTML = window.scrollY / window.innerHeight
  let rect = neko.getBoundingClientRect()
  console.log(rect)
  
  if ((rect.left + rect.right) / 2 > window.innerWidth / 2) {
        
      neko.style.backgroundColor = 'green'
      neko.textContent = 'RIGHT\n' + rect.left
  } else {

    neko.style.backgroundColor = 'purple'
    neko.textContent = 'LEFT\n' + rect.left + '\n' + window.innerWidth
  }
})

body.append(buttonToBottom)
body.append(background)
body.append(buttonToTop)
