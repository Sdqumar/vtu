import Spinner from "./sipnner";

type buttonProps = {
    label: string;
    loading?: boolean;
    onClick?: () => void
};


export default function Button({ label, loading, onClick }: buttonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="bg-black"
        >
            {loading && <Spinner />}
            {label}
        </button>
    )
}