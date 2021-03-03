export default (value: number, usd: boolean = false) => {
  if (usd) return `${value}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  else return `${value}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};
