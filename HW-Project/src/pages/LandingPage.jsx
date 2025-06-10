import Navbar from "../components/Navbar"
import Swipper from "../components/Swipper"
import ShopItemManager from "../components/ShopItemManager"
const LandingPage = () => {
  return (
    <>
        <Navbar/>
        <Swipper title={"Bambu Lab P1S"} subheading={"Versatile Workhorse 3D Printer"}/>
        <ShopItemManager/>
    </>
  )
}
export default LandingPage