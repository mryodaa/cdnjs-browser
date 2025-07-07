import cdnLogo from "../../../app/assets/cdnLogo.png";
import s from "./Header.module.scss";

export function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerLogoWrapper} onClick={scrollToTop}>
          <img className={s.headerLogo} src={cdnLogo} alt="cdnLogo" />
        </div>
      </div>
    </div>
  );
}
