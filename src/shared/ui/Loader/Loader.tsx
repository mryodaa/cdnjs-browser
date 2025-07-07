import s from "./Loader.module.scss";

interface ILoaderProps {
  size?: number;
  color?: string;
}

export const Loader: React.FC<ILoaderProps> = ({
  size = 1,
  color = "#eb6d06",
}) => {
  const style: React.CSSProperties & Record<"--loader-color", string> = {
    width: `${size}rem`,
    height: `${size}rem`,
    "--loader-color": color,
  };
  return <div className={s.loader} style={style} />;
};
