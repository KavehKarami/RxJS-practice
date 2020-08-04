import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

const button = document.querySelector("button");

fromEvent(button, "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => (document.querySelector("h4").innerText = `${count}`));
