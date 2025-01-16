import { usePathname } from 'next/navigation' 

export default function Tabs({ content }){
    const pathname = usePathname();

    if(pathname.endsWith("/account") ){
        return (<></>)
    }

    return(
        <div className="w-full -mt-6 flex">
            <div className="mx-auto shadow flex bg-white text-center text-sm">
                {content?.tabs?.map((item, index) => (
                    <a 
                        key={index} href={item?.page?.length > 0 ? item.page[0].url : "#"} 
                        className={"border-b w-[140px] xl:w-[185px] py-3 font-bold " +
                            (pathname.endsWith(item.text.toLowerCase()) ? "border-[#FDDA24] " : 
                                (pathname.endsWith('/') && index === 0 ? "border-[#FDDA24] " : "border-[#2C292A] ")) +
                                (index >= 4 ? "hidden lg:block" : "")
                        }
                    >
                        {item.text}
                    </a>
                ))}
            </div>
        </div>
    )
}