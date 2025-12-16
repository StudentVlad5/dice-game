import MuiProvider from "./components/MuiProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
