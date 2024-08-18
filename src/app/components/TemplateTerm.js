import MenuLateral from "./MenuLateral";
import Header from "../components/Header";
import HeaderCard from "../components/HeaderCard";

export default function Template({ title, img, initials, children, titleHeader, description }) {
  return (
    <div className="flex h-screen bg-white">
      <MenuLateral />
      {/* Header en la parte superior */}


      <div className="flex flex-1 flex-col">
        {/* Menu lateral a la izquierda */}
        <Header
          title={title}
          img={
            "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Everything_I_Wanted.png"
          }
          initials={"IM"}
        />

        <div className="flex flex-col w-auto ml-16 p-6">
          {/* HeaderCard en el espacio vacío */}
          <HeaderCard
            titleHeader={titleHeader}
            description={description}
            
          />
          {children}
        </div>
      </div>
    </div>
  );
}
