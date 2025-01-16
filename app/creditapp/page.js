"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import FormBuilder from "@/components/formBuilder";
import Header from "@/components/header";

export default function Page(){
    const [entry, setEntry] = useState({});

    const getContent = async () => {
        const entry = await Stack.getElementByType("credit_app", "es-co");
        console.log("page", entry[0][0]);
        setEntry(entry[0][0]);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    return(
        <div className="">
            <Header />
            
            <div className="flex">
                <div className="min-h-screen h-full w-1/4 bg-[#F4F6F9] min-w-[400px] p-12">
                    <div className={"[&_ul]:list-disc [&>h1]:text-[30px] [&>h1]:text-[#0F275C] [&>h1]:font-cib [&>h1]:leading-9 " +
                        "[&>h3]:font-semibold text-[#45474A]"
                    }
                        dangerouslySetInnerHTML={{
                            __html: entry?.sidebar
                        }}
                    >

                    </div>
                    {/* <p className="text-[30px] text-[#0F275C] font-cib">El camino a tu sueño comienza aquí</p>
                    <p className="font-semibold mt-5 text-[#45474A]">Descubre el monto al que podrías acceder en menos de 5 minutos</p>
                    <p className="text-[#45474A] mt-5 font-medium">Te pediremos los siguientes datos:</p> */}
                </div>

                <div className="w-full">
                    <div className="w-[600px] mx-auto pt-24">
                        <FormBuilder content={entry?.form_builder}/>
                    </div>
                </div>
            </div>
        </div>
    )
}