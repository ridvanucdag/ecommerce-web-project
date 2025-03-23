import * as yup from "yup";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { getParsedItem } from "../../providers/localStorage/localStorageService";

const PASSWORD_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 30;

export const ProfileSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kullanıcı adı zorunludur")
    .trim()
    .max(USERNAME_MAX_LENGTH, `En fazla ${USERNAME_MAX_LENGTH} karakter`)
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Sadece harf, rakam ve alt çizgi kullanılabilir"
    ),

  firstName: yup
    .string()
    .required("Ad zorunludur")
    .trim()
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Geçerli bir ad girin"),

  lastName: yup
    .string()
    .required("Soyad zorunludur")
    .trim()
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Geçerli bir soyad girin"),

  email: yup
    .string()
    .required("E-posta zorunludur")
    .trim()
    .email("Geçerli bir e-posta adresi girin")
    .matches(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Geçerli bir e-posta adresi girin (örnek: user@example.com)"
    ),
  currentPassword: yup
    .string()
    .required("Mevcut şifrenizi girmelisiniz")
    .test("password-match", "Mevcut şifreniz hatalı", function (value) {
      const profile = getParsedItem<AuthSignUpResponse>(StorageKeys.Profile);
      return !!profile?.password && value === profile.password;
    }),

  newPassword: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, `Yeni şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalı`)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Yeni şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
      )
    .test(
      "not-same-as-current",
      "Yeni şifre eski şifre ile aynı olamaz",
      function (value) {
        return !value || value !== this.parent.currentPassword;
      }
    ),
});
