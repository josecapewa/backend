import React from "react";
import {
  Document,
  Page, renderToStream,
  View
} from "@react-pdf/renderer";
import AcademicCallPdfTemplate from "./single.js";

export type AcademicCallPDFProps = {
  studentsNames: string[];
  points: string[];
  room?: {
    designacao: string;
    sector: {
      nome: string;
    };
  };
  subject: string;
  _class: string;
  beginDate: Date;
  beginTime: string;
  endTime: string;
};
function AcademicCallPDF({ studentsNames, ...rest }: AcademicCallPDFProps) {
  return (
    <Document title={rest._class} subject={rest.subject} creator="SOSOFT LDA">
      <Page style={{ paddingHorizontal: 30 }} size="A4">
        {studentsNames.map((studentName, index) => (
          <>
            <AcademicCallPdfTemplate
              key={index}
              studentName={studentName}
              {...rest}
            />
            {(index + 1) % 2 !== 0 && (
              <View
                style={{
                  borderBottom: "1px dotted black",
                  width: "100%",
                }}
              />
            )}
          </>
        ))}
      </Page>
    </Document>
  );
}

export default async function multipleAcademicCalls(
  props: AcademicCallPDFProps
) {
  return await renderToStream(<AcademicCallPDF {...props} />);
}
