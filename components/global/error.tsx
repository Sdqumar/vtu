type errorProps = {
    message: string;
  };

export default function Errror({ message }: errorProps) {
    return <p className="text-red-600 mt-2">{message}</p>;
  }
  