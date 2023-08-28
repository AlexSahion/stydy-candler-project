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


//Acardeon

const spollersArray = document.querySelectorAll('[data-spollers]')


if (spollersArray) {
  const spollersRegular = Array.from(spollersArray).filter(item => {
    if(!item.dataset.spollers.split(',')[0]){
      return true
    }
  });
  if(spollersRegular){
    initSpollers(spollersRegular)
  }

  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init')
        initSpollerBody(spollersBlock)
        spollersBlock.addEventListener('click', setSpollerAction)
      }else{
        spollersBlock.classList.remove('_init')
        initSpollerBody(spollersBlock, false)
        spollersBlock.removeEventListener('click', setSpollerAction)
      }
    });
  }
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
    if (spollerTitles) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true
          }
        }else{
          spollerTitle.setAtribute('tabindex', '-1')
          spollerTitle.nextElementSibling.hidden = false
        }
      })
    }
  };
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
      const spollersBlock = spollerTitle.closest('[data-spollers]')
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
      if (!spollersBlock.querySelectorAll('_slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollerBody(spollersBlock)
        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }
  function hideSpollerBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active")
    if(spollerActiveTitle){
      spollerActiveTitle.classList.remove('_active')
      _slideUp(spollerActiveTitle.nextElementSibling, 500)
    }
  }
}






//Slider toggle
let _slideUp = (target, duration = 500) => {
  if(!target.classList.contains('_slide')){
    
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight;
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration);
  }
}
let _slideDown = (target, duration = 500) => {
  
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.style.height = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration);
  }
}

let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  }else{
    return _slideUp(target, duration)
  }
}