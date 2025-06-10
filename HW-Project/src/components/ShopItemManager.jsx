import ShopItem from "./ShopItem"
const ImageLinks = [
  "https://cdn1.bambulab.com/home/quickLink/Printer-PC-139c8d33e2ed.jpg",
  "https://cdn1.bambulab.com/home/quickLink/Filament-pc.jpg",
  "https://cdn1.bambulab.com/home/quickLink/MW_PC-EN-139c8d33e2ed.jpg",
  "https://cdn1.bambulab.com/home/quickLink/PC/Supply.jpg"]
const ShopItemManager = () => {
  return (
    <div className="mt-5 gap-5 w-full grid grid-row-2 grid-col-2">
      <div className="grid-1 row-1 ">
        <ShopItem link1={"Buy now"} link2={"Compare all"} ImageLink={ImageLinks[0]} heading1={"3D Printers"} heading2={"Powerful Tools for Makers"} />
      </div>
      <div className="grid-2 row-1">
        <ShopItem link1={"Buy now"} link2={"Explore"} ImageLink={ImageLinks[1]} heading1={"Filaments"} heading2={"High-Quality 3D Printing Materials"}/>
      </div>
        <ShopItem link1={"Buy now"} link2={"Explore"} ImageLink={ImageLinks[2]} heading1={"Filaments"} heading2={"High-Quality 3D Printing Materials"}/>
        <ShopItem link1={"Buy now"} link2={"Explore"} ImageLink={ImageLinks[3]} heading1={"Filaments"} heading2={"High-Quality 3D Printing Materials"}/>
    </div>
  )
}
export default ShopItemManager