import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/uploadHelpers";

export interface UploadedImage {
  tempId: string;
  image_url: string;
  caption: string;
  display_order: number;
  uploading: boolean;
  progress: number;
  error?: string;
}

interface ProjectImageUploaderProps {
  projectId: string | undefined;
  onImagesUploaded: (images: UploadedImage[]) => void;
}

export default function ProjectImageUploader({
  projectId,
  onImagesUploaded,
}: ProjectImageUploaderProps) {
  const [uploadQueue, setUploadQueue] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return `${file.name}: Invalid file type. Use JPG, PNG, or WEBP.`;
    }
    if (file.size > maxSize) {
      return `${file.name}: File size exceeds 10MB.`;
    }
    return null;
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (fileArray.length > 10) {
      toast({
        title: "Too many files",
        description: "Please upload a maximum of 10 images at once.",
        variant: "destructive",
      });
      return;
    }

    // Validate all files first
    const errors: string[] = [];
    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) errors.push(error);
    });

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(" "),
        variant: "destructive",
      });
      return;
    }

    // Create initial upload queue with temp data
    const initialQueue: UploadedImage[] = fileArray.map((file, index) => ({
      tempId: `temp-${Date.now()}-${index}`,
      image_url: "",
      caption: "",
      display_order: index,
      uploading: true,
      progress: 0,
    }));

    setUploadQueue(initialQueue);

    // Upload files
    const uploadedImages: UploadedImage[] = [];
    
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      try {
        setUploadQueue((prev) =>
          prev.map((img, idx) =>
            idx === i ? { ...img, progress: 50 } : img
          )
        );

        const url = await uploadFile(file, "projects");

        const uploadedImage: UploadedImage = {
          ...initialQueue[i],
          image_url: url,
          uploading: false,
          progress: 100,
        };

        uploadedImages.push(uploadedImage);

        setUploadQueue((prev) =>
          prev.map((img, idx) =>
            idx === i ? uploadedImage : img
          )
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed";
        
        setUploadQueue((prev) =>
          prev.map((img, idx) =>
            idx === i
              ? { ...img, uploading: false, error: errorMessage }
              : img
          )
        );

        toast({
          title: "Upload Failed",
          description: `${file.name}: ${errorMessage}`,
          variant: "destructive",
        });
      }
    }

    // Notify parent of successful uploads
    if (uploadedImages.length > 0) {
      onImagesUploaded(uploadedImages);
      toast({
        title: "Upload Complete",
        description: `${uploadedImages.length} image(s) uploaded successfully.`,
      });
    }

    // Clear queue after a delay
    setTimeout(() => {
      setUploadQueue([]);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFromQueue = (tempId: string) => {
    setUploadQueue((prev) => prev.filter((img) => img.tempId !== tempId));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-none p-12 text-center transition-colors ${
          isDragging
            ? "border-gold bg-gold/5"
            : "border-charcoal/20 hover:border-gold/50"
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-charcoal/40 mb-4" />
        <p className="text-charcoal font-semibold mb-2">
          Drag & Drop Images Here
        </p>
        <p className="text-sm text-charcoal/60 mb-4">
          or click to browse (JPG, PNG, WEBP • Max 10MB each • Max 10 files)
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="bg-navy text-white hover:bg-navy/90 uppercase tracking-wider rounded-none"
        >
          <Upload className="mr-2 h-4 w-4" />
          Select Files
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {uploadQueue.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-montserrat font-semibold text-navy uppercase tracking-wide">
            Uploading ({uploadQueue.filter((img) => !img.uploading).length}/
            {uploadQueue.length} complete)
          </h4>
          {uploadQueue.map((image) => (
            <div
              key={image.tempId}
              className="flex items-center gap-4 p-3 bg-light-grey rounded-none"
            >
              {image.uploading && (
                <Loader2 className="h-5 w-5 animate-spin text-navy" />
              )}
              {!image.uploading && !image.error && (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              )}
              {image.error && (
                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  ✕
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-charcoal">
                    Image {image.display_order + 1}
                  </span>
                  <span className="text-xs text-charcoal/60">
                    {image.progress}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-none overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      image.error ? "bg-red-500" : "bg-navy"
                    }`}
                    style={{ width: `${image.progress}%` }}
                  />
                </div>
                {image.error && (
                  <p className="text-xs text-red-600 mt-1">{image.error}</p>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromQueue(image.tempId)}
                className="text-charcoal/60 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
