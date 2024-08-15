import { validateProjectTitle } from "./validators"

export const generateInitials = (title:string) => {
    if(validateProjectTitle(title)){
        const spaceSeperated = title.trim().split(" ");
        console.log(spaceSeperated);
        return (spaceSeperated.length > 1) ? (spaceSeperated[0][0] + spaceSeperated[1][0]) : (spaceSeperated[0][0] + spaceSeperated[0][1]);
    }
    return null;
}