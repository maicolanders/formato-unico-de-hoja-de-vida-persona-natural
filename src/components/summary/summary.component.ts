import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormDataService } from "../../form-data.service";

@Component({
  selector: "app-summary",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 4. TIEMPO EXPERIENCIA -->
    <div class="relative mt-4 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">4</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >TIEMPO TOTAL DE EXPERIENCIA</span
      >
    </div>

    <div class="border-2 border-black mb-4 p-2 text-xs">
      <div class="mb-2">
        INDIQUE EL TIEMPO TOTAL DE SU EXPERIENCIA LABORAL EN NÚMERO DE AÑOS Y
        MESES.
      </div>
      <div class="w-3/4 mx-auto">
        <table
          class="w-full border-collapse border border-black text-center"
          id="tabla-experiencia"
        >
          <thead class="bg-blue-100">
            <tr>
              <th rowspan="2" class="border border-black text-sm">OCUPACIÓN</th>
              <th colspan="2" class="border border-black text-sm">
                TIEMPO DE EXPERIENCIA
              </th>
              <th rowspan="2" class="border border-black no-print text-sm">
                ACCION
              </th>
            </tr>
            <tr>
              <th class="border border-black w-24 text-sm">AÑOS</th>
              <th class="border border-black w-24 text-sm">MESES</th>
            </tr>
          </thead>
          <tbody>
            @for (
              row of service.data().tiemposExperiencia;
              track $index;
              let i = $index
            ) {
              <tr>
                <td class="border border-black text-left pl-2 p-0">
                  <input
                    [(ngModel)]="row.ocupacion"
                    class="input-field w-full h-full italic"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.anos"
                    class="input-field text-center w-full h-full"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.meses"
                    class="input-field text-center w-full h-full"
                  />
                </td>
                <td class="border border-black p-0 no-print">
                  <button
                    (click)="service.removeExperienceTimeRow(i)"
                    class="w-full h-full bg-red-100 hover:bg-red-200 text-red-600 font-bold"
                    title="Eliminar fila"
                  >
                    X
                  </button>
                </td>
              </tr>
            }
            <!-- Total Row -->
            <tr>
              <td
                class="border border-black text-left pl-2 p-1 font-bold italic text-sm text-black"
              >
                TOTAL TIEMPO EXPERIENCIA
              </td>
              <td class="border border-black p-0 text-sm text-black">
                <input
                  [(ngModel)]="service.data().tiempoTotalAnos"
                  class="input-field text-center w-full h-full font-bold"
                />
              </td>
              <td class="border border-black p-0 text-sm text-black">
                <input
                  [(ngModel)]="service.data().tiempoTotalMeses"
                  class="input-field text-center w-full h-full font-bold"
                />
              </td>
              <td class="border border-black p-0 no-print bg-gray-100"></td>
            </tr>
          </tbody>
        </table>
        <div class="no-print mt-2 mb-2 flex justify-end">
          <button
            (click)="service.addExperienceTimeRow()"
            class="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 shadow transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Fila
          </button>
        </div>
      </div>
    </div>

    <!-- 5. FIRMA -->
    <div class="relative mt-6 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">5</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >FIRMA DEL SERVIDOR PÚBLICO O CONTRATISTA</span
      >
    </div>

    <div class="border-2 border-black mb-4 p-2 text-xxs leading-relaxed">
      <div class="mb-4">
        MANIFIESTO BAJO LA GRAVEDAD DEL JURAMENTO QUE SI
        <div class="inline-flex items-center gap-1 mx-2 align-middle">
          <div
            class="w-6 h-6 border border-black rounded-full flex items-center justify-center cursor-pointer"
            [class.print-checkbox-checked]="
              service.data().inhabilidades === 'SI'
            "
            (click)="service.data().inhabilidades = 'SI'"
          >
            <div
              *ngIf="service.data().inhabilidades === 'SI'"
              class="w-4 h-4 bg-black rounded-full"
            ></div>
          </div>
        </div>
        NO
        <div class="inline-flex items-center gap-1 mx-2 align-middle">
          <div
            class="w-6 h-6 border border-black rounded-full flex items-center justify-center cursor-pointer"
            [class.print-checkbox-checked]="
              service.data().inhabilidades === 'NO'
            "
            (click)="service.data().inhabilidades = 'NO'"
          >
            <div
              *ngIf="service.data().inhabilidades === 'NO'"
              class="w-4 h-4 bg-black rounded-full"
            ></div>
          </div>
        </div>
        ME ENCUENTRO DENTRO DE LAS CAUSALES DE INHABILIDAD E INCOMPATIBILIDAD
        DEL ORDEN CONSTITUCIONAL O LEGAL, PARA EJERCER CARGOS EMPLEOS PÚBLICOS O
        PARA CELEBRAR CONTRATOS DE PRESTACIÓN DE SERVICIOS CON LA ADMINISTRACIÓN
        PÚBLICA.
      </div>
      <div class="mb-8">
        PARA TODOS LOS EFECTOS LEGALES, CERTIFICO QUE LOS DATOS POR MI ANOTADOS
        EN EL PRESENTE FORMATO ÚNICO DE HOJA DE VIDA, SON VERACES, (ARTÍCULO 5o.
        DE LA LEY 190/95).
      </div>

      <div class="flex items-end gap-2 mb-12">
        <span class="italic font-bold text-sm"
          >Ciudad y fecha de diligenciamiento</span
        >
        <input
          [(ngModel)]="service.data().ciudadFirma"
          class="input-field border-b border-black w-1/3 text-sm uppercase-input"
          placeholder="CIUDAD"
        />
        <input
          [(ngModel)]="service.data().fechaFirma"
          class="input-field border-b border-black w-1/3 text-sm"
          placeholder="DD/MM/AAAA"
        />
      </div>

      <div
        class="border-t border-black w-1/2 mx-auto pt-1 text-center font-bold italic"
      >
        FIRMA DEL SERVIDOR PÚBLICO O CONTRATISTA
      </div>
    </div>

    <!-- 6. OBSERVACIONES -->
    <div class="relative mt-6 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">6</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >OBSERVACIONES DEL JEFE DE RECURSOS HUMANOS Y/O CONTRATOS</span
      >
    </div>

    <div class="border-2 border-black mb-4 p-2">
      <textarea
        [(ngModel)]="service.data().observaciones"
        class="w-full h-32 border border-gray-300 resize-none p-2 text-xs uppercase-input bg-transparent"
        placeholder="Espacio para observaciones..."
      ></textarea>

      <div class="mt-4 text-xxs font-bold">
        CERTIFICO QUE LA INFORMACIÓN AQUÍ SUMINISTRADA HA SIDO CONSTATADA FRENTE
        A LOS DOCUMENTOS QUE HAN SIDO PRESENTADOS COMO SOPORTE.
      </div>

      <div class="grid grid-cols-2 gap-8 mt-16 text-xxs">
        <div class="border-t border-black pt-1 text-center">Ciudad y fecha</div>
        <div class="border-t border-black pt-1 text-center">
          NOMBRE Y FIRMA DEL JEFE DE PERSONAL O DE CONTRATOS
        </div>
      </div>
    </div>
  `,
})
export class SummaryComponent {
  service = inject(FormDataService);
}
