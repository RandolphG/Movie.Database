import React, { useEffect } from "react";
import "./index.scss";
import $ from "jquery";

export default function Cube() {
  useEffect(() => {
    $(".side")
      .on("click", "li", function () {
        $("#cube").removeClass().addClass($(this).attr("class"));
      })
      .on("mouseover", "li", function () {
        let me = $(this);
        let attr = me.attr("data-url");

        if (attr !== undefined) {
          $("h2").text(attr).css("visibility", "visible");
        }
      });
  });
  return (
    <nav id="nav" role="navigation">
      <h2>sdasd</h2>

      <ul id="cube">
        <li className="side">
          <ul>
            <li />
            <li />
            <li className="home">
              <i className="round icon-home icon-2x" />
            </li>
            <li className="about">
              <i className="icon-user icon-2x" />
              <span>About us</span>
            </li>
            <li className="shop">
              <i className="icon-dollar icon-2x" />
              <span>
                <br />
                Store
              </span>
            </li>
            <li className="social">
              <i className="icon-comments-alt icon-2x" />
              <span>Social</span>
            </li>
            <li className="misc">
              <i className="icon-asterisk icon-2x" />
              <span>Projects</span>
            </li>
          </ul>
        </li>
        <li className="side">
          <ul>
            <li>
              <i className="icon-chevron-left icon-2x" />
              <span>
                <br />
                Back
              </span>
            </li>
            <li className="shop">
              <h3>Store</h3>
            </li>
            <li className="shop">
              <i className="icon-dollar icon-2x round" />
            </li>
            <li className="shop">
              <i className="icon-fighter-jet icon-2x" />
              <span>Planes</span>
            </li>
            <li className="shop">
              <i className="icon-rocket icon-2x" />
              <span>Rockets</span>
            </li>
            <li className="shop">
              <i className="icon-gift icon-2x" />
              <span>Gifts</span>
            </li>
            <li className="shop">
              <i className="icon-beer icon-2x" />
              <span>BEER</span>
            </li>
            <li className="shop">
              <i className="icon-mobile-phone icon-2x" />
              <span>Mobiles</span>
            </li>
            <li className="shop">
              <i className="icon-female icon-2x" />
              <span>Wifes</span>
            </li>
          </ul>
        </li>
        <li className="side">
          <ul>
            <li>
              <i className="icon-chevron-left icon-2x" />
              <span>
                <br />
                Back
              </span>
            </li>
            <li />
            <li className="misc">
              <i className="round icon-asterisk icon-2x" />
            </li>
            <li className="misc" data-url="patternwall.net">
              <i className="icon-th icon-2x" />
              <span>Patternwall</span>
            </li>
          </ul>
        </li>
        <li className="side">
          <ul>
            <li>
              <i className="icon-chevron-left icon-2x" />
              <span>
                <br />
                Back
              </span>
            </li>
            <li />
            <li className="about">
              <i className="round icon-user icon-2x" />
            </li>
            <li className="about">
              <i className="icon-book icon-2x" />
              <span>History</span>
            </li>
            <li className="about">
              <i className="icon-group icon-2x" />
              <span>Our team</span>
            </li>
          </ul>
        </li>
        <li className="side">
          <ul>
            <li className="social">
              <i className="icon-chevron-left icon-2x" />
              <span>
                <br />
                Back
              </span>
            </li>
            <li className="dribbble">
              <h3>Dribbble</h3>
            </li>
            <li className="dribbble">
              <i className="icon-dribbble icon-2x round" />
            </li>
            <li />
            <li className="dribbble" data-url="dribbble.com/Vaddo">
              <i className="icon-dribbble icon-4x" />
            </li>
            <li />
            <li className="dribbble" data-url="dribbble.com/Vaddo">
              <p>
                I would like to join Dribbble :)
                <br /> Could somebody invite me please?
              </p>
            </li>
          </ul>
        </li>
        <li className="side">
          <ul>
            <li>
              <i className="icon-chevron-left icon-2x" />
              <span>
                <br />
                Back
              </span>
            </li>
            <li className="social">
              <h3>Social</h3>
            </li>
            <li className="social">
              <i className="icon-comments-alt icon-2x round" />
            </li>
            <li className="social" data-url="github.com/Vaddo">
              <i className="icon-github-alt icon-2x" />
              <span>Github</span>
            </li>
            <li className="social" data-url="twitter.com/vadimhermann">
              <i className="icon-twitter icon-2x" />
              <span>Twitter</span>
            </li>
            <li className="dribbble" data-url="click!">
              <i className="icon-dribbble icon-2x" />
              <span>Dribbble</span>
            </li>
            <li className="social" data-url="xing.com/profile/Vadim_Hermann">
              <i className="icon-xing icon-2x" />
              <span>XING</span>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
