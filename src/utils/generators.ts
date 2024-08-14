import { validateProjectTitle } from "./validators"

export const generateInitials = (title) => {
    if(validateProjectTitle(title)){
        const spaceSeperated = title.split(" ");
        return (spaceSeperated.length > 1) ? (spaceSeperated[0][0] + spaceSeperated[1][0]) : (spaceSeperated[0][0] + spaceSeperated[0][1]);
    }
    return null;
}