import * as yup from "yup";
export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kullanıcı adı zorunludur")
    .min(5, "Kullanıcı adı en az 5 karakter olmalıdır"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kullanıcı adı zorunludur")
    .min(5, "Kullanıcı adı en az 5 karakter olmalıdır"),
  email: yup
    .string()
    .email("Geçerli bir email girin")
    .required("Email zorunludur"),
  firstName: yup
    .string()
    .required("Ad zorunludur")
    .min(3, "Ad en az 3 karakter olmalıdır"),
  lastName: yup
    .string()
    .required("Soyad zorunludur")
    .min(3, "Soyad en az 3 karakter olmalıdır"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});
