import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if(setImageFile) setImageFile(selectedFile);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block ml-5">
        Upload Image
      </Label>
      <div>
        <Input
          id="image-upload"
          type="file"
          // className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {
          !imageFile ?
          <Label></Label>
        }
      </div>
    </div>
  );
}

export default ProductImageUpload;
