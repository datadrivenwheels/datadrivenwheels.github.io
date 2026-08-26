// Slides the projects grid between pages.
//
// GitHub Pages cannot paginate a data file - jekyll-paginate is whitelisted but
// only paginates blog posts - so index.html renders every project, grouped into
// pages, and this slides the track sideways. Every project and every detail
// modal stays in the HTML regardless of which page is showing.
//
// Without JavaScript the pages stack and all projects are visible: the sliding
// layout only applies once .is-paged is set below.

(function () {
    "use strict";

    function init(track) {
        var pages = track.querySelectorAll(".projects-page");
        if (pages.length < 2) {
            return;
        }

        var pager = document.querySelector(track.getAttribute("data-pager"));
        if (!pager) {
            return;
        }

        var viewport = track.parentNode;
        var current = 0;
        var i;

        viewport.classList.add("is-paged");
        track.classList.add("is-paged");

        function show(page) {
            current = page;
            track.style.transform = "translateX(-" + (page * 100) + "%)";

            for (i = 0; i < pages.length; i++) {
                var isCurrent = i === page;
                // Keep the off-screen pages out of the tab order and hidden
                // from screen readers; they are still in the document.
                pages[i].setAttribute("aria-hidden", isCurrent ? "false" : "true");
                var links = pages[i].querySelectorAll("a, button");
                for (var j = 0; j < links.length; j++) {
                    if (isCurrent) {
                        links[j].removeAttribute("tabindex");
                    } else {
                        links[j].setAttribute("tabindex", "-1");
                    }
                }
            }

            var buttons = pager.querySelectorAll("[data-goto]");
            for (i = 0; i < buttons.length; i++) {
                var selected = parseInt(buttons[i].getAttribute("data-goto"), 10) === page;
                buttons[i].classList.toggle("active", selected);
                if (selected) {
                    buttons[i].setAttribute("aria-current", "true");
                } else {
                    buttons[i].removeAttribute("aria-current");
                }
            }

            prev.disabled = page === 0;
            next.disabled = page === pages.length - 1;
        }

        function button(label, aria) {
            var b = document.createElement("button");
            b.type = "button";
            b.className = "btn btn-outline project-page-btn";
            b.innerHTML = label;
            if (aria) {
                b.setAttribute("aria-label", aria);
            }
            return b;
        }

        var prev = button('<i class="fa fa-chevron-left"></i>', "Previous page");
        var next = button('<i class="fa fa-chevron-right"></i>', "Next page");

        prev.addEventListener("click", function () {
            if (current > 0) {
                show(current - 1);
            }
        });
        next.addEventListener("click", function () {
            if (current < pages.length - 1) {
                show(current + 1);
            }
        });

        pager.appendChild(prev);
        for (i = 0; i < pages.length; i++) {
            var b = button(String(i + 1), "Page " + (i + 1));
            b.setAttribute("data-goto", String(i));
            b.addEventListener("click", function (e) {
                show(parseInt(e.currentTarget.getAttribute("data-goto"), 10));
            });
            pager.appendChild(b);
        }
        pager.appendChild(next);

        pager.hidden = false;
        show(0);
    }

    var tracks = document.querySelectorAll(".projects-track");
    for (var t = 0; t < tracks.length; t++) {
        init(tracks[t]);
    }
})();
