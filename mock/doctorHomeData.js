// Mock data structure that mimics API response
export const mockDoctorProfile = {
  id: "doc_123",
  fullName: "د. عادل",
  specialization: "طبيب قلب",
  profileImage: "https://via.placeholder.com/80",
  clinicName: "عيادة القلب المتخصصة",
  unreadNotifications: 2,
};

export const mockAppointments = [
  {
    id: "apt_1",
    patient: {
      id: "pat_1",
      name: "سارة وائل",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "O+",
    },
    type: "حجز التحاليل المتوسط",
    status: "pending_followup", // "booked" | "pending_followup" | "ongoing"
    priority: "normal", // "normal" | "high"
    appointmentDate: "2024-04-15T10:00:00Z",
    notes: null,
  },
  {
    id: "apt_2",
    patient: {
      id: "pat_2",
      name: "منهاج عبدالخالق",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "A+",
    },
    type: "فرنسا",
    status: "ongoing",
    priority: "normal",
    appointmentDate: "2024-04-15T11:30:00Z",
    notes: null,
  },
  {
    id: "apt_3",
    patient: {
      id: "pat_3",
      name: "يوسف علي",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "B+",
    },
    type: "فرنسا",
    status: "pending_followup",
    priority: "normal",
    appointmentDate: "2024-04-15T14:00:00Z",
    notes: null,
  },
  {
    id: "apt_4",
    patient: {
      id: "pat_4",
      name: "أحمد خالد",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "AB+",
    },
    type: "الاصبع الدم المتوسط",
    status: "booked",
    priority: "high",
    appointmentDate: "2024-04-15T09:00:00Z",
    notes: "حالة طارئة - يحتاج متابعة فورية",
  },
  {
    id: "apt_5",
    patient: {
      id: "pat_5",
      name: "سارة وائل",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "O+",
    },
    type: "حجز التحاليل المتوسط",
    status: "ongoing",
    priority: "normal",
    appointmentDate: "2024-04-15T15:30:00Z",
    notes: null,
  },
  {
    id: "apt_6",
    patient: {
      id: "pat_6",
      name: "منهاج عبدالخالق",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "A+",
    },
    type: "فرنسا",
    status: "booked",
    priority: "normal",
    appointmentDate: "2024-04-16T10:00:00Z",
    notes: null,
  },
  {
    id: "apt_7",
    patient: {
      id: "pat_7",
      name: "حالات ذات أولوية",
      profileImage: "https://via.placeholder.com/60",
      bloodType: "O-",
    },
    type: "عمر فاروق",
    status: "pending_followup",
    priority: "high",
    appointmentDate: "2024-04-15T08:00:00Z",
    notes: "لم تجاوب عن أخر تحديث",
  },
];

export const mockNotifications = [
  {
    id: "notif_1",
    type: "new_appointment",
    title: "طلب جديد",
    message: "لديك طلب متابعة جديد من أحمد خالد",
    timestamp: "2024-04-15T08:30:00Z",
    read: false,
  },
  {
    id: "notif_2",
    type: "priority_case",
    title: "حالة ذات أولوية",
    message: "تم إضافة حالة طارئة تحتاج متابعة",
    timestamp: "2024-04-15T07:45:00Z",
    read: false,
  },
  {
    id: "notif_3",
    type: "appointment_completed",
    title: "تم إكمال الموعد",
    message: "تم إكمال موعد سارة وائل بنجاح",
    timestamp: "2024-04-14T16:00:00Z",
    read: true,
  },
];