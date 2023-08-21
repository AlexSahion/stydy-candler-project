//Burger Menu
// const iconMenu = document.querySelector(".menu__icon")
// const menuBody = document.querySelector(".menu__body")
// if (iconMenu) {
//   iconMenu.addEventListener('click', e => {
//     document.body.classList.toggle("_active")
//     iconMenu.classList.toggle("_active")
//     menuBody.classList.toggle("_active")
//   })
// }



const menuBody = document.querySelector('.menu')
const iconMenu = document.querySelector('.icon__menu')
if (iconMenu) {
  iconMenu.addEventListener('click', e =>{
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
    body.classList.toggle('lock')
  })
}

//POPUP
const popupLinks = document.querySelectorAll('.popup-link')
const popupLinksClose = document.querySelectorAll('.popup-close')
const body = document.body
const timeout = 800
let unlock = true

if (popupLinks) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', e => {
      const popupName = popupLink.getAttribute('href').replace('#','')
      const popup = document.getElementById(popupName)
      popupOpen(popup)
      e.preventDefault()
    })
  }
}

if (popupLinksClose) {
  for (let index = 0; index < popupLinksClose.length; index++) {
    const popupLinkClose = popupLinksClose[index];
    popupLinkClose.addEventListener('click', e => {
      popupClose(e.target.closest('.popup'))
      e.preventDefault()
    })
  }
}
function popupOpen(popup) {
  if (popup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    }else{
      bodyLock()
    }
    popup.classList.add('open')
    popup.addEventListener('click', e => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}
function popupClose(popup, doUnlock = true) {
  if (unlock) {
    popup.classList.remove('open')
    if (doUnlock) {
      bodyUnlock()
    }
  }
}

function bodyLock() {
  const paddingVallue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
  body.classList.add('lock')
  body.style.paddingRight = paddingVallue

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout);
}
function bodyUnlock() {
  setTimeout(() => {
    body.style.paddingRight = '0px'
    if(!document.querySelector('.menu._active')){
      body.classList.remove('lock')
    }
  }, timeout);

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout);
}
if (!document.querySelector('.menu._active')) {
  console.log(1);
}else{
  console.log(false);
}

