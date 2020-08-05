import { fromEvent } from "rxjs";
import { scan, throttleTime, map } from "rxjs/operators";

const button = document.querySelector("button");

// fromEvent(button, "click")
//   .pipe(scan((count) => count + 1, 0))
//   .subscribe((count) => (document.querySelector("h4").innerText = `${count}`));

/* -------------------------------------------------------------------------- */

// vaghti rooye button click konim ta yek sanie har cheghard ham ke click konim log nemigire

// without RxJS

// let count = 0;
// let rate = 1000;
// let lastClick = Date.now() - rate;
// button.addEventListener("click", () => {
//   if (Date.now() - lastClick >= rate) {
//     console.log(`Clicked ${++count} times`);
//     lastClick = Date.now();
//   }
// });

// with Rxjs

// fromEvent(button, "click")
//   .pipe(
//     throttleTime(1000),
//     scan((count) => count + 1, 0)
//   )
//   .subscribe((count) => (document.querySelector("h4").innerText = `${count}`));

/* -------------------------------------------------------------------------- */

// vaghti ctrl + click konim count + 1 beshe

// without RxJS

// let count = 0;
// const rate = 1000;
// let lastClick = Date.now() - rate;
// document.addEventListener("click", (event) => {
//   if (Date.now() - lastClick >= rate) {
//     const ctrlKey = event.ctrlKey;
//     if (ctrlKey) {
//       count += 1;
//       document.querySelector("h4").innerText = `${count}`;
//     } else {
//       document.querySelector("h4").innerText = `${count}`;
//     }
//     lastClick = Date.now();
//   }
// });

// with Rxjs

fromEvent(button, "click")
  .pipe(
    throttleTime(1000),
    map((event) => event.ctrlKey),
    scan((count, ctrlKey) => {
      if (ctrlKey) {
        return count + 1;
      } else {
        return count;
      }
    }, 0)
  )
  .subscribe((count) => (document.querySelector("h4").innerText = `${count}`));

/* -------------------------------------------------------------------------- */
