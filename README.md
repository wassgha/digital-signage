## DigitalSignage
*📺 Simple self-hosted digital signage software for turning screens into beautiful content displays*

### Screenshots

Digital Display Preview

![Screenshot of the display](assets/preview.png?raw=true)

Administrator Panel: Changing the widget layout

![Screenshot of the administrator panel](assets/layout.png?raw=true)

Administrator Panel: Slides inside a slideshow

![Screenshot of the administrator panel](assets/slides.png?raw=true)


### Demo

Use the demo website at [http://digitaldisplay.herokuapp.com](http://digitaldisplay.herokuapp.com) (username: **demo**, password: **demo**)

### How to Run:

1. Set up a MongoDB installation locally and create a `digitaldisplay` database

2. Rename the `.env.example` file to `.env`

3. Change references to the database to link to your local database (usually `mongodb://localhost:27017/digitaldisplay`)

4. Install dependencies and run the program

```bash
npm install
npm run dev
```

### Features

- ✅ Automatic refresh on content change (you should never need to touch a display once set up!)
- ✅ Totally modular, with a comprehensive widget management system (adding a widget is very simple!)
- ✅ Multiple built-in widgets to get you started:
  - Slideshow widget
  - Weather widget
  - "Congratulations" widget
  - Youtube embed widget
  - Web (iframe) widget
  - Standalone image widget
  - Announcements widget
  - List widget (can be used a directory, time sheet, etc.)
- ✅ Flexible, responsive widget grid that allows you to drag, drop and resize widgets
- ✅ Versatile slideshow system that allows multiple slideshows, multiple slide types (images, videos, youtube, web, etc.) inside the same display with variable durations, titles and descriptions for each slide!
- ✖ Support for multiple displays (in progress)
