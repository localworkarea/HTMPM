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

  if (menuItems.length > 0) {
    if (window.innerWidth <= 62.061 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
      // Скрываем все подменю изначально
      hideAllSubMenus();
      
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

});
