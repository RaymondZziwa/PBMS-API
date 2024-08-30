export const generateWelcomeEmail = (
  name: string,
  generatedPwd: string,
): string => {
  return `
    Dear ${name},

    We are thrilled to welcome you to the Prof-bioresearch family! 🎉
    
    Your registration as an employee has been successfully completed, and we are excited to have you on board. 
    As a valued member of our team, you will play a crucial role in our company's success.
    
    To access your employee account and begin your journey, please use the email address that was used for registration and this one time 
    password: ${generatedPwd}

    Use this link to access the company system: https://profbioresearchmanager.com or the backup link https://pbms.netlify.app
    
    Once again, welcome to ProfBioresearch! We look forward to working together and achieving great things.
    
    Best regards,
    Megacode Systems Support
    `;
};
