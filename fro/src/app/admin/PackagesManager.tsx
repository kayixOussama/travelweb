import { useState } from "react";
import { useForm } from "react-hook-form";
import { useData } from "../../context/DataContext";
import { Package } from "../../data/mockData";
import { Plus, Edit2, Trash2, X, Save, Check } from "lucide-react";
import { toast } from "sonner";

type PackageFormData = Omit<Package, 'features'> & {
  featuresString: string;
};

export function PackagesManager() {
  const { packages, addPackage, updatePackage, deletePackage } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PackageFormData>();

  const onSubmit = async (data: PackageFormData) => {
    const features = data.featuresString.split(',').map(f => f.trim()).filter(f => f.length > 0);

    const pkgData = {
      name: data.name,
      price: data.price,
      duration: data.duration,
      recommended: data.recommended,
      features: features
    };

    try {
      if (editingId) {
        await updatePackage({ ...pkgData, id: editingId });
        toast.success("Package updated successfully");
      } else {
        await addPackage(pkgData);
        toast.success("Package added successfully");
      }
      closeForm();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (pkg: Package) => {
    setIsEditing(true);
    setEditingId(pkg.id);
    setValue("name", pkg.name);
    setValue("price", pkg.price);
    setValue("duration", pkg.duration);
    setValue("recommended", pkg.recommended);
    setValue("featuresString", pkg.features.join(", "));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage(id);
        toast.success("Package deleted");
      } catch {
        toast.error("Failed to delete package");
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
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-500 mt-1">Manage tour packages and pricing</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Package" : "New Package"}</h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Package Name</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Gorilla Trekking"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price</label>
                <input 
                  {...register("price", { required: "Price is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. $1,200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Duration</label>
                <input 
                  {...register("duration", { required: "Duration is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 3 Days"
                />
              </div>

              <div className="flex items-center pt-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    {...register("recommended")}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-medium">Mark as Recommended</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Features (comma separated)</label>
              <textarea 
                rows={3}
                {...register("featuresString", { required: "At least one feature is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Game Drive, Boat Trip, Lunch included..."
              />
              <p className="text-xs text-gray-500">Separate each feature with a comma.</p>
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
                Save Package
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border ${pkg.recommended ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} group hover:shadow-md transition-all`}>
              {pkg.recommended && (
                <div className="bg-green-600 text-white text-xs font-bold px-4 py-1 text-center">
                  RECOMMENDED
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">{pkg.price}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 min-h-[100px]">
                  {pkg.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-xs text-gray-400 pl-6">+ {pkg.features.length - 4} more</li>
                  )}
                </ul>
                
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(pkg.id)}
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
