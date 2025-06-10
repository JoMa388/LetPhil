import img from '../assets/pc-P1S.jpg'
const Swipper = ({title,subheading} ) => {
  return (
    <div className="overflow-hidden h-[600px]"> 
        <img src={img} alt=""  className="scale-150  z-1 mt-25"/>
        <div className="absolute inset-0 text-start flex justify-center flex-col ml-40 mt-10">
            <div>
            <h2 className="text-white font-semibold text-5xl" >{title}</h2>
            <p className="text-white mt-5">{subheading}</p>
            </div>
            <div className='mt-11'>
                 <button className="bg-white  px-15 py-2 rounded-sm mr-4">Buy now</button>
                <button className="bg-transparent text-white border border-white-500 px-13 py-2 rounded-sm">Learn more</button>
            </div> 
         </div>
    </div>
  )
}
export default Swipper