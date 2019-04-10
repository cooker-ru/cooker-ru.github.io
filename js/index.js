// ------------- header ----------- \\

function menu() {

  let logo = document.querySelector('.logo');
  let headerNavbar = document.querySelector('.header__navbar');
  let menuNavbar = headerNavbar.querySelector('.menu__navbar');
  let navbarWrapper = headerNavbar.querySelector('.navbar__menu__wrapper');
  let menuLinks = menuNavbar.querySelectorAll('a');
  let menuBurger = headerNavbar.getElementsByClassName('wrapper_menu_burger')[0];

  menuBurger.onclick = () => {
    let firstCutlet = headerNavbar.getElementsByClassName('cutlet')[0];
    let averageCutlet = headerNavbar.getElementsByClassName('cutlet')[1];
    let lastCutlet = headerNavbar.getElementsByClassName('cutlet')[2];

    if (averageCutlet.style.opacity !== '0' ) {
      averageCutlet.style.opacity = '0';
      firstCutlet.classList.add('first__cutlet__click');
      firstCutlet.classList.remove('first__cutlet');
      lastCutlet.classList.add('last__cutlet__click');
      lastCutlet.classList.remove('last__cutlet');

      navbarWrapper.style.display = 'block';
      menuNavbar.classList.add('menu__navbar__show');
      logo.classList.add('logo__menu__show');
      logo.classList.remove('logo');
      navbarWrapper.style.margin = 0;
      headerNavbar.classList.add('header__navbar__column');
      for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].style.boxShadow = '0px 0px 15px 2px rgba(0,0,0,.3)';
      }
    }
    else {
      averageCutlet.style.opacity = '1';
      firstCutlet.classList.add('first__cutlet');
      firstCutlet.classList.remove('first__cutlet__click');
      lastCutlet.classList.add('last__cutlet');
      lastCutlet.classList.remove('last__cutlet__click');

      navbarWrapper.style.display = 'none';
      headerNavbar.classList.remove('header__navbar__column');
      navbarWrapper.style.marginLeft = 'auto';
      logo.classList.add('logo');
      logo.classList.remove('logo__menu__show');
    }
  };
}
document.addEventListener('DOMContentLoaded', menu);

// ---------- search function ----------- \\
function Search(i, Container, Section, Cards, classBasic, hI) {

  this.i = i;
  this.container = Container;
  this.section = Section;
  this.cards = Cards;
  this.hI = hI;

  Container = document.getElementsByClassName(this.container)[0];
  Section = Container.getElementsByClassName(this.section)[0];
  Cards = Section.getElementsByClassName(this.cards);

  let searchWrapper = document.getElementsByClassName('search')[this.i];
  let showHideButtonsContainer = Container.getElementsByClassName('buttons__show__clear__wrap')[0];

  let inputSearch = searchWrapper.querySelector('.input__search');
  let clearSerch = searchWrapper.querySelector('.clear_search');

  inputSearch.oninput = (hI) => {

    let filterCards = inputSearch.value.toUpperCase();
    for (var i = 0; i < Cards.length; i++) {
      let cardTitles = Cards[i].getElementsByClassName('card-title')[0];
      cardTitles.innerHTML.toUpperCase().indexOf(filterCards) > -1 ? Cards[i].style.display = 'block' : Cards[i].style.display = 'none';

      if (cardTitles.innerHTML.toUpperCase().indexOf(filterCards) >= -1) {
        showHideButtonsContainer.style.display = 'none';
        Section.classList.remove(classBasic);
        Section.classList.add('search__containes');
        Section.style.height = this.hI + 'px';
      }
      if (inputSearch.value.length < 1) {
        Section.scrollTop = 0;
        Section.classList.remove('search__containes');
        Section.classList.add(classBasic);
        showHideButtonsContainer.style.display = 'flex';
      }
    }
  };

  clearSerch.onclick = () => {
    inputSearch.value = "";
    for (var i = 0; i < Cards.length; i++) {
      Cards[i].style.display = 'block';
      Section.scrollTop = 0;
      Section.classList.remove('search__containes');
      Section.classList.add(classBasic);
      showHideButtonsContainer.style.display = 'flex';
    }
  };
}

// =============== show more function ============ \\
function ShowMore(n, Container, cardContainer, showMore, closeMore, containerHeight, stopHeight) {
  this.container = Container;
  this.cardContainer = cardContainer;
  this.containerHeight = containerHeight;
  this.showMore = showMore;
  this.closeMore = closeMore;
  this.n = n;

  Container = document.getElementsByClassName(this.container)[0];
  cardContainer = Container.getElementsByClassName(this.cardContainer)[0];
  showMore = Container.getElementsByClassName(this.showMore)[0];
  closeMore = Container.getElementsByClassName(this.closeMore)[0];

  showMore.onclick = (wW, cardContId) => {
    cardContId = cardContainer.id;
    wW = window.innerWidth;

    if (wW >= 1715 && (cardContId === 'cardContainerPan' || cardContId === 'cardContainerSaucepan')) {this.stopHeight = (stopHeight - this.n) + 'px'; }
    else if (wW <= 1286 && wW >= 706 && (cardContId === 'cardContainerPan' || cardContId === 'cardContainerSaucepan')) {this.stopHeight = (stopHeight*2 - this.n) + 'px';}
    else if (wW <= 705 && wW < 1285 && (cardContId === 'cardContainerPan' || cardContId === 'cardContainerSaucepan')) {this.stopHeight = (stopHeight*3) + 'px';}

    else if (wW >= 1436 && (cardContId === 'bbqContainerCard' || cardContId === 'cardContainerOven')) { this.stopHeight = (stopHeight - this.n) + 'px'; }
    else if (wW <= 790 && (cardContId === 'bbqContainerCard' || cardContId === 'cardContainerOven')) { this.stopHeight = (stopHeight*2) + 'px'; }

    else this.stopHeight = stopHeight + 'px';

    cardContainer.classList.add('show_more_transition');
    // console.log(cardContainer.style.height);
    cardContainer.style.height = containerHeight + this.n + 'px';
    if (cardContainer.style.height == this.stopHeight) return;
    return (containerHeight += this.n);
  };

  closeMore.onclick = () => {
    // cardContainer.classList.remove('show_more_transition');
    // cardContainer.style.transition = 'all ease .5s';
    cardContainer.style.height = this.n + 'px';
    containerHeight = this.n;
  };
}

// ============== show Modal window =============== \\

function Modal(Container, initiateModalWindow, cardParentChild) {
  this.container = Container;
  this.initiateModalWindow = initiateModalWindow;
  this.cardParentChild = cardParentChild;

  let body = document.getElementsByTagName('body')[0];

  Container = document.getElementsByClassName(this.container)[0];
  initiateModalWindow = Container.getElementsByClassName(this.initiateModalWindow);

  for (let i = 0; i < initiateModalWindow.length; i++) {

    initiateModalWindow[i].onclick = (modalWindow, closeWindow) => {
      modalWindow = initiateModalWindow[i].parentNode.childNodes[cardParentChild];
      setTimeout(() => {
        modalWindow.classList.remove('inactive');
        modalWindow.classList.add('active__modal__window');
        body.style.overflow = 'hidden';
      } , 300);


      closeWindow = modalWindow.childNodes[1].childNodes[1];
      closeWindow.onclick = () => {
        modalWindow.classList.add('inactive');
        modalWindow.classList.remove('active__modal__window');
        body.style.overflow = 'visible';
      };
    };
  }
}

// ---------- pan-section ------------- \\
function pan() {
  let panSearch = new Search(0, 'pan__container', 'card__container__pan', 'card__pan', 'card__container__pan', 474.5);
  let showMorePan = new ShowMore(474.5, 'pan__container', 'card__container__pan', 'show__more', 'close__more', 474.5, 2372.5);
  let panModalWindow = new Modal('card__container__pan', 'span__click', 3);
}
document.addEventListener('DOMContentLoaded', pan);

//  ---------- oven section --------- \\
function oven() {
  let ovenSearch = new Search(1,'oven__container', 'card__container__oven', 'card__oven', 'card__container__oven', 505.5);
  let showMoreOven = new ShowMore(1011, 'oven__container', 'card__container__oven', 'show__more', 'close__more', 1011, 4044);
  let ovenModalWindow = new Modal('card__container__oven', 'span__click', 3)
}
document.addEventListener('DOMContentLoaded', oven);

// ------- Saucepan section -------- \\
function saucepan() {
  let saucepanSearch = new Search(2,'caucepan__container', 'card__container__saucepan', 'card__saucepan', 'card__container__saucepan', 498.5);
  let showMoreSaucepan = new ShowMore(498.5, 'caucepan__container', 'card__container__saucepan', 'show__more', 'close__more', 498.5, 1994);
  let saucepanModalWindow = new Modal('card__container__saucepan', 'i__modal__action', 7);
}
document.addEventListener('DOMContentLoaded', saucepan);

// ------------------ bbq section ---------------- \\
function bbq() {
  let BbqSearch = new Search(3, 'bbq__container', 'bbq__container__card', 'bbq__card', 'bbq__container__card', 505.5);
  let showMoreBbq = new ShowMore(505.5, 'bbq__container', 'bbq__container__card', 'show__more', 'close__more', 505.5, 2022);
  let bbqModalwindow = new Modal('bbq__container__card', 'span__click', 3)
}
document.addEventListener('DOMContentLoaded', bbq);

// ------------ svg animation ----------- \\

function animationLazy(){

  document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

      // let el = document.querySelector('#meat');
      // let animationMeat = new LazyLinePainter(el, {
      //   "ease":"easeLinear",
      //   "strokeWidth": 5,
      //   "strokeOpacity": 1,
      //   "strokeColor": "#ffffff",
      //   "strokeCap": "square",
      //   "delay" : 5000,
      //   "reverse" : true,
      //   "repeat": 0
      // });
      // animationMeat.paint();

      let elCat = document.querySelector('#cat');
      let animationCat = new LazyLinePainter(elCat, {
        "strokeWidth": 3,
        "strokeOpacity": 1,
        "strokeColor": "#26A69A",
        "strokeCap": "square",
        "delay" : 7000,
        "repeat": 0
      });
      animationCat.paint();
    }
  }

};
document.addEventListener('DOMContentLoaded', animationLazy);

// ----------- index.js ------------- \\
