import { Component } from "@angular/core";

@Component({
  // comment 4
  standalone: true,
  // comment 1
  selector: "app",
  // comment 3
  templateUrl: "./app.component.html",
  // comment 2
  styleUrls: ["./app.component.scss"],
})
export class App1 {}

@Component({
  standalone: true,
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class App2 {}

@Component({
  standalone: true,
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  ...{},
  styles: [],
})
export class App3 {}

@Component({
  standalone: true,
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  ...{},
  styles: [],
})
export class App4 {}

@Component({
  standalone: true,
  selector: "app",
  templateUrl: "./app.component.html",
  // @ts-ignore
  someOtherProperty1: 1,
  someOtherProperty2: 2,
})
export class App5 {}

@Component({
  standalone: true,
  selector: "app", // comment for selector
  // comment 1
  templateUrl: "./app.component.html",
})
export class App6 {}
