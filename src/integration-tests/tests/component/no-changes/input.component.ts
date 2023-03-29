import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "a",
  templateUrl: "./a.component.html",
  styleUrls: ["./a.component.scss"],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AComponent {}
