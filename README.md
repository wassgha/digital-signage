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
  - ✅ Slideshow widget

  ![Animated screencast of the slideshow widget](assets/slideshow.gif?raw=true)<!-- .element width="150" -->

  - ✅ Weather widget

    ![Screenshot of the weather widget](assets/weather.png?raw=true)<!-- .element width="150" -->

  - ✅ "Congratulations" widget

    ![Animated screencast of the congratulations widget](assets/congratulations.gif?raw=true)<!-- .element width="150" -->

  - ✅ Youtube embed widget
  - ✅ Web (iframe) widget

    ![Screenshot of the web widget](assets/web.png?raw=true)<!-- .element width="150" -->

  - ✅ Standalone image widget

    ![Screenshot of the image widget](assets/standalone-image.png?raw=true)<!-- .element width="150" -->

  - ✅ Announcements widget

    ![Screenshot of the announcements widget](assets/announcements.png?raw=true)<!-- .element width="150" -->

  - ✅ List widget (can be used a directory, time sheet, etc.)

    ![Animated screencast of the list widget](assets/list.gif?raw=true)<!-- .element width="150" -->

- ✅ Flexible, responsive widget grid that allows you to drag, drop and resize widgets
- ✅ Versatile slideshow system that allows multiple slideshows, multiple slide types (images, videos, youtube, web, etc.) inside the same display with variable durations, titles and descriptions for each slide!
- ✖ Support for multiple displays (in progress)


### Adding a new widget

Given the highly modular structure of this program, implementing a new widget is a simple task! Simply follow these easy steps to get started:
1. Create a new folder inside the `​widgets/​` folder, name it according to your widget's name

```
 /
  actions/
  api/
  assets/
  components/
  helpers/
  pages/
  styles/
  widgets/
    .
    .
    .
    (new) MyWidget/
    widget_list.js
    base_widget.js
    index.js

```
2. Create an index file inside the newly created folder called `index.js` ​(extending the​ `base_widget` ​class) as follows:

```js
import BaseWidget from '../base_widget'

export default class MyWidget extends BaseWidget {
  constructor() {
    super({
      name: 'MyWidget',
      version: '0.1',
      icon: ['my-icon'], // Shown in the admin panel
      defaultData: {
         // Your implementation here
      }
    })
  }
}
```

The widget's icon should come from `FontAwesome`.

3. Implement two `React` components: `Options` (renders the dialog that will allow the administrator to change the widget’s configuration) and `Widget` (renders the user-facing side widget that will be displayed on the TV), return them from getter functions that you add to your `index.js` file:

```js
export default class MyWidget extends BaseWidget {
  // ...

  get Widget() {
    return (<div>Your implementation here</div>)
  }

  get Options() {
    return (<div>Your implementation here</div>)
  }

  // ...
}
```

4. Finally, when done implementing the widget, register it by adding its folder’s name to the `widgets/widget_list.js​` file

```js
module.exports = ['slideshow', 'weather', 'congrats', 'youtube', 'web',
    'image', 'list', 'announcement', /* new */ 'MyWidget']
```

5. Restart the server to see the new widget appear on the administrator panel
