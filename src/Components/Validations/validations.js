export const email = {
  email: {
    message: "^* Debes introducir un mail válido"
  },
  presence: {
    allowEmpty: false, 
    message: "^* El mail es requerido"
  }
}
export const user = {
  presence: {
    allowEmpty: false,
    message: "^* El usuario es requerido",
  },
};

export const userLogin = {
  ...user,
};

export const userSignUp = {
  ...user,
  length: {
    minimum: 6,
    maximum: 20,
    tooShort: "^* El nombre de usuario debe contener 6 caracteres al menos",
    tooLong: "^* El nombre de usuario no puede ser de más de 20 caracteres"
  },
};

export const password = {
  presence: {
    allowEmpty: false,
    message: "^* La contraseña es requerida",
  }, 
};

export const passwordSignUp = {
  length: {
    minimum: 6, 
    maximum: 20,
    tooShort: "^* La contraseña debe contener al menos 6 caracteres",
    tooLong: "^* La contraseña no puede ser de más de 20 caracteres"
  }
};
