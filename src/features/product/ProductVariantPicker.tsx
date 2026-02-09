import React, { useMemo, useState } from "react";
import { buildWhatsAppLink } from "@/shared/lib/whatsapp";

type OptionKey = "color" | "size" | "paper" | "finish" | "quantity";

type ProductOption = {
  key: OptionKey;
  label: string;
  values?: string[];
};

type Props = {
  productTitle: string;
  options: ProductOption[];
  baseMessageTemplate?: string;
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

  const reset = () => {
    setSelected({
      color: "",
      size: "",
      paper: "",
      finish: "",
      quantity: "",
    });
    setNotes("");
  };

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

  // If no options, just show a simpler CTA button (handled by parent mostly, but safety check)
  if (!options || options.length === 0) {
    return (
      <div className="mt-8">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--cn-ink)] px-8 text-base font-medium text-[var(--cn-cream)] transition-colors hover:bg-black/80"
        >
          Pedir orçamento no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white/50 p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <h3 className="font-semibold text-[var(--cn-ink)]">Personalize seu pedido</h3>
      <p className="mt-1 text-sm text-black/60">Selecione as opções para gerar o orçamento.</p>

      <div className="mt-6 space-y-6">
        {options.map((opt) => (
          <div key={opt.key}>
            <div className="text-sm font-medium text-[var(--cn-ink)]">{opt.label}:</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {opt.values?.map((v) => {
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
                      "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[var(--cn-ink)] text-[var(--cn-cream)] shadow-sm"
                        : "bg-white text-[var(--cn-ink)] ring-1 ring-black/10 hover:bg-[var(--cn-cream)] hover:ring-[var(--cn-ink)]/20",
                    ].join(" ")}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <label className="text-sm font-medium text-[var(--cn-ink)]" htmlFor="notes">
            Observações (opcional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border-0 bg-white p-3 text-sm text-[var(--cn-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:ring-2 focus:ring-[var(--cn-ink)]"
            placeholder="Ex.: Preciso para o dia 20, quero adicionar logo..."
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-black/5">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--cn-ink)] px-6 text-base font-medium text-[var(--cn-cream)] transition-all hover:bg-black/80 hover:scale-[1.02]"
        >
          Pedir orçamento no WhatsApp
        </a>

        <button
          type="button"
          onClick={reset}
          className="text-sm text-black/50 hover:text-[var(--cn-terracotta)] transition-colors"
        >
          Limpar escolhas
        </button>
      </div>
    </div>
  );
}
