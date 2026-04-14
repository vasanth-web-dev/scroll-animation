import '../styles/globals.css'

export const metadata = {
  title: 'Scroll-Driven Hero Animation | ITZFIZZ',
  description: 'A professional scroll-driven hero section built with Next.js, GSAP, and Tailwind CSS',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
