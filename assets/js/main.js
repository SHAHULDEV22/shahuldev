!(function () {
  "use strict";
  var s = (e, t) => (
      (e = e.trim()),
      t ? [...document.querySelectorAll(e)] : document.querySelector(e)
    ),
    o = (t, e, i, o) => {
      let a = s(e, o);
      a &&
        (o
          ? a.forEach((e) => e.addEventListener(t, i))
          : a.addEventListener(t, i));
    },
    e = (e, t) => {
      e.addEventListener("scroll", t);
    };
  let t = s("#navbar .scrollto", !0);
  var i = () => {
    var i = window.scrollY + 200;
    t.forEach((e) => {
      var t;
      !e.hash ||
        ((t = s(e.hash)) &&
          (i >= t.offsetTop && i <= t.offsetTop + t.offsetHeight
            ? e.classList.add("active")
            : e.classList.remove("active")));
    });
  };
  window.addEventListener("load", i), e(document, i);
  var a = (e) => {
    e = s(e).offsetTop;
    window.scrollTo({ top: e, behavior: "smooth" });
  };
  let l = s(".back-to-top");
  l &&
    ((r = () => {
      100 < window.scrollY
        ? l.classList.add("active")
        : l.classList.remove("active");
    }),
    window.addEventListener("load", r),
    e(document, r)),
    o("click", ".mobile-nav-toggle", function (e) {
      s("body").classList.toggle("mobile-nav-active"),
        this.classList.toggle("bi-list"),
        this.classList.toggle("bi-x");
    }),
    o(
      "click",
      ".scrollto",
      function (e) {
        if (s(this.hash)) {
          e.preventDefault();
          let t = s("body");
          if (t.classList.contains("mobile-nav-active")) {
            t.classList.remove("mobile-nav-active");
            let e = s(".mobile-nav-toggle");
            e.classList.toggle("bi-list"), e.classList.toggle("bi-x");
          }
          a(this.hash);
        }
      },
      !0
    ),
    window.addEventListener("load", () => {
      window.location.hash &&
        s(window.location.hash) &&
        a(window.location.hash);
    });
  const n = s(".typed");
  if (n) {
    let e = n.getAttribute("data-typed-items");
    (e = e.split(",")),
      new Typed(".typed", {
        strings: e,
        loop: !0,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2e3,
      });
  }
  var r = s(".skills-content");
  r &&
    new Waypoint({
      element: r,
      offset: "80%",
      handler: function (e) {
        let t = s(".progress .progress-bar", !0);
        t.forEach((e) => {
          e.style.width = e.getAttribute("aria-valuenow") + "%";
        });
      },
    }),
    window.addEventListener("load", () => {
      var e = s(".portfolio-container");
      if (e) {
        let t = new Isotope(e, { itemSelector: ".portfolio-item" }),
          i = s("#portfolio-flters li", !0);
        o(
          "click",
          "#portfolio-flters li",
          function (e) {
            e.preventDefault(),
              i.forEach(function (e) {
                e.classList.remove("filter-active");
              }),
              this.classList.add("filter-active"),
              t.arrange({ filter: this.getAttribute("data-filter") }),
              t.on("arrangeComplete", function () {
                AOS.refresh();
              });
          },
          !0
        );
      }
    }),
    GLightbox({ selector: ".portfolio-lightbox" }),
    new Swiper(".portfolio-details-slider", {
      speed: 400,
      loop: !0,
      autoplay: { delay: 5e3, disableOnInteraction: !1 },
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
    }),
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: !0,
      autoplay: { delay: 5e3, disableOnInteraction: !1 },
      slidesPerView: "auto",
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
      },
    }),
    window.addEventListener("load", () => {
      AOS.init({ duration: 1e3, easing: "ease-in-out", once: !0, mirror: !1 });
    });
})();

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      status.innerHTML = "Thanks for your submission!";
      form.reset();
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
