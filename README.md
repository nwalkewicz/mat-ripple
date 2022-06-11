# mat-ripple
[Material Design ripple effect](https://v10.material.angular.io/components/ripple/examples) made in vanilla JavaScript.

![Demo](https://raw.githubusercontent.com/nwalkewicz/mat-ripple/master/demo.gif)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)

## Installation
1. Download `Ripple.js` and `mat-ripple.js`.
2. Place both files in the same directory or update the import inside of `mat-ripple.js` if using a separate directory.
3. Insert a `<script>` tag inside your `<head>` element, using ES6 modules:

`<script type="module" src="/path/to/mat-ripple.js"></script>`

## Usage
This effect was specifically made for `<button>` and `<a>` elements, but I'm sure you can use them on others as well.

To apply the ripple effect to an element, simply add the `ripple` attribute:
<pre>
&lt;button <b>ripple</b>&gt;Click Me&lt;/button&gt;
</pre>

To set the ripple's color, define the following rule in your CSS:
<pre>
.myBtn > <b>.rippleElem</b> {
  <b>background-color</b>: hsl(0 0% 0% / 0.1);
}
</pre>
