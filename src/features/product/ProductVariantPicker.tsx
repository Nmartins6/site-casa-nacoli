import React, { useMemo, useState } from "react";
import { buildWhatsAppLink } from "@/shared/lib/whatsapp";

type OptionKey = "color" | "size" | "paper" | "finish" | "quantity";

type ProductOption = {
  key: OptionKey;
  label: string;
  values: string[];
};

type Props = {
  productTitle: string;
  options: ProductOption[];
  baseMessageTemplate?: string; // pode conter {{color}}, {{size}}, etc.
  whatsappFallbackMessage?: string;
};

function applyTemplate(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

export default function ProductVariantPicker(props: Props) {
  const { productTitle, options, baseMessageTemplate, whatsappFallbackMessage } = props;

  const [selected, setSelected] = useState<Record<OptionKey, string>>({
    color: "",
    size: "",
    paper: "",
    finish: "",
    quantity: "",
  });

  const [notes, setNotes] = useState("");

  const selectedPretty = useMemo(() => {
    const parts: string[] = [];
    for (const opt of options) {
      const value = selected[opt.key];
      if (value) parts.push(`${opt.label}: ${value}`);
    }
    return parts;
  }, [options, selected]);

  const message = useMemo(() => {
    const template = baseMessageTemplate ?? `Olá! Quero orçamento de ${productTitle}. {{details}}`;

    const details =
      selectedPretty.length > 0 ? selectedPretty.join(", ") : "Ainda não escolhi as variações.";

    const notesLine = notes.trim() ? `Observações: ${notes.trim()}` : "";
    const detailsPlus = [details, notesLine].filter(Boolean).join(" | ");

    const vars: Record<string, string> = {
      ...selected,
      details: detailsPlus,
      productTitle,
    };

    const rendered = applyTemplate(template, vars).trim();

    return rendered.length
      ? rendered
      : (whatsappFallbackMessage ?? `Olá! Quero orçamento de ${productTitle}.`);
  }, [baseMessageTemplate, productTitle, selected, selectedPretty, whatsappFallbackMessage, notes]);

  const href = buildWhatsAppLink(message);

  if (!options?.length) return null;

  return (
    <section className="mt-10 rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--cn-ink)]">Variações</h2>
          <p className="mt-1 text-sm text-black/70">
            Toque nas opções abaixo para montar a mensagem do orçamento.
          </p>
        </div>

        <a
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--cn-terracotta)] px-5 py-3 text-sm font-medium text-white hover:brightness-95 md:mt-0"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Pedir orçamento no WhatsApp
        </a>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {options.map((opt) => (
          <div key={opt.key} className="rounded-2xl bg-white/60 p-5 ring-1 ring-black/5">
            <div className="text-sm font-semibold text-[var(--cn-ink)]">{opt.label}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {opt.values.map((v) => {
                const isActive = selected[opt.key] === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [opt.key]: prev[opt.key] === v ? "" : v,
                      }))
                    }
                    className={[
                      "rounded-full px-3 py-1 text-xs ring-1 transition",
                      isActive
                        ? "bg-[var(--cn-ink)] text-[var(--cn-cream)] ring-black/10"
                        : "bg-[var(--cn-cream)]/40 text-[var(--cn-ink)] ring-black/10 hover:bg-white",
                    ].join(" ")}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white/60 p-5 ring-1 ring-black/5">
        <label className="text-sm font-semibold text-[var(--cn-ink)]" htmlFor="notes">
          Observações (opcional)
        </label>
        <p className="mt-1 text-xs text-black/60">
          Ex.: “Tenho a arte pronta”, “preciso para sábado”, “quero igual ao modelo do Instagram”.
        </p>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-3 w-full resize-none rounded-xl bg-[var(--cn-cream)]/30 p-3 text-sm text-[var(--cn-ink)] ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[var(--cn-sky)]"
          placeholder="Escreva aqui…"
        />
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--cn-cream)]/40 p-4 ring-1 ring-black/5">
        <div className="text-xs font-semibold text-black/60">Mensagem:</div>
        <div className="mt-2 text-sm text-black/75">{message}</div>
      </div>
    </section>
  );
}
