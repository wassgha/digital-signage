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

#### How to Run:

1. Set up a MongoDB installation locally and create a `digitaldisplay` database

2. Rename the `.env.example` file to `.env`

3. Change references to the database to link to your local database (usually `mongodb://localhost:27017/digitaldisplay`)

4. Install dependencies and run the program

```bash
npm install
npm run dev
```
