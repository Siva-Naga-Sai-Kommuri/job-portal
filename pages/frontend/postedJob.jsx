import NavBar from "@/components/NavBar";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Mock data for jobs
const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    status: "Open",
    applicants: 25,
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    location: "Hyderabad, India",
    status: "Closed",
    applicants: 15,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Chennai, India",
    status: "Open",
    applicants: 40,
  },
];

export default function PostedJobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    if (isEdit) {
      // Update job if editing
      const updatedJobs = jobs.map((job) =>
        job.id === editingId ? { ...job, ...data, id: editingId } : job
      );
      setJobs(updatedJobs);
      setIsEdit(false);
      setEditingId(null);
    } else {
      // Add new job
      const newJob = { id: jobs.length + 1, ...data, applicants: 0 };
      setJobs([...jobs, newJob]);
    }
    reset();
  };

  // Handle edit job
  const handleEdit = (job) => {
    setIsEdit(true);
    setEditingId(job.id);
    reset(job);
  };

  // Handle delete job
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Posted Jobs</h1>

        {/* Job Form */}
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEdit ? "Edit Job" : "Add New Job"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                {...register("title", { required: "Job title is required" })}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                {...register("company", { required: "Company name is required" })}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {isEdit ? "Update Job" : "Add Job"}
            </button>
          </form>
        </div>

        {/* Job List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border text-gray-700">Job Title</th>
                <th className="px-4 py-3 border text-gray-700">Company</th>
                <th className="px-4 py-3 border text-gray-700">Location</th>
                <th className="px-4 py-3 border text-gray-700">Status</th>
                <th className="px-4 py-3 border text-gray-700">Applicants</th>
                <th className="px-4 py-3 border text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="px-4 py-3 border">{job.title}</td>
                  <td className="px-4 py-3 border">{job.company}</td>
                  <td className="px-4 py-3 border">{job.location}</td>
                  <td
                    className={`px-4 py-3 border font-semibold ${
                      job.status === "Open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {job.applicants}
                  </td>
                  <td className="px-4 py-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-4"
                  >
                    No jobs found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
