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
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          rotateEnabled={false}
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
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          rotateEnabled={false}
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

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

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
    selectShape(newText.id);
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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:underline text-[#1E1E1E] font-bold">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Image gallery & Canvas */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex h-24 cursor-pointer items-center justify-center rounded-xl overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-[#FF6B6B]' : 'hover:opacity-80'
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

            <div 
              ref={containerRef}
              className="aspect-square w-full rounded-2xl overflow-hidden relative bg-gray-100"
              style={{
                backgroundImage: `url(${product.images[selectedImage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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

          {/* Product info & Tools */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-4xl font-black tracking-tight text-[#1E1E1E]">{product.name}</h1>

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

            {/* Customization Tools */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-[#1E1E1E] mb-4">Customize Your Product</h3>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="w-full flex flex-row items-center justify-center gap-2 h-auto py-3 rounded-xl"
                    >
                      <Upload className="h-5 w-5" />
                      <span className="text-sm font-bold">Upload Photo</span>
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={addText}
                    className="w-full flex flex-row items-center justify-center gap-2 h-auto py-3 rounded-xl"
                  >
                    <Type className="h-5 w-5" />
                    <span className="text-sm font-bold">Add Text</span>
                  </Button>
                </div>

                {/* Properties Panel (visible when item selected) */}
                {selectedId && selectedId.startsWith("text_") && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <h2 className="text-sm font-bold text-[#1E1E1E] uppercase tracking-wider mb-4">
                      Text Properties
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                          Text
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                            Color
                          </label>
                          <input
                            type="color"
                            className="w-full h-10 border border-gray-300 rounded-xl cursor-pointer p-1"
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
                        <div>
                          <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                            Font Style
                          </label>
                          <select
                            className="w-full h-10 border border-gray-300 rounded-xl px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                            value={texts.find((t) => t.id === selectedId)?.fontStyle || "normal"}
                            onChange={(e) => {
                              const newTexts = texts.map((t) =>
                                t.id === selectedId
                                  ? { ...t, fontStyle: e.target.value }
                                  : t,
                              );
                              setTexts(newTexts);
                            }}
                          >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="italic">Italic</option>
                            <option value="italic bold">Bold Italic</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#1E1E1E] mb-1 block">
                          Font Family
                        </label>
                        <select
                          className="w-full h-10 border border-gray-300 rounded-xl px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                          value={texts.find((t) => t.id === selectedId)?.fontFamily || "Inter"}
                          onChange={(e) => {
                            const newTexts = texts.map((t) =>
                              t.id === selectedId
                                ? { ...t, fontFamily: e.target.value }
                                : t,
                            );
                            setTexts(newTexts);
                          }}
                        >
                          <option value="Inter">Inter (Sans)</option>
                          <option value="Georgia">Georgia (Serif)</option>
                          <option value="Courier New">Courier New (Mono)</option>
                          <option value="Comic Sans MS">Comic Sans</option>
                          <option value="Impact">Impact</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <Button onClick={handleExport} variant="accent" size="lg" className="w-full text-xl h-16 rounded-2xl">
                <Save className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Truck className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Free shipping over ₹1500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Shield className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Secure payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <RefreshCcw className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
