type buttonProps = {
    title: string;
    active?: boolean;
    onClick:()=>void
};


export default function Button({title, active,onClick}: buttonProps) {
    return (
        <button
            className={`rounded-3xl mx-2 mt-0 ${!active &&`bg-primary-100  -mx-2 text-black `}`}
            onClick={onClick}
            >
            {title}
        </button>
        )
}