export function formatDuration(numMin) {
  const hours = Math.floor(numMin / 60)
  const minutes = numMin % 60
  return `${hours && `${hours}h`}${minutes}${hours ? '' : 'min'}`
}
