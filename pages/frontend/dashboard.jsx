
import NavBar from '@/components/NavBar'
import React, { useState } from 'react'
const postedJobs = [
  { id: 1, title: "Frontend Developer", status: "Open", applicants: 25 },
  { id: 2, title: "Backend Developer", status: "Closed", applicants: 15 },
  { id: 3, title: "Full Stack Developer", status: "Open", applicants: 40 },
];


export default function Dashboard() {

  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Job Title</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Applicants</th>
            </tr>
          </thead>
          <tbody>
            {postedJobs.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.status}</td>
                <td className="px-4 py-2">{job.applicants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  
  )
}
