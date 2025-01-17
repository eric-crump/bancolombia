"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import Header from "@/components/header";

export default function Calculator() {
    const [selected, setSelected] = useState({ 0: [false, false] });
    const [entry, setEntry] = useState({});

    const getContent = async () => {
        const entry = await Stack.getElementByTypeWtihRefs("calculator", "es-co", [
            'modular_blocks.list_boxes.link.page'
        ]);
        console.log("calculator", entry[0][0]);

        let tempSelected = {};
        for (let x = 0; x < entry[0][0].modular_blocks.length; x++) {
            if (entry[0][0].modular_blocks[x].hasOwnProperty('list_boxes') || entry[0][0].modular_blocks[x].hasOwnProperty('text_boxes'))
                tempSelected[x] = [false, false];
        }
        setSelected(tempSelected);

        setEntry(entry[0][0]);
    };

    useEffect(() => {
        onEntryChange(getContent);
    }, []);

    const boxChecked = (row, index) => {
        let temp = selected;
        temp[row][index] = true;
        temp[row][Math.abs(index - 1)] = false;
        setSelected(prev => ({ ...prev, [row]: temp[row] }));
    }


    return (
        <div>
            <Header />

            <div className="flex justify-center w-ful mt-10">
                <div className="w-[848px]">
                    <p className="font-cib text-[#0F275C] text-3xl text-center">{entry?.headline}</p>

                    {entry?.modular_blocks?.map((block, index) => (
                        <div key={index}>
                            {block.hasOwnProperty('list_boxes') &&
                                <div>
                                    <div className="flex justify-between w-full mt-10 items-center">
                                        <p className="font-bold text-[14px]">{block.list_boxes.question}</p>
                                        <a href={block.list_boxes?.link?.page?.length > 0 ? block.list_boxes?.link?.page[0].url : "#"} className="text-xs text-[#6E7D9D] font-semibold tracking-tight">{block.list_boxes.link.text}</a>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 mt-3">
                                        {block.list_boxes.boxes.map((box, boxIndex) => (
                                            <div
                                                className={"border rounded-lg p-4 pr-10 group " + (selected[index][boxIndex] ? "border-[#2F7ABF] border-2 bg-[#F4F6F9]" : "border-[#B7B7B9]")}
                                                onClick={() => boxChecked(index, boxIndex)}
                                                key={boxIndex}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[15px] font-medium text-[#0F275C]">{box.text}</p>
                                                    <input type="checkbox" className="read-only" readOnly={true} checked={selected[index][boxIndex]}></input>
                                                </div>
                                                <ul className="list-disc list-inside text-[12px] text-[#2C2C30] ml-4 font-medium leading-6">
                                                    {block.list_boxes.boxes[boxIndex]?.list_item.map((li, liIndex) => (
                                                        <li key={liIndex}>{li}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            {block.hasOwnProperty('inputs') &&
                                <div className="grid grid-cols-3 gap-20 mt-10">
                                    {block.inputs.items.map((box, boxIndex) => (
                                        <div key={boxIndex}>
                                            <p className="font-bold text-[14px]">{box.question}</p>
                                            <input className="border rounded py-3 px-8 w-full text-[14px] mt-2" placeholder={box.placeholder}></input>
                                            <p className="text-[#75757A] text-[11px] tracking-tighter font-medium mt-2">{box.helper}</p>
                                        </div>
                                    ))}
                                </div>
                            }

                            {block.hasOwnProperty('text_boxes') &&
                                <div>
                                    <p className="mt-10 font-bold text-[14px]">{block.text_boxes.question}</p>

                                    <div className="grid grid-cols-2 gap-8 mt-3">
                                        {block.text_boxes.boxes.map((box, boxIndex) => (
                                            <div 
                                                key={boxIndex} 
                                                className={"border rounded-lg p-4 pr-10 " + (selected[index][boxIndex] ? "border-[#2F7ABF] border-2 bg-[#F4F6F9]" : "border-[#B7B7B9]")}
                                                onClick={() => boxChecked(index, boxIndex)}
                                            >
                                                <div className="flex justify-between items-center ">
                                                    <p className="text-[15px] font-medium text-[#0F275C]">{box.text}</p>
                                                    <input type="checkbox" className="read-only" readOnly={true} checked={selected[index][boxIndex]}></input>
                                                </div>
                                                <p className="text-[12px] text-[#2C2C30] mt-2">{box.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}

                    <div className="mt-10 justify-center w-full flex">
                        <button className="bg-[#FFDD00] rounded text-sm font-semibold font-[#C2C230] py-3 px-16">{entry?.button_text}</button>
                    </div>

                    <div className="flex w-full justify-center">
                        <p className="text-xs text-[#2C2C30] mt-10 w-[500px] text-center">{entry?.legal}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}