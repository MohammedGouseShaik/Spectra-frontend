// app/(auth)/layout.tsx
import { ReactNode } from "react";
//import "@/styles/globals.css";



export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main> 
      </body>
    </html>
  );
}
