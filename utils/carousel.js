function autoplayCarousel() {
  const carouselEl = document.querySelector(".slider");
  const slideContainerEl = carouselEl.querySelector(".slider__container");
  const slideEl = carouselEl.querySelector(".slide__item");
  let slideWidth = slideEl.offsetWidth;

  function restartAnim() {
    document.querySelectorAll("animate").forEach((element) => {
      element.beginElement();
    });
    resetTimer();
  }

  let timer = 0;
  function tick() {
    timer++;
    if (timer === 10) {
      navigate("forward");
    }
    if (timer > 10) {
      resetTimer();
    }
  }
  function runTimer() {
    const runTheTimer = setInterval(tick, 1000);
  }
  function resetTimer() {
    timer = 0;
  }

  window.onload = runTimer();

  // const autoplay = setInterval(() => {
  //   navigate("forward");
  // }, 10000);

  document.querySelector("#back-button").addEventListener("click", () => {
    navigate("backward");
    restartAnim();
  });

  const forwardButton = document.querySelector("#forward-button");
  forwardButton.addEventListener("click", () => {
    navigate("forward");
    const loader = document.querySelector(".forward_loader");
    const forwardArrow = document.querySelector(".forward_arrow");
    forwardArrow.style.opacity = "0";
    loader.style.opacity = "1";
    restartAnim();

    setTimeout(() => {
      loader.style.opacity = "0";
      forwardArrow.style.opacity = "1";
    }, 500);
  });
  document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      navigate(index);
      restartAnim();
    });
  });

  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  const getNewScrollPosition = (arg) => {
    const gap = 10;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft;
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };
  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  const slideObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = entry.target.dataset.slideindex;
          carouselEl
            .querySelector(".slide-indicator.active")
            .classList.remove("active");
          carouselEl
            .querySelectorAll(".slide-indicator")
            [slideIndex].classList.add("active");
        }
      });
    },
    { root: slideContainerEl, threshold: 0.1 }
  );
  document.querySelectorAll(".slide__item").forEach((slide) => {
    slideObserver.observe(slide);
  });
}
autoplayCarousel();
