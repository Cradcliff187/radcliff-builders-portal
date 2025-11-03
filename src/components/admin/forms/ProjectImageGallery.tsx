import { useState } from "react";
import { GripVertical, Edit2, Trash2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import DeleteDialog from "@/components/admin/DeleteDialog";

export interface ProjectImage {
  id: string;
  image_url: string;
  caption: string;
  display_order: number;
}

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  onReorder: (reorderedImages: ProjectImage[]) => void;
  onDelete: (imageId: string) => void;
  onCaptionUpdate: (imageId: string, caption: string) => void;
}

export default function ProjectImageGallery({
  images,
  onReorder,
  onDelete,
  onCaptionUpdate,
}: ProjectImageGalleryProps) {
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    // Update display_order
    const reordered = newImages.map((img, idx) => ({
      ...img,
      display_order: idx,
    }));

    onReorder(reordered);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const startEditCaption = (image: ProjectImage) => {
    setEditingCaption(image.id);
    setCaptionValue(image.caption || "");
  };

  const saveCaption = (imageId: string) => {
    onCaptionUpdate(imageId, captionValue);
    setEditingCaption(null);
    toast({
      title: "Caption Updated",
      description: "Image caption has been saved.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, imageId: string) => {
    if (e.key === "Enter") {
      saveCaption(imageId);
    } else if (e.key === "Escape") {
      setEditingCaption(null);
    }
  };

  const confirmDelete = () => {
    if (deleteImageId) {
      onDelete(deleteImageId);
      setDeleteImageId(null);
      toast({
        title: "Image Deleted",
        description: "Image has been removed from the project.",
      });
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative group bg-white rounded-none shadow-md hover:shadow-xl transition-shadow border-2 ${
              draggedIndex === index ? "border-gold opacity-50" : "border-transparent"
            }`}
          >
            {/* Drag Handle */}
            <div className="absolute top-2 left-2 z-10 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-navy/80 text-white p-1 rounded">
                <GripVertical className="h-4 w-4" />
              </div>
            </div>

            {/* Display Order Badge */}
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-navy text-white text-xs font-bold px-2 py-1 rounded-none flex items-center gap-1">
                {index === 0 && <Crown className="h-3 w-3" />}
                <span>{index + 1}</span>
              </div>
            </div>

            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <img
                src={image.image_url}
                alt={image.caption || `Project image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <div className="p-3 space-y-2">
              {editingCaption === image.id ? (
                <Input
                  value={captionValue}
                  onChange={(e) => setCaptionValue(e.target.value)}
                  onBlur={() => saveCaption(image.id)}
                  onKeyDown={(e) => handleKeyDown(e, image.id)}
                  placeholder="Add a caption..."
                  className="text-sm rounded-none"
                  autoFocus
                />
              ) : (
                <p className="text-sm text-charcoal min-h-[40px] line-clamp-2">
                  {image.caption || "No caption"}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => startEditCaption(image)}
                  className="flex-1 min-w-0 text-navy border-navy hover:bg-navy hover:text-white uppercase tracking-wider rounded-none text-xs whitespace-nowrap"
                >
                  <Edit2 className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Edit</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteImageId(image.id)}
                  className="flex-1 min-w-0 text-red-600 border-red-600 hover:bg-red-600 hover:text-white uppercase tracking-wider rounded-none text-xs whitespace-nowrap"
                >
                  <Trash2 className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Delete</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteDialog
        open={deleteImageId !== null}
        onOpenChange={(open) => !open && setDeleteImageId(null)}
        onConfirm={confirmDelete}
        title="Delete Image"
        description="This will permanently delete this image from storage. This action cannot be undone."
      />
    </>
  );
}
