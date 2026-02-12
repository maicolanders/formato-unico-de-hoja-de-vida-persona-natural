import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormDataService } from "../../form-data.service";

@Component({
  selector: "app-personal-info",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 1. DATOS PERSONALES -->
    <div class="relative mt-4 mb-1">
      <div class="absolute -top-0 left-0 section-header text-sm">1</div>
      <span
        class="ml-12 font-bold text-white bg-black px-4 py-0.5 rounded-r-full text-sm"
        >DATOS PERSONALES</span
      >
    </div>

    <div class="border-2 border-black mb-4">
      <!-- Row 1: Names -->
      <div class="grid grid-cols-12 border-b border-black">
        <div class="col-span-4 border-r border-black p-1">
          <label class="block text-xxs font-bold italic mb-1"
            >PRIMER APELLIDO</label
          >
          <input
            type="text"
            [(ngModel)]="service.data().primerApellido"
            class="input-field uppercase-input"
          />
        </div>
        <div class="col-span-4 border-r border-black p-1">
          <label class="block text-xxs font-bold italic mb-1"
            >SEGUNDO APELLIDO ( O DE CASADA )</label
          >
          <input
            type="text"
            [(ngModel)]="service.data().segundoApellido"
            class="input-field uppercase-input"
          />
        </div>
        <div class="col-span-4 p-1">
          <label class="block text-xxs font-bold italic mb-1">NOMBRES</label>
          <input
            type="text"
            [(ngModel)]="service.data().nombres"
            class="input-field uppercase-input"
          />
        </div>
      </div>

      <!-- Row 2: ID & Nationality -->
      <div class="grid grid-cols-12 border-b border-black">
        <div class="col-span-6 border-r border-black grid grid-cols-12">
          <div class="col-span-12 p-1 pb-0">
            <label class="text-xxs font-bold italic"
              >DOCUMENTO DE IDENTIFICACIÓN</label
            >
          </div>
          <div class="col-span-6 p-1 flex items-center gap-2 text-xxs">
            <label class="flex items-center"
              ><span class="mr-1">C.C</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="service.data().docTipo === 'CC'"
                (click)="service.data().docTipo = 'CC'"
              >
                <div
                  *ngIf="service.data().docTipo === 'CC'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
            <label class="flex items-center"
              ><span class="mr-1">C.E</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="service.data().docTipo === 'CE'"
                (click)="service.data().docTipo = 'CE'"
              >
                <div
                  *ngIf="service.data().docTipo === 'CE'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
            <label class="flex items-center"
              ><span class="mr-1">PAS</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="
                  service.data().docTipo === 'PAS'
                "
                (click)="service.data().docTipo = 'PAS'"
              >
                <div
                  *ngIf="service.data().docTipo === 'PAS'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
          </div>
          <div
            class="col-span-6 p-1 flex items-center gap-1 border-l border-black"
          >
            <span class="font-bold text-xxs">No.</span>
            <input
              type="text"
              [(ngModel)]="service.data().docNumero"
              class="input-field flex-grow"
            />
          </div>
        </div>
        <div class="col-span-2 border-r border-black p-1">
          <label class="block text-xxs font-bold italic mb-1">SEXO</label>
          <div class="flex gap-2 text-xxs">
            <label class="flex items-center"
              ><span class="mr-1">F</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="service.data().sexo === 'F'"
                (click)="service.data().sexo = 'F'"
              >
                <div
                  *ngIf="service.data().sexo === 'F'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
            <label class="flex items-center"
              ><span class="mr-1">M</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="service.data().sexo === 'M'"
                (click)="service.data().sexo = 'M'"
              >
                <div
                  *ngIf="service.data().sexo === 'M'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
          </div>
        </div>
        <div class="col-span-4 p-1">
          <label class="block text-xxs font-bold italic mb-1"
            >NACIONALIDAD <span class="ml-4">PAÍS</span></label
          >
          <div class="flex gap-2 text-xxs items-center">
            <label class="flex items-center"
              ><span class="mr-1">COL.</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="
                  service.data().nacionalidad === 'COL'
                "
                (click)="service.data().nacionalidad = 'COL'"
              >
                <div
                  *ngIf="service.data().nacionalidad === 'COL'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
            <label class="flex items-center"
              ><span class="mr-1">EXTRANJERO</span>
              <div
                class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
                [class.print-checkbox-checked]="
                  service.data().nacionalidad === 'EXT'
                "
                (click)="service.data().nacionalidad = 'EXT'"
              >
                <div
                  *ngIf="service.data().nacionalidad === 'EXT'"
                  class="w-2.5 h-2.5 bg-black rounded-full"
                ></div>
              </div>
            </label>
            <input
              type="text"
              [(ngModel)]="service.data().pais"
              class="input-field border-b border-black w-24 uppercase-input"
            />
          </div>
        </div>
      </div>

      <!-- Row 3: Military -->
      <div class="grid grid-cols-12 border-b border-black">
        <div class="col-span-12 p-1 flex items-center gap-4 text-xxs">
          <span class="font-bold italic">LIBRETA MILITAR</span>
          <label class="flex items-center gap-1"
            >PRIMERA CLASE
            <div
              class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
              [class.print-checkbox-checked]="
                service.data().libretaClase === '1'
              "
              (click)="service.data().libretaClase = '1'"
            >
              <div
                *ngIf="service.data().libretaClase === '1'"
                class="w-2.5 h-2.5 bg-black rounded-full"
              ></div>
            </div>
          </label>
          <label class="flex items-center gap-1"
            >SEGUNDA CLASE
            <div
              class="w-4 h-4 border border-black rounded-full flex items-center justify-center cursor-pointer"
              [class.print-checkbox-checked]="
                service.data().libretaClase === '2'
              "
              (click)="service.data().libretaClase = '2'"
            >
              <div
                *ngIf="service.data().libretaClase === '2'"
                class="w-2.5 h-2.5 bg-black rounded-full"
              ></div>
            </div>
          </label>
          <span class="font-bold ml-2">NÚMERO</span>
          <input
            type="text"
            [(ngModel)]="service.data().libretaNumero"
            class="input-field w-32 border-b border-black"
          />
          <span class="font-bold ml-2">D.M</span>
          <input
            type="text"
            [(ngModel)]="service.data().libretaDM"
            class="input-field w-16 border-b border-black"
          />
        </div>
      </div>

      <!-- Row 4: Birth and Address -->
      <div class="grid grid-cols-12">
        <!-- Birth Col -->
        <div class="col-span-5 border-r border-black p-1">
          <div class="text-xxs font-bold italic mb-1">
            FECHA Y LUGAR DE NACIMIENTO
          </div>
          <div class="flex items-center gap-1 mb-1 text-xxs">
            <span>FECHA</span>
            <span>DÍA</span>
            <input
              [(ngModel)]="service.data().nacFechaDia"
              class="input-field w-6 text-center border border-black"
              maxlength="2"
            />
            <span>MES</span>
            <input
              [(ngModel)]="service.data().nacFechaMes"
              class="input-field w-6 text-center border border-black"
              maxlength="2"
            />
            <span>AÑO</span>
            <input
              [(ngModel)]="service.data().nacFechaAno"
              class="input-field w-10 text-center border border-black"
              maxlength="4"
            />
          </div>
          <div class="flex items-center gap-1 mb-1 text-xxs">
            <span class="w-10">PAÍS</span>
            <input
              [(ngModel)]="service.data().nacPais"
              class="input-field border-b border-black w-full uppercase-input"
            />
          </div>
          <div class="flex items-center gap-1 mb-1 text-xxs">
            <span class="w-10">DEPTO</span>
            <input
              [(ngModel)]="service.data().nacDepto"
              class="input-field border-b border-black w-full uppercase-input"
            />
          </div>
          <div class="flex items-center gap-1 text-xxs">
            <span class="w-10">MUNICIPIO</span>
            <input
              [(ngModel)]="service.data().nacMunicipio"
              class="input-field border-b border-black w-full uppercase-input"
            />
          </div>
        </div>
        <!-- Address Col -->
        <div class="col-span-7 p-1">
          <div class="text-xxs font-bold italic mb-1">
            DIRECCIÓN DE CORRESPONDENCIA
          </div>
          <input
            [(ngModel)]="service.data().corrDireccion"
            class="input-field border-b border-black w-full mb-1 uppercase-input"
            placeholder="Dirección completa"
          />

          <div class="grid grid-cols-2 gap-2 mb-1">
            <div class="flex items-center gap-1 text-xxs">
              <span>PAÍS</span>
              <input
                [(ngModel)]="service.data().corrPais"
                class="input-field border-b border-black w-full uppercase-input"
              />
            </div>
            <div class="flex items-center gap-1 text-xxs">
              <span>DEPTO</span>
              <input
                [(ngModel)]="service.data().corrDepto"
                class="input-field border-b border-black w-full uppercase-input"
              />
            </div>
          </div>

          <div class="flex items-center gap-1 mb-1 text-xxs">
            <span class="w-16">MUNICIPIO</span>
            <input
              [(ngModel)]="service.data().corrMunicipio"
              class="input-field border-b border-black w-full uppercase-input"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex items-center gap-1 text-xxs">
              <span>TELÉFONO</span>
              <input
                [(ngModel)]="service.data().telefono"
                class="input-field border-b border-black w-full"
              />
            </div>
            <div class="flex items-center gap-1 text-xxs">
              <span>EMAIL</span>
              <input
                [(ngModel)]="service.data().email"
                class="input-field border-b border-black w-full lowercase"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PersonalInfoComponent {
  service = inject(FormDataService);
}
