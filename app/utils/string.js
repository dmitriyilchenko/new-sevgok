import i18n from '../i18n';


export function firstUpperCase(string) {
  return string.replace(/^[\wа-я]/, c => c.toUpperCase());
}

export function getWarehouseName() {
  if (!arguments[0]) return null;

  if (arguments.length === 1) return `${arguments[0].name}, ${i18n.t(`cities.${arguments[0].city}`)}`;

  if (arguments.length === 2) {
    return `${firstUpperCase(i18n.t('warehouse'))} #${arguments[0].number}, ${i18n.t(`cities.${arguments[1]}`)}`;
  }
}
