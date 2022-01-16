export type form = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
}

export const submitForm=(values:form)=>{
console.log(values);

}