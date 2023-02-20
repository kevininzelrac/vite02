export default function DateFormat(date) {
  let diffMs = new Date() - new Date(date);
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = Math.round(diffSec / 60);
  let diffHour = Math.round(diffMin / 60);
  let diffDay = Math.round(diffHour / 24);
  let diffMonth = Math.round(diffDay / 30);
  let diffYear = Math.round(diffMonth / 12);

  if (diffSec < 1) {
    return "à l'instant";
  } else if (diffMin < 1) {
    return "il y a " + diffSec + (diffSec <= 1 ? " seconde" : " secondes");
  } else if (diffHour < 1) {
    return "il y a " + diffMin + (diffMin <= 1 ? " minute" : " minutes");
  } else if (diffDay < 1) {
    return "il y a " + diffHour + (diffHour <= 1 ? " heure" : " heures");
  } else if (diffMonth < 1) {
    return "il y a " + diffDay + (diffDay <= 1 ? " jour" : " jours");
  } else if (diffYear < 1) {
    return "il y a " + diffMonth + " mois";
  } else {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString([], options);
  }
}
