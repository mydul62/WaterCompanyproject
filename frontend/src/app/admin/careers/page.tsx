"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  FileText,
  User,
  ExternalLink,
  Trash2,
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  position: string;
  experience: string;
  email: string;
  phone: string;
  date: string;
  status: "New" | "Shortlisted" | "Interview" | "Hired";
  facility: string;
}

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "APP-2026-001",
    name: "Tanvir Ahmed",
    position: "Senior Quality Assurance Engineer (Cleanroom)",
    experience: "6 Years (Pharma Packaging)",
    email: "tanvir.engr@gmail.com",
    phone: "+880 1712-456789",
    date: "2026-11-04",
    status: "New",
    facility: "Gazipur Facility",
  },
  {
    id: "APP-2026-002",
    name: "Mehedi Hasan",
    position: "High-Speed Blow Molding Technician",
    experience: "4 Years (PET Preforms)",
    email: "mehedi.tech@yahoo.com",
    phone: "+880 1819-334455",
    date: "2026-11-03",
    status: "Shortlisted",
    facility: "Tongi Plant",
  },
  {
    id: "APP-2026-003",
    name: "Sharmin Sultana",
    position: "B2B Key Account Manager (Paint & Chemicals)",
    experience: "5 Years (Industrial Sales)",
    email: "sharmin.sultana@outlook.com",
    phone: "+880 1913-778899",
    date: "2026-11-01",
    status: "Interview",
    facility: "Corporate HQ",
  },
  {
    id: "APP-2026-004",
    name: "Rafiqul Islam",
    position: "CNC Tool & Die Maintenance Specialist",
    experience: "8 Years (Metal Stamping)",
    email: "rafiq.cnc@gmail.com",
    phone: "+880 1681-223344",
    date: "2026-10-28",
    status: "Hired",
    facility: "Gazipur Precision Tool Room",
  },
];

export default function AdminCareersPage() {
  const [apps, setApps] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = apps.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === "all" || a.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: Application["status"]) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this applicant record?")) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const getBadgeStyle = (status: Application["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-950 text-cyan-400 border border-cyan-800/60";
      case "Shortlisted":
        return "bg-amber-950 text-amber-400 border border-amber-800/60";
      case "Interview":
        return "bg-purple-950 text-purple-400 border border-purple-800/60";
      case "Hired":
        return "bg-green-950 text-green-300 border border-green-700/80 font-black";
    }
  };

  return (
    <div className="space-y-8 max-w-[1638px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-amber-400" />
            Career Applications &amp; Talent Pool
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Review job applicants, engineering resumes, and recruitment pipeline for Gazipur and Tongi plants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            {apps.length} Active Candidates
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name, position or email..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Recruitment Stage:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Candidates</option>
            <option value="New">New Applicants</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview Scheduled</option>
            <option value="Hired">Hired / Offered</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="py-3.5 px-4">Candidate Profile</th>
                <th className="py-3.5 px-4">Target Role &amp; Location</th>
                <th className="py-3.5 px-4">Experience Level</th>
                <th className="py-3.5 px-4">Application Date</th>
                <th className="py-3.5 px-4">Recruitment Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 font-bold flex items-center justify-center shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block text-sm">{item.name}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-200 block">{item.position}</span>
                    <span className="text-[11px] text-cyan-400 font-mono">{item.facility}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {item.experience}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as Application["status"])}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none ${getBadgeStyle(
                        item.status
                      )}`}
                    >
                      <option value="New" className="bg-slate-900 text-cyan-400">New</option>
                      <option value="Shortlisted" className="bg-slate-900 text-amber-400">Shortlisted</option>
                      <option value="Interview" className="bg-slate-900 text-purple-400">Interview</option>
                      <option value="Hired" className="bg-slate-900 text-green-400">Hired</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`mailto:${item.email}?subject=Xclusive Can Limited - Job Application: ${item.position}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs transition-colors"
                      >
                        Contact
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

