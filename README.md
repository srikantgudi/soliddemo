# soliddemo

## This is a sample demo app in `SolidStart`, a framework for `SolidJs`.

### - After trying various technologies I thought to try `SolidJs`, which is at par with `Svelte` in speed and ease of development
### - It is similar to `React` but has convenient features like `signals` to set the state.
### - Components can be developed and used inline.
### - Routing, which is file based; that is, based on files created in `pages`folder.

## Features

- ### Home page
    - Counter
    - Temperature Conversion
    - Radial Calendar component

- ### Dynamic data fetch
    
    - to fetch data from given options. Data is fetched from [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

- ### Zone Times
    
    - this is to enable users to view time in another zone, selected from a list box
    - option to set a custom time and view corresponding time in the selected zone
    - Users can toggle the buttons <button style="background-color:teal;color:white;padding:0.5rem;border-radius:0.5rem">Set Input</button> and <button style="background-color:teal;color:white;padding:0.5rem;border-radius:0.5rem">Set local</button>
    
- ### Calendar
    
    - This is to view normal calendar by month
    - There are two navigation buttons: <button>&laquo; -10</button> to go back 10 years and <button>+10 &raquo;</button> to go forward by 10 years
    - One Unique feature is that the days are static and the week days are dynamic.

- ### Yearly Calendar (**my idea**)
    
    - This can be called as `mother` of all calendars that shows all the months of the selected / current year (by default)
    - A drop-down box is provided with 3 options to display number of year buttons like, **20** default, 40 & 60
    - Two buttons, to go forward or backward by the number of years selected

- ### Radial Calendar
    - This is my invention; one of the `unique` way to view a calendar like a clock. The current `year`, `month`, `day` and `week-day name` are shown in bigger fonts.

## Live Demo

- I have deployed the app on Vercel for live demo
- Check the url [https://soliddemo.vercel.app/](https://soliddemo.vercel.app/) for live view!