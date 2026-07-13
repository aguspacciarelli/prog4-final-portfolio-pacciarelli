import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

interface Bloque {
  titulo?: string;
  parrafo?: string;
}

interface Seccion {
  nav: string;
  contenido: Bloque[];
  imagen?: string;
}

interface Props {
  secciones: Seccion[];
}

export default function ProyectoTabs({ secciones }: Props) {
  const [value, setValue] = useState("tab-0");

  return (
    <Tabs.Root
      value={value}
      onValueChange={setValue}
      className="flex flex-col gap-8"
    >
      {/* Navegación de tabs */}
      <Tabs.List className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gris-claro/60">
        {secciones.map((sec, i) => (
          <Tabs.Trigger
            key={i}
            value={`tab-${i}`}
            className="-mb-px cursor-pointer border-b-2 border-transparent pb-3 text-gris-medio outline-none transition-colors hover:text-negro data-[state=active]:border-negro data-[state=active]:text-negro"
          >
            {sec.nav}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/*
        Todos los paneles se apilan en la MISMA celda del grid (col/row 1), así
        el contenedor siempre mide lo que el panel más alto → cambiar de tab no
        achica ni mueve la página. El panel activo se muestra con un fade suave.
      */}
      <div className="grid">
        {secciones.map((sec, i) => {
          const activo = value === `tab-${i}`;
          return (
            <div
              key={i}
              role="tabpanel"
              aria-hidden={!activo}
              className={`col-start-1 row-start-1 flex flex-col gap-6 transition-opacity duration-300 ${
                activo ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="mx-auto flex flex-col gap-7 lg:w-[50%]">
                {sec.contenido.map((bloque, j) => (
                  <div key={j}>
                    {bloque.titulo && (
                      <h3 className="mb-3 text-xl font-medium lg:text-2xl">
                        {bloque.titulo}
                      </h3>
                    )}
                    {bloque.parrafo && (
                      <p className="text-[1.125rem] leading-8 text-gris-oscuro">
                        {bloque.parrafo}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {sec.imagen && (
                <img
                  src={sec.imagen}
                  alt={sec.nav}
                  className="mt-7 mb-15 w-full self-center rounded-2xl lg:w-[50%]"
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
    </Tabs.Root>
  );
}
