import React from "react";
import("@react-pdf/renderer");
import dayjs from "dayjs";
import { Font, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
Font.register({
  family: "Segoe UI",
  fonts: [
    {
      src: `${process.cwd()}/src/modules/templates/pdf/fonts/Segoe UI.ttf`,
    },
    {
      src: `${process.cwd()}/src/modules/templates/pdf/fonts/Segoe UI Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `${process.cwd()}/src/modules/templates/pdf/fonts/Segoe UI Italic.ttf`,
      fontStyle: "italic",
    },
    {
      src: `${process.cwd()}/src/modules/templates/pdf/fonts/Segoe UI Bold Italic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

export type AcademicCallPDFTemplateProps = {
  _class: string;
  studentName: string;
  beginDate: Date;
  endTime: string;
  beginTime: string;
  subject: string;
  room?: {
    designacao: string;
    sector: {
      nome: string;
    };
  };
  points: string[];
};

export default function AcademicCallPdfTemplate({
  _class,
  studentName,
  beginDate,
  subject = "encontro informativo",
  room,
  endTime,
  beginTime,
  points,
}: AcademicCallPDFTemplateProps) {
  return (
    <View
      style={{
        fontSize: 12,
        fontFamily: "Segoe UI",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        marginVertical: 35,
      }}
    >
      <Text style={styles._class}>
        TURMA: <Text style={styles.highlight}>{_class || "-"}</Text>
      </Text>
      <Image style={styles.logo} src="./src/modules/templates/pdf/images/ipil_icon.jpg" />
      <Image style={styles.carimb} src="./src/modules/templates/pdf/images/CARIMBO_IPIL.jpg" />
      <Text style={styles.cleanTitle}>
        INSTITUTO POLITÉCNICO INDUSTRIAL DE LUANDA
      </Text>
      <Text style={styles.cleanTitle}>(GABINETE DO DIRECTOR)</Text>
      <Text style={styles.title}>CONVOCATÓRIA</Text>
      <Text style={styles.mainText}>
        A Direcção do Instituto Politécnico Industrial de Luanda supracitada,
        vem por intermédio desta convocar o (a) Encarregado(a) de educação de{" "}
        <Text style={styles.highlight}>{studentName}</Text> para um{" "}
        <Text style={styles.highlight}>{subject}</Text> a ter lugar no{" "}
        <Text style={styles.highlight}>
          dia{" "}
          {dayjs(beginDate)
            .format("D [de] MMMM [de] YYYY")
            .replace(
              dayjs(beginDate).format("MMMM"),
              dayjs(beginDate).format("MMMM").slice(0, 1).toUpperCase() +
                dayjs(beginDate).format("MMMM").slice(1)
            )}
          ,
        </Text>{" "}
        {dayjs(beginDate).format(" dddd, ")} das{" "}
        <Text style={styles.highlight}>
          {beginTime} às {endTime}
        </Text>{" "}
        na sala{" "}
        <Text style={styles.highlight}>
          {typeof room?.designacao === "number"
            ? `n° ${room.designacao}`
            : room?.designacao}{" "}
          ( {room?.sector?.nome} )
        </Text>{" "}
        desta instituição de ensino com a seguinte agenda:
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",

          gap: 3,
        }}
      >
        {points.map((point, index) => (
          <Text style={{ textIndent: 30 }} key={point}>
            • {point}
            {index !== points.length - 1 ? ";" : "."}
          </Text>
        ))}
      </View>
      <Text style={styles.highlight}>
        Instituto Politécnico Industrial de Luanda, aos{" "}
        {dayjs()
          .format("DD [de] MMMM [de] YYYY")
          .replace(
            dayjs().format("MMMM"),
            dayjs().format("MMMM").slice(0, 1).toUpperCase() +
              dayjs().format("MMMM").slice(1)
          )}
      </Text>
      <Text>
        Obs.: A direcção da escola declina qualquer responsabilidade decorrente
        da não comparência do(a) convocado(a).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  _class: {
    fontSize: 14,
    position: "absolute",
    top: 0,
    right: 0,
  },
  logo: {
    height: 80,
    width: 80,
    marginHorizontal: "auto",
  },
  carimb: {
    height: 70,
    position: "absolute",
    top: 5,
    left: 10,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  cleanTitle: {
    textAlign: "center",
  },
  mainText: {
    textAlign: "justify",
    textIndent: 30,
  },
  highlight: {
    fontWeight: "bold",
  },
});
Font.registerHyphenationCallback((word) => {
  return [word];
});
