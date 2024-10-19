import { FaUpload, FaTrash } from "react-icons/fa"; // Asegúrate de que react-icons esté instalado
import React, { useState } from "react";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void; // Propiedad para manejar el cambio de imagen
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedImage = fileList[0];
      setImage(selectedImage);
      onImageChange(selectedImage); // Comunicar el archivo al padre

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setPreview(null);
      onImageChange(null); // Comunicar que no hay imagen
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    onImageChange(null); // Comunicar que no hay imagen
  };

  return (
    <div className="flex flex-col mt-2 mb-2">
      <label className="font-bold text-amber-900 mb-1">
        Imagen del producto:
      </label>
      <div className="flex items-center border-2 border-dashed border-amber-400 p-2 rounded-lg hover:bg-amber-200 transition-colors duration-300">
        <input
          type="file"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center w-full text-center"
        >
          {image ? (
            <div className="relative flex flex-col items-center">
              <img
                src={preview ?? ""}
                alt="Preview"
                className="h-20 w-20 object-cover mb-2" // Aumenta ligeramente el tamaño
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                aria-label="Remove image"
              >
                <FaTrash />
              </button>
            </div>
          ) : (
            <span className="text-amber-800 flex items-center">
              <FaUpload className="mr-2" /> Haz clic para subir una imagen
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
