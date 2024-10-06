  import './global.css'
  import { Space_Mono } from "next/font/google"

  export const metadata = {
    title: 'UA',
    description: 'a solor system',
  }

  const font = Space_Mono({ subsets: ["latin"], display: "swap", weight: "400" })

  export default function RootLayout({ children }) {
    return (
      <html lang='en' className='antialiased'>
        <head />
        <body className={`${font.className} dark`}>
          {children}
        </body>
      </html>
    )
  }
