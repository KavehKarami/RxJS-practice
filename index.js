/* 
  NOTE ma be 2 model mitoonim Observable besazim 
  1: new konim Observable ro
  2: yekseri method hastan mesle (of, from, Subject, ...) ke built-in new Observable misazan
*/

import { fromEvent, Observable, Subject, from, BehaviorSubject } from "rxjs";
import { scan, throttleTime, map, multicast } from "rxjs/operators";

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

// fromEvent(button, "click")
//   .pipe(
//     throttleTime(1000),
//     map((event) => event.ctrlKey),
//     scan((count, ctrlKey) => {
//       if (ctrlKey) {
//         return count + 1;
//       } else {
//         return count;
//       }
//     }, 0)
//   )
//   .subscribe((count) => (document.querySelector("h4").innerText = `${count}`));

/* -------------------------------------------------------------------------- */

// const observable = new Observable((subscriber) => {
//   try {
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.next(3);

//     setTimeout(() => {
//       subscriber.next(4);
//       // subscriber.complete();
//     }, 1000);

//     subscriber.next(5);

//     const intervalId = setInterval(() => {
//       subscriber.next("hi");
//     }, 1000);

//     // we can also unsubscribe() that without this code below but it's a custom
//     return function unsubscribe() {
//       console.log("unsubcribe our observables");
//       clearInterval(intervalId);
//     };
//   } catch (err) {
//     subscriber.error(err);
//   }
// });

// console.log("just before subscribe");

// if we want to use unsubsribe(), we gotta store our observable.subscribe(...) in a variable

// const useObservable = observable.subscribe({
//   next(x) {
//     console.log("got value " + x);
//   },
//   error(err) {
//     console.log(err);
//   },
//   complete() {
//     console.log("done");
//   },
// });

// console.log("just after subscribe");

/* -------------------------------------------------------------------------- */

// use unsubscribe()

// fromEvent(button, "click").subscribe(() => {
//   useObservable.unsubscribe();
// });

// const foo = new Observable((subscriber) => {
//   console.log("Hello");
//   subscriber.next(42);
// });

// foo.subscribe((x) => console.log(x));

/* -------------------------------------------------------------------------- */

// const subject = new Subject();
// const subject = new BehaviorSubject("helloooooo");
// // hi dosn't appear and execute
// subject.next("hi");
// subject.subscribe((v) => console.log(v));
// subject.next("bye");

/* -------------------------------------------------------------------------- */

const source = from([1, 2, 3, 4]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});
multicasted.connect();
