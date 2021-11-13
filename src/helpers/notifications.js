export const notificationList = ({
  list,
  color = null,
  position = "top-right",
  duration = 6000,
  progress = "auto",
}) => {
  let lts = "";
  list.map((err) => {
    lts = `<li>${err}</li>`;
  });

  return {
    color,
    position,
    progress,
    duration,
    text: `
      <ul>
        ${lts}
      </ul>
    `,
  };
};
