export const siteConfig = {
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sonalisinha0610@gmail.com",
    formsubmitUrl: `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sonalisinha0610@gmail.com"}`,
} as const;
