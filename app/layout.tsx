// app/layout.tsx
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsappFloat from '@/components/ui/whatsapp-float'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsappFloat phone="+56 9 87772483" />
      </body>
    </html>
  )
}
