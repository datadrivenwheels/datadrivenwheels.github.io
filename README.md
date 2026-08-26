# Intelligent Transportation Lab

Website for the Intelligent Transportation Lab at the Virginia Tech
Transportation Institute — <https://datadrivenwheels.github.io>.

A [Jekyll](https://jekyllrb.com/) site built and deployed automatically by
GitHub Pages on every push to `main`. There is no build step to run yourself.

## Editing content

Most updates mean editing a YAML file — no HTML required.

| To change | Edit |
| --- | --- |
| Projects (grid tiles and their modals) | `_data/projects.yml` |
| Lab members | `_data/people.yml` |
| Selected publications | `_data/publications.yml` |
| Site title, contacts, nav, social links | `_config.yml` |

### Adding a project

Append an entry to `_data/projects.yml`. The grid tile and its modal are both
generated from it, so nothing else needs to change:

```yaml
- title: "My New Project"
  thumb: "img/projects/project7.png"   # grid tile
  image: "img/projects/figure7.png"    # modal image; defaults to thumb
  description: >-
    What the project does. Inline <a href="https://example.com">HTML</a> works.
  details:
    - label: "Related Paper"
      value: "link"
      url: "https://doi.org/..."
    - label: "Date"
      value: "August 2026"
```

Five entries are still template boilerplate and are marked `placeholder: true`
with a TODO note — replace them as each project is written up.

### Adding a publication

`_data/publications.yml` uses **BibTeX field names and conventions**, so you can
copy values straight out of a `.bib` entry. APA formatting is generated at build
time — never write APA by hand.

```yaml
- type: article                       # or inproceedings
  author: "Guo, Feng and Shi, Liang"  # BibTeX order, " and " separated
  title: "Real-time driving risk assessment"
  journal: "Journal Name"             # booktitle for inproceedings
  volume: "42"
  number: "3"
  pages: "101--118"                   # BibTeX "--" becomes an en dash
  year: 2026
  doi: "10.0000/example"              # preferred; `url` used only if absent
```

Generated from the above:

> Guo, F., & Shi, L. (2026). Real-time driving risk assessment. *Journal Name*,
> *42*(3), 101–118. https://doi.org/10.0000/example

Handled for you: initials from full given names, the APA comma-before-ampersand,
italics on venue and volume (never the issue number), en-dash page ranges, and
stripping `{}` case-protection braces from titles.

Not handled: LaTeX escapes such as `\'e` — write `é` directly. Very long author
lists are printed in full rather than truncated at 20 with an ellipsis.

### Adding a person

Append to `_data/people.yml` and drop a square photo in `img/people/`. Omit
`link` and the photo renders without a link.

## Layout

```
_config.yml        Site metadata, nav, social links, build settings
_data/             Content: projects.yml, people.yml, publications.yml
_layouts/default   Page shell — head, nav, header, content, footer, modals
_includes/         Reusable partials (one concern each)
_sass/             Theme styles, split by component
css/main.scss      Sass entry point; compiles to /css/main.css
index.html         Three data-driven sections; loops over _data
img/  js/  vendor/ Images, theme JavaScript, third-party libraries
```

## Local preview

Optional — pushing to `main` is enough to deploy. Needs Ruby 3.x or newer
(`brew install ruby`; macOS system Ruby is too old).

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

### Why not the `github-pages` gem

It pins Liquid 4.0.3, which calls `tainted?` — removed from Ruby in 3.2 — so it
cannot run on any modern Ruby. GitHub Pages builds with Jekyll 3.9 on its own
servers and ignores this `Gemfile`; Jekyll 4 renders this site identically.

## Credits

Based on the [Freelancer](https://startbootstrap.com/theme/freelancer) theme by
Start Bootstrap, MIT licensed. See `LICENSE`.
