export function calcTransportLoad(currentLoadVal: number, maxLoadVal: number) {
  if ((currentLoadVal / maxLoadVal) * 100 <= 35) {
    return 'transport_load_green';
  }

  if (
    (currentLoadVal / maxLoadVal) * 100 > 35 &&
    (currentLoadVal / maxLoadVal) * 100 <= 70
  ) {
    return 'transport_load_orange';
  }

  if (
    (currentLoadVal / maxLoadVal) * 100 > 70 &&
    (currentLoadVal / maxLoadVal) * 100 <= 100
  ) {
    return 'transport_load_red';
  }
}

export function calcTransportLoadProgressColor(
  currentLoadVal: number,
  maxLoadVal: number
) {
  if ((currentLoadVal / maxLoadVal) * 100 <= 35) {
    return 'text-green-700/80';
  }

  if (
    (currentLoadVal / maxLoadVal) * 100 > 35 &&
    (currentLoadVal / maxLoadVal) * 100 <= 70
  ) {
    return 'text-amber-500/80';
  }

  if (
    (currentLoadVal / maxLoadVal) * 100 > 70 &&
    (currentLoadVal / maxLoadVal) * 100 <= 100
  ) {
    return 'text-red-700/60';
  }
}
