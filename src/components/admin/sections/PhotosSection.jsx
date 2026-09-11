import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Image as ImageIcon,
  Check,
  AlertCircle
} from "lucide-react";
import { photosApi } from "../../../lib/api";

const categories = [
  { key: "all", label: "All Photos" },
  { key: "interior", label: "Interior & Wall Art" },
  { key: "outdoor", label: "Outdoor Patio" },
  { key: "food", label: "Food & Brews" },
];

export default function PhotosSection({ photos = [], onRefresh }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("interior");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const handleOpenAdd = () => {
    setEditingPhoto(null);
    setAlt("");
    setCategory("interior");
    setDesc("");
    setImageUrl("");
    setSelectedFile(null);
    setPreviewUrl("");
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (photo) => {
    setEditingPhoto(photo);
    setAlt(photo.alt || "");
    setCategory(photo.category || "interior");
    setDesc(photo.desc || "");
    setImageUrl(photo.src || "");
    setSelectedFile(null);
    setPreviewUrl(photo.src || "");
    setError("");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!alt.trim()) {
      setError("Please provide a photo title/alt description.");
      return;
    }

    if (!selectedFile && !imageUrl && !editingPhoto) {
      setError("Please select an image file or provide an image URL.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("alt", alt.trim());
      formData.append("category", category);
      formData.append("desc", desc.trim());

      if (selectedFile) {
        formData.append("image", selectedFile);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl.trim());
      }

      let res;
      if (editingPhoto) {
        const photoId = editingPhoto._id || editingPhoto.id;
        res = await photosApi.update(photoId, formData);
      } else {
        res = await photosApi.create(formData);
      }

      if (res && res.success) {
        setIsModalOpen(false);
        onRefresh();
      } else {
        setError(res.message || "Failed to save photo.");
      }
    } catch (err) {
      console.error("Save photo error:", err);
      setError("Error saving photo to server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo from the gallery?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await photosApi.delete(id);
      if (res && res.success) {
        onRefresh();
      } else {
        alert(res.message || "Failed to delete photo.");
      }
    } catch (err) {
      console.error("Delete photo error:", err);
      alert("Error deleting photo.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#2b1810]">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8ded3] rounded-3xl p-6 shadow-sm">
        <div>
          <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] text-[10px] font-bold tracking-widest uppercase mb-1">
            PHOTO GALLERY (PATHO)
          </span>
          <h1 className="font-display text-2xl font-bold text-[#2b1810]">
            Manage Cafe Photos & Ambience
          </h1>
          <p className="text-xs text-[#6b5c54] mt-0.5">
            Upload new high-res photos, edit captions, and organize gallery categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" /> Upload New Photo
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeFilter === cat.key
                ? "bg-[#2b1810] text-white shadow-sm"
                : "bg-white hover:bg-[#faf7f2] text-[#4a3b32] border border-[#e8ded3]"
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span className="text-xs text-[#6b5c54] ml-auto hidden sm:block font-medium">
          Showing {filteredPhotos.length} of {photos.length} photos
        </span>
      </div>

      {/* Photos Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="py-16 text-center bg-white border border-[#e8ded3] rounded-3xl p-8 shadow-sm">
          <ImageIcon className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-[#2b1810] mb-1">
            No photos found in this category
          </h3>
          <p className="text-xs text-[#6b5c54] mb-4 max-w-sm mx-auto">
            Upload pictures of Everbloom’s cozy corners, food specialties, and patio seating.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#2b1810] text-white text-xs font-bold shadow-sm"
          >
            Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => {
            const pId = photo._id || photo.id;
            return (
              <div
                key={pId}
                className="group bg-white border border-[#e8ded3] hover:border-[#2b1810] rounded-3xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                {/* Image Preview Container */}
                <div className="relative h-48 sm:h-52 bg-[#f4ece2] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://res.cloudinary.com/p2gsrga3/image/upload/v1789146209/myheroimg.png";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase text-[#2b1810] border border-[#e8ded3] shadow-sm">
                      {photo.category}
                    </span>
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleOpenEdit(photo)}
                      className="w-8 h-8 rounded-full bg-white text-[#2b1810] hover:bg-[#faf7f2] shadow-md flex items-center justify-center transition-colors border border-[#e8ded3]"
                      title="Edit Photo"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pId)}
                      disabled={deletingId === pId}
                      className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 shadow-md flex items-center justify-center transition-colors border border-rose-200 disabled:opacity-50"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Photo Details */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#2b1810] line-clamp-1 mb-1">
                      {photo.alt}
                    </h3>
                    {photo.desc && (
                      <p className="text-[11px] text-[#6b5c54] line-clamp-2 leading-relaxed">
                        {photo.desc}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#f0e8dc] flex items-center justify-between text-[10px] text-[#6b5c54]">
                    <span>ID: {pId}</span>
                    <button
                      onClick={() => handleOpenEdit(photo)}
                      className="text-[#2b1810] hover:underline font-bold transition-colors"
                    >
                      Edit Info →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Photo Modal - Clean White */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-[#e8ded3] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#2b1810] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="badge-tag bg-[#faf7f2] text-[#6b5c54] border border-[#e8ded3] text-[10px] font-bold uppercase mb-1">
                {editingPhoto ? "EDIT PHOTO" : "NEW UPLOAD"}
              </span>
              <h2 className="font-display text-xl font-bold text-[#2b1810]">
                {editingPhoto ? "Edit Photo Details" : "Upload Picture to Gallery"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Preview & Picker */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-2">
                  Photo Source (Upload File or Enter URL)
                </label>

                {previewUrl ? (
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#e8ded3] bg-[#faf7f2] mb-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setImageUrl("");
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Change
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <label className="cursor-pointer border-2 border-dashed border-[#e8ded3] hover:border-[#2b1810] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors bg-[#faf7f2] hover:bg-[#f5ede3]">
                      <Upload className="w-6 h-6 text-[#2b1810] mb-1.5" />
                      <span className="text-xs font-bold text-[#2b1810]">Choose File</span>
                      <span className="text-[10px] text-[#6b5c54]">PNG, JPG, WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <div className="flex flex-col justify-center gap-2">
                      <span className="text-[11px] text-[#6b5c54] font-medium">Or paste image URL:</span>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 w-3.5 h-3.5 text-[#9ca3af] pointer-events-none top-3" />
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setPreviewUrl(e.target.value);
                          }}
                          placeholder="https://images.unsplash..."
                          className="w-full pl-9 pr-3 py-2 bg-[#faf7f2] border border-[#e8ded3] rounded-xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title / Alt */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="e.g. Cozy Corner with Neon Wall Art"
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] focus:outline-none focus:border-[#2b1810] focus:bg-white"
                >
                  <option value="interior">Interior & Wall Art</option>
                  <option value="outdoor">Outdoor Patio</option>
                  <option value="food">Food & Brews</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#2b1810] mb-1.5">
                  Short Description (Optional)
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  placeholder="Describe ambience, ingredients, lighting, or vibe..."
                  className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#e8ded3] rounded-2xl text-xs text-[#2b1810] placeholder-[#9ca3af] focus:outline-none focus:border-[#2b1810] focus:bg-white resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8ded3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#6b5c54] text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#2b1810] hover:bg-[#1a0e09] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  {submitting ? "Saving..." : editingPhoto ? "Update Photo" : "Upload to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
