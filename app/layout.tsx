import '../styles/globals.css'; 


export const metadata = {
  title: 'Link Sharing App',
  description: 'A link sharing application built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
