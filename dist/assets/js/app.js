// modal
const modal = {
  el: document.querySelector(".modal-overlay"),
  activeModal: null,

  init() {
    this.setupTriggers();
    this.setupOutsideClick();
  },

  setupTriggers() {
    const triggers = document.querySelectorAll("[data-modal]");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalName = trigger.dataset.modal;
        if (modalName === "close") {
          this.close();
        } else {
          this.open(modalName);
        }
      });
    });
  },

  setupOutsideClick() {
    this.el.addEventListener("click", (event) => {
      if (event.target === this.el) {
        this.close();
      }
    });
  },

  open(name) {
    const targetModal = this.el.querySelector(`[data-template="${name}"]`);

    if (targetModal) {
      this.close(true); // Close any currently active modal
      this.activeModal = targetModal;

      this.el.style.display = "flex"; // Show the overlay
      requestAnimationFrame(() => {
        this.el.classList.add("show"); // Animate overlay
        this.activeModal.style.display = "flex"; // Show modal content

        // Add animation class to modal content
        requestAnimationFrame(() => {
          this.activeModal.classList.add("show");
        });
      });
    } else {
      console.error(`Modal with name "${name}" not found.`);
    }
  },

  close(onlyModal = false) {
    if (onlyModal) {
      if (this.activeModal) {
        this.activeModal.style.display = "none"; // Fully hide modal content
        this.activeModal.classList.remove("show"); // Hide modal content
      }
    } else {
      if (this.activeModal) {
        this.activeModal.classList.remove("show"); // Hide modal content
        const modalToHide = this.activeModal; // Preserve reference for timeout
        this.activeModal = null;

        setTimeout(() => {
          modalToHide.style.display = "none"; // Fully hide after animation
        }, 250); // Match the CSS animation duration
      }

      this.el.classList.remove("show"); // Animate overlay
      this.el.addEventListener(
        "transitionend",
        () => {
          if (!this.el.classList.contains("show")) {
            this.el.style.display = "none"; // Fully hide overlay
          }
        },
        { once: true }
      );
    }
  },
};
modal.init();

// header
const header = document.querySelector(".header");
if (header) {
  const menu = header.querySelector(".header__menu");
  const menuLinks = menu.querySelectorAll(".menu-item");
  const services = header.querySelector(".menu-item-has-children");
  // const servicesSubMenu = services.querySelector(".sub-menu");
  const contacts = header.querySelector(".header__contact");

  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  menuLinks.forEach((link) => {
    const a = link.querySelector("a");
    let url = new URL(a.href);

    if (window.location.pathname == url.pathname) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // const div = document.createElement("div");
  // div.classList.add("icon-plus");
  // div.innerHTML =
  //   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9999 12.0001C15.0007 12.1317 14.9755 12.2621 14.9257 12.384C14.8759 12.5058 14.8026 12.6166 14.7099 12.7101L10.7099 16.7101C10.5216 16.8984 10.2662 17.0042 9.99994 17.0042C9.73364 17.0042 9.47824 16.8984 9.28994 16.7101C9.10164 16.5218 8.99585 16.2664 8.99585 16.0001C8.99585 15.7338 9.10164 15.4784 9.28994 15.2901L12.5899 12.0001L9.29994 8.71006C9.13611 8.51876 9.05051 8.27268 9.06023 8.02101C9.06995 7.76933 9.17428 7.53059 9.35238 7.3525C9.53047 7.1744 9.76921 7.07007 10.0209 7.06035C10.2726 7.05063 10.5186 7.13623 10.7099 7.30006L14.7099 11.3001C14.8947 11.4863 14.9988 11.7377 14.9999 12.0001Z" fill="currentColor"/></svg>';

  // services.appendChild(div);

  // services.addEventListener("mouseenter", () => {
  //   servicesSubMenu.style.display = "flex"; // Ensure the submenu is visible
  //   requestAnimationFrame(() => {
  //     servicesSubMenu.offsetHeight;
  //     servicesSubMenu.classList.add("show");
  //   });
  // });

  // services.addEventListener("mouseleave", () => {
  //   servicesSubMenu.classList.remove("show");

  //   servicesSubMenu.addEventListener("transitionend", function handler(event) {
  //     if (
  //       event.propertyName === "opacity" &&
  //       !servicesSubMenu.classList.contains("show")
  //     ) {
  //       servicesSubMenu.style.display = "none"; // Hide after fade-out
  //       servicesSubMenu.removeEventListener("transitionend", handler);
  //     }
  //   });
  // });

  const tabs = header.querySelectorAll("#tab");
  const tabLinks = header.querySelectorAll("#tab-link");
  const tabsBody = header.querySelector(".mobile__menu-content");
  const tabsContent = tabsBody.querySelector("#content");
  const tabsContentClose = tabsBody.querySelector("#close");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const isActive = tab.classList.contains("active");
      tabs.forEach((tab) => tab.classList.remove("active"));

      if (isActive) {
        tabsBody.classList.remove("show");

        // Wait for the animation to finish before setting display to 'none'
        tabsBody.addEventListener("transitionend", function handler(event) {
          if (
            event.propertyName === "transform" &&
            !tabsBody.classList.contains("show")
          ) {
            tabsBody.style.display = "none";
            tabsContent.innerHTML = "";
            tabsBody.removeEventListener("transitionend", handler);
          }
        });
      }

      // If tab was not already active, show the content
      if (!isActive) {
        tab.classList.add("active");
        tabsBody.style.display = "flex";

        requestAnimationFrame(() => {
          tabsBody.classList.add("show");
        });

        if (tab.dataset.toggle == "menu") {
          tabsContent.innerHTML = menu.innerHTML + contacts.outerHTML;
        } else {
          tabsContent.innerHTML = servicesSubMenu.outerHTML;
        }
      }
    });
  });

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add animation for hiding
      tabsBody.classList.remove("show");
      tabsBody.addEventListener("transitionend", function handler(event) {
        if (
          event.propertyName === "transform" &&
          !tabsBody.classList.contains("show")
        ) {
          tabsBody.style.display = "none";
          tabsContent.innerHTML = "";
          tabsBody.removeEventListener("transitionend", handler);
        }
      });
    });
  });

  tabsContentClose.addEventListener("click", () => {
    // Add animation for hiding
    tabsBody.classList.remove("show");
    tabsBody.addEventListener("transitionend", function handler(event) {
      if (
        event.propertyName === "transform" &&
        !tabsBody.classList.contains("show")
      ) {
        tabsBody.style.display = "none";
        tabsContent.innerHTML = "";
        tabsBody.removeEventListener("transitionend", handler);
      }
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  });
}

// school
const school = document.querySelector(".school");
if (school) {
  const video = school.querySelector("video");
  const play = school.querySelector(".school__video-play");
  const playBtn = play.querySelector(".icon");

  playBtn.addEventListener("click", () => {
    play.style.display = "none";
    video.muted = false;
    video.currentTime = 0;
    video.controls = true;
    video.play();
  });
}

// Map
const map = document.querySelector("#yamap");
if (map) {
  ymaps.ready(function () {
    const data = {
      center: [59.932586, 30.34555],
      icon: "/assets/img/icons/marker2.svg",
      zoom: 11,
    };

    const markers = [
      {
        marker: [59.932586, 30.34555],
        city: "г. Санкт-Петербург",
        street: "ул. Заозерная д 3/11",
      },
      {
        marker: [59.912586, 30.30555],
        city: "г. Санкт-Петербург",
        street: "ул. Заозерная д 3/11",
      },
    ];

    var myMap = new ymaps.Map(
      "yamap",
      {
        center: data.center,
        zoom: data.zoom,
        controls: [],
        behaviors: [
          "drag",
          "dblClickZoom",
          "rightMouseButtonMagnifier",
          "multiTouch",
        ],
      },
      {
        suppressMapOpenBlock: true,
      }
    );

    markers.forEach((marker) => {
      let myPlacemark = new ymaps.Placemark(
        marker.marker,
        {
          balloonContentHeader: `<b style='color:#000;'>${marker.city}</b>`,
          balloonContentFooter: marker.street,
        },
        {
          iconLayout: "default#image",
          iconImageHref: data.icon,
          iconImageSize: [35, 40],
          iconImageOffset: [-20 / 2, -20],
        }
      );

      myMap.geoObjects.add(myPlacemark);
    });

    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        position: {
          top: 15,
          left: "auto",
          right: 15,
        },
      },
    });

    myMap.controls.add(zoomControl);
  });
}

// init phone mask
const phoneMasks = document.querySelectorAll("input[name='phone']");
phoneMasks.forEach((input) => {
  let keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }
    let reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    )
      this.value = newValue;
    if (event.type == "blur" && this.value.length < 5) this.value = "";

    if (this.value.length == 18 || this.value.length == 0) {
      input.dataset.numbervalid = "true";
    } else {
      input.dataset.numbervalid = "false";
    }
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});

// Accordions
const getAccordionParents = document.querySelectorAll("[data-accordion");
getAccordionParents.forEach((parent) => {
  const isMultiple = parent.dataset.multiple;
  const accordions = parent.querySelectorAll(".accordion");
  accordions.forEach((accordion, index, arr) => {
    const header = accordion.querySelector(".accordion__header");
    const body = accordion.querySelector(".accordion__body");
    const content = accordion.querySelector(".accordion__content");

    header.addEventListener("click", () => {
      const isActive = accordion.classList.contains("active");

      if (!isActive) {
        accordion.classList.add("active");
        header.dataset.state = "opened";
        body.style.maxHeight = content.scrollHeight + "px";
      } else {
        accordion.classList.remove("active");
        header.dataset.state = "closed";
        body.style.maxHeight = 0;
      }

      if (!isMultiple || isMultiple == "false") {
        arr.forEach((el) => {
          const header = el.querySelector(".accordion__header");

          if (el !== accordion) {
            el.classList.remove("active");
            header.dataset.state = "closed";
            el.querySelector(".accordion__body").style.maxHeight = 0;
          }
        });
      }
    });
  });
});

// Initialize the fancybox
const fancyboxTriggers = Array.from(
  document.querySelectorAll("[data-fancybox]")
).filter((trigger) => trigger.dataset.fancybox);
if (fancyboxTriggers) {
  const fancyboxInstances = [];
  fancyboxTriggers.forEach((trigger) => {
    const name = trigger.dataset.fancybox;
    if (fancyboxInstances.includes(name)) {
      return; // Skip if already bound
    }
    // Add the name to the `fancyboxInstances` list
    fancyboxInstances.push(name);
  });
  fancyboxInstances.forEach((name) => {
    Fancybox.bind(`[data-fancybox="${name}"]`, {
      Images: { Panzoom: { maxScale: 3 } },
    });
  });
}

// reviews swiper
let reviewsSwiper = new Swiper(".reviews__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".reviews__swiper .btn-next",
    prevEl: ".reviews__swiper .btn-prev",
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// instructors swiper
let instructorsSwiper = new Swiper(".instructors__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".instructors__swiper .btn-next",
    prevEl: ".instructors__swiper .btn-prev",
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// cars swiper
let carsSwiper = new Swiper(".cars__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".cars__swiper .btn-next",
    prevEl: ".cars__swiper .btn-prev",
  },
  breakpoints: {
    641: {
      slidesPerView: 2,
      spaceBetween: 15,
      slidesOffsetAfter: 370,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesOffsetAfter: 840,
    },
  },
  on: {
    slideChange: function () {
      if (window.innerWidth > 1024) {
        const activeIndex = carsSwiper.activeIndex;

        carsSwiper.slides.forEach((slide, index) => {
          if (index < activeIndex) {
            // Hide slides before active slide
            slide.classList.add("visibility-hidden");
          } else {
            // Show current and next slides
            slide.classList.remove("visibility-hidden");
          }
        });
      }
    },
  },
});

// tariffs swiper
const tariffsSwipers = document.querySelectorAll(".tariffs__swiper");
if (tariffsSwipers && tariffsSwipers.length) {
  const switchItems = document.querySelectorAll(
    ".tariffs__switch .tariffs__switch-item"
  );

  switchItems.forEach((item) => {
    item.addEventListener("click", () => {
      switchItems.forEach((el) => {
        el.classList.remove("active");
      });

      item.classList.add("active");

      tariffsSwipers.forEach((swiper) => {
        if (swiper.dataset.type == item.textContent.trim()) {
          swiper.style.display = "flex";
        } else {
          swiper.style.display = "none";
        }
      });
    });
  });

  tariffsSwipers.forEach((swiper) => {
    let swiperEl = swiper.querySelector(".swiper");
    let prevBtn = swiper.querySelector(".btn-prev");
    let nextBtn = swiper.querySelector(".btn-next");

    new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 15,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        681: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
      },
    });
  });
}

// discounts swiper
let discountsSwiper = new Swiper(".discounts__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".discounts__swiper .btn-next",
    prevEl: ".discounts__swiper .btn-prev",
  },
  breakpoints: {
    681: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1025: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
  },
});

// form
function successSend() {
  modal.open("success");

  setTimeout(() => {
    modal.close();
  }, 3000);
}

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successSend();
  });
});
