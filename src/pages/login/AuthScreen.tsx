import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginSchema, registerSchema } from "./AuthScreen.shema";
import { useNavigate } from "react-router-dom";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../requests/auth/auth.mutation";
import LoggerService from "../../providers/loggerService/loggerService";
import Input from "../../components/Input";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserAlt,
  FaUserTie,
} from "react-icons/fa";
import "./AuthScreen.css";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useUserProfile } from "../../hooks/useUserProfile";

function AuthScreen() {
  const navigation = useNavigate();
  const { userData } = useUserProfile();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      LoggerService.log(JSON.stringify(values, null, 2));
    },
    validationSchema: isLogin ? loginSchema : registerSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const {
    mutate: signIn,
    data: signInData,
    isSuccess: signInIsSuccess,
  } = useSignInMutation();
  const {
    mutate: signUp,
    data: signUpData,
    isSuccess: signUpisSuccess,
  } = useSignUpMutation();

  const authUserData = isLogin ? signInData?.data : signUpData?.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const touchedFields = Object.keys(formik.values)?.reduce((acc, key) => {
      acc[key as keyof typeof formik.values] = true;
      return acc;
    }, {} as typeof formik.touched);

    formik.setTouched(touchedFields);

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn({
          username: formik.values.username,
          password: formik.values.password,
        } as unknown as void);
      } else {
        await signUp({
          username: formik.values.firstName,
          email: formik.values.email,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          password: formik.values.password,
        } as unknown as void);
      }
    } catch (err) {
      LoggerService.error(isLogin ? "SignInError" : "SignUpError", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (submitted) {
      formik.validateField(e.target.name);
    }
  };

  useEffect(() => {
    if (signInIsSuccess && userData) {
      formik.resetForm();
      navigation("/");
    }
  }, [signInIsSuccess, userData, navigation]);

  useEffect(() => {
    if (signUpisSuccess) {
      formik.resetForm();
      setIsLogin(true);
    }
  }, [signUpisSuccess]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="toggle-container">
            <Button
              className={`login-toggle-button ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              {t("auth.login")}
            </Button>
            <Button
              className={`login-toggle-button ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              {t("auth.register")}
            </Button>
          </div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            icon={FaUser}
            type="text"
            placeholder={t("auth.username")}
            value={formik.values.username}
            onChange={handleInputChange}
            name="username"
            required
            error={
              submitted || formik.touched.username
                ? formik.errors.username
                : undefined
            }
          />
          <Input
            icon={FaLock}
            type="password"
            placeholder={t("auth.password")}
            value={formik.values.password}
            onChange={handleInputChange}
            name="password"
            required
            error={
              submitted || formik.touched.password
                ? formik.errors.password
                : undefined
            }
          />
          {!isLogin && (
            <>
              <Input
                icon={FaEnvelope}
                type="email"
                placeholder={t("auth.email")}
                value={formik.values.email}
                onChange={handleInputChange}
                name="email"
                required
                error={
                  submitted || formik.touched.email
                    ? formik.errors.email
                    : undefined
                }
              />
              <Input
                icon={FaUserAlt}
                type="text"
                placeholder={t("auth.firstName")}
                value={formik.values.firstName}
                onChange={handleInputChange}
                name="firstName"
                required
                error={
                  submitted || formik.touched.firstName
                    ? formik.errors.firstName
                    : undefined
                }
              />
              <Input
                icon={FaUserTie}
                type="text"
                placeholder={t("auth.lastName")}
                value={formik.values.lastName}
                onChange={handleInputChange}
                name="lastName"
                required
                error={
                  submitted || formik.touched.lastName
                    ? formik.errors.lastName
                    : undefined
                }
              />
            </>
          )}
          <Button variant="primary" className="auth-button" disabled={loading}>
            {loading
              ? t("auth.loading")
              : isLogin
              ? t("auth.login")
              : t("auth.register")}
          </Button>
        </form>

        <div className="credentials-item">
          <strong>{t("auth.username")}: </strong> oliviaw
          <span className="space"> </span>
          <strong>{t("auth.password")}: </strong> oliviawpass
        </div>
        <div className="credentials-item-desc">{t("auth.description")}</div>

        {authUserData && (
          <div>{`${t("auth.welcome")} ${authUserData?.firstName} ${
            authUserData?.lastName
          }`}</div>
        )}
      </div>
    </div>
  );
}

export default AuthScreen;
