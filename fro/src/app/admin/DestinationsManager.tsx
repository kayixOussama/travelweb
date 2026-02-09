import { useState } from "react";
import { useForm } from "react-hook-form";
import { useData } from "../../context/DataContext";
import { Destination } from "../../data/mockData";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export function DestinationsManager() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Destination>();

  const onSubmit = async (data: Destination) => {
    try {
      if (editingId) {
        await updateDestination({ ...data, id: editingId });
        toast.success("Destination updated successfully");
      } else {
        await addDestination(data);
        toast.success("Destination added successfully");
      }
      closeForm();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (dest: Destination) => {
    setIsEditing(true);
    setEditingId(dest.id);
    setValue("title", dest.title);
    setValue("location", dest.location);
    setValue("image", dest.image);
    setValue("rating", dest.rating);
    setValue("description", dest.description);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDestination(id);
        toast.success("Destination deleted");
      } catch {
        toast.error("Failed to delete destination");
      }
    }
  };

  const closeForm = () => {
    setIsEditing(false);
    setEditingId(null);
    reset();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-500 mt-1">Manage your travel locations</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Destination
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Destination" : "New Destination"}</h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input 
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Volcanoes National Park"
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <input 
                  {...register("location", { required: "Location is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Musanze"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <div className="flex gap-2">
                  <input 
                    {...register("image", { required: "Image URL is required" })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://..."
                  />
                  <button type="button" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600" title="Upload (Mock)">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Rating (0-5)</label>
                <input 
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register("rating", { required: "Rating is required", min: 0, max: 5 })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                rows={4}
                {...register("description", { required: "Description is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe the destination..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={closeForm}
                className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Destination
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                  ★ {dest.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{dest.title}</h3>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  {dest.location}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{dest.description}</p>
                
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(dest)}
                    className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(dest.id)}
                    className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
