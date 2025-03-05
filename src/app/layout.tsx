import "./globals.css";
import NextAuthSessionProvider from "@/provider/Provider";
import ReduxProvider from "@/provider/ReduxProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0B101B" }}>
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/assets/images/Swirl.png')`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              zIndex: -1,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/assets/images/Cubes.png')`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: "0.8",
              zIndex: -1,
            }}
          />
        </div>
        <div className="relative z-10 min-h-screen">
          <ReduxProvider>
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}