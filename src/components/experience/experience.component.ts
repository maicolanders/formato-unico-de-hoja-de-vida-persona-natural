import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormDataService } from "../../form-data.service";

@Component({
  selector: "app-experience",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 3. EXPERIENCIA LABORAL -->
    <div class="relative mt-4 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">3</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >EXPERIENCIA LABORAL</span
      >
    </div>

    <div class="border-2 border-black mb-4 text-xxs">
      <div class="p-1 border-b border-black text-[0.6rem]">
        RELACIONE SU EXPERIENCIA LABORAL O DE PRESTACIÓN DE SERVICIOS EN
        ESTRICTO ORDEN CRONOLÓGICO COMENZANDO POR EL ACTUAL.
      </div>

      <!-- Experience Blocks -->
      @for (exp of service.data().experiencia; track $index; let idx = $index) {
        <div
          class="border-b-4 border-black bg-blue-50/30"
          id="detalle-experiencia"
        >
          <div
            class="bg-blue-100 text-center font-bold italic py-0.5 border-b border-black relative"
          >
            {{
              idx === 0
                ? "EMPLEO ACTUAL O CONTRATO VIGENTE"
                : "EMPLEO O CONTRATO ANTERIOR"
            }}
            <button
              (click)="service.removeExperienceRow(idx)"
              class="absolute right-0 top-0 h-full px-3 bg-red-100 text-red-600 hover:bg-red-200 no-print flex items-center justify-center font-bold"
              title="Eliminar esta experiencia"
            >
              X
            </button>
          </div>

          <div class="grid grid-cols-12 border-b border-black">
            <div class="col-span-5 border-r border-black p-1">
              <label class="block font-bold mb-1">EMPRESA O ENTIDAD</label>
              <input
                [(ngModel)]="exp.empresa"
                class="input-field w-full uppercase-input"
              />
            </div>
            <div
              class="col-span-3 border-r border-black p-1 flex flex-col justify-end"
            >
              <div class="flex gap-4">
                <label class="font-bold">PÚBLICA</label>
                <div
                  class="w-4 h-4 border border-black rounded-full cursor-pointer flex justify-center items-center"
                  [class.print-checkbox-checked]="exp.tipo === 'PUBLICA'"
                  (click)="exp.tipo = 'PUBLICA'"
                >
                  <div
                    *ngIf="exp.tipo === 'PUBLICA'"
                    class="w-2.5 h-2.5 bg-black rounded-full"
                  ></div>
                </div>

                <label class="font-bold">PRIVADA</label>
                <div
                  class="w-4 h-4 border border-black rounded-full cursor-pointer flex justify-center items-center"
                  [class.print-checkbox-checked]="exp.tipo === 'PRIVADA'"
                  (click)="exp.tipo = 'PRIVADA'"
                >
                  <div
                    *ngIf="exp.tipo === 'PRIVADA'"
                    class="w-2.5 h-2.5 bg-black rounded-full"
                  ></div>
                </div>
              </div>
            </div>
            <div class="col-span-4 p-1">
              <label class="block font-bold mb-1">PAÍS</label>
              <input
                [(ngModel)]="exp.pais"
                class="input-field w-full uppercase-input"
              />
            </div>
          </div>

          <div class="grid grid-cols-12 border-b border-black">
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">DEPARTAMENTO</label>
              <input
                [(ngModel)]="exp.depto"
                class="input-field w-full uppercase-input"
              />
            </div>
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">MUNICIPIO</label>
              <input
                [(ngModel)]="exp.municipio"
                class="input-field w-full uppercase-input"
              />
            </div>
            <div class="col-span-4 p-1">
              <label class="block font-bold mb-1"
                >CORREO ELECTRÓNICO ENTIDAD</label
              >
              <input
                [(ngModel)]="exp.emailEntidad"
                class="input-field w-full lowercase"
              />
            </div>
          </div>

          <div class="grid grid-cols-12 border-b border-black">
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">TELÉFONOS</label>
              <input [(ngModel)]="exp.telefonos" class="input-field w-full" />
            </div>
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">FECHA DE INGRESO</label>
              <div class="flex items-center gap-1">
                <span>DÍA</span>
                <input
                  [(ngModel)]="exp.fechaIngresoDia"
                  class="input-field w-6 text-center border border-black"
                  maxlength="2"
                />
                <span>MES</span>
                <input
                  [(ngModel)]="exp.fechaIngresoMes"
                  class="input-field w-6 text-center border border-black"
                  maxlength="2"
                />
                <span>AÑO</span>
                <input
                  [(ngModel)]="exp.fechaIngresoAno"
                  class="input-field w-10 text-center border border-black"
                  maxlength="4"
                />
              </div>
            </div>
            <div class="col-span-4 p-1">
              <label class="block font-bold mb-1">FECHA DE RETIRO</label>
              <div class="flex items-center gap-1">
                <span>DÍA</span>
                <input
                  [(ngModel)]="exp.fechaRetiroDia"
                  class="input-field w-6 text-center border border-black"
                  maxlength="2"
                />
                <span>MES</span>
                <input
                  [(ngModel)]="exp.fechaRetiroMes"
                  class="input-field w-6 text-center border border-black"
                  maxlength="2"
                />
                <span>AÑO</span>
                <input
                  [(ngModel)]="exp.fechaRetiroAno"
                  class="input-field w-10 text-center border border-black"
                  maxlength="4"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-12">
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">CARGO O CONTRATO</label>
              <input
                [(ngModel)]="exp.cargo"
                class="input-field w-full uppercase-input"
              />
            </div>
            <div class="col-span-4 border-r border-black p-1">
              <label class="block font-bold mb-1">DEPENDENCIA</label>
              <input
                [(ngModel)]="exp.dependencia"
                class="input-field w-full uppercase-input"
              />
            </div>
            <div class="col-span-4 p-1">
              <label class="block font-bold mb-1">DIRECCIÓN</label>
              <input
                [(ngModel)]="exp.direccion"
                class="input-field w-full uppercase-input"
              />
            </div>
          </div>
        </div>
      }

      <!-- Add Button -->
      <div class="no-print mt-2 mb-2 flex justify-end">
        <button
          (click)="service.addExperienceRow()"
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
          Agregar Experiencia
        </button>
      </div>
    </div>
    <div class="text-[0.6rem] text-center font-bold">
      NOTA: SI REQUIERE ADICIONAR MAS EXPERIENCIA LABORAL, IMPRIMA NUEVAMENTE
      ESTA HOJA.
    </div>
  `,
})
export class ExperienceComponent {
  service = inject(FormDataService);
}
