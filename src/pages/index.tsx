import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { ICategory, IHeader, IProduct } from "../types";
import { useGeneral } from "../hooks/useGeneral";
import { ProductCard } from "../components/Product/components/Product-card";
import { Banner } from "../components/General/components/Banner";

export interface IHomeProps {
  header: IHeader;
  categories: ICategory[];
}

export default function Home({ header, categories }: IHomeProps) {
  const [valueTab, setValueTab] = useState(0);
  const { getProductsByCategoryId, products } = useGeneral();

  useEffect(() => {
    getProducts(categories[0]?.id ?? 1);
  }, []);

  const getProducts = (id: number) => {
    getProductsByCategoryId(id ?? 1);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    getProducts(categories[newValue]?.id);
    setValueTab(newValue);
  };

  return (
    <Box className="w-full bg-[#3f2322]">
      <Banner header={header} />
      {categories?.length && (
        <Tabs
          value={valueTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example"
        >
          {categories?.map((category: ICategory, index: number) => (
            <Tab label={category?.title} key={index} sx={{ color: "#fff" }} />
          ))}
        </Tabs>
      )}
      {products?.length && (
        <Box className="p-4 md:p-8 flex flex-row flex-wrap w-full justify-around">
          {products.map((product: IProduct, index) => (
            <ProductCard product={product} key={product.id + index} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const responseCategories = await fetch(process.env.apiUrl + "/categories?_sort=position:asc");
    const categories = await responseCategories.json();

    const responseHeader = await fetch(process.env.apiUrl + "/headers");
    const header = await responseHeader.json();
    return {
      props: {
        header: {
          banner: header[0]?.banner?.url,
          logo: header[0]?.logo?.url,
        },
        categories,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
