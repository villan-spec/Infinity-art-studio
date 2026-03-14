import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text as KonvaText,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import { Button } from "@/components/ui/button";
import { Upload, Type, Palette, Save, ArrowLeft, Download } from "lucide-react";
import Konva from "konva";

// A simple component to render an image on the canvas
const URLImage = ({
  image,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: any) => {
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

export function Editor() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 400, height: 400 });
  const containerRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Keep it square or adjust as needed
        setStageSize({ width, height: width });
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleImageUpload = (e) => {
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
      // In a real app, save this URI to state/context and proceed to cart
      console.log("Exported image URI:", uri);
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#FFFDF7]">
      <div className="flex items-center justify-between px-6 py-4 bg-[#FFFDF7] border-b-4 border-[#1E1E1E]">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#FFE66D]">
            Customize Design
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="hidden sm:flex items-center gap-2 rounded-xl"
          >
            <Download className="h-4 w-4" /> Save Draft
          </Button>
          <Button
            variant="accent"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl"
          >
            <Save className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tools */}
        <div className="w-20 sm:w-64 bg-[#FFFDF7] border-r-4 border-[#1E1E1E] flex flex-col p-4 gap-4 overflow-y-auto">
          <div className="hidden sm:block">
            <h2 className="text-sm font-black text-[#1E1E1E] uppercase tracking-wider mb-4">
              Tools
            </h2>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              variant="outline"
              className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 h-auto py-4 sm:py-3 rounded-xl"
            >
              <Upload className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-bold">Upload Photo</span>
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={addText}
            className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 h-auto py-4 sm:py-3 rounded-xl"
          >
            <Type className="h-5 w-5" />
            <span className="text-xs sm:text-sm font-bold">Add Text</span>
          </Button>

          <Button
            variant="outline"
            className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 h-auto py-4 sm:py-3 rounded-xl"
          >
            <Palette className="h-5 w-5" />
            <span className="text-xs sm:text-sm font-bold">Templates</span>
          </Button>

          {/* Properties Panel (visible when item selected) */}
          {selectedId && selectedId.startsWith("text_") && (
            <div className="mt-8 hidden sm:block">
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
          className="flex-1 bg-[#FFFDF7] flex items-center justify-center p-4 sm:p-8 overflow-hidden relative"
          style={{
            backgroundImage: "radial-gradient(#1E1E1E33 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        >
          <div
            ref={containerRef}
            className="w-full max-w-2xl aspect-square bg-white border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] rounded-2xl overflow-hidden relative"
            style={{
              backgroundImage:
                'url("https://picsum.photos/seed/mugtemplate/800/800")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay to simulate printable area */}
            <div className="absolute inset-0 border-4 border-dashed border-[#4ECDC4] pointer-events-none m-12 rounded-xl z-10">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#1E1E1E] bg-[#4ECDC4] border-2 border-[#1E1E1E] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E1E1E]">
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
                    onChange={(newAttrs) => {
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
                    onChange={(newAttrs) => {
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
  );
}
