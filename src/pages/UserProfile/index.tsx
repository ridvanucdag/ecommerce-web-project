import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import "./ProfilePage.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAllUsersQuery } from "../../requests/auth/auth.query";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import Loading from "../../components/Loading";
import {
  getParsedItem,
  removeItem,
} from "../../providers/localStorage/localStorageService";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { useUpdateUserMutation } from "../../requests/auth/auth.mutation";
import { useNavigate } from "react-router-dom";
import { ProfileSchema } from "./profile.shema";
import { FaUser } from "react-icons/fa";
import { ActiveTab, MenuItem } from "./useProfile.type";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { authKeyFactory } from "../../requests/auth/authKeyFactory";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: UserGetData, isLoading } = useAllUsersQuery();
  const [profile, setProfile] = useState<AuthSignUpResponse | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = getParsedItem<AuthSignUpResponse>(StorageKeys.Profile);
    setProfile(profileData || null);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: profile?.username || "",
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      currentPassword: "",
      newPassword: "",
    },
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      try {
        if (!profile?.id) throw new Error("User not found");

        const updateData = {
          username: values.username,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          ...(values.newPassword && { password: values.newPassword }),
        };

        await updateUser({
          userId: Number(profile.id),
          params: updateData,
        } as unknown as void);
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
  });

  const { mutateAsync: updateUser, isSuccess } = useUpdateUserMutation({
    userId: profile ? Number(profile.id) : 0,
    params: {
      username: formik.values.username,
      email: formik.values.email,
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      password: formik.values.newPassword,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        currentPassword: "",
        newPassword: "",
      }));
    }
  }, [isSuccess]);

  const handleLogout = async () => {
    await Promise.all([
      removeItem(StorageKeys.Profile),
      removeItem(StorageKeys.User),
    ]);
    queryClient.removeQueries({ 
      queryKey: authKeyFactory.getMe()
    }); 
    navigate("/");
  };

  const menuItems: MenuItem[] = [
    { id: "profile", label: t("profile.profile"), icon: <FiUser /> },
    { id: "users", label: t("profile.users"), icon: <FiUsers /> },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="profile-container">
      <nav className="profile-mobile-nav">
        <div className="profile-nav-header">
          <button
            className="profile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiSettings />
          </button>
          <h2 className="profile-logo">{t("profile.account")}</h2>
          <button className="profile-logout-btn" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="profile-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {menuItems?.map((item) => (
              <Button
                key={item?.id}
                className={`profile-menu-item ${activeTab === item?.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item?.id );
                  setIsMenuOpen(false);
                }}
              >
                {item?.icon}
                {item?.label}
              </Button>
            ))}
          </motion.div>
        )}
      </nav>

      <aside className="profile-sidebar">
        <div className="profile-sidebar-header">
          <h2>{t("profile.profileSettings")}</h2>
        </div>
        <nav className="profile-sidebar-nav">
          {menuItems?.map((item) => (
            <Button
              key={item?.id}
              className={`profile-nav-item ${activeTab === item?.id ? "active" : ""}`}
              onClick={() => setActiveTab(item?.id)}
            >
              {item?.icon}
              <span>{item?.label}</span>
            </Button>
          ))}
          <Button className="profile-nav-item profile-logout" onClick={handleLogout}>
            <FiLogOut />
            <span>{t("profile.logout")}</span>
          </Button>
        </nav>
      </aside>
      <main className="profile-content">
        {activeTab === "users" ? (
          <div className="profile-users-section">
            <h2 className="profile-section-title">{t("profile.userManagement")}</h2>
            <div className="profile-table-container">
              <table className="profile-users-table">
                <thead>
                  <tr>
                  <th>{t("profile.username")}</th>
                    <th>{t("profile.password")}</th>
                    <th>{t("profile.role")}</th>
                  </tr>
                </thead>
                <tbody>
                  {UserGetData?.users?.map((user: AuthSignUpResponse) => (
                    <tr key={user?.id}>
                      <td>{user?.username}</td>
                      <td>{user?.password}</td>
                      <td>
                        <span className={`profile-role-tag ${user?.role?.toLowerCase()}`}>
                          {user?.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <motion.form
            onSubmit={formik.handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="profile-form"
          >
            <h2 className="profile-title">{t("profile.profileInfo")}</h2>
            <div className="profile-form-grid">
              <Input
                icon={FiUser}
                type="text"
                placeholder={t("profile.username")}
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
                required
              />
              <Input
                icon={FiMail}
                type="email"
                placeholder={t("profile.email")}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                required
              />
              <Input
                icon={FaUser}
                type="text"
                placeholder={t("profile.firstName")}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName}
                required
              />
              <Input
                icon={FaUser}
                type="text"
                placeholder={t("profile.lastName")}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName}
                required
              />
              <Input
                icon={FiLock}
                type="password"
                placeholder={t("profile.currentPassword")}
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword}
                required
              />
              <Input
                icon={FiLock}
                type="password"
                placeholder={t("profile.newPassword")}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword}
                required
              />
            </div>
            <div className="profile-form-actions">
              <Button
                type="submit"
                variant="primary"
                disabled={!formik.isValid}
              >
                {t("profile.update")}
              </Button>
            </div>
          </motion.form>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
