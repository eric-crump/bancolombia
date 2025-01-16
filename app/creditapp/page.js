"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import FormBuilder from "@/components/formBuilder";
import Header from "@/components/header";

export default function Page(){
    const [entry, setEntry] = useState({});
    const [wizardIndex, setWizardIndex] = useState(0);

    const getContent = async () => {
        const entry = await Stack.getElementByType("credit_app", "es-co");
        console.log("page", entry[0][0]);
        setEntry(entry[0][0]);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    const wizardButtonClicked = () => {
        setWizardIndex(wizardIndex + 1);
    }

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
                </div>

                <div className="w-full">
                    <div className="w-[600px] mx-auto pt-24">
                        {entry?.wizard?.map((page, index) => (
                            <div key={index}>
                                {index === wizardIndex &&
                                    <FormBuilder key={index} content={page.page} nextEvent={wizardButtonClicked}/>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}