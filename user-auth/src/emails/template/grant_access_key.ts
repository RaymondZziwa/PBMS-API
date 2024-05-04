export const requestUserAccessKeyEmail = (
  name: string,
  accessKey: string,
): string => {
  return `
    Dear ${name},

    We received a request to reset your password for your account at ProfBioresearch Management System. To help you regain access to your account, we have generated a unique access key for you.

    Access Key: ${accessKey}

    Please use the provided access key to reset your password. You can do so by following these steps:

    1.Enter your email address associated with your account.
    2.Use the access key provided in this email to verify your identity.
    3.Create a new password for your account.
    If you did not request a password reset or if you have any concerns, please contact our support team immediately.

    Thank you for your attention to this matter.

    Best regards,
    Megacode Systems Support
`;
};
