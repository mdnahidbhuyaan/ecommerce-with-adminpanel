import ProductFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import ShoppingProductTile from "./product.tile";
import { useState } from "react";

function ShoppingListing() {

const dispatch = useDispatch()
const {productList} = useSelector(state=>state.shopProducts)
const [filter,setFilter] = useState(null)
const [sort,setSort] = useState(null)

function handleSort(value){
  setSort(value)
}
function handleFilter(getSectionId,getCurrentOption){
  console.log(getSectionId,getCurrentOption,"getSectionId,getCurrentOption");
}


useEffect(()=>{
  dispatch(fetchAllFilteredProducts());
},[dispatch])

console.log(productList, "productList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-md">
        <div className="p-4 border-b flex items-center justify-between ">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-4 ">
            <span className="text-muted-foreground ">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className=" flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length > 0 ? 
            productList.map(productItem => <ShoppingProductTile product={productItem} />) : null
          }
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
