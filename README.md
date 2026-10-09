# ashwiinnedun.com

Personal site of Ashwiin Nedun, served by GitHub Pages at <https://www.ashwiinnedun.com>.

Plain HTML, CSS and a few lines of JavaScript, with no build step. Each page is an `index.html` in its own folder:

- `/` home
- `/explore-the-word/` case study for the Explore the Word app
- `/project-page/` all projects
- `/experiences/` work history, education and skills
- `/contact/` contact details and form

Styling is in `assets/style.css`. `assets/site.js` handles the theme toggle, scroll reveals and the demo video. On phones the page links sit in a floating bar at the bottom of the screen (styled in the `max-width: 640px` block). App screenshots and the demo clip are in `assets/etw/`.

## Preview locally

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Publish

Push to `main`. GitHub Pages redeploys in about a minute.
