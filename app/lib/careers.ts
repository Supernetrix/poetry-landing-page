export function buildCareerMailto(data: FormData): string {
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const subject = encodeURIComponent(`Careers application from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}\n\nPlease find my resume attached.`,
  );
  return `mailto:hr@poetryconstructions.com?subject=${subject}&body=${body}`;
}
