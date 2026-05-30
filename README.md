# p5-global Addon

In your HTML, simply load p5.js v2, this p5-global addon, and set your sketch.js script's type to "module".

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.js"></script>
<script src="https://quinton-ashley.github.io/p5-global/p5-global.js"></script>
<script type="module" src="sketch.js"></script>
```

In sketch.js, run `await Canvas()` (rhymes with `createCanvas`). After that, p5 functions and variables will be available on the file level!

```js
await Canvas(500, 500);

colorMode(RGB, 1);
background(0.8);

p5.draw = function () {
  circle(mouseX, mouseY, random(5, 50);
}
```

Congrats! You can now enjoy modern JavaScript features, including top-level `await` and `import` statements.
