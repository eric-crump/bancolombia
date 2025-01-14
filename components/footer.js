"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";

export default function Footer() {
    const [entry, setEntry] = useState({});

    const getContent = async () => {
        const entry = await Stack.getElementByTypeWtihRefs("footer", "es-co", [
            
        ]);
        console.log("footer", entry[0][0]);
        setEntry(entry[0][0]);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    return (
        <div>
            <div className="bg-[#2C292A] pt-12 pb-24 text-white flex justify-center">
                <div className="grid grid-cols-4 gap-4">
                    {entry?.categories?.map((item, index) => (
                        <div key={index}>
                            <p className={"text-[18px] font-bold " + (item.title === "" ? "pb-12" : "pb-5")}>{item.title}</p>
                            {item.items.map((link, linkIndex) => (
                                <a key={linkIndex} href="#" className="text-xs font-semibold mt-5 block">{link.text}</a>
                            ))}
                            
                        </div>
                    ))}
                </div>

                <div className="border-l border-white text-[12px] w-[400px] pl-5 flex flex-col mt-12 ml-5 leading-tight pt-12">
                    <p className="">Productos y servicios de Banca, Fiducia, Banca de Inversión, Financiamiento, además del portafolio ofrecido por las entidades del exterior en Panamá, Estados Unidos y Puerto Rico.</p>
                    <div className="flex mt-4">
                        <img src="https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/6ec7f8ca-f6f8-46c9-9e61-c69bc4593c3a/Group+4.svg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_K9HC1202P864E0Q30449MS3000-6ec7f8ca-f6f8-46c9-9e61-c69bc4593c3a-p2j9JT3" />
                        <p className="text-[9px] ml-4">BANCOLOMBIA S.A. Establecimiento Bancario</p>
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="max-w-6xl flex justify-between mx-auto items-center">
                    <img src="https://www.bancolombia.com/wcm/connect/a67af2d6-c768-4f4f-a33b-fd58074f7ce9/logo-bancolombia-black.svg?MOD=AJPERES" />
                    <p>Copyright © 2025 Grupo Bancolombia</p>
                </div>
            </div>
        </div>
    )
}