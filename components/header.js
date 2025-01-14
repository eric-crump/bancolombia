"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

export default function Header() {
    const [entry, setEntry] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getContent = async () => {
        const entry = await Stack.getElementByTypeWtihRefs("header", "es-co", [
            'top_nav_items.page',
            'top_nav_items.mega_menu_items.items.reference',
            'top_nav_links.page',
            'menu_items.page',
            'menu_items.mega_menu_items.items.page'
        ]);
        console.log("header", entry[0][0]);
        setEntry(entry[0][0]);
        setIsLoading(false);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    if (isLoading)
        return (<div></div>)

    return (
        <div className="font-opensans">
            <div className="bg-[#2C292A] text-white px-5 ">
                <div className="max-w-8xl mx-auto w-full flex justify-between">
                    <div className="flex h-full text-[14px] font-semibold items-center gap-1">
                        {entry?.top_nav_items?.map((item, index) => (
                            <div key={index}>
                                {item.mega_menu_items.length === 0 &&
                                    <a href={item?.page?.length > 0 ? item.page[0].url : "#"} key={index} className={"px-2 py-[7px] block " + (index === 0 ? "bg-white text-[#2C292A]" : "hover:bg-white hover:text-[#2C292A]")}>{item.text}</a>
                                }
                                {item.mega_menu_items.length > 0 &&
                                    <Popover>
                                        <PopoverButton className="hover:bg-white hover:text-[#2C292A] py-[7px] px-2 flex items-center focus:outline-none">
                                            <p>{item.text}</p>
                                            <ChevronDownIcon className="size-4 ml-1" />
                                        </PopoverButton>
                                        <PopoverPanel anchor="bottom" className="w-full mt-5">
                                            <div className="max-w-[1410px] mx-auto bg-white p-8 flex">
                                                <div className="grid grid-cols-3 mx-auto gap-x-32 gap-y-10">
                                                    {item.mega_menu_items.map((category, catIndex) => (
                                                        <div key={catIndex} className="text-[13px] leading-6">
                                                            <p className="font-medium text-xl mb-5">{category.category}</p>
                                                            {category.items?.map((catItem, catItemIndex) => (
                                                                <a key={catItemIndex} href={catItem?.reference?.length > 0 ? catItem.reference[0].url : "#"} className="block">{catItem.text}</a>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                }
                            </div>
                        ))}


                    </div>

                    <div className="flex items-center gap-4 text-[14px] font-semibold">
                        {entry?.top_nav_links?.map((item, index) => (
                            <a key={index} href={item?.page?.length > 0 ? item.page[0].url : "#"} className="block">{item.text}</a>
                        ))}
                    </div>
                </div>
            </div >

            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
                <img src={entry?.logo?.url} />

                <div className="flex gap-10 items-center">
                    {entry?.menu_items?.map((item, index) => (
                        <div key={index}>
                            {item.mega_menu_items.length === 0 &&
                                <a href={item?.page?.length > 0 ? item.page[0].url : "#"} className="text-xs">Inicio</a>
                            }
                            {item.mega_menu_items.length > 0 &&
                                <Popover className="flex items-center">
                                    <PopoverButton className="text-xs">{item.text}</PopoverButton>
                                    <PopoverPanel anchor="bottom " className="w-full mt-5">
                                        <div className="max-w-[1410px] mx-auto bg-white p-8 flex">
                                            <div className="grid grid-cols-3 mx-auto gap-x-32 gap-y-10">
                                                {item.mega_menu_items.map((category, catIndex) => (
                                                    <div key={catIndex} className="text-[13px] leading-6">
                                                        <p className="font-medium text-xl mb-5">{category.category}</p>
                                                        {category.items?.map((catItem, catItemIndex) => (
                                                            <a key={catItemIndex} href={catItem?.page?.length > 0 ? catItem.page[0].url : "#"} className="block">{catItem.text}</a>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            }
                        </div>
                    ))}
                </div>

                <div className="flex items-center">
                    <a href="#" className="bg-[#2C292A] h-min rounded-full text-white py-2 px-3 text-[13px] font-semibold block">Trámites digitales</a>
                    <div className="shadow-md flex items-center ml-5 py-1 px-4">
                        <p className="text-[12px]">Sucursal Virtual Personas</p>
                        <ChevronDownIcon className="size-4 ml-1" />
                        <a href="#" className="rounded-full bg-[#FDDA24] ml-4 px-4 py-2 text-[12px] hover:shadow-lg">Entrar</a>
                    </div>
                </div>
            </div>
        </div >
    )
}