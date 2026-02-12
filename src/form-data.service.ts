import { Injectable, signal, effect } from "@angular/core";

export interface FormData {
  // 1. Datos Personales
  primerApellido: string;
  segundoApellido: string;
  nombres: string;
  docTipo: string;
  docNumero: string;
  sexo: string;
  nacionalidad: string;
  pais: string;
  libretaClase: string;
  libretaNumero: string;
  libretaDM: string;
  nacFechaDia: string;
  nacFechaMes: string;
  nacFechaAno: string;
  nacPais: string;
  nacDepto: string;
  nacMunicipio: string;
  corrPais: string;
  corrDepto: string;
  corrMunicipio: string;
  corrDireccion: string;
  telefono: string;
  email: string;

  // 2. Formacion Academica
  educacionBasicaGrado: string;
  tituloObtenido: string;
  fechaGradoMes: string;
  fechaGradoAno: string;

  educacionSuperior: Array<{
    modalidad: string;
    semestres: string;
    graduado: string; // SI/NO
    nombreEstudios: string;
    terminacionMes: string;
    terminacionAno: string;
    tarjeta: string;
  }>;

  idiomas: Array<{
    idioma: string;
    loHabla: string; // R, B, MB
    loLee: string;
    loEscribe: string;
  }>;

  // 3. Experiencia Laboral
  experiencia: Array<{
    empresa: string;
    tipo: string; // PUBLICA, PRIVADA
    pais: string;
    depto: string;
    municipio: string;
    emailEntidad: string;
    telefonos: string;
    fechaIngresoDia: string;
    fechaIngresoMes: string;
    fechaIngresoAno: string;
    fechaRetiroDia: string;
    fechaRetiroMes: string;
    fechaRetiroAno: string;
    cargo: string;
    dependencia: string;
    direccion: string;
  }>;

  // 4. Tiempo Experiencia
  tiemposExperiencia: Array<{
    ocupacion: string;
    anos: string;
    meses: string;
  }>;
  tiempoTotalAnos: string;
  tiempoTotalMeses: string;

  // 5. Firma
  inhabilidades: string; // SI/NO
  ciudadFirma: string;
  fechaFirma: string;

  // 6. Observaciones
  observaciones: string;

  entidadReceptora: string;
}

@Injectable({
  providedIn: "root",
})
export class FormDataService {
  private initialData: FormData = {
    primerApellido: "",
    segundoApellido: "",
    nombres: "",
    docTipo: "",
    docNumero: "",
    sexo: "",
    nacionalidad: "COL",
    pais: "COLOMBIA",
    libretaClase: "",
    libretaNumero: "",
    libretaDM: "",
    nacFechaDia: "",
    nacFechaMes: "",
    nacFechaAno: "",
    nacPais: "COLOMBIA",
    nacDepto: "",
    nacMunicipio: "",
    corrPais: "COLOMBIA",
    corrDepto: "",
    corrMunicipio: "",
    corrDireccion: "",
    telefono: "",
    email: "",

    educacionBasicaGrado: "",
    tituloObtenido: "",
    fechaGradoMes: "",
    fechaGradoAno: "",

    educacionSuperior: Array(5)
      .fill(null)
      .map(() => ({
        modalidad: "",
        semestres: "",
        graduado: "",
        nombreEstudios: "",
        terminacionMes: "",
        terminacionAno: "",
        tarjeta: "",
      })),
    idiomas: Array(2)
      .fill(null)
      .map(() => ({
        idioma: "",
        loHabla: "",
        loLee: "",
        loEscribe: "",
      })),
    experiencia: Array(4)
      .fill(null)
      .map(() => ({
        empresa: "",
        tipo: "",
        pais: "",
        depto: "",
        municipio: "",
        emailEntidad: "",
        telefonos: "",
        fechaIngresoDia: "",
        fechaIngresoMes: "",
        fechaIngresoAno: "",
        fechaRetiroDia: "",
        fechaRetiroMes: "",
        fechaRetiroAno: "",
        cargo: "",
        dependencia: "",
        direccion: "",
      })),

    tiemposExperiencia: [
      { ocupacion: "SERVIDOR PÚBLICO", anos: "", meses: "" },
      { ocupacion: "EMPLEO DEL SECTOR PRIVADO", anos: "", meses: "" },
      { ocupacion: "TRABAJADOR INDEPENDIENTE", anos: "", meses: "" },
    ],
    tiempoTotalAnos: "",
    tiempoTotalMeses: "",

    inhabilidades: "NO",
    ciudadFirma: "",
    fechaFirma: "",
    observaciones: "",
    entidadReceptora: "",
  };

  data = signal<FormData>(this.initialData);

  constructor() {
    this.loadFromLocalStorage();

    effect(() => {
      localStorage.setItem("hojaDeVidaData", JSON.stringify(this.data()));
    });
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem("hojaDeVidaData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Migration logic for old flat structure to new array structure for Experience Time
        if (
          !parsed.tiemposExperiencia &&
          (parsed.tiempoServidorPublicoAnos ||
            parsed.tiempoPrivadoAnos ||
            parsed.tiempoIndependienteAnos)
        ) {
          parsed.tiemposExperiencia = [
            {
              ocupacion: "SERVIDOR PÚBLICO",
              anos: parsed.tiempoServidorPublicoAnos || "",
              meses: parsed.tiempoServidorPublicoMeses || "",
            },
            {
              ocupacion: "EMPLEO DEL SECTOR PRIVADO",
              anos: parsed.tiempoPrivadoAnos || "",
              meses: parsed.tiempoPrivadoMeses || "",
            },
            {
              ocupacion: "TRABAJADOR INDEPENDIENTE",
              anos: parsed.tiempoIndependienteAnos || "",
              meses: parsed.tiempoIndependienteMeses || "",
            },
          ];
          // Clean up old fields
          delete parsed.tiempoServidorPublicoAnos;
          delete parsed.tiempoServidorPublicoMeses;
          delete parsed.tiempoPrivadoAnos;
          delete parsed.tiempoPrivadoMeses;
          delete parsed.tiempoIndependienteAnos;
          delete parsed.tiempoIndependienteMeses;
        }

        this.data.set({ ...this.initialData, ...parsed });
      } catch (e) {
        console.error("Error loading data", e);
      }
    }
  }

  clearForm() {
    if (confirm("¿Está seguro de borrar todos los datos?")) {
      const resetData = JSON.parse(JSON.stringify(this.initialData));
      this.data.set(resetData);
    }
  }

  exportJSON() {
    const dataStr = JSON.stringify(this.data(), null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `hoja-de-vida-${new Date().toISOString().split("T")[0]}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  importJSON(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          if (parsed && typeof parsed === "object") {
            this.data.set({ ...this.initialData, ...parsed });
            alert("Datos importados correctamente.");
          } else {
            throw new Error("Formato de archivo no válido.");
          }
        } catch (err) {
          console.error("Error importing JSON:", err);
          alert("Error al importar el archivo.");
        }
      };
      reader.readAsText(files[0]);
    }
    element.value = "";
  }

  addHigherEdRow() {
    this.data.update((d) => ({
      ...d,
      educacionSuperior: [
        ...d.educacionSuperior,
        {
          modalidad: "",
          semestres: "",
          graduado: "",
          nombreEstudios: "",
          terminacionMes: "",
          terminacionAno: "",
          tarjeta: "",
        },
      ],
    }));
  }

  removeHigherEdRow(index: number) {
    this.data.update((d) => {
      const newRows = [...d.educacionSuperior];
      newRows.splice(index, 1);
      return { ...d, educacionSuperior: newRows };
    });
  }

  addLanguageRow() {
    this.data.update((d) => ({
      ...d,
      idiomas: [
        ...d.idiomas,
        { idioma: "", loHabla: "", loLee: "", loEscribe: "" },
      ],
    }));
  }

  removeLanguageRow(index: number) {
    this.data.update((d) => {
      const newRows = [...d.idiomas];
      newRows.splice(index, 1);
      return { ...d, idiomas: newRows };
    });
  }

  addExperienceTimeRow() {
    this.data.update((d) => ({
      ...d,
      tiemposExperiencia: [
        ...d.tiemposExperiencia,
        { ocupacion: "", anos: "", meses: "" },
      ],
    }));
  }

  removeExperienceTimeRow(index: number) {
    this.data.update((d) => {
      const newRows = [...d.tiemposExperiencia];
      newRows.splice(index, 1);
      return { ...d, tiemposExperiencia: newRows };
    });
  }

  addExperienceRow() {
    this.data.update((d) => ({
      ...d,
      experiencia: [
        ...d.experiencia,
        {
          empresa: "",
          tipo: "",
          pais: "",
          depto: "",
          municipio: "",
          emailEntidad: "",
          telefonos: "",
          fechaIngresoDia: "",
          fechaIngresoMes: "",
          fechaIngresoAno: "",
          fechaRetiroDia: "",
          fechaRetiroMes: "",
          fechaRetiroAno: "",
          cargo: "",
          dependencia: "",
          direccion: "",
        },
      ],
    }));
  }

  removeExperienceRow(index: number) {
    this.data.update((d) => {
      const newRows = [...d.experiencia];
      newRows.splice(index, 1);
      return { ...d, experiencia: newRows };
    });
  }

  async importFromLinkedIn(files: FileList) {
    const data: any = {
      experiencia: [],
      educacionSuperior: [],
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await file.text();
      const rows = this.parseCSV(content);
      if (rows.length < 2) continue;

      const headers = rows[0].map((h) => h.trim());
      const entries = rows.slice(1).map((row) => {
        const obj: any = {};
        headers.forEach((h, index) => {
          obj[h] = row[index];
        });
        return obj;
      });

      if (file.name.toLowerCase().includes("profile")) {
        const p = entries[0];
        data.nombres = p["First Name"] || "";
        data.primerApellido = p["Last Name"] || "";
        data.observaciones = p["Summary"] || "";
      } else if (file.name.toLowerCase().includes("positions")) {
        data.experiencia = entries.map((pos) => ({
          empresa: pos["Company Name"] || "",
          cargo: pos["Title"] || "",
          pais: pos["Location"] || "",
          fechaIngresoMes: this.extractMonth(pos["Started On"]),
          fechaIngresoAno: this.extractYear(pos["Started On"]),
          fechaRetiroMes: this.extractMonth(pos["Finished On"]),
          fechaRetiroAno: this.extractYear(pos["Finished On"]),
          direccion: pos["Description"] || "",
          tipo: "PRIVADA", // Default for LinkedIn
        }));
      } else if (file.name.toLowerCase().includes("education")) {
        data.educacionSuperior = entries.map((edu) => ({
          modalidad: edu["Degree Name"] || "PREGRADO",
          nombreEstudios: edu["School Name"] || "",
          terminacionMes: this.extractMonth(edu["Finished On"]),
          terminacionAno: this.extractYear(edu["Finished On"]),
          graduado: edu["Finished On"] ? "SI" : "NO",
          semestres: "10", // Placeholder
          tarjeta: "",
        }));
      }
    }

    this.data.update((d) => ({
      ...d,
      ...data,
      // Ensure arrays have at least some default length if empty
      experiencia:
        data.experiencia.length > 0 ? data.experiencia : d.experiencia,
      educacionSuperior:
        data.educacionSuperior.length > 0
          ? data.educacionSuperior
          : d.educacionSuperior,
    }));

    alert(
      "Datos de LinkedIn importados. Por favor revise y complete los campos faltantes.",
    );
  }

  private parseCSV(text: string): string[][] {
    const lines = text.split(/\r?\n/);
    return lines
      .filter((line) => line.trim())
      .map((line) => {
        const result = [];
        let cur = "";
        let inQuote = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuote = !inQuote;
          } else if (char === "," && !inQuote) {
            result.push(cur.replace(/^"|"$/g, ""));
            cur = "";
          } else {
            cur += char;
          }
        }
        result.push(cur.replace(/^"|"$/g, ""));
        return result;
      });
  }

  private extractMonth(dateStr: string): string {
    if (!dateStr) return "";
    const m = dateStr.match(/[a-zA-Z]+/);
    if (!m) return "";
    const months: any = {
      jan: "01",
      feb: "02",
      mar: "03",
      apr: "04",
      may: "05",
      jun: "06",
      jul: "07",
      aug: "08",
      sep: "09",
      oct: "10",
      nov: "11",
      dec: "12",
    };
    return months[m[0].toLowerCase().substring(0, 3)] || "";
  }

  private extractYear(dateStr: string): string {
    if (!dateStr) return "";
    const m = dateStr.match(/\d{4}/);
    return m ? m[0] : "";
  }
}
