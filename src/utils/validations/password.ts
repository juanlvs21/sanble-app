export default (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$¡!%/#+_\-*)(=¿?&])([A-Za-z\d$@$¡!%/#+_\-*)(=¿?&]|[^ ])+$/.test(
    password
  );
};
