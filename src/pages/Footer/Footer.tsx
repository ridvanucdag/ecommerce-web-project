import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaApple,
  FaGooglePlay,
  FaAppStore,
} from "react-icons/fa";
import visa from "../../assets/image/visa.png";
import masterpass from "../../assets/image/masterpass.jpg";
import gpay from "../../assets/image/gpay.png";
import paypal from "../../assets/image/paypal.png";
import { useTranslation } from "react-i18next";
import "./footer.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer-section">
        <h3>{t('footer.ecommerce')}</h3>
        <ul>
          <p className="footer-description">
          {t('footer.description')}
          </p>
        </ul>
      </div>

      <div className="footer-section">
        <h3>{t('footer.aboutUs')}</h3>
        <ul>
          <li>
            <a href="#">{t('footer.ourPartners')}</a>
          </li>
          <li>
            <a href="#">{t('footer.investorRelations')}</a>
          </li>
          <li>
            <a href="#">{t('footer.customerServices')}</a>
          </li>
          <li>
            <a href="#">{t('footer.career')}</a>
          </li>
          <li>
            <a href="#">{t('footer.privacyPolicy')}</a>
          </li>
          <li>
            <a href="#">{t('footer.securityPolicy')}</a>
          </li>
          <li>
            <a href="#">{t('footer.secureShoppingGuide')}</a>
          </li>
          <li>
            <a href="#">{t('footer.contactUs')}</a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>{t('footer.platform')}</h3>
        <ul>
          <li>
            <a href="#">{t('footer.beSeller')}</a>
          </li>
          <li>
            <a href="#">{t('footer.beSupplier')}</a>
          </li>
          <li>
            <a href="#">{t('footer.womenEntrepreneur')}</a>
          </li>
          <li>
            <a href="#">{t('footer.deliveryPoint')}</a>
          </li>
          <li>
            <a href="#">{t('footer.paymentOptions')}</a>
          </li>
          <li>
            <a href="#">{t('footer.bankCampaigns')}</a>
          </li>
          <li>
            <a href="#">{t('footer.transactionGuide')}</a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>{t('footer.socialMedia')}</h3>
        <ul>
          <li>
            <a href="#">
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <a href="#">
              <FaYoutube /> Youtube
            </a>
          </li>
          <li>
            <a href="#">
              <FaTiktok /> TikTok
            </a>
          </li>
          <li>
            <a href="#">
              <FaFacebook /> Facebook
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter /> X
            </a>
          </li>
          <li>
            <a href="#">
              <FaLinkedin /> Linkedin
            </a>
          </li>
          <li>
            <a href="#">
              <FaPinterest /> Pinterest
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>{t('footer.hurryDownload')}</h3>
        <ul className="app-downloads">
          <li>
            <a href="#">
              <FaApple /> {t('footer.appStore')}
            </a>
          </li>
          <li>
            <a href="#">
              <FaGooglePlay /> {t('footer.googlePlay')}
            </a>
          </li>
          <li>
            <a href="#">
              <FaAppStore /> {t('footer.appGallery')}
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>
        {t('footer.copyright')}{" "}
          <a
            href="https://github.com/ridvanucdag"
            target="_blank"
            className="ridvanucdag"
          >
            ridvanucdag
          </a>
        </p>
        <div className="payment-logos">
          <img src={visa} alt="Visa" />
          <img src={masterpass} alt="Masterpass" />
          <img src={gpay} alt="GPay" />
          <img src={paypal} alt="Paypal" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
