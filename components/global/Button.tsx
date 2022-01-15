type buttonProps = {
    title: string;
    active?: boolean;
    onClick:()=>void
};


export default function Button({title, active,onClick}: buttonProps) {
    return (
        <button
            className={`px-5 py-2 whitespace-nowrap  ease-in-out  duration-700 font-medium  rounded-3xl   ${active &&`bg-primary-600  text-white mx-2`}`}
            onClick={onClick}
            >
            {title}
        </button>
        )
}