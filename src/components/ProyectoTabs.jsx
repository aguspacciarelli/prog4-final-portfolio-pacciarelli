import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useRef, useState } from "react";

export default function ProyectoTabs({ secciones }) {
  const [value, setValue] = useState("tab-0");
  const wrapRef = useRef(null);
  const [indicador, setIndicador] = useState({ left: 0, width: 0, top: 0 });

  // Transición de linea indicadora de selección
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mover = () => {
      const activo = wrap.querySelector('[data-state="active"]');
      if (activo && activo.offsetWidth > 0) {
        setIndicador({
          left: activo.offsetLeft,
          width: activo.offsetWidth,
          top: activo.offsetTop + activo.offsetHeight,
        });
      }
    };

    const raf = requestAnimationFrame(mover);
    document.fonts?.ready.then(() => requestAnimationFrame(mover));
    const ro = new ResizeObserver(() => requestAnimationFrame(mover));
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [value, secciones]);

  return (
    <Tabs.Root
      value={value}
      onValueChange={setValue}
      className="flex flex-col gap-8"
    >
      {/* Navegación de tabs con indicador */}
      <div ref={wrapRef} className="relative">
        <Tabs.List className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gris-claro/60">
          {secciones.map((sec, i) => (
            <Tabs.Trigger
              key={i}
              value={`tab-${i}`}
              className="cursor-pointer pb-3 text-gris-medio outline-none transition-colors hover:text-negro data-[state=active]:text-negro"
            >
              {sec.nav}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Línea que se desliza a la tab activa */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-0.5 bg-negro transition-all duration-300 ease-out"
          style={{
            left: indicador.left,
            width: indicador.width,
            top: indicador.top - 2,
          }}
        />
      </div>

      {secciones.map((sec, i) => (
        <Tabs.Content
          key={i}
          value={`tab-${i}`}
          className="flex flex-col gap-6 outline-none data-[state=active]:animate-tab-in"
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
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
