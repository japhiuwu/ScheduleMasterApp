import Image from "next/image";
import Header from "./components/Header";
import MenuLateral from "../components/MenuLateral";

export default function Home() {
  return (
    <body>
      <MenuLateral />
      <Header term={"III PAC"} year={2025} startDate={"1 Jan"} endDate={"31 Dec"}/>
      
    </body>
  );
}
