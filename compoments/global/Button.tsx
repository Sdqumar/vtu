type buttonProps ={
    title:string
};


export default function Button({title}:buttonProps) {
    return (
        <span className="mx-10 bg-green-300 text-red-700">{title}</span>
        );
};