import type { APIRoute } from "astro";
import { Resend } from "resend";

// Este endpoint corre en el servidor (no se pre-renderiza).
export const prerender = false;

const DESTINO = "aguspacciarelli@gmail.com";

// Evita inyección de HTML en el mail.
function escapar(texto: string) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nombre, apellido, mail, servicio, descripcion } =
      await request.json();

    // Validación básica del lado del servidor.
    if (!nombre || !apellido || !mail || !descripcion) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios." }),
        { status: 400 },
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Falta la variable de entorno RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "El servidor no tiene configurada la API key." }),
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: DESTINO,
      replyTo: mail,
      subject: `Nueva consulta de ${nombre} ${apellido}`,
      html: `
        <h2>Nueva consulta desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${escapar(nombre)} ${escapar(apellido)}</p>
        <p><strong>Mail:</strong> ${escapar(mail)}</p>
        <p><strong>Servicio / consulta:</strong> ${escapar(servicio || "-")}</p>
        <p><strong>Descripción:</strong><br>${escapar(descripcion)}</p>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return new Response(
        JSON.stringify({ error: "No se pudo enviar el mail." }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Error en el servidor." }), {
      status: 500,
    });
  }
};
