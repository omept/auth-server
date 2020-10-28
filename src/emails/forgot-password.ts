export const forgotPasswordMail = (username: string, link: string): string => {

    return `
    <br />
    Dear ${username},
    <br />
    <br />
    You requested for a password reset. Clink this link : <a href="${link}"> Link </a> <br />
    <br />
    Or copy this into a browser : ${link} 
    <br />
    <br />
    Regards.
    <br />
    <br />
    PS: The link will expire in 24 hours.
    `;

}