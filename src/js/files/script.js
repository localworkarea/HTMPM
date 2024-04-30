// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, _slideToggle } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// document.addEventListener('DOMContentLoaded', function() {

//   const menuItems = document.querySelectorAll('.menu-item');
//   const menuItemHasChildren = document.querySelectorAll('.menu-item.menu-item-has-children');
//   const childrenAtag = document.querySelectorAll('.menu-item.menu-item-has-children > a');
//   const subMenu = document.querySelectorAll('.menu-item.menu-item-has-children > ul');
//   // currentOpenItem = null;
//   function hideSubMenus() {
//     subMenu.forEach(subMenu => {
//         subMenu.setAttribute('hidden', true);
//     });
//   }
  
//   function showSubMenus() {
//       subMenu.forEach(subMenu => {
//           subMenu.removeAttribute('hidden');
//       });
//   }

  // if (menuItems.length > 0) {
  //   if (window.innerWidth <= 62.061 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
  //     hideSubMenus();
//       menuItemHasChildren.forEach(item => {
//         item.addEventListener('click', function(event) {

//             // Получаем соответствующий элемент ul для текущего menuItemHasChildren
//             const submenu = item.querySelector('ul');
//             // Вызываем _slideToggle для текущего подменю
//             _slideToggle(submenu);

//         });
//       });
//     }
//   }

// });

document.addEventListener('DOMContentLoaded', function() {


  // РАБОТА С МЕНЮ ==================================================================
  const menuItems = document.querySelectorAll('.menu-item');
  const menuItemHasChildren = document.querySelectorAll('.menu-item.menu-item-has-children');

  // Функция для скрытия всех подменю
  function hideAllSubMenus() {
    const allSubMenus = document.querySelectorAll('.sub-menu');
    allSubMenus.forEach(subMenu => {
      subMenu.setAttribute('hidden', true);
    });
  }

  // Функция для отображения подменю конкретного родительского элемента
  function toggleSubMenuVisibility(parentItem) {
    const subMenu = parentItem.querySelector('.sub-menu');
    _slideToggle(subMenu);
  }

  function handleWindowResize() {
    const breakpointWidth = 62.061 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isOpenClass = '_open';

    if (window.innerWidth <= breakpointWidth) {
      hideAllSubMenus();
    } else {
      const openMenuItems = document.querySelectorAll('.menu-item.' + isOpenClass);
      openMenuItems.forEach(item => {
        item.classList.remove(isOpenClass);
      });

      const visibleSubMenus = document.querySelectorAll('.sub-menu');
      visibleSubMenus.forEach(subMenu => {
        subMenu.removeAttribute('hidden');
      });
    }
  }


  if (menuItems.length > 0) {
    handleWindowResize(); // Вызываем функцию сразу после загрузки страницы

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleWindowResize);

    // Обработчик клика для верхних родительских элементов
    menuItemHasChildren.forEach(parentItem => {
      parentItem.addEventListener('click', function(event) {
        toggleSubMenuVisibility(parentItem);
        parentItem.classList.toggle('_open');
        // Останавливаем дальнейшее всплытие события
        event.stopPropagation();
      });
    });

    // Обработчик клика для вложенных элементов, который удаляет обработчик клика для родительского элемента
    const nestedMenuItemHasChildren = document.querySelectorAll('.menu-item.menu-item-has-children .menu-item.menu-item-has-children');
    nestedMenuItemHasChildren.forEach(nestedItem => {
      nestedItem.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    });
  }

  // ======================================================================================


  // Получаем все элементы card-news__link
  const cardLinks = document.querySelectorAll('.card-news__link');
  if (cardLinks) {
    cardLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.closest('.card-news__card').classList.add('_hover');
        });
        link.addEventListener('mouseleave', function() {
            this.closest('.card-news__card').classList.remove('_hover');
        });
    });
  }


      // ==   VIDEO YOUTUBE ON CLICK BUTTON ==================================================
      const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
      videoYoutubeButtons.forEach(button => {
          button.addEventListener('click', function() {
              const youTubeCode = this.getAttribute('data-youtube');
              let autoplay = true; // Автоплей разрешено (true) или нет (false)
      
              let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;
      
              const iframe = document.createElement('iframe');
              iframe.setAttribute('allowfullscreen', '');
      
              if (autoplay) {
                  urlVideo += '&autoplay=1';
                  iframe.setAttribute('allow', 'autoplay; encrypted-media');
              }
      
              iframe.setAttribute('src', urlVideo);
      
              const body = this.closest('.video-youtube__body');
              body.innerHTML = '';
              body.appendChild(iframe);
              body.classList.add('video-added');
          });
      });
      // =====================================================================================



    // РАБОТА С ПЕРЕМЕЩЕНИЕМ H2 ЗАГОЛОВКА В БЛОКАХ .block ============================
    // Функция для получения ширины экрана в пикселях
    function getScreenWidth() {
      return window.innerWidth;
    }

    // Функция для вычисления ширины в пикселях на основе ширины в em
    function convertEmToPx(emWidth) {
      var emSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Получаем размер шрифта в пикселях
      return emWidth * emSize; // Конвертация ширины в пиксели
    }

    // Функция для перемещения заголовка h2 на меньших экранах
    function moveH2OnSmallScreens(screenWidth, breakpointPx) {
      if (screenWidth <= breakpointPx) {
          blocks.forEach(function(block) {
              var h2Element = block.querySelector('h2');
              if (h2Element) {
                  block.insertBefore(h2Element, block.firstChild);
              }
          });
      }
    }

    // Функция для возвращения заголовка h2 на больших экранах
    function returnH2OnLargeScreens(screenWidth, breakpointPx) {
      if (screenWidth > breakpointPx) {
          blocks.forEach(function(block) {
              var h2Element = block.querySelector('h2');
              var blockBody = block.querySelector('.block__body');
              if (h2Element && blockBody) {
                  blockBody.insertAdjacentElement('afterbegin', h2Element);
              }
          });
      }
    }

    function moveH2Element() {
      var screenWidth = getScreenWidth();
      var breakpointEm = 46.936; // Ширина в em
      var breakpointPx = convertEmToPx(breakpointEm);
    
      moveH2OnSmallScreens(screenWidth, breakpointPx);
      returnH2OnLargeScreens(screenWidth, breakpointPx);
    }

    var blocks = document.querySelectorAll('.block');
    if (blocks.length > 0) {
      window.onload = moveH2Element;
      window.onresize = moveH2Element;
    }
    // ============================================================================




});
