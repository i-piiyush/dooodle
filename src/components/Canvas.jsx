import {
  Eraser,
  Hand,
  Menu,
  Minus,
  MousePointer2,
  MoveRight,
  Palette,
  Pencil,
  Redo2,
  Square,
  Undo2,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState("pen"); // or "eraser"
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "#FFF2DF";

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = tool === "pen" ? color : "#ffffff";
    }
  }, [color, tool]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };


  let bottomPosition = "bottom-4";

  if (popup) {
    bottomPosition = "bottom-[31%]";
  } else if (isOpen) {
    bottomPosition = "bottom-[8%]";
  }
  return (
    <div>
      {/* Toolbar */}
      <div className="fixed top-0 left-0 z-10 py-3 px-6 w-full shadow flex justify-center md:justify-between items-center">
        <h1 className="text-2xl hidden md:block">doodler</h1>
        <div className="h-full bg-[#E4D7C3] flex items-center justify-center md:justify-between rounded-md px-4 py-2 w-[20rem] md:w-[33rem]">
          <div className=" flex justify-center md:justify-between items-center gap-2 rounded">
            <span className="bg-[#C8BCAA]  p-2  rounded cursor-pointer hover:bg-[#FFC573] hover:text-white">
              {" "}
              <Hand className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white"
            >
              {" "}
              <MousePointer2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white"
            >
              {" "}
              <Square className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white">
              <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white">
              <Minus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white">
              <Pencil className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
            <span className="bg-[#C8BCAA]  p-2 rounded cursor-pointer hover:bg-[#FFC573] hover:text-white">
              <Eraser className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
          </div>
          <button className="bg-[#FFC573] px-6 py-3 text-sm hidden md:block  text-white rounded  hover:cursor-pointer">
            Analyze with AI
          </button>
        </div>

        <button
          className={`fixed ${bottomPosition} right-4 bg-[#FFC573] px-6 py-3 text-sm text-white rounded hover:cursor-pointer block md:hidden z-50 `}
        >
          Analyze with AI
        </button>

        <div
          className={` text-black w-[90%] h-[7%] fixed bottom-1 left-1/2 transform -translate-x-1/2 rounded-md ${
            isOpen ? "flex" : "hidden"
          } md:hidden justify-between items-center px-6 py-3`}
        >
          <Menu className="opacity-50 h-4 w-4" />
          <Palette className="h-4 w-4" onClick={()=>{
            setPopup(!popup)
            console.log("working");
            
          }} />
          <div className="flex gap-3">
            <Undo2 className="opacity-50 h-4 w-4" />
            <Redo2 className="opacity-20 h-4 w-4" />
          </div>
        </div>
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default Canvas;
