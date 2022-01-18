type buttonProps = {
    title: string;
    active?: boolean;
    onClick: () => void
};


export default function FormBtn({ title, active, onClick }: buttonProps) {
    return (
        <button
            className={`rounded-3xl mx-2 mt-0 bg-primary ${!active && `bg-teal-100  -mx-2 text-black `}`}
            onClick={onClick}
        >
            {title}
        </button>
    )
}