/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  WatchIcon,
  UmbrellaIcon,
  Shirt,
  WashingMachine,
  ShoppingBasket,
  Airplay,
  Images,
  Heater,
} from "lucide-react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product.tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.add({
          title: "Product Added to Cart Successfully",
          type: "success",
        });
      }
    });
  }
    useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);
  console.log(productList, "productList");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative mx-3 sm:mx-5 lg:mx-8 overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60">
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[560px] overflow-hidden">
          
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => (
              <img
                key={slide}
                src={slide}
                alt={`Banner ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-500 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                      ? "-translate-x-full"
                      : "translate-x-full"
                }`}
              />
            ))}
          </div>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-transparent to-slate-900/10 pointer-events-none" />

          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
              )
            }
            className="absolute top-1/2 left-3 sm:left-5 -translate-y-1/2 z-10 h-9 w-9 sm:h-11 sm:w-11 rounded-full border-white/50 bg-white/75 text-slate-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
            }
            className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 z-10 h-9 w-9 sm:h-11 sm:w-11 rounded-full border-white/50 bg-white/75 text-slate-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-md">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-7 bg-white"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Shop by Category */}
      <section className="py-14 bg-gradient-to-b from-violet-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-3">
              Explore our collections and find what you love.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.label}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="group cursor-pointer rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
              >
                <CardContent className="flex min-h-[160px] flex-col items-center justify-center p-5">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:from-violet-600 group-hover:to-blue-600">
                    <categoryItem.icon className="h-8 w-8 text-violet-700 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <span className="text-center font-semibold text-gray-800 transition-colors group-hover:text-violet-700">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Shop by Brand */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-indigo-50 py-5">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="mb-10 text-center sm:mb-12">
            <span className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Top Brands
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Shop by <span className="text-blue-600">Brand</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover products from your favorite brands and find something
              special for your style.
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/70"
              >
                <CardContent className="flex min-h-[155px] flex-col items-center justify-center p-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600">
                    <brandItem.icon className="h-7 w-7 text-blue-700 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <span className="text-center font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-700">
                    {brandItem.label}
                  </span>

                  <span className="mt-1 text-xs text-slate-400 transition-colors group-hover:text-indigo-500">
                    Explore Collection
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-semibold tracking-wide text-indigo-600 mb-4">
              OUR COLLECTION
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Featured <span className="text-indigo-600">Products</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover our handpicked collection of products, selected just for
              your everyday style.
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-indigo-600" />
          </div>

          {/* Products Grid */}
          {productList && productList.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center">
              <h3 className="text-xl font-semibold text-slate-800">
                No Products Available
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Please check back soon for new arrivals.
              </p>
            </div>
          )}
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
