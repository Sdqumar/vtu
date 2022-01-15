type buttonProps ={
    title:string
};


export default function Button({title}:buttonProps) {
    return (
        <span className="px-4">{title}</span>
        );
};