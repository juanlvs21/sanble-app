import formatMessageToasts from "./formatMessageToasts";

const labels: any = {
  username: "Usuario",
  name: "Nombre",
  email: "Correo electrónico",
  password: "Contraseña",
  confirmPassword: "Repetir contraseña",
};

const returnRule = (
  rule: string,
  field: string,
  value: string | number = ""
): any => {
  const rules: any = {
    required: {
      value: true,
      message: `El campo ${labels[field]} es requerido.`,
    },
    minLength: {
      value,
      message: `El campo ${labels[field]} debe tener mínimo ${value} caracteres.`,
    },
    pattern_email: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Debe ingresar un Correo electrónico válido",
    },
    pattern_password: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ])+$/,
      message:
        "La contraseña debe contener 1 minuscula, 1 mayuscula, 1 número y 1 símbolo.",
    },
  };

  if (rule === "pattern") return rules[`${rule}_${value}`];
  else return rules[rule];
};

export function validator(field: string, rules: Array<string>): any {
  const valid: any = {};

  for (let i = 0; i < rules.length; i++) {
    const split = rules[i].split(":");
    const rule = split[0];
    const value = split[1];

    valid[rule] = returnRule(rule, field, value);
  }

  return valid;
}

export function getErrorsMsg(errors: any): string {
  return formatMessageToasts(errors);
}
