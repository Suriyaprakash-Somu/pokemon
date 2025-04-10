export default function getStatColor(value) {
  if (value < 50) return "#ff5959";
  if (value < 70) return "#ffdd57";
  return "#78c850";
}
