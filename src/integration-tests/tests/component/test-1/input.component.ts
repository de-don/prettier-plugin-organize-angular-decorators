import { Component } from "@angular/core";

@Component({
  // comment 1
  selector: "app",
  // comment 2
  styleUrls: ["./app.component.scss"],
  // comment 3
  templateUrl: "./app.component.html",
  // comment 4
  standalone: true,
})
export class App1 {}

@Component({
  standalone: true,
  selector: "app",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
})
export class App2 {}

@Component({
  styleUrls: ["./app.component.scss"],
  selector: "app",
  ...{},
  standalone: true,
  templateUrl: "./app.component.html",
  styles: [],
})
export class App3 {}

@Component({
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  selector: "app",
  standalone: true,
  ...{},
  styles: [],
})
export class App4 {}

@Component({
  // @ts-ignore
  someOtherProperty1: 1,
  standalone: true,
  someOtherProperty2: 2,
  templateUrl: "./app.component.html",
  selector: "app",
})
export class App5 {}

@Component({
  standalone: true,
  // comment 1
  templateUrl: "./app.component.html",
  selector: "app", // comment for selector
})
export class App6 {}

