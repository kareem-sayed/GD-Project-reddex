import aiClient from "../clients/aiClient"; // أو المسار الصح للـ client بتاعك

// دالة الـ Manual شغالة عادي لأنها بتبعت JSON
export const manualDiagnosis = (data) =>
    aiClient.post("manual", data);

// الدوال التلاتة دول بيبعتوا FormData (صور)، فلازم نضيفلهم الـ Headers
export const bloodSmearDiagnosis = (formData) =>
    aiClient.post("blood-smear", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const labReportDiagnosis = (formData) =>
    aiClient.post("lab-report", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const fusionDiagnosis = (formData) =>
    aiClient.post("fusion", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
