"use client"
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "@/lib/cstack";
import ArticleGrid from "@/components/articleGrid";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Tabs from "@/components/tabs";
import TextAndImage from "@/components/textAndImage";

export default function Home() {
  const [entry, setEntry] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([])

  const getContent = async () => {
    const entry = await Stack.getElementByTypeWtihRefs("homepage", "es-co", [
     'modular_blocks.tabs.page'
    ]);
    console.log("homepage", entry[0][0]);
    setEntry(entry[0][0]);
    setCategories(entry[0][0].taxonomies);
    setIsLoading(false);
  };

  useEffect(() => {
    onEntryChange(getContent);
  }, []);

  if (isLoading)
    return (<div></div>)

  return (
    <div>
      <Header />

      {entry?.modular_blocks?.map((block, index) => (
        <div key={index}>
          {block.hasOwnProperty('text_and_image') &&
            <TextAndImage content={block.text_and_image}/>
          }
          {block.hasOwnProperty('tabs') &&
            <Tabs content={block.tabs} />
          }
          {block.hasOwnProperty('article_cards') &&
            <ArticleGrid content={block.article_cards} taxonomies={categories} />
          }
        </div>
      ))}


      <Footer />
    </div>
  );
}
