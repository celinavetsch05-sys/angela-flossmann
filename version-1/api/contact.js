// Nimmt Formular-Daten des Kontaktformulars entgegen und verschickt sie per
// Resend (https://resend.com) als E-Mail an Angela. Läuft als Vercel
// Serverless Function unter /api/contact.
//
// Benötigt die Umgebungsvariable RESEND_API_KEY (in den Vercel
// Projekteinstellungen unter "Environment Variables" hinterlegen).

const TO_ADDRESS = "info@angela-flossmann.com";
const FROM_ADDRESS = "Website-Kontaktformular <kontakt@angela-flossmann.com>";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "Ungültige Anfrage." });
    }
  }
  body = body || {};

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const phone = (body.phone || "").toString().trim();
  const message = (body.message || "").toString().trim();
  const honeypot = (body.website || "").toString().trim();

  // Honeypot: Bots füllen dieses versteckte Feld aus, Menschen nicht.
  // Wir tun so, als wäre alles gut gelaufen, verschicken aber nichts.
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return res.status(500).json({ error: "Serverfehler. Bitte versuchen Sie es später erneut." });
  }

  const html =
    "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>" +
    "<p><strong>E-Mail:</strong> " + escapeHtml(email) + "</p>" +
    "<p><strong>Telefon:</strong> " + escapeHtml(phone || "-") + "</p>" +
    "<p><strong>Nachricht:</strong></p>" +
    "<p>" + escapeHtml(message).replace(/\n/g, "<br />") + "</p>";

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: "Neue Anfrage über die Website von " + name,
        html: html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend-Fehler:", resendRes.status, errText);
      return res.status(502).json({ error: "Nachricht konnte nicht gesendet werden." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Fehler beim Versand:", err);
    return res.status(500).json({ error: "Serverfehler. Bitte versuchen Sie es später erneut." });
  }
};
