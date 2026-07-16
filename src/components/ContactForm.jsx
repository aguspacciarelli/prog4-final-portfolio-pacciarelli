import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

const servicios = [
  "Diseño UX/UI",
  "Branding",
  "Diseño gráfico digital",
  "Proyecto personalizado",
  "Otra consulta",
];

const inputClass = "estilo-form";
const labelClass = "font-medium";
const errorClass = "text-[0.85rem] text-rojo-error";

export default function ContactForm() {
  const [servicio, setServicio] = useState("");
  const [estado, setEstado] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setEstado("enviando");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, servicio }),
      });
      if (!res.ok) throw new Error("Fallo el envío");
      setEstado("ok");
      form.reset();
      setServicio("");
    } catch {
      setEstado("error");
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="flex w-full flex-col gap-6 mb-20">

      {/* Nombre + Apellido */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <Form.Field name="nombre" className="flex flex-1 flex-col gap-2">
          <Form.Label className={labelClass}>Nombre *</Form.Label>
          <Form.Control asChild>
            <input type="text" required placeholder="Tu nombre" className={inputClass} />
          </Form.Control>
          <Form.Message match="valueMissing" className={errorClass}>
            Ingresá tu nombre
          </Form.Message>
        </Form.Field>

        <Form.Field name="apellido" className="flex flex-1 flex-col gap-2">
          <Form.Label className={labelClass}>Apellido *</Form.Label>
          <Form.Control asChild>
            <input type="text" required placeholder="Tu apellido" className={inputClass} />
          </Form.Control>
          <Form.Message match="valueMissing" className={errorClass}>
            Ingresá tu apellido
          </Form.Message>
        </Form.Field>
      </div>

      {/* Mail */}
      <Form.Field name="mail" className="flex flex-col gap-2">
        <Form.Label className={labelClass}>Mail *</Form.Label>
        <Form.Control asChild>
          <input type="email" required placeholder="tu@mail.com" className={inputClass} />
        </Form.Control>
        <Form.Message match="valueMissing" className={errorClass}>
          Ingresá tu mail
        </Form.Message>
        <Form.Message match="typeMismatch" className={errorClass}>
          Ingresá un mail válido
        </Form.Message>
      </Form.Field>

      {/* Servicio / consulta */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Servicio / Consulta *</label>
        <Select.Root value={servicio} onValueChange={setServicio}>
          <Select.Trigger
            aria-label="Servicio o consulta"
            className="estilo-form flex cursor-pointer items-center justify-between data-placeholder:text-gris-medio"
          >
            <Select.Value placeholder="Servicio / Consulta" />
            <Select.Icon>
              <svg
                className="h-4 w-4 text-gris-medio"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={6}
              className="z-70 w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-gris-claro/60 bg-blanco shadow-lg"
            >
              <Select.Viewport className="p-1">
                {servicios.map((s) => (
                  <Select.Item
                    key={s}
                    value={s}
                    className="cursor-pointer rounded-md px-3 py-2 outline-none data-highlighted]:bg-gris-claro/40 data-[state=checked]:font-medium"
                  >
                    <Select.ItemText>{s}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Descripción del proyecto */}
      <Form.Field name="descripcion" className="flex flex-col gap-2">
        <Form.Label className={labelClass}>Descripción del proyecto *</Form.Label>
        <Form.Control asChild>
          <textarea
            required
            rows={1}
            placeholder="Contame un poco sobre tu proyecto ;)"
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
            className={`${inputClass} resize-none overflow-hidden`}
          />
        </Form.Control>
        <Form.Message match="valueMissing" className={errorClass}>
          Necesito saber un poco más sobre tu idea
        </Form.Message>
      </Form.Field>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Form.Submit asChild>
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="boton-principal cursor-pointer px-8 py-2.5 disabled:cursor-default disabled:opacity-60"
          >
            {estado === "enviando" ? "Enviando…" : "Enviar consulta"}
          </button>
        </Form.Submit>

        {estado === "ok" && (
          <p className="text-verde-confirm">
            ¡Enviado! Te respondo lo antes posible :)
          </p>
        )}
        {estado === "error" && (
          <p className="text-rojo-error">
            Uy, algo salió mal. Probá de nuevo en un ratito.
          </p>
        )}
      </div>
    </Form.Root>
  );
}
