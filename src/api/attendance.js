// src/api/attendance.js

// Fungsi untuk mengambil data absensi
// export const getAttendanceData = async (startDate, endDate) => {
//     try {
//       // Untuk produksi:
//       // const response = await fetch(`/api/attendance?startDate=${startDate}&endDate=${endDate}`);
//       // return await response.json();
        
//       // Dummy data untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           // Generate dummy data for the requested date range
//           const employees = [
//             { id: 1, name: 'Ahmad Fajar', employeeId: 'EMP001', department: 'IT', imageUrl: '/api/placeholder/40/40' },
//             { id: 2, name: 'Siti Nuraini', employeeId: 'EMP002', department: 'HR', imageUrl: '/api/placeholder/40/40' },
//             { id: 3, name: 'Budi Santoso', employeeId: 'EMP003', department: 'Finance', imageUrl: '/api/placeholder/40/40' },
//             { id: 4, name: 'Dewi Putri', employeeId: 'EMP004', department: 'Marketing', imageUrl: '/api/placeholder/40/40' },
//             { id: 5, name: 'Eko Prasetyo', employeeId: 'EMP005', department: 'IT', imageUrl: '/api/placeholder/40/40' }
//           ];
            
//           const statuses = ['Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alfa'];
//           const result = [];
            
//           // Parse start and end dates
//           const start = new Date(startDate);
//           const end = new Date(endDate);
            
//           // Loop through each date in the range
//           for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
//             const dateString = day.toISOString().split('T')[0];
                
//             // Skip weekends for demo data
//             const dayOfWeek = day.getDay();
//             if (dayOfWeek === 0 || dayOfWeek === 6) continue;
                
//             // Add records for each employee on this date
//             employees.forEach(employee => {
//               // Randomly select status, weighted towards 'Hadir'
//               const randomValue = Math.random();
//               let status;
//               if (randomValue < 0.7) status = 'Hadir';
//               else if (randomValue < 0.85) status = 'Terlambat';
//               else if (randomValue < 0.9) status = 'Izin';
//               else if (randomValue < 0.95) status = 'Sakit';
//               else status = 'Alfa';
                
//               let checkInTime, checkOutTime;
                
//               if (status === 'Hadir') {
//                 // Random check-in time between 07:30 and 08:15
//                 const checkInHour = 7;
//                 const checkInMinute = Math.floor(Math.random() * 45) + 30;
//                 checkInTime = `${checkInHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`;
                
//                 // Random check-out time between 16:00 and 17:30
//                 const checkOutHour = 16 + (Math.random() > 0.7 ? 1 : 0);
//                 const checkOutMinute = Math.floor(Math.random() * 60);
//                 checkOutTime = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMinute.toString().padStart(2, '0')}`;
//               } else if (status === 'Terlambat') {
//                 // Random check-in time between 08:30 and 09:30
//                 const checkInHour = 8 + (Math.random() > 0.5 ? 1 : 0);
//                 const checkInMinute = Math.floor(Math.random() * 60);
//                 checkInTime = `${checkInHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`;
                
//                 // Random check-out time between 16:00 and 17:30
//                 const checkOutHour = 16 + (Math.random() > 0.7 ? 1 : 0);
//                 const checkOutMinute = Math.floor(Math.random() * 60);
//                 checkOutTime = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMinute.toString().padStart(2, '0')}`;
//               } else {
//                 checkInTime = null;
//                 checkOutTime = null;
//               }
                
//               // Add the record
//               result.push({
//                 id: `${dateString}-${employee.id}`,
//                 date: dateString,
//                 employeeId: employee.employeeId,
//                 employeeName: employee.name,
//                 department: employee.department,
//                 status: status,
//                 checkInTime: checkInTime,
//                 checkOutTime: checkOutTime,
//                 imageUrl: employee.imageUrl
//               });
//             });
//           }
            
//           resolve({
//             success: true,
//             data: result,
//             message: 'Data absensi berhasil diambil'
//           });
//         }, 800); // Simulate network delay
//       });
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//       return {
//         success: false,
//         data: [],
//         message: 'Gagal mengambil data absensi'
//       };
//     }
// };

export const getAttendanceData = async (startDate, endDate) => {
  try {
      // Memanggil API backend untuk mendapatkan data absensi
      const response = await fetch(`http://127.0.0.1:5000/api/attendance?startDate=${startDate}&endDate=${endDate}`);
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      
      // Validasi struktur respons
      if (!responseData || typeof responseData !== 'object') {
          throw new Error('Format respons tidak valid');
      }
      
      return responseData;
  } catch (error) {
      console.error('Error fetching attendance data:', error);
      return {
          success: false,
          data: [],
          message: `Gagal mengambil data absensi: ${error.message}`
      };
  }
};

export const getEmployees = async () => {
  try {
      const response = await fetch('http://127.0.0.1:5000/api/dataemployee');
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      
      return responseData;
  } catch (error) {
      console.error('Error fetching employees:', error);
      return {
          success: false,
          data: [],
          message: `Gagal mengambil data karyawan: ${error.message}`
      };
  }
};

// Fungsi untuk mendapatkan statistik absensi
export const getAttendanceStats = async (startDate, endDate) => {
  try {
    // Ambil data absensi untuk dianalisis
    const attendanceData = await getAttendanceData(startDate, endDate);
    
    if (!attendanceData.success) {
      return {
        success: false,
        data: null,
        message: 'Gagal mengambil statistik absensi'
      };
    }
    
    const data = attendanceData.data;
    
    // Hitung statistik
    const totalRecords = data.length;
    const hadir = data.filter(record => record.status === 'Hadir').length;
    const terlambat = data.filter(record => record.status === 'Terlambat').length;
    const izin = data.filter(record => record.status === 'Izin').length;
    const sakit = data.filter(record => record.status === 'Sakit').length;
    const alfa = data.filter(record => record.status === 'Alfa').length;
    
    // Persentase kehadiran (hadir + terlambat)
    const kehadiranPercentage = totalRecords > 0 
      ? ((hadir + terlambat) / totalRecords * 100).toFixed(2)
      : 0;
    
    // Data statistik per departemen
    const departmentStats = {};
    const employeeStats = {};
    
    // Olah data per departemen dan per karyawan
    data.forEach(record => {
      // Statistik per departemen
      if (!departmentStats[record.department]) {
        departmentStats[record.department] = {
          total: 0,
          hadir: 0,
          terlambat: 0,
          izin: 0,
          sakit: 0,
          alfa: 0
        };
      }
      
      departmentStats[record.department].total++;
      departmentStats[record.department][record.status.toLowerCase()]++;
      
      // Statistik per karyawan
      if (!employeeStats[record.employeeId]) {
        employeeStats[record.employeeId] = {
          name: record.employeeName,
          department: record.department,
          total: 0,
          hadir: 0,
          terlambat: 0,
          izin: 0,
          sakit: 0,
          alfa: 0
        };
      }
      
      employeeStats[record.employeeId].total++;
      employeeStats[record.employeeId][record.status.toLowerCase()]++;
    });
    
    return {
      success: true,
      data: {
        summary: {
          totalRecords,
          hadir,
          terlambat,
          izin,
          sakit,
          alfa,
          kehadiranPercentage
        },
        departmentStats,
        employeeStats
      },
      message: 'Statistik absensi berhasil diambil'
    };
  } catch (error) {
    console.error('Error calculating attendance stats:', error);
    return {
      success: false,
      data: null,
      message: 'Gagal mengkalkulasi statistik absensi'
    };
  }
};

// Fungsi untuk ekspor data absensi ke CSV
export const exportAttendanceToCSV = async (startDate, endDate) => {
  try {
    const attendanceData = await getAttendanceData(startDate, endDate);
    
    if (!attendanceData.success) {
      return {
        success: false,
        data: null,
        message: 'Gagal mengekspor data absensi'
      };
    }
    
    const data = attendanceData.data;
    
    // Header untuk CSV
    let csvContent = "Tanggal,ID Karyawan,Nama Karyawan,Departemen,Status,Jam Masuk,Jam Keluar\n";
    
    // Tambahkan data
    data.forEach(record => {
      csvContent += `${record.date},${record.employeeId},"${record.employeeName}",${record.department},${record.status},${record.checkInTime || ''},${record.checkOutTime || ''}\n`;
    });
    
    return {
      success: true,
      data: csvContent,
      message: 'Data absensi berhasil diekspor ke CSV'
    };
  } catch (error) {
    console.error('Error exporting attendance data:', error);
    return {
      success: false,
      data: null,
      message: 'Gagal mengekspor data absensi'
    };
  }
};