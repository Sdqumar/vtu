type buttonProps = {
  title: string;
  active?: boolean;
  onClick: () => void;
};

export default function FormBtn({ title, active, onClick }: buttonProps) {
  return active ? (
    <button
      className={`mx-2 mt-0 rounded-3xl bg-black text-white `}
      onClick={onClick}
    >
      {title}
    </button>
  ) : (
    <button
      className={`mx-2 mt-0 rounded-3xl bg-teal-100 text-black `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
