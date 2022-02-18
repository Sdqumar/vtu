type errorProps = {
  message: string;
};

export default function Errror({ message }: errorProps) {
  return <p className="mt-2 text-red-600">{message}</p>;
}
