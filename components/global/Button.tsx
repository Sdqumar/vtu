import Spinner from "./sipnner";

type buttonProps = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: string;
};

export default function Button({
  label,
  loading,
  onClick,
  style,
  disabled,
}: buttonProps) {
  return (
    <button onClick={onClick} disabled={loading || disabled} className={style}>
      {loading ? <Spinner /> : label}
    </button>
  );
}
