import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormDataService } from "../../form-data.service";

@Component({
  selector: "app-education",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 2. FORMACION ACADEMICA -->
    <div class="relative mt-4 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">2</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >FORMACIÓN ACADÉMICA</span
      >
    </div>

    <div class="border-2 border-black mb-4 text-xxs">
      <!-- Basic Ed -->
      <div class="border-b border-black p-1">
        <div class="font-bold italic">EDUCACIÓN BÁSICA Y MEDIA</div>
        <div class="mb-1 text-[0.6rem]">
          MARQUE CON UNA X EL ÚLTIMO GRADO APROBADO ( LOS GRADOS DE 1o. A 6o. DE
          BACHILLERATO EQUIVALEN A LOS GRADOS 6o. A 11o. DE EDUCACIÓN BÁSICA
          SECUNDARIA Y MEDIA )
        </div>

        <div class="grid grid-cols-12 border border-black text-center">
          <div class="col-span-8 grid grid-cols-11 h-full">
            <div
              class="col-span-5 border-r border-black border-b bg-blue-100 flex items-center justify-center"
            >
              EDUCACIÓN BÁSICA
            </div>
            <div
              class="col-span-4 border-r border-black border-b bg-blue-100 flex items-center justify-center"
            >
              SECUNDARIA
            </div>
            <div
              class="col-span-2 border-r border-black border-b bg-blue-100 flex items-center justify-center"
            >
              MEDIA
            </div>

            <!-- Grades -->
            <div
              *ngFor="let g of [1, 2, 3, 4, 5]"
              class="border-r border-black cursor-pointer hover:bg-gray-200 h-6 flex flex-col justify-between"
              (click)="service.data().educacionBasicaGrado = g.toString()"
            >
              <span class="text-[0.6rem]">{{ g }}o.</span>
              <div
                class="h-3 flex items-center justify-center font-bold text-sm"
                *ngIf="service.data().educacionBasicaGrado == g.toString()"
              >
                X
              </div>
            </div>
            <div
              *ngFor="let g of [6, 7, 8, 9]"
              class="border-r border-black cursor-pointer hover:bg-gray-200 h-6 flex flex-col justify-between"
              (click)="service.data().educacionBasicaGrado = g.toString()"
            >
              <span class="text-[0.6rem]">{{ g }}o.</span>
              <div
                class="h-3 flex items-center justify-center font-bold text-sm"
                *ngIf="service.data().educacionBasicaGrado == g.toString()"
              >
                X
              </div>
            </div>
            <div
              *ngFor="let g of [10, 11]"
              class="border-r border-black cursor-pointer hover:bg-gray-200 h-6 flex flex-col justify-between"
              (click)="service.data().educacionBasicaGrado = g.toString()"
            >
              <span class="text-[0.6rem]">{{ g }}</span>
              <div
                class="h-3 flex items-center justify-center font-bold text-sm"
                *ngIf="service.data().educacionBasicaGrado == g.toString()"
              >
                X
              </div>
            </div>
          </div>

          <!-- Title Date -->
          <div class="col-span-4 flex flex-col">
            <div class="bg-blue-100 border-b border-black text-left pl-1">
              TÍTULO OBTENIDO:
              <input
                [(ngModel)]="service.data().tituloObtenido"
                class="input-field inline w-full border-b border-black uppercase-input bg-transparent"
              />
            </div>
            <div class="flex items-center justify-center gap-2 h-full">
              <span>FECHA DE GRADO</span>
              <span>MES</span>
              <input
                [(ngModel)]="service.data().fechaGradoMes"
                class="input-field w-6 border border-black text-center"
                maxlength="2"
              />
              <span>AÑO</span>
              <input
                [(ngModel)]="service.data().fechaGradoAno"
                class="input-field w-10 border border-black text-center"
                maxlength="4"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Higher Ed -->
      <div class="border-b border-black p-1">
        <div class="font-bold italic">
          EDUCACION SUPERIOR (PREGRADO Y POSTGRADO)
        </div>
        <div class="text-[0.5rem] leading-tight mb-1">
          DILIGENCIE ESTE PUNTO EN ESTRICTO ORDEN CRONOLÓGICO, EN MODALIDAD
          ACADÉMICA ESCRIBA:<br />
          <strong>TC</strong> (TÉCNICA), <strong>TL</strong> (TECNOLÓGICA),
          <strong>TE</strong> (TECNOLÓGICA ESPECIALIZADA),
          <strong>UN</strong> (UNIVERSITARIA),
          <strong>ES</strong> (ESPECIALIZACIÓN), <strong>MG</strong> (MAESTRÍA O
          MAGISTER), <strong>DOC</strong> (DOCTORADO O PHD),<br />
          RELACIONE AL FRENTE EL NÚMERO DE LA TARJETA PROFESIONAL (SI ÉSTA HA
          SIDO PREVISTA EN UNA LEY).
        </div>

        <table
          class="w-full border-collapse border border-black text-center"
          id="table-educacion-superior"
        >
          <thead class="bg-blue-100">
            <tr>
              <th class="border border-black p-1 w-16 text-sm">
                MODALIDAD ACADÉMICA
              </th>
              <th class="border border-black p-1 w-16 text-sm">
                No. SEMESTRES APROBADOS
              </th>
              <th class="border border-black p-1 w-16 text-sm">
                GRADUADO<br />SI / NO
              </th>
              <th class="border border-black p-1 text-sm">
                NOMBRE DE LOS ESTUDIOS<br />O TÍTULO OBTENIDO
              </th>
              <th class="border border-black p-1 w-20 text-sm">
                TERMINACIÓN<br />MES / AÑO
              </th>
              <th class="border border-black p-1 w-24 text-sm">
                No. DE TARJETA PROFESIONAL
              </th>
              <th class="border border-black p-1 w-8 no-print">ACCION</th>
            </tr>
          </thead>
          <tbody>
            @for (
              row of service.data().educacionSuperior;
              track $index;
              let i = $index
            ) {
              <tr>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.modalidad"
                    class="input-field text-center w-full h-full uppercase-input"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.semestres"
                    class="input-field text-center w-full h-full"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.graduado"
                    class="input-field text-center w-full h-full uppercase-input"
                    maxlength="2"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.nombreEstudios"
                    class="input-field w-full h-full uppercase-input"
                  />
                </td>
                <td class="border border-black p-0 flex text-base">
                  <input
                    [(ngModel)]="row.terminacionMes"
                    class="input-field w-1/2 text-center border-r border-gray-300"
                    placeholder="MM"
                    maxlength="2"
                  />
                  <input
                    [(ngModel)]="row.terminacionAno"
                    class="input-field w-1/2 text-center"
                    placeholder="AAAA"
                    maxlength="4"
                  />
                </td>
                <td class="border border-black p-0">
                  <input
                    [(ngModel)]="row.tarjeta"
                    class="input-field w-full h-full text-center"
                  />
                </td>
                <td class="border border-black p-0 no-print">
                  <button
                    (click)="service.removeHigherEdRow(i)"
                    class="w-full h-full bg-red-100 hover:bg-red-200 text-red-600 font-bold"
                    title="Eliminar fila"
                  >
                    X
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div class="no-print mt-2 mb-2 flex justify-end">
          <button
            (click)="service.addHigherEdRow()"
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

      <!-- Languages -->
      <div class="p-1">
        <div class="text-[0.6rem] font-bold mb-1">
          ESPECÍFIQUE LOS IDIOMAS DIFERENTES AL ESPAÑOL QUE: HABLA, LEE, ESCRIBE
          DE FORMA, REGULAR (R), BIEN (B) O MUY BIEN (MB)
        </div>
        <div class="w-1/2 mx-auto">
          <table class="w-full border-collapse border border-black text-center">
            <thead class="bg-blue-100" id="tabla-idiomas">
              <tr>
                <th rowspan="2" class="border border-black w-24 text-sm">
                  IDIOMA
                </th>
                <th colspan="3" class="border border-black text-sm">
                  LO HABLA
                </th>
                <th colspan="3" class="border border-black text-sm">LO LEE</th>
                <th colspan="3" class="border border-black text-sm">
                  LO ESCRIBE
                </th>
                <th rowspan="2" class="border border-black w-8 no-print">
                  ACCION
                </th>
              </tr>
              <tr>
                <th class="border border-black w-6 text-sm">R</th>
                <th class="border border-black w-6 text-sm">B</th>
                <th class="border border-black w-6 text-sm">MB</th>
                <th class="border border-black w-6 text-sm">R</th>
                <th class="border border-black w-6 text-sm">B</th>
                <th class="border border-black w-6 text-sm">MB</th>
                <th class="border border-black w-6 text-sm">R</th>
                <th class="border border-black w-6 text-sm">B</th>
                <th class="border border-black w-6 text-sm">MB</th>
              </tr>
            </thead>
            <tbody>
              @for (
                lang of service.data().idiomas;
                track $index;
                let i = $index
              ) {
                <tr>
                  <td class="border border-black p-0">
                    <input
                      [(ngModel)]="lang.idioma"
                      class="input-field text-center w-full uppercase-input"
                    />
                  </td>

                  <!-- Habla -->
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loHabla = 'R'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loHabla === 'R'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loHabla = 'B'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loHabla === 'B'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loHabla = 'MB'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loHabla === 'MB'"
                    >
                      X
                    </div>
                  </td>

                  <!-- Lee -->
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loLee = 'R'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loLee === 'R'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loLee = 'B'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loLee === 'B'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loLee = 'MB'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loLee === 'MB'"
                    >
                      X
                    </div>
                  </td>

                  <!-- Escribe -->
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loEscribe = 'R'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loEscribe === 'R'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loEscribe = 'B'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loEscribe === 'B'"
                    >
                      X
                    </div>
                  </td>
                  <td
                    class="border border-black cursor-pointer hover:bg-gray-200 text-black"
                    (click)="lang.loEscribe = 'MB'"
                  >
                    <div
                      class="w-full h-full font-bold"
                      *ngIf="lang.loEscribe === 'MB'"
                    >
                      X
                    </div>
                  </td>
                  <td class="border border-black p-0 no-print">
                    <button
                      (click)="service.removeLanguageRow(i)"
                      class="w-full h-full bg-red-100 hover:bg-red-200 text-red-600 font-bold"
                      title="Eliminar fila"
                    >
                      X
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          <div class="no-print mt-2 mb-2 flex justify-end">
            <button
              (click)="service.addLanguageRow()"
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
    </div>
  `,
})
export class EducationComponent {
  service = inject(FormDataService);
}
