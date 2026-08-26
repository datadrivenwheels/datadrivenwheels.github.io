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

### Adding a person

Append to `_data/people.yml` and drop a square photo in `img/people/`. Omit
`link` and the photo renders without a link.

## Layout

```
_config.yml        Site metadata, nav, social links, build settings
_data/             Content: projects.yml, people.yml
_layouts/default   Page shell — head, nav, header, content, footer, modals
_includes/         Reusable partials (one concern each)
_sass/             Theme styles, split by component
css/main.scss      Sass entry point; compiles to /css/main.css
index.html         Two data-driven sections; loops over _data
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
