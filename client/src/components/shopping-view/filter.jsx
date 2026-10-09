import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
function ProductFilter() {
  return (
    <div className=" rounded-lg shadow-md bg-green-50">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold ">{keyItem}</h3>
              <div className="grid gap-2 mt-2 ">
                {
                    filterOptions[keyItem].map(option => <Label className="flex items-center gap-2 font-normal ">
                    <Checkbox className="bg-white shadow-md"/>
                    {option.label}
                    </Label>
                    )}
                </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
