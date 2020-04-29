import React, { useEffect } from "react";
import "./index.scss";

export const Text = () => {
  useEffect(() => {
    let words = document.getElementsByClassName("word");
    let wordArray = [];
    let currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    /**
     * change the words
     */
    function changeWord() {
      let cw = wordArray[currentWord];
      let nw =
        currentWord == words.length - 1
          ? wordArray[0]
          : wordArray[currentWord + 1];
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw.length; i++) {
        nw[i].className = "letter behind";
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
    }

    /**
     * animate the word fade out
     * @param cw
     * @param i
     */
    function animateLetterOut(cw, i) {
      setTimeout(function () {
        cw[i].className = "letter out";
      }, i * 80);
    }

    /**
     * animate the words in
     * @param nw
     * @param i
     */
    function animateLetterIn(nw, i) {
      setTimeout(function () {
        nw[i].className = "letter in";
      }, 340 + i * 80);
    }

    /**
     * split the letters
     * @param word
     */
    function splitLetters(word) {
      let content = word.innerHTML;
      word.innerHTML = "";
      let letters = [];
      for (let i = 0; i < content.length; i++) {
        let letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 3000);
  });
  return (
    <div className="text">
      <p>movies are&nbsp;</p>
      <span className="word wisteria">beautiful.</span>
      <span className="word midnight">powerful.</span>
      <span className="word belize">divine.</span>
      <span className="word pomegranate">fancy.</span>
      <span className="word green">elegant.</span>
      <span className="word belize">rich.</span>
      <span className="word wisteria">smart.</span>
      <span className="word midnight">free.</span>
      <span className="word pomegranate">love.</span>
      <span className="word green">strength.</span>
      <span className="word belize">courage.</span>
      <span className="word wisteria">style.</span>
      <span className="word pomegranate">cool</span>
      <span className="word green">hip.</span>
      <span className="word midnight">wealth.</span>
    </div>
  );
};
