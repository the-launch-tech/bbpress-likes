export default function parseLikes(n) {
  const int = parseInt(n)

  if (!int) {
    return 0
  }

  if (int < 1000) {
    return int
  } else if (int > 999) {
    return (int / 1000).toFixed(2) + 'K'
  }

  return 0
}
