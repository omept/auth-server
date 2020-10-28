export const forgotPasswordMail = (username: string, link: string): string => {

    return `
    
    Dear ${username},

    You requested for a password reset. clink this link : ${link} 

    Regards.
    
    `;

}