import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { Resend } from "resend";
//#region src/pages/api/contacto.ts
var contacto_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var DESTINO = "aguspacciarelli@gmail.com";
function escapar(texto) {
	return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var POST = async ({ request }) => {
	try {
		const { nombre, apellido, mail, servicio, descripcion } = await request.json();
		if (!nombre || !apellido || !mail || !descripcion) return new Response(JSON.stringify({ error: "Faltan campos obligatorios." }), { status: 400 });
		const { error } = await new Resend({RESEND_API_KEY}).emails.send({
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
      `
		});
		if (error) {
			console.error("Error de Resend:", error);
			return new Response(JSON.stringify({ error: "No se pudo enviar el mail." }), { status: 500 });
		}
		return new Response(JSON.stringify({ ok: true }), { status: 200 });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ error: "Error en el servidor." }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contacto@_@ts
var page = () => contacto_exports;
//#endregion
export { page };