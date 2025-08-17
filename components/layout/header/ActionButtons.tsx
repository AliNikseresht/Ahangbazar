import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onUpload?: () => void;
}

export function ActionButtons({ onUpload }: ActionButtonsProps) {
  return (
    <>
      <Button
        onClick={onUpload}
        className="w-24 flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-5 lg:py-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <Upload className="w-4 h-4 ml-2" />
        آپلود
      </Button>
    </>
  );
}
