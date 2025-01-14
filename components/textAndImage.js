
export default function TextAndImage({ content }){
    return(
        <div className={"max-w-6xl mx-auto px-4 flex text-[#2c2a29] mt-2 " + (content.text_first ? "" : "flex-row-reverse")}>
            <div className="w-1/2 flex items-center ">
                <div className={(content.text_first ? "pr-8" : "pl-8")}>
                    <p className="text-[72px] font-cib font-extrabold leading-none">{content?.headline}</p>
                    <p>{content?.details}</p>
                </div>
            </div>

            <div className="w-1/2">
                <img src={content?.image?.url} />
            </div>
        </div>
    )
}