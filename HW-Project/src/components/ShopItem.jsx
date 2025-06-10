
const ShopItem = ({link1,link2,ImageLink, heading1,heading2}) => {
  return (
    <div className="relative ">
        <img src={ImageLink}  className="h-100"/> 
        <div className="absolute inset-0 text-center mt-10">
          <h2 className="font-semibold">{heading1}</h2>
          <h2 className="text-3xl font-semibold">{heading2}</h2>
          <div className="underline mt-5 text-green-500">
            <a href="#" className="m-5">{link1}</a> 
            <a href="#">{link2}</a>
          </div>
        </div>
    </div>
  )
}
export default ShopItem