import MenuLateral from "./MenuLateral";
import Header from "./Header";

export default function Template({ title, img, initials, subtitulo, children  }) {
  return (
    <div className="flex h-screen bg-white">
    <MenuLateral />
    {/* Header en la parte superior */}


    <div className="flex flex-1 flex-col min-h-full p-3">
      {/* Menu lateral a la izquierda */}
      <Header
        title={title}
        img={
          "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Everything_I_Wanted.png"
        }
        initials={"IM"}
      />

      <div className="ml-16 flex justify-center flex-col">
        <h1 className="mt-4 text-center text-lg font-extrabold mb-4">{subtitulo}</h1>
        <div className="flex flex-row flex-wrap justify-center w-auto">
          {children}
        </div>
      </div>
    </div>
  </div>
  );
}
