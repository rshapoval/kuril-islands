'use strict';

(function () {
  var header = document.querySelector('.header');
  var scrollStatus = window.pageYOffset || document.body.scrollTop;

  window.addEventListener('scroll', toggleHeader);
  window.addEventListener('load', toggleHeader);
  window.addEventListener('resize', toggleHeader);

  // SHOW/HIDE HEADER
  function toggleHeader() {
    scrollStatus = window.pageYOffset || document.body.scrollTop;

    if (scrollStatus > 0) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }
}());

(function () {
  toggleMenu();

  // SHOW/HIDE MAIN-MENU
  function toggleMenu() {
    var body = document.body;
    var header = document.querySelector('.header');
    var overlay = document.querySelector('.menu-overlay');
    var mainMenu = document.querySelector('.main-menu');
    var btnMenuOpen = header.querySelector('.menu-toggle-open');
    var btnMenuClose = mainMenu.querySelector('.menu-toggle-close');

    var focusableEls = mainMenu.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];

    btnMenuOpen.addEventListener('click', showMenu);

    btnMenuClose.addEventListener('click', hideMenu);
    overlay.addEventListener('click', hideMenu);

    document.addEventListener('keydown', function (e) {
      handleKeyDown(e);
    });

    // Show main-menu
    function showMenu() {
      body.classList.add('main-menu-open');
      overlay.style.display = 'block';
      mainMenu.style.visibility = 'visible';
      mainMenu.classList.add('main-menu-active');
      btnMenuClose.focus();
    }

    // Hide main-menu
    function hideMenu() {
      btnMenuOpen.focus();
      mainMenu.classList.remove('main-menu-active');
      setTimeout(function () {
        mainMenu.style.visibility = 'hidden';
      }, 500);
      overlay.style.display = 'none';
      body.classList.remove('main-menu-open');
    }

    // Handle keydown
    function handleKeyDown(e) {
      var KEY_TAB = 9;
      var KEY_ESC = 27;

      switch (e.keyCode) {
        case KEY_TAB:
          if (focusableEls.length === 1) {
            e.preventDefault();
            break;
          }
          if (e.shiftKey) {
            handleBackwardTab();
          } else {
            handleForwardTab();
          }
          break;
        case KEY_ESC:
          hideMenu();
          break;
        default:
          break;
      }

      function handleBackwardTab() {
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      }

      function handleForwardTab() {
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  }
}());

(function () {
  var dropdowns = document.querySelectorAll('.dropdown');
  var dropdownBtns = document.querySelectorAll('.dropdown-toggle');

  document.addEventListener('click', function (e) {
    for (var i = 0; i < dropdowns.length; i++) {
      if (e.target.contains(dropdowns[i]) || e.target === dropdowns[i]) {
        dropdowns[i].classList.remove('dropdown-active');
      }
    }
  });

  for (var i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener('click', function (e) {
      toggleDropdown(e);
    });
  }

  document.addEventListener('keydown', function (e) {
    handleKeyDown(e);
  });

  // Toggle dropdown
  function toggleDropdown(e) {
    var target = e.target;

    if (target.classList.contains('dropdown-toggle')) {
      var dropdown = target.parentNode;

      for (var j = 0; j < dropdowns.length; j++) {
        if (dropdowns[j] !== dropdown) {
          dropdowns[j].classList.remove('dropdown-active');
        }
      }

      if (dropdown.classList.contains('dropdown-active')) {
        dropdown.classList.remove('dropdown-active');
      } else {
        dropdown.classList.add('dropdown-active');
      }
    }
  }

  // Handle keydown
  function handleKeyDown(e) {
    var KEY_ESC = 27;

    if (e.keyCode === KEY_ESC) {
      for (var j = 0; j < dropdowns.length; j++) {
        dropdowns[j].classList.remove('dropdown-active');
      }
    }
  }
}());
