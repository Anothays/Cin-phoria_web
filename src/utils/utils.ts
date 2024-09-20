/**
 * date exemple : 2010-07-16T00:00:00+00:00
 */
export const dateFormat = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

export const dateFormatter = (options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }): Intl.DateTimeFormat => {
  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  return formatter;
}