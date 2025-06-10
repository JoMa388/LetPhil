import NavItem from "./NavItem"
import HomeIcon from "./HomeIcon"
import Button from "./Button"
const Navbar = () => {
  return (
    <div className=" bg-black flex align-center justify-around z-10 relative">
        <HomeIcon/>  
        <div className="m-4">
        <NavItem title={"Products"}/>
        <NavItem title={"Filament"}/>
        <NavItem title={"Accessories"}/>
        <NavItem title={"Software"}/>
        <NavItem title={"MakerWorld"}/>
        <NavItem title={"Explore"}/>
        <NavItem title={"Support"}/>
        </div>
        <div className="m-2">
        <Button  title={"Store"}/>   
        </div>
    </div>
  )
}
export default Navbar