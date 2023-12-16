import './globals.css'
import { Providers } from '../store/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Eshop',
  description: 'Project for growth with fast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-512/free-avatar-380-456332.png?f=webp&w=256" />
      </head>
      <body className={inter.className}>
        <Providers>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Providers>
        
        {/* <script src="assets/vendors/js/vendor.bundle.base.js"></script>
        <script src="assets/vendors/chart.js/Chart.min.js"></script>
        <script src="assets/js/jquery.cookie.js" type="text/javascript"></script>
        <script src="assets/js/off-canvas.js"></script>
        <script src="assets/js/hoverable-collapse.js"></script>
        <script src="assets/js/todolist.js"></script> */}

          {/*
            <script src="assets/js/misc.js"></script>
            <script src="assets/js/dashboard.js"></script>
          */}
          <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </body>
    </html>
  )
}
