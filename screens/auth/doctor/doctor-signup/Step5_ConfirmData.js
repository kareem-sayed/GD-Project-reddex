// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import SignupProgressBar from "../../../components/SignupProgressBar";
// export default function Step5_Confirm({ formData, prevStep }) {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <SignupProgressBar currentStep={5} />
//       <Text style={styles.title}>تأكيد البيانات</Text>
//       <Text style={styles.subtitle}>
//         راجع بياناتك، وإذا كل حاجة تمام اضغط تأكيد.
//       </Text>

//       <View style={styles.section}>
//         <Text style={styles.label}>الاسم:</Text>
//         <Text style={styles.value}>{formData.fullName}</Text>

//         <Text style={styles.label}>التخصص الطبي:</Text>
//         <Text style={styles.value}>{formData.specialization}</Text>

//         <Text style={styles.label}>رقم الترخيص الطبي:</Text>
//         <Text style={styles.value}>{formData.licenseNumber}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>بيانات العيادة:</Text>
//         <Text style={styles.value}>الاسم: {formData.clinicName}</Text>
//         <Text style={styles.value}>العنوان: {formData.clinicAddress}</Text>
//       </View>

//       <View>
//                 <View style={styles.buttons}>
//                   <TouchableOpacity
//                     style={[styles.nextButton, !isValid && styles.disabled]}
//                     onPress={nextStep}
//                     disabled={!isValid}
//                   >
//                     <Text style={styles.nextText}>انشاء حساب</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.buttons}>
//                   <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
//                     <Text style={styles.prevText}>السابق</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 24, flexGrow: 1 },
//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#1A1A1A",
//     marginBottom: 8,
//     textAlign: "right",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 24,
//     textAlign: "right",
//   },
//   section: { gap: 12, marginBottom: 24 },
//   label: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1A1A1A",
//     textAlign: "right",
//   },
//   value: { fontSize: 14, color: "#666", textAlign: "right" },
//   prevButton: {
//     height: 56,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#7D0A0A",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//   },
//   prevText: { fontSize: 18, fontWeight: "700", color: "#7D0A0A" },
// });
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SignupProgressBar from "../../../components/SignupProgressBar";

export default function Step5_Confirm({ formData, prevStep }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SignupProgressBar currentStep={5} />

        <Text style={styles.title}>تأكيد البيانات</Text>

        <Text style={styles.subtitle}>
          راجع بياناتك، ولو كل حاجة تمام اضغط تأكيد.
        </Text>

        {/* البيانات الأساسية */}
        <View style={styles.section}>
          <Text style={styles.label}>الاسم :</Text>
          <Text style={styles.value}>{formData.fullName}</Text>

          <Text style={styles.label}>التخصص الطبي :</Text>
          <Text style={styles.value}>{formData.specialization}</Text>

          <Text style={styles.label}>رقم الترخيص الطبي :</Text>
          <Text style={styles.value}>{formData.licenseNumber}</Text>
        </View>

        {/* بيانات العيادة */}
        <View style={styles.section}>
          <Text style={styles.label}>بيانات العيادة :</Text>

          <Text style={styles.value}>الاسم : {formData.clinicName}</Text>

          <Text style={styles.value}>العنوان : {formData.clinicAddress}</Text>
        </View>

        {/* Buttons */}
        <View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>إنشاء حساب</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevText}>السابق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  section: {
    gap: 10,
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  value: {
    fontSize: 14,
    color: "#666",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  nextButton: {
    flex: 1,
    marginHorizontal: 8,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  prevButton: {
    flex: 1,
    marginHorizontal: 8,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  prevText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7D0A0A",
  },
});
