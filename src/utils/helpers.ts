export function getCourseIdFromURL(url: string = window.location.pathname) {
  const paths = url.split("/");
  const courseId = paths.findIndex(v => v === "courses") + 1;
  return paths?.[courseId];
}

export function relativeTime(date: number) {
  if (!date) return "never";

  const fmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = -Math.floor((Date.now() - date * 1000) / 1000) / 86400;

  return fmt.format(Math.floor(diff), "day");
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" }).substring(0, 3);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
