// // src/api/employees.js
// // Fungsi untuk mengambil data karyawan
// export const getEmployees = async () => {
//     try {
//       // Contoh implementasi, untuk produksi gunakan fetch ke endpoint API sebenarnya
//       // const response = await fetch('/api/employees');
//       // return await response.json();
      
//       // Gunakan data dummy untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           resolve([
//             {
//               id: 1,
//               employeeId: 'EMP001',
//               name: 'Ahmad Fajar',
//               email: 'ahmad.fajar@example.com',
//               position: 'Frontend Developer',
//               department: 'IT',
//               status: 'Aktif',
//               imageUrl: '/api/placeholder/40/40'
//             },
//             {
//               id: 2,
//               employeeId: 'EMP002',
//               name: 'Siti Nuraini',
//               email: 'siti.nuraini@example.com',
//               position: 'HR Manager',
//               department: 'HR',
//               status: 'Aktif',
//               imageUrl: '/api/placeholder/40/40'
//             },
//             {
//               id: 3,
//               employeeId: 'EMP003',
//               name: 'Budi Santoso',
//               email: 'budi.santoso@example.com',
//               position: 'Finance Analyst',
//               department: 'Finance',
//               status: 'Aktif',
//               imageUrl: '/api/placeholder/40/40'
//             },
//             {
//               id: 4,
//               employeeId: 'EMP004',
//               name: 'Dewi Putri',
//               email: 'dewi.putri@example.com',
//               position: 'Marketing Specialist',
//               department: 'Marketing',
//               status: 'Aktif',
//               imageUrl: '/api/placeholder/40/40'
//             },
//             {
//               id: 5,
//               employeeId: 'EMP005',
//               name: 'Eko Prasetyo',
//               email: 'eko.prasetyo@example.com',
//               position: 'Backend Developer',
//               department: 'IT',
//               status: 'Aktif',
//               imageUrl: '/api/placeholder/40/40'
//             }
//           ]);
//         }, 500);
//       });
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       throw error;
//     }
//   };
  
//   // Fungsi untuk mendapatkan detail karyawan berdasarkan ID
//   export const getEmployeeById = async (id) => {
//     try {
//       // Untuk produksi: const response = await fetch(`/api/employees/${id}`);
      
//       // Dummy data untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           const employees = [
//             {
//               id: 1,
//               employeeId: 'EMP001',
//               name: 'Ahmad Fajar',
//               email: 'ahmad.fajar@example.com',
//               position: 'Frontend Developer',
//               department: 'IT',
//               joinDate: '2022-01-15',
//               status: 'Aktif',
//               phone: '081234567890',
//               address: 'Jl. Merdeka No. 123, Jakarta',
//               imageUrl: '/api/placeholder/40/40'
//             },
//             // ...other employees
//           ];
          
//           const employee = employees.find(emp => emp.id === parseInt(id, 10));
//           resolve(employee || null);
//         }, 300);
//       });
//     } catch (error) {
//       console.error(`Error fetching employee with id ${id}:`, error);
//       throw error;
//     }
//   };
  
//   // Fungsi untuk menambahkan karyawan baru
//   export const addEmployee = async (employeeData) => {
//     try {
//       // Untuk produksi:
//       // const response = await fetch('/api/employees', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(employeeData),
//       // });
//       // return await response.json();
      
//       // Simulasi API call untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           console.log('Employee data to be saved:', employeeData);
//           resolve({ 
//             id: Math.floor(Math.random() * 1000), 
//             ...employeeData,
//             status: 'Aktif'
//           });
//         }, 800);
//       });
//     } catch (error) {
//       console.error('Error adding employee:', error);
//       throw error;
//     }
//   };
  
//   // Fungsi untuk mengedit data karyawan
//   export const updateEmployee = async (id, employeeData) => {
//     try {
//       // Untuk produksi:
//       // const response = await fetch(`/api/employees/${id}`, {
//       //   method: 'PUT',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(employeeData),
//       // });
//       // return await response.json();
      
//       // Simulasi API call untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           console.log(`Updating employee ${id} with data:`, employeeData);
//           resolve({ 
//             id: parseInt(id, 10), 
//             ...employeeData 
//           });
//         }, 800);
//       });
//     } catch (error) {
//       console.error(`Error updating employee with id ${id}:`, error);
//       throw error;
//     }
//   };
  
//   // Fungsi untuk menghapus karyawan
//   export const deleteEmployee = async (id) => {
//     try {
//       // Untuk produksi:
//       // await fetch(`/api/employees/${id}`, {
//       //   method: 'DELETE',
//       // });
      
//       // Simulasi API call untuk demo
//       return await new Promise(resolve => {
//         setTimeout(() => {
//           console.log(`Deleting employee with id ${id}`);
//           resolve({ success: true });
//         }, 500);
//       });
//     } catch (error) {
//       console.error(`Error deleting employee with id ${id}:`, error);
//       throw error;
//     }
//   };
  
  
// const BASE_URL = "http://127.0.0.1:5000/api/employees"; // Sesuaikan jika Flask berjalan di tempat lain

// Fungsi untuk mengambil semua karyawan
export const getEmployees = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/employees");
    if (!response.ok) throw new Error("Failed to fetch employees");
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan detail karyawan berdasarkan ID
export const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/employees/${id}`);
    if (!response.ok) throw new Error("Employee not found");

    return await response.json();
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk menambahkan karyawan baru
export const addEmployee = async (employeeData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) throw new Error("Failed to add employee");

    return await response.json();
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Fungsi untuk mengedit data karyawan
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) throw new Error("Failed to update employee");

    return await response.json();
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk menghapus karyawan
export const deleteEmployee = async (id_karyawan) => {
  try {
    const response = await fetch(`http://127.0.0.1.196:5000/api/employees/${id_karyawan}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete employee");

    return await response.json();
  } catch (error) {
    console.error(`Error deleting employee with id ${id_karyawan}:`, error);
    throw error;
  }
};
