import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Mail,
  Phone,
  MapPin,
  X,
  CheckCircle2,
  MoreVertical,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';
import { Employee } from '../../../types';

export const EmployeeDirectory: React.FC = () => {
  const {
    employees,
    addEmployee,
    selectedEmployeeDetail,
    setSelectedEmployeeDetail,
  } = useHR();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<Employee['department']>('Engineering');
  const [designation, setDesignation] = useState('');
  const [baseSalary, setBaseSalary] = useState(10500);
  const [employmentType, setEmploymentType] = useState<Employee['employmentType']>('Full-time');

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Human Resources', 'Finance', 'Operations'];

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    addEmployee({
      firstName,
      lastName,
      email,
      phone: phone || '+1 (415) 555-0199',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department,
      designation: designation || 'Specialist',
      joiningDate: new Date().toISOString().split('T')[0],
      employmentType,
      status: 'Active',
      salary: {
        baseMonthly: Number(baseSalary),
        hra: Math.round(Number(baseSalary) * 0.25),
        specialAllowance: Math.round(Number(baseSalary) * 0.15),
        currency: 'USD',
      },
      leaveBalances: {
        annual: 15,
        sick: 8,
        casual: 4,
        parental: 12,
      },
      location: 'San Francisco, CA (HQ)',
      emergencyContact: {
        name: 'Family Member',
        relation: 'Relative',
        phone: '+1 (415) 555-0000',
      },
    });

    setIsAddModalOpen(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setDesignation('');
  };

  const exportCSV = () => {
    const headers = ['Employee Code', 'Full Name', 'Email', 'Department', 'Designation', 'Status', 'Joining Date'];
    const rows = filtered.map((e) => [
      e.employeeCode,
      `"${e.firstName} ${e.lastName}"`,
      e.email,
      e.department,
      `"${e.designation}"`,
      e.status,
      e.joiningDate,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hrmate_employees_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Centralized Employee Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Managing {employees.length} team members across global branches and remote hubs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs shadow-orange-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, code, designation, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-slate-800 transition-colors"
          />
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Employment</th>
                <th className="py-3 px-4">Work Location</th>
                <th className="py-3 px-4">PTO Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployeeDetail(emp)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.firstName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {emp.firstName} {emp.lastName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {emp.employeeCode} · {emp.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800">{emp.department}</p>
                    <p className="text-[11px] text-slate-500">{emp.designation}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-700">{emp.employmentType}</span>
                    <p className="text-[10px] text-slate-400">Joined {emp.joiningDate}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{emp.location.split('(')[0]}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-semibold tabular-nums">
                      {emp.leaveBalances.annual} Annual · {emp.leaveBalances.sick} Sick
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        emp.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployeeDetail(emp);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedEmployeeDetail && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <img
                src={selectedEmployeeDetail.avatar}
                alt={selectedEmployeeDetail.firstName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedEmployeeDetail.firstName} {selectedEmployeeDetail.lastName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedEmployeeDetail.employeeCode} · {selectedEmployeeDetail.designation}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedEmployeeDetail(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs">
            {/* Quick Contact info */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedEmployeeDetail.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedEmployeeDetail.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedEmployeeDetail.location}</span>
              </div>
            </div>

            {/* Compensation & Contract */}
            <div>
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Compensation & Structure
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-500">Base Monthly</p>
                  <p className="text-base font-bold text-slate-900 tabular-nums">
                    ${selectedEmployeeDetail.salary.baseMonthly.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-500">HRA & Special</p>
                  <p className="text-base font-bold text-slate-900 tabular-nums">
                    ${(selectedEmployeeDetail.salary.hra + selectedEmployeeDetail.salary.specialAllowance).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Leave Balances Breakdown */}
            <div>
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                PTO & Leave Bank
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Annual Leave:</span>{' '}
                  <span className="font-bold text-slate-900">{selectedEmployeeDetail.leaveBalances.annual} days</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Sick Leave:</span>{' '}
                  <span className="font-bold text-slate-900">{selectedEmployeeDetail.leaveBalances.sick} days</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Casual Leave:</span>{' '}
                  <span className="font-bold text-slate-900">{selectedEmployeeDetail.leaveBalances.casual} days</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Parental Leave:</span>{' '}
                  <span className="font-bold text-slate-900">{selectedEmployeeDetail.leaveBalances.parental} days</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Emergency Contact
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800">
                  {selectedEmployeeDetail.emergencyContact.name} ({selectedEmployeeDetail.emergencyContact.relation})
                </p>
                <p className="text-slate-500">{selectedEmployeeDetail.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Onboard New Employee</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 000-0000"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Base Monthly Salary (USD)</label>
                  <input
                    type="number"
                    required
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Probation">Probation</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-xs"
                >
                  Add to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
