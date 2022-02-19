import Spinner from "./sipnner";

type buttonProps = {
  label: string;
  loading?: boolean;
  onClick?: () => void;
  style?: string;
};

export default function Button({
  label,
  loading,
  onClick,
  style,
}: buttonProps) {
  return (
    <button onClick={onClick} disabled={loading} className={style}>
      {loading && <Spinner />}
      {label}
    </button>
  );
}
