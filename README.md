# Built on top of Lightning Starter Template for SolidJS

https://github.com/lightning-js/solid-starter-template

## Fast scrolling column component for large data-set

NetworkColumn uses no animation or real "scrolling". Instead uses a fixed number of rows. As user presses up/down arrow key, the next/previous 5 of 1000 items are used to update the elements' text properties. Avoids lag caused by rendering and scrolling too many elements.

https://github.com/braddiver/lightn3solidstart/blob/main/src/components/NetworkColumn.tsx

![NetworkColumn](screenshot.jpg)

## Used as a demo to compare development in Lightning 3 frameworks

### Solid-JS

https://lightning-js.github.io/solid/#/

### Blits

https://lightningjs.io/v3-docs/blits/components/component_state.html

## Blits version of the same NetworkColumn component

https://github.com/braddiver/my-blits-app/blob/main/src/components/NetworkColumn.js
