export function pluralize(quantity: number, forms: [string, string]): string {
  const [singular, plural] = forms;
  return quantity === 1 ? singular : plural;
}
