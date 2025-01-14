"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export default function ArticleGrid({ content, taxonomies }) {
    const [articles, setArticles] = useState([]);

    const getContent = async () => {
        const tax = taxonomies.map(t => t.term_uid)
        const entry = await Stack.getElementByTypeByTaxonomy("article", "es-co", tax);
        //console.log("articles", entry[0]);
        setArticles(entry[0]);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    return (
        <div className="bg-[#F7F7F7] w-full mt-8 pb-24">
            <div className="max-w-7xl grid grid-cols-3 mx-auto gap-8">
                {articles.slice(0, content?.max_items).map((item, index) => (
                    <div key={index} className="h-[354px] bg-white shadow text-center">
                        <img src={item.image?.url} />
                        <div className="pb-4 px-2">
                            <div className="pt-4 px-4 h-[180px] flex flex-col justify-between">
                                <p className="font-bold  text-[18px]">{item.headline}</p>
                                <p className=" text-[15px]">{item.teaser}</p>
                                <a href="#" className="underline  block font-semibold">{item.link?.text}</a>
                            </div>
                            <div className="border-t border-[#CCCCCC] mt-3 flex py-2">
                                {item.select.map((link, linkIndex) => (
                                    <div key={linkIndex} className={" " + (item.select.length > 1 ? "w-1/2" : "w-full")}>
                                        {link === "Simular" &&
                                            <div className="flex justify-center items-center">
                                                <p className="font-bold py-1.5">SIMULAR</p>
                                                <div className="ml-2 size-9 rounded-full shadow flex items-center justify-center">
                                                    <ArrowTopRightOnSquareIcon className="size-5" />
                                                </div>
                                            </div>
                                        }
                                        {link === "Solicitar" &&
                                            <div className={"flex justify-center items-center border-[#CCCCCC] " + (item.select.length > 1 ? "border-l" : "")}>
                                                <p className="font-bold py-1.5">SOLICITAR</p>
                                                <div className="ml-2 size-9 rounded-full bg-[#FDDA24] shadow flex items-center justify-center">
                                                    <ArrowRightIcon className="size-5" />
                                                </div>
                                            </div>
                                        }
                                        {link === "Conocer el crédito" &&
                                            <div className="flex justify-center items-center">
                                                <p className="font-bold py-1.5 uppercase">Conocer el crédito</p>
                                                <div className="ml-2 size-9 rounded-full shadow flex items-center justify-center bg-[#FDDA24]">
                                                    <ArrowTopRightOnSquareIcon className="size-5" />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}