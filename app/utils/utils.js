export function copyArrayWithoutIconKey(arr, iconKey) {
  return arr.map(item => {
    const newItem = {};
    for (const key in item) {
      if (key !== iconKey) {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}
