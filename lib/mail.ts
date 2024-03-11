import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `
        <p>
          Your 2FA Code: ${token}
        </p>
    `,
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
        <p>
            Hello this is your verification token, click the link to verify your email: 

            <a href="${confirmLink}"> 
                Click here
            </a>
        </p>
    `,
  })
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password reset",
    html: `
        <p>
            Hello this is your password token, click the link to reset your password: 

            <a href="${confirmLink}"> 
                Click here
            </a>
        </p>
    `,
  })
}
