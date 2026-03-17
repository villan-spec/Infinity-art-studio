import { useState, useRef, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, Truck, Shield, RefreshCcw, ArrowLeft, Upload, Type, Palette, Save, Download } from "lucide-react"
import { Stage, Layer, Image as KonvaImage, Text as KonvaText, Transformer } from "react-konva"
import useImage from "use-image"
import Konva from "konva"

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }: any) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const EditableText = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
  const shapeRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export function Product() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Editor state
  const [images, setImages] = useState<any[]>([]);
  const [texts, setTexts] = useState<any[]>([]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setStageSize({ width, height: width });
      }
    };

    if (isCustomizing) {
      checkSize();
      window.addEventListener("resize", checkSize);
      return () => window.removeEventListener("resize", checkSize);
    }
  }, [isCustomizing]);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = {
          id: `img_${images.length + 1}`,
          src: reader.result,
          x: 50,
          y: 50,
          width: 200,
          height: 200,
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    const newText = {
      id: `text_${texts.length + 1}`,
      text: "Double click to edit",
      x: 100,
      y: 100,
      fontSize: 24,
      fill: "#000000",
      fontFamily: "Inter",
    };
    setTexts([...texts, newText]);
  };

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      console.log("Exported image URI:", uri);
      navigate("/cart");
    }
  };

  // Mock product data
  const product = {
    id: productId,
    name: "Minimalist Couple Mug Set",
    price: "₹999",
    rating: 4.9,
    reviews: 128,
    description: "Start your morning right with our personalized couple mug set. Made from high-quality ceramic, these mugs are microwave and dishwasher safe. Customize with your names, a special date, or a custom illustration.",
    images: [
      "https://picsum.photos/seed/mugset1/800/800",
      "https://picsum.photos/seed/mugset2/800/800",
      "https://picsum.photos/seed/mugset3/800/800",
      "https://picsum.photos/seed/mugset4/800/800",
    ],
    features: [
      "Premium ceramic material",
      "11 oz capacity",
      "Microwave & dishwasher safe",
      "High-quality sublimation printing",
    ]
  }

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:underline text-[#1E1E1E] font-bold">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        
        {!isCustomizing ? (
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex h-24 cursor-pointer items-center justify-center rounded-xl overflow-hidden border-4 border-[#1E1E1E] transition-all ${
                        selectedImage === index ? 'shadow-[4px_4px_0px_0px_#FF6B6B] translate-y-[-2px]' : 'shadow-[4px_4px_0px_0px_#1E1E1E] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E1E1E]'
                      }`}
                    >
                      <span className="sr-only">Image {index + 1}</span>
                      <span className="absolute inset-0 overflow-hidden">
                        <img src={image} alt="" className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="aspect-square w-full rounded-2xl overflow-hidden border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] bg-white">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 lg:mt-0">
              <h1 className="text-4xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#4ECDC4]">{product.name}</h1>

              <div className="mt-4">
                <h2 className="sr-only">Product information</h2>
                <p className="text-4xl font-black tracking-tight text-[#1E1E1E]">{product.price}</p>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center text-[#FF6B6B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <span className="ml-3 text-base font-bold text-[#1E1E1E] underline decoration-2 underline-offset-4 decoration-[#4ECDC4]">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-lg font-medium text-[#1E1E1E]/80">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#1E1E1E]">Features</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-5 text-lg font-medium text-[#1E1E1E]/80 marker:text-[#FF6B6B]">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <Button onClick={() => setIsCustomizing(true)} variant="accent" size="lg" className="w-full text-xl h-16 rounded-2xl">
                  Customize & Add to Cart
                </Button>
              </div>

              <div className="mt-10 border-t-4 border-[#1E1E1E] pt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFE66D] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                      <Truck className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <span className="text-base font-bold text-[#1E1E1E]">Free shipping over ₹1500</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4ECDC4] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                      <Shield className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <span className="text-base font-bold text-[#1E1E1E]">Secure payments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF6B6B] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                      <RefreshCcw className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <span className="text-base font-bold text-[#1E1E1E]">Easy returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Editor Tools & Canvas */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-2xl">
                <h2 className="text-2xl font-black tracking-tight text-[#1E1E1E]">Customize: {product.name}</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" onClick={() => setIsCustomizing(false)} className="flex-1 sm:flex-none flex items-center gap-2 rounded-xl">
                    Cancel
                  </Button>
                  <Button variant="accent" onClick={handleExport} className="flex-1 sm:flex-none flex items-center gap-2 rounded-xl">
                    <Save className="h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Tools */}
                <div className="w-full md:w-64 bg-white border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-2xl flex flex-col p-4 gap-4">
                  <h2 className="text-sm font-black text-[#1E1E1E] uppercase tracking-wider mb-2">
                    Tools
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        variant="outline"
                        className="w-full flex flex-row items-center justify-center gap-2 h-auto py-3 rounded-xl border-2"
                      >
                        <Upload className="h-5 w-5" />
                        <span className="text-sm font-bold">Upload Photo</span>
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      onClick={addText}
                      className="w-full flex flex-row items-center justify-center gap-2 h-auto py-3 rounded-xl border-2"
                    >
                      <Type className="h-5 w-5" />
                      <span className="text-sm font-bold">Add Text</span>
                    </Button>
                  </div>

                  {/* Properties Panel (visible when item selected) */}
                  {selectedId && selectedId.startsWith("text_") && (
                    <div className="mt-4 border-t-2 border-[#1E1E1E] pt-4">
                      <h2 className="text-sm font-black text-[#1E1E1E] uppercase tracking-wider mb-4">
                        Properties
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                            Text
                          </label>
                          <input
                            type="text"
                            className="w-full border-2 border-[#1E1E1E] rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                            value={texts.find((t) => t.id === selectedId)?.text || ""}
                            onChange={(e) => {
                              const newTexts = texts.map((t) =>
                                t.id === selectedId
                                  ? { ...t, text: e.target.value }
                                  : t,
                              );
                              setTexts(newTexts);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                            Color
                          </label>
                          <input
                            type="color"
                            className="w-full h-12 border-2 border-[#1E1E1E] rounded-xl cursor-pointer p-1"
                            value={
                              texts.find((t) => t.id === selectedId)?.fill || "#000000"
                            }
                            onChange={(e) => {
                              const newTexts = texts.map((t) =>
                                t.id === selectedId
                                  ? { ...t, fill: e.target.value }
                                  : t,
                              );
                              setTexts(newTexts);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Area */}
                <div
                  className="flex-1 bg-white border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-2xl flex items-center justify-center p-4 sm:p-8 overflow-hidden relative min-h-[400px]"
                  style={{
                    backgroundImage: "radial-gradient(#1E1E1E33 2px, transparent 2px)",
                    backgroundSize: "24px 24px",
                  }}
                >
                  <div
                    ref={containerRef}
                    className="w-full max-w-md aspect-square bg-white border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] rounded-2xl overflow-hidden relative"
                    style={{
                      backgroundImage:
                        'url("https://picsum.photos/seed/mugtemplate/800/800")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Overlay to simulate printable area */}
                    <div className="absolute inset-0 border-4 border-dashed border-[#4ECDC4] pointer-events-none m-8 sm:m-12 rounded-xl z-10">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#1E1E1E] bg-[#4ECDC4] border-2 border-[#1E1E1E] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E1E1E] whitespace-nowrap">
                        Printable Area
                      </span>
                    </div>

                    <Stage
                      width={stageSize.width}
                      height={stageSize.height}
                      onMouseDown={checkDeselect}
                      onTouchStart={checkDeselect}
                      ref={stageRef}
                    >
                      <Layer>
                        {images.map((img, i) => (
                          <URLImage
                            key={img.id}
                            image={img}
                            shapeProps={img}
                            isSelected={img.id === selectedId}
                            onSelect={() => selectShape(img.id)}
                            onChange={(newAttrs: any) => {
                              const imgs = images.slice();
                              imgs[i] = newAttrs;
                              setImages(imgs);
                            }}
                          />
                        ))}
                        {texts.map((text, i) => (
                          <EditableText
                            key={text.id}
                            shapeProps={text}
                            isSelected={text.id === selectedId}
                            onSelect={() => selectShape(text.id)}
                            onChange={(newAttrs: any) => {
                              const txts = texts.slice();
                              txts[i] = newAttrs;
                              setTexts(txts);
                            }}
                          />
                        ))}
                      </Layer>
                    </Stage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
