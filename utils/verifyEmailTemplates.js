
const verifyEmailTemplate = (name , url) => {
        return `
        <p>Dear ${name}</p>
        <h3>Thank you for registering in Shopysam</h3>
        <a href=${url}  style="color:white;background:green;margin-top:20px;padding:8px 20px>
        Verify Email</a>
        `
}

export default verifyEmailTemplate