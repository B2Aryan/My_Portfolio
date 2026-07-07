import { useEffect, useState } from "react";

export type NeofetchConfig = {
  user: string;
  host: string;
  fields: { label: string; values: string[] }[];
  status: string;
};

export const portfolioConfig: NeofetchConfig = {
  user: "aryan",
  host: "portfolio",
  fields: [
    { label: "Name", values: ["Aryan Gupta"] },
    { label: "Role", values: ["Software Developer"] },
    { label: "Focus", values: ["Full Stack + AI"] },
    { label: "Projects", values: ["ResumePilot", "FormSahay", "Symbiotic City 2070"] },
  ],
  status: "Open to Opportunities",
};

// Medium-weight hollow capital "A" — terminal block-art, 9 rows × 18 cols
const ASCII_A = [
  "       ▄██▄       ",
  "      ██  ██      ",
  "     ██    ██     ",
  "    ██      ██    ",
  "   ██        ██   ",
  "  ██████████████  ",
  " ██            ██ ",
  "██              ██",
  "██              ██",
];

const CHAR_DELAY = 14;
const LINE_DELAY = 55;
const LOGO_ROW_DELAY = 40;

type Row =
  | { kind: "header"; text: string }
  | { kind: "divider"; text: string }
  | { kind: "field"; label: string; value: string; continuation?: boolean }
  | { kind: "status"; label: string; value: string };

function buildRows(cfg: NeofetchConfig): Row[] {
  const rows: Row[] = [];
  rows.push({ kind: "header", text: `${cfg.user}@${cfg.host}` });
  rows.push({ kind: "divider", text: "─".repeat(38) });
  for (const f of cfg.fields) {
    f.values.forEach((v, i) => {
      rows.push({
        kind: "field",
        label: i === 0 ? f.label : "",
        value: v,
        continuation: i > 0,
      });
    });
  }
  rows.push({ kind: "status", label: "Status", value: cfg.status });
  return rows;
}

const LABEL_WIDTH = 9; // "Projects:" fits

function rowFullText(r: Row): string {
  if (r.kind === "header" || r.kind === "divider") return r.text;
  if (r.kind === "field" && r.continuation) return " ".repeat(LABEL_WIDTH + 1) + r.value;
  const lbl = r.kind === "field" || r.kind === "status" ? r.label : "";
  return `${(lbl + ":").padEnd(LABEL_WIDTH)} ${r.kind === "status" ? "● " : ""}${r.value}`;
}

export function Neofetch({ config = portfolioConfig }: { config?: NeofetchConfig }) {
  const rows = buildRows(config);
  const [logoRow, setLogoRow] = useState(0);
  const [infoRow, setInfoRow] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (logoRow >= ASCII_A.length) return;
    const t = setTimeout(() => setLogoRow((r) => r + 1), LOGO_ROW_DELAY);
    return () => clearTimeout(t);
  }, [logoRow]);

  useEffect(() => {
    if (logoRow < 2) return; // start info shortly after logo begins
    if (infoRow >= rows.length) return;
    const full = rowFullText(rows[infoRow]);
    if (typed.length >= full.length) {
      const t = setTimeout(() => {
        setInfoRow((r) => r + 1);
        setTyped("");
      }, LINE_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), CHAR_DELAY);
    return () => clearTimeout(t);
  }, [typed, infoRow, rows, logoRow]);

  // Pad logo block to a constant height to prevent layout jump
  const logoLines = [...ASCII_A.slice(0, logoRow)];
  while (logoLines.length < ASCII_A.length) logoLines.push("");

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:gap-4">
      {/* Left: ASCII A only */}
      <pre
        className="m-0 select-none whitespace-pre font-mono text-[10.5px] leading-[1.15]"
        style={{
          color: "var(--term-accent)",
          textShadow:
            "0 0 6px color-mix(in oklab, var(--term-accent) 55%, transparent), 0 0 12px color-mix(in oklab, var(--term-accent) 25%, transparent)",
        }}
        aria-hidden="true"
      >
        {logoLines.join("\n")}
      </pre>

      {/* Right: header + divider + info */}
      <div className="min-w-0 flex-1 font-mono text-[11.5px] leading-[1.7]">
        {rows.slice(0, infoRow).map((r, i) => (
          <RenderRow key={i} row={r} text={rowFullText(r)} />
        ))}
        {infoRow < rows.length && logoRow >= 2 && (
          <RenderRow row={rows[infoRow]} text={typed} cursor />
        )}
      </div>
    </div>
  );
}

function RenderRow({ row, text, cursor }: { row: Row; text: string; cursor?: boolean }) {
  if (row.kind === "header") {
    return (
      <div className="font-semibold" style={{ color: "var(--term-accent)" }}>
        {text}
        {cursor && <Caret />}
      </div>
    );
  }
  if (row.kind === "divider") {
    return (
      <div className="text-slate-600">
        {text}
        {cursor && <Caret />}
      </div>
    );
  }

  // field or status
  const isCont = row.kind === "field" && row.continuation;
  if (isCont) {
    return (
      <div className="whitespace-pre">
        <span className="text-white">{text}</span>
        {cursor && <Caret />}
      </div>
    );
  }

  const labelPart = ((row.label || "") + ":").padEnd(LABEL_WIDTH);
  const visibleLabel = text.slice(0, Math.min(text.length, labelPart.length));
  const afterLabel = text.length > labelPart.length ? text.slice(labelPart.length + 1) : "";

  // For status: value starts with "● "
  let dot: string | null = null;
  let valueText = afterLabel;
  if (row.kind === "status" && afterLabel.startsWith("●")) {
    dot = "●";
    valueText = afterLabel.slice(1).trimStart();
  } else if (row.kind === "status" && afterLabel.startsWith("● ")) {
    dot = "●";
    valueText = afterLabel.slice(2);
  }

  return (
    <div className="whitespace-pre">
      <span style={{ color: "var(--term-accent)" }}>{visibleLabel}</span>
      {text.length > labelPart.length && <span> </span>}
      {dot && <span style={{ color: "var(--term-ok)" }}>{dot} </span>}
      <span className="text-white">{valueText}</span>
      {cursor && <Caret />}
    </div>
  );
}

function Caret() {
  return (
    <span
      className="cursor-blink ml-0.5 inline-block h-[11px] w-[6px] align-middle"
      style={{ background: "var(--term-accent)" }}
    />
  );
}
