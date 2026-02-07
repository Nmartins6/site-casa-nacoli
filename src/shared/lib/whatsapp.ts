export const WHATSAPP_NUMBER_E164 = "555199999999";

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${text}`;
}
