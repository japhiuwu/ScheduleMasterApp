"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuLateral from "./components/MenuLateral";
import HeaderCard from "./components/HeaderCard";
import Header from "./components/Header";
import { AppWrapper, useAppContext } from "./context/AppContext";
import InformationToast from "./components/InformationToast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <AppWrapper>
      <html lang="en">
        <body className={inter.className}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </AppWrapper>
  );
}

function LayoutContent({ children }) {
  const { title, subtitle, showMenu, status, setStatus, informationMessage, setInformationMessage, profile, initials, banner, ocultarToast, titleBanner, descriptionBanner, linkBanner } = useAppContext();

  // Verifica si showMenu es verdadero para mostrar el contenido
  return (
    <>
    {!showMenu && (
      <div className="">
        {children}
      </div>
    )}
      {showMenu && (
        <div className="flex h-screen bg-white">
          <MenuLateral />
          <div className="flex flex-1 flex-col min-h-full p-3">
            <Header
              title={title}
              img={
                profile
              }
              initials={initials}
            />
            <div className="ml-16 flex flex-col">
              
              <h1 className="mt-4 text-center text-lg font-extrabold mb-4">{subtitle}</h1>
              {
                banner && (
                  <div className="flex flex-col w-auto p-6">
                    {/* HeaderCard en el espacio vacío */}
                    <HeaderCard
                      titleHeader={titleBanner}
                      description={descriptionBanner}
                      link={linkBanner}
                    />
                    {children}
                  </div>
                )
              }
              {
                !banner && (
                  <div className="flex flex-row flex-wrap justify-center w-auto">
                    {children}
                  </div>
                )
              }
              
            </div>
          </div>
        </div>
      )}
      <InformationToast 
        message={informationMessage}
        status={status}
        setStatus={setStatus}
      />
    </>
  );
}
