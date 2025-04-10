import "./globals.css";
import ReactQueryProvider from "./providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
