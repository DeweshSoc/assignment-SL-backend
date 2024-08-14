export const validateProjectTitle = (title:string) => {
    const allowed =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 2) return false;
    for(let char of trimmedTitle){
        if(!allowed.split("").includes(char)) return false;
    }
    return true
};
