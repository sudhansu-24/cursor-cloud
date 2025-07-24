import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata = {
  title: "CursorCloud",
  description: "The ultimate AI that crafts efficient and optimized code, transforming ideas into reality effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/cursor-cloud.svg" />
      </head>
      <body className="min-h-screen flex flex-col items-center w-full">
        <ConvexClientProvider>

        <Provider>
        {children}

        </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
