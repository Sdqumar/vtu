type buttonProps = {
  title: string;
  active?: boolean;
  onClick: () => void;
};

export default function FormBtn({ title, active, onClick }: buttonProps) {
  return active ? (
    <button
      className={`rounded-3xl mx-2 mt-0 bg-black text-white `}
      onClick={onClick}
    >
      {title}
    </button>
  ) : (
    <button
      className={`rounded-3xl mx-2 mt-0 bg-teal-100 text-black `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
