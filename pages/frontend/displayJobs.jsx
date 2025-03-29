import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from "next/router";

// Mock job data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    description:
      "We are looking for a skilled Frontend Developer with experience in React.js, Next.js, and Tailwind CSS.",
    salary: "₹12,00,000 - ₹15,00,000",
    experience: "2 - 4 years",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    location: "Hyderabad, India",
    description:
      "Looking for a Backend Developer with expertise in Node.js, Express, and MongoDB.",
    salary: "₹15,00,000 - ₹18,00,000",
    experience: "3 - 5 years",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Chennai, India",
    description:
      "Hiring a Full Stack Developer with knowledge of both frontend and backend technologies.",
    salary: "₹18,00,000 - ₹22,00,000",
    experience: "4 - 6 years",
  },
];

export default function DisplaysJobs() {
  const router = useRouter();

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm text-gray-700 mt-2">{job.description}</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">
                  Salary: <span className="text-green-600">{job.salary}</span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Experience:{" "}
                  <span className="text-blue-600">{job.experience}</span>
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/frontend/jobDetails?id=${job.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
