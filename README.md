# p5-global Addon

Run p5.js functions at the file level in a JavaScript module, no async setup function required!

Simply load p5.js v2 and this p5-global addon in your html, then set your sketch.js script's type to "module".

```html

```

Then in your sketch.js run `await Canvas()` (rhymes with `createCanvas`).

Congrats! You can now use p5 functions and variables anywhere!

```js
await Canvas(500, 500);

colorMode(RGB, 1);
background(0.8);

p5.draw = function () {
  circle(mouseX, mouseY, random(5, 50);
}
```