// src/pages/AttendanceLog.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
// import { getAttendanceData } from '../api/attendance';

const AttendanceLog = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all'
  });
  
  // Date formatting helper
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // First day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };
  
  // Format date for API
  const formatDateForAPI = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        const startDate = formatDateForAPI(getFirstDayOfMonth(currentDate));
        const endDate = formatDateForAPI(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
        
        const data = await getAttendanceData(startDate, endDate);
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAttendanceData();
  }, [currentDate]);
  
  // Change month
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
  
  // Filter attendance data
  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = 
      record.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || record.status === filters.status;
    const matchesDepartment = filters.department === 'all' || record.employee.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });
  
  // Export to CSV
  const exportToCSV = () => {
    // Simple CSV export implementation
    const headers = ['Tanggal', 'ID Karyawan', 'Nama', 'Departemen', 'Check In', 'Check Out', 'Status'];
    
    const csvContent = [
      headers.join(','),
      ...filteredAttendance.map(record => [
        record.date,
        record.employee.employeeId,
        record.employee.name,
        record.employee.department,
        record.checkInTime || '-',
        record.checkOutTime || '-',
        record.status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `absensi_${formatDateForAPI(currentDate)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Laporan Absensi</h1>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-300">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <span className="font-medium">
              {new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentDate)}
            </span>
          </div>
          
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
          
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-2"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama karyawan..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock size={18} className="text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500 mr-2">Filter:</span>
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="Hadir">Hadir</option>
            <option value="Terlambat">Terlambat</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alfa">Alfa</option>
          </select>
          
          <select
            value={filters.department}
            onChange={(e) => setFilters({...filters, department: e.target.value})}
            className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">Semua Departemen</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>
      
      {/* Attendance data table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data absensi...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Karyawan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departemen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            <img 
                              src={record.employee.imageUrl || "/api/placeholder/40/40"} 
                              alt={record.employee.name} 
                              className="h-8 w-8 rounded-full object-cover" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.employee.name}</div>
                            <div className="text-xs text-gray-500">{record.employee.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkInTime || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOutTime || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'Hadir' ? 'bg-green-100 text-green-800' : 
                          record.status === 'Terlambat' ? 'bg-yellow-100 text-yellow-800' : 
                          record.status === 'Izin' ? 'bg-blue-100 text-blue-800' : 
                          record.status === 'Sakit' ? 'bg-purple-100 text-purple-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      {searchQuery || filters.status !== 'all' || filters.department !== 'all' ? (
                        <>
                          <p className="font-medium">Tidak ada data yang sesuai dengan filter</p>
                          <p className="mt-1">Coba ubah filter atau cari dengan kata kunci lain</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium">Tidak ada data absensi untuk bulan ini</p>
                          <p className="mt-1">Data akan muncul saat karyawan melakukan absensi</p>
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceLog;