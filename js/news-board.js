// News board: rolls on its own, pauses while the reader is interacting.
//
// The panel is a plain scrolling element, so it still works without this file
// (and without JavaScript) - you just have to scroll it yourself.

(function () {
    "use strict";

    var SPEED = 12; // pixels per second

    function init(board) {
        var list = board.querySelector(".news-list");
        if (!list) {
            return;
        }

        // Nothing to roll if everything already fits.
        if (board.scrollHeight <= board.clientHeight + 1) {
            return;
        }

        // Duplicate the list so that scrolling past the end of the real items
        // lands back at the start with no visible jump. The copy is hidden
        // from assistive tech so the news is not announced twice.
        var cycle = list.scrollHeight;
        var clone = list.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        board.appendChild(clone);

        // With a second list underneath, the last item of each needs its
        // divider back or the seam shows up once per cycle.
        board.classList.add("is-rolling");

        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        var frame = null;
        var last = null;

        // The scroll position is tracked here as a float rather than read back
        // from scrollTop each frame. Browsers snap scrollTop to the device
        // pixel grid (0.5px at devicePixelRatio 2), so a slow roll's per-frame
        // step is smaller than one step of that grid: reading it back would
        // round the movement away every frame and the board would never move.
        var pos = board.scrollTop;

        function step(now) {
            if (last === null) {
                last = now;
            }
            pos += SPEED * ((now - last) / 1000);
            last = now;

            if (pos >= cycle) {
                pos -= cycle;
            }
            board.scrollTop = pos;

            frame = window.requestAnimationFrame(step);
        }

        function start() {
            if (frame === null && !reduce.matches) {
                last = null;
                // Pick up wherever the reader left it after scrolling by hand.
                pos = board.scrollTop;
                frame = window.requestAnimationFrame(step);
            }
        }

        function stop() {
            if (frame !== null) {
                window.cancelAnimationFrame(frame);
                frame = null;
            }
        }

        // Hovering, or tabbing to a link inside, hands control to the reader:
        // the roll stops and the panel can be scrolled by hand.
        board.addEventListener("mouseenter", stop);
        board.addEventListener("mouseleave", start);
        board.addEventListener("focusin", stop);
        board.addEventListener("focusout", start);

        // Touch devices get no hover, so a touch pauses and scrolling resumes
        // the roll once the finger is lifted.
        board.addEventListener("touchstart", stop, { passive: true });
        board.addEventListener("touchend", start, { passive: true });

        // Honour the setting changing mid-visit, in both directions.
        if (reduce.addEventListener) {
            reduce.addEventListener("change", function () {
                if (reduce.matches) {
                    stop();
                } else {
                    start();
                }
            });
        }

        start();
    }

    var boards = document.querySelectorAll(".news-board");
    for (var i = 0; i < boards.length; i++) {
        init(boards[i]);
    }
})();
