import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormDataService } from "./form-data.service";
import { PersonalInfoComponent } from "./components/personal-info/personal-info.component";
import { EducationComponent } from "./components/education/education.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { SummaryComponent } from "./components/summary/summary.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PersonalInfoComponent,
    EducationComponent,
    ExperienceComponent,
    SummaryComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  service = inject(FormDataService);

  printForm() {
    // Use timeout and focus to ensure print dialog works reliably across browsers
    setTimeout(() => {
      try {
        window.focus();
        window.print();
      } catch (e) {
        console.error("Print error:", e);
        alert(
          "No se pudo abrir la ventana de impresión automáticamente. Por favor presione Ctrl+P (o Cmd+P).",
        );
      }
    }, 50);
  }
}
