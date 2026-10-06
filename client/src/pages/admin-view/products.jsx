import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { useSelector } from "react-redux";
import { addNewProduct } from "@/store/admin/product-slice";
import { toast } from "@/components/ui/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

// import { addProduct } from "@/store/product-slice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
function AdminProduct() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.add({
          title: "Product Added Successfully",
        });
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, uploadedImageUrl, "productList");

  return (
    <Fragment>
      <div className="p-5 w-full flex justify-end ">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
              console.log("MAP PRODUCT:", productItem);

              return (
                <AdminProductTile key={productItem.id} product={productItem} />
              );
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="p-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFromData={setFormData}
              buttonText="Add Product"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProduct;
