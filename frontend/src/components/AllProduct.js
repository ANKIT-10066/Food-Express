import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { GrNext, GrPrevious } from "react-icons/gr";
const AllProduct = ({ heading , text="Add To Cart"}) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
 
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  const slideFilterRef = useRef(null);
  const nextProduct = () => {
    if (slideFilterRef.current) {
      slideFilterRef.current.scrollLeft+=300;
    }
  };
  const prevProduct = () => {
    if (slideFilterRef.current) {
      slideFilterRef.current.scrollLeft-=300;
    }
  };
  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="relative ">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div className="flex gap-4 absolute top-0 right-1">
            <button onClick={prevProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrPrevious/></button>
            <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrNext /></button>
      </div>
      <div className="pt-5 flex  gap-5 justify-around overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideFilterRef}>
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
       </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  text={text}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
