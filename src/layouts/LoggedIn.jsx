import Link from 'next/link'
import { Alert } from '@components/Alert'

export function LoggedInLayout({ children }) {
  let date = new Date()
  date = date.getFullYear()

  return (
    <>
      <div className="flex flex-col justify-between w-screen h-screen">
        <div>
          {/* Main Navigation */}
          <nav className="bg-purple-900 text-white shadow-lg z-10 sticky top-0 w-full">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
              {/* Left Side */}
              <div className="space-x-4">
                <Link href="/">
                  <a>My Invoices</a>
                </Link>
              </div>
            </div>
          </nav>

          {/* Route Page Content */}
          <div className="container my-6 max-w-4xl mx-auto">{children}</div>
        </div>

        {/* Footer */}
        <footer>
          <div className="container mx-auto py-4 px-4 text-xs">
            Copyright © {date} We Plan You Jam. All rights reserved.
          </div>
        </footer>
      </div>
      <Alert></Alert>
    </>
  )
}
