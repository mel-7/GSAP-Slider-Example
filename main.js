$(function () {
  const $slider = $(".slider");
  const $slides = $slider.find(".slide");
  const $navPrev = $(".go-prev");
  const $navNext = $(".go-next");
  let isAnimating = false;
  let slidesNum = $slides.length;
  let prevSlideID = null;
  let currentSlideID = 0;

  function init() {
    TweenLite.set($slides, {
      opacity: 0,
      display: "none",
    });
    $navPrev.on("click", gotoPrevSlide);
    $navNext.on("click", gotoNextSlide);
    gotoSlide(0, 0);
  }

  function gotoPrevSlide() {
    var slideToGo = currentSlideID - 1;
    if (slideToGo <= -1) {
      slideToGo = slidesNum - 1;
    }
    gotoSlide(slideToGo, 1, "prev");
  }

  function gotoNextSlide() {
    var slideToGo = currentSlideID + 1;
    if (slideToGo >= slidesNum) {
      slideToGo = 0;
    }
    gotoSlide(slideToGo, 1, "next");
  }
  function gotoSlide(slideID, _time, _direction) {
    if (!isAnimating) {
      isAnimating = true;
      prevSlideID = currentSlideID;
      currentSlideID = slideID;
      var $prevSlide = $slides.eq(prevSlideID);
      var $currentSlide = $slides.eq(currentSlideID);
      var time = 1;

      console.log($currentSlide);
      if (_time !== null) {
        time = _time;
      }
      var direction = "next";
      if (_direction != null) {
        direction = _direction;
      }
      if (direction == "next") {
        TweenLite.to($prevSlide, time, {
          opacity: 0,
          display: "none",
          //   left: "-100%",
        });
        TweenLite.fromTo(
          $currentSlide,
          time,
          {
            opacity: 0,
            display: "none",
            // left: "100%",
          },
          {
            display: "flex",
            opacity: 1,
            // left: "0",
          }
        );
      } else {
        TweenLite.to($prevSlide, time, {
          //   left: "100%",
          opacity: 0,
        });
        TweenLite.fromTo(
          $currentSlide,
          time,
          {
            // left: "-100%",
            opacity: 0,
            display: "none",
          },
          {
            // left: "0",
            display: "flex",
            opacity: 1,
          }
        );
      }
      TweenLite.delayedCall(time, function () {
        isAnimating = false;
      });
    }
  }
  init();
});
