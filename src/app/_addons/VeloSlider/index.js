import React, { useEffect } from "react";
import "./index.scss";
import $ from "jquery";
const Velocity = require("velocityjs");

export const VeloSlider = () => {
  useEffect(() => {
    /**
     * Velocity Effects
     *
     * First, A few Registered effects for velocity's ui kit.
     * Actual slider stuff below
     */

    let scaleDownAmnt = 0.7;
    let boxShadowAmnt = "40px";

    $.Velocity.RegisterEffect("translateUp", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "-100%",
          },
          1,
        ],
      ],
    });
    $.Velocity.RegisterEffect("translateDown", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "100%",
          },
          1,
        ],
      ],
    });
    $.Velocity.RegisterEffect("translateNone", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "0",
            opacity: "1",
            scale: "1",
          },
          1,
        ],
      ],
    });
    //scale down
    $.Velocity.RegisterEffect("scaleDown", {
      defaultDuration: 1,
      calls: [
        [
          {
            opacity: "0",
            scale: "0.7",
          },
          1,
        ],
      ],
    });

    //gallery
    $.Velocity.RegisterEffect("scaleDown.moveUp", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "0%",
            scale: scaleDownAmnt,
          },
          0.2,
        ],
        [
          {
            translateY: "-100%",
          },
          0.6,
        ],
        [
          {
            translateY: "-100%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.2,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "-100%",
            scale: scaleDownAmnt,
          },
          0.6,
        ],
        [
          {
            translateY: "-100%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.4,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleUp.moveUp", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "90%",
            scale: scaleDownAmnt,
            // boxShadowBlur: boxShadowAmnt
          },
          0.2,
        ],
        [
          {
            translateY: "0%",
          },
          0.6,
        ],
        [
          {
            translateY: "0%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.2,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "0%",
            scale: scaleDownAmnt,
            // boxShadowBlur: boxShadowAmnt
          },
          0.6,
        ],
        [
          {
            translateY: "0%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.4,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleDown.moveDown", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "0%",
            scale: scaleDownAmnt,
            // boxShadowBlur: boxShadowAmnt
          },
          0.2,
        ],
        [
          {
            translateY: "100%",
          },
          0.6,
        ],
        [
          {
            translateY: "100%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.2,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
      defaultDuration: 1,
      calls: [
        [{}, 0.6],
        [
          {
            translateY: "100%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.4,
        ],
      ],
    });
    $.Velocity.RegisterEffect("scaleUp.moveDown", {
      defaultDuration: 1,
      calls: [
        [
          {
            translateY: "-90%",
            scale: scaleDownAmnt,
            // boxShadowBlur: boxShadowAmnt
          },
          0.2,
        ],
        [
          {
            translateY: "0%",
          },
          0.6,
        ],
        [
          {
            translateY: "0%",
            scale: "1",
            // boxShadowBlur: '0'
          },
          0.2,
        ],
      ],
    });

    /**
     * Velo Slider
     * A Custom Slider using Velocity and Velocity UI effects
     */

    let VeloSlider = (function () {
      /**
       * Global Settings
       */
      let settings = {
        veloInit: $(".velo-slides").data("velo-slider"),
        $veloSlide: $(".velo-slide"),
        veloSlideBg: ".velo-slide__bg",
        navPrev: $(".velo-slides-nav").find("a.js-velo-slides-prev"),
        navNext: $(".velo-slides-nav").find("a.js-velo-slides-next"),
        veloBtn: $(".velo-slide__btn"),
        delta: 0,
        scrollThreshold: 7,
        currentSlide: 1,
        animating: false,
        animationDuration: 2000,
      };

      // Flags
      let delta = 0,
        animating = false;

      return {
        /**
         * Init
         */
        init: function () {
          this.bind();
        },

        /**
         * Bind our click, scroll, key events
         */
        bind: function () {
          //  Add active to first slide to set it off
          settings.$veloSlide.first().addClass("is-active");

          //  Init with a data attribute,
          //  Binding the animation to scroll, arrows, keys
          if (settings.veloInit === "on") {
            VeloSlider.initScrollJack();
            $(window).on("DOMMouseScroll mousewheel", VeloSlider.scrollJacking);
          }

          // Arrow / Click Nav
          settings.navPrev.on("click", VeloSlider.prevSlide);
          settings.navNext.on("click", VeloSlider.nextSlide);

          // Key Nav
          $(document).on("keydown", function (e) {
            let keyNext = e.which === 39 || e.which === 40,
              keyPrev = e.which === 37 || e.which === 38;

            if (keyNext && !settings.navNext.hasClass("inactive")) {
              e.preventDefault();
              VeloSlider.nextSlide();
            } else if (keyPrev && !settings.navPrev.hasClass("inactive")) {
              e.preventDefault();
              VeloSlider.prevSlide();
            }
          });

          // // Swipes
          // $(window).swipe(function( direction, offset ) {
          //   //if (offset < 100) { return; }
          //   if (direction == "up") {
          //     VeloSlider.prevSlide();
          //     console.log('swipe up');

          //   }
          //   if (direction == "down") { VeloSlider.nextSlide(); }
          // });

          //set navigation arrows visibility
          VeloSlider.checkNavigation();

          // Call Button Hover animation
          VeloSlider.hoverAnimation();
        },

        /**
         * Hover Animation
         * Adds 'is-hovering' class to the current slide
         * when hovering over the button.
         */
        hoverAnimation: function () {
          settings.veloBtn.hover(function () {
            $(this).closest(settings.$veloSlide).toggleClass("is-hovering");
          });
        },

        /**
         * Set Animation
         * Defines the animation sequence, calling our registered velocity effects
         * @see js/components/_velocity-effects.js
         */
        setAnimation: function (midStep, direction) {
          // Vars for our velocity effects
          let animationVisible = "translateNone",
            animationTop = "translateUp",
            animationBottom = "translateDown",
            easing = "ease",
            animDuration = settings.animationDuration;

          // Middle Step
          if (midStep) {
            animationVisible = "scaleUp.moveUp.scroll";
            animationTop = "scaleDown.moveUp.scroll";
            animationBottom = "scaleDown.moveDown.scroll";
          } else {
            animationVisible =
              direction === "next" ? "scaleUp.moveUp" : "scaleUp.moveDown";
            animationTop = "scaleDown.moveUp";
            animationBottom = "scaleDown.moveDown";
          }

          return [
            animationVisible,
            animationTop,
            animationBottom,
            animDuration,
            easing,
          ];
        },

        /**
         * Init Scroll Jaclk
         */
        initScrollJack: function () {
          let visibleSlide = settings.$veloSlide.filter(".is-active"),
            topSection = visibleSlide.prevAll(settings.$veloSlide),
            bottomSection = visibleSlide.nextAll(settings.$veloSlide),
            animationParams = VeloSlider.setAnimation(false),
            animationVisible = animationParams[0],
            animationTop = animationParams[1],
            animationBottom = animationParams[2];
          console.log(animationParams);
          console.log(animationParams[4]);

          visibleSlide
            .children("div")
            .velocity(animationVisible, 1, function () {
              visibleSlide.css("opacity", 1);
              topSection.css("opacity", 1);
              bottomSection.css("opacity", 1);
            });

          topSection.children("div").velocity(animationTop, 0);
          bottomSection.children("div").velocity(animationBottom, 0);
        },

        /**
         * Scroll Jack
         * On Mouse Scroll
         */
        scrollJacking: function (e) {
          if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
            delta--;
            Math.abs(delta) >= settings.scrollThreshold &&
              VeloSlider.prevSlide();
          } else {
            delta++;
            delta >= settings.scrollThreshold && VeloSlider.nextSlide();
          }
          return false;
        },

        /**
         * Previous Slide
         */
        prevSlide: function (e) {
          //go to previous section
          typeof e !== "undefined" && e.preventDefault();

          let visibleSlide = settings.$veloSlide.filter(".is-active"),
            animationParams = VeloSlider.setAnimation(midStep, "prev"),
            midStep = false;

          visibleSlide = midStep
            ? visibleSlide.next(settings.$veloSlide)
            : visibleSlide;

          console.log(midStep);

          if (!animating && !visibleSlide.is(":first-child")) {
            animating = true;

            visibleSlide
              .removeClass("is-active")
              .children(settings.veloSlideBg)
              .velocity(
                animationParams[2],
                animationParams[3],
                animationParams[4]
              )
              .end()
              .prev(settings.$veloSlide)
              .addClass("is-active")
              .children(settings.veloSlideBg)
              .velocity(
                animationParams[0],
                animationParams[3],
                animationParams[4],
                function () {
                  animating = false;
                }
              );
            currentSlide = settings.currentSlide - 1;
          }
          VeloSlider.resetScroll();
        },

        /**
         * Next Slide
         */
        nextSlide: function (e) {
          //go to next section
          typeof e !== "undefined" && e.preventDefault();

          let visibleSlide = settings.$veloSlide.filter(".is-active"),
            animationParams = VeloSlider.setAnimation(midStep, "next"),
            midStep = false;

          if (!animating && !visibleSlide.is(":last-of-type")) {
            animating = true;

            visibleSlide
              .removeClass("is-active")
              .children(settings.veloSlideBg)
              .velocity(animationParams[1], animationParams[3])
              .end()
              .next(settings.$veloSlide)
              .addClass("is-active")
              .children(settings.veloSlideBg)
              .velocity(animationParams[0], animationParams[3], function () {
                animating = false;
              });
            currentSlide = settings.currentSlide + 1;
          }
          VeloSlider.resetScroll();
        },

        /**
         * Reset SCroll
         */
        resetScroll: function () {
          delta = 0;
          VeloSlider.checkNavigation();
        },

        /**
         * Check Nav
         * Adds / hides nav based on first/last slide
         * @todo - loop slides, without cloning if possible
         */
        checkNavigation: function () {
          //update navigation arrows visibility
          settings.$veloSlide.filter(".is-active").is(":first-of-type")
            ? settings.navPrev.addClass("inactive")
            : settings.navPrev.removeClass("inactive");
          settings.$veloSlide.filter(".is-active").is(":last-of-type")
            ? settings.navNext.addClass("inactive")
            : settings.navNext.removeClass("inactive");
        },
      };
    })();

    // INIT
    VeloSlider.init();
  });
  return (
    <div>
      <main role="main">
        <section
          className="velo-slides"
          data-velo-slider="on"
          data-velo-theme="light"
        >
          <section className="velo-slide">
            <span className="velo-slider__hint">
              <span>
                <span>Check Them Bldgs</span>
              </span>
            </span>
            <div className="velo-slide__bg">
              <span className="border">
                <span />
              </span>
              <figure
                className="velo-slide__figure"
                style="background-image: url(https://source.unsplash.com/VsBl5PwVZpY/2000x1200)"
              />
            </div>

            <header className="velo-slide__header">
              <h3 className="velo-slide__title">
                <span className="oh">
                  <span>The Name Is</span>
                </span>
                <span className="oh">
                  <span>Stephen Scaff</span>
                </span>
              </h3>
              <p className="velo-slide__text">
                <span className="oh">
                  <span>
                    I'm a Creative Developer currently building web things at
                    the Seattle Branding + Interactive firm, Urban Influence.
                  </span>
                </span>
              </p>
              <span className="velo-slide__btn">
                <a className="btn-draw btn--white" href="#">
                  <span className="btn-draw__text">
                    <span>View Work</span>
                  </span>
                </a>
              </span>
            </header>
          </section>

          <section className="velo-slide">
            <span className="velo-slider__hint">
              <span>
                <span>What's up Playas</span>
              </span>
            </span>
            <div className="velo-slide__bg">
              <span className="border">
                <span />
              </span>
              <figure
                className="velo-slide__figure"
                style="background-image: url(https://source.unsplash.com/D8GFCYxyJj8/2000x1200)"
              />
            </div>

            <header className="velo-slide__header">
              <h3 className="velo-slide__title">
                <span className="oh">
                  <span>Another Day</span>
                </span>
                <span className="oh">
                  <span>Another Slide</span>
                </span>
              </h3>
              <p className="velo-slide__text">
                <span className="oh">
                  <span>
                    The here slider interaction thing is using Velocity for
                    ehanced animation performance.
                  </span>
                </span>
              </p>
            </header>
          </section>

          <section className="velo-slide">
            <span className="velo-slider__hint">
              <span>
                <span>Urban Influence</span>
              </span>
            </span>
            <div className="velo-slide__bg">
              <span className="border">
                <span />
              </span>
              <figure
                className="velo-slide__figure"
                style="background-image: url()"
              />
              <div className="velo-slide__vid-wrap">
                {/*
                            <video autoPlay="" className="velo-slide__vid" loop="" poster="">
                                <source src="http://uiclients.com/assets/videos/ui-chaun.mp4" type="video/mp4">
                                    Wait,
                                    are you still using IE? Bruv. Go get Chrome, or kick rocks
                            </video>
*/}
              </div>
            </div>
            <header className="velo-slide__header">
              <h3 className="velo-slide__title">
                <span className="oh">
                  <span>Pigeon Wisdom</span>
                </span>
                <span className="oh">
                  <span>Agency Site</span>
                </span>
              </h3>
              <p className="velo-slide__text">
                <span className="oh">
                  <span>
                    Live from the Coop, SOTD rocking, folio and storytelling
                    joint for the Pigeon Wizzy squad. Coo Coo Mfers.
                  </span>
                </span>
              </p>
              <span className="velo-slide__btn">
                <a className="btn-draw btn--white" href="#">
                  <span className="btn-draw__text">
                    <span>View Project</span>
                  </span>
                </a>
              </span>
            </header>
          </section>

          <nav className="velo-slides-nav">
            <ul className="velo-slides-nav__list">
              <li>
                <a
                  className="js-velo-slides-prev velo-slides-nav__prev inactive"
                  href="#"
                >
                  <i className="icon-up-arrow" />
                </a>
              </li>
              <li>
                <a
                  className="js-velo-slides-next velo-slides-nav__next"
                  href="#0"
                >
                  <i className="icon-down-arrow" />
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </div>
  );
};
