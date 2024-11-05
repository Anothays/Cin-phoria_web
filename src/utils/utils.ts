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

// récupérer la date du dernier mercredi
export const getLastWednesday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const lastWednesday = new Date();
  lastWednesday.setDate(today.getDate() - ((dayOfWeek + 4) % 7));
  return lastWednesday.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
}
