export function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString();
}

export function formatCurrency(value?: number) {
  if (typeof value !== "number") return "-";
  return value.toLocaleString(undefined, { style: "currency", currency: "PHP" });
}