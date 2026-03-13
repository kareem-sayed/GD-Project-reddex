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

function UploadBlock({ label, required, optional, file, onPress }) {
  const filled = !!file;

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
        {optional && <Text style={styles.optionalHint}> (اختياري)</Text>}
      </View>

      <TouchableOpacity
        style={[styles.uploadBox, filled && styles.uploadBoxFilled]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {filled ? (
          <Text numberOfLines={1} style={styles.fileName}>
            {file.name}
          </Text>
        ) : (
          <Text style={styles.fileTypes}>.pdf ، .jpg ، .png</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function Step4_Documents({
  formData,
  pickDocument,
  nextStep,
  prevStep,
}) {
  const isValid = formData.idCard && formData.practiceLicense;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SignupProgressBar currentStep={4} />

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Text style={styles.title}>توثيق حسابك</Text>

        <Text style={styles.subtitle}>
          ارفع المستندات المطلوبة علشان نأكد هويتك كدكتور.
        </Text>

        <View style={styles.inputs}>
          <UploadBlock
            label="صورة بطاقة الطبيب (ID Card)"
            required
            file={formData.idCard}
            onPress={() => pickDocument("idCard")}
          />

          <UploadBlock
            label="صورة رخصة مزاولة المهنة"
            required
            file={formData.practiceLicense}
            onPress={() => pickDocument("practiceLicense")}
          />

          <UploadBlock
            label="صورة توضيحية للعيادة"
            optional
            file={formData.clinicImage}
            onPress={() => pickDocument("clinicImage")}
          />
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            <Text style={styles.noteBold}>ملاحظة:</Text>
            {" هنراجع المستندات خلال 24-48 ساعة."}
          </Text>
        </View>
        {/* </ScrollView> */}

        {/* Buttons */}
        <View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.nextButton, !isValid && styles.disabled]}
              onPress={nextStep}
              disabled={!isValid}
            >
              <Text style={styles.nextText}>التالي</Text>
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
    padding: 24,
    flex: 1,
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

  inputs: {
    gap: 16,
  },

  inputGroup: {
    gap: 6,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  asterisk: {
    color: "#7D0A0A",
    marginRight: 4,
  },

  optionalHint: {
    fontSize: 12,
    color: "#1A1A1A",
    marginRight: 4,
  },

  uploadBox: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },

  uploadBoxFilled: {
    borderColor: "#7D0A0A",
    backgroundColor: "#FDF5F5",
  },

  fileTypes: {
    fontSize: 13,
    color: "#AAA",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  fileName: {
    fontSize: 14,
    color: "#7D0A0A",
    textAlign: "right",
    fontWeight: "600",
  },

  noteContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },

  noteText: {
    fontSize: 12,
    color: "#777",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  noteBold: {
    fontWeight: "700",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  nextButton: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
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
    marginRight: 8,
    marginLeft: 8,
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

  disabled: {
    backgroundColor: "#7D0A0A",
  },
});
