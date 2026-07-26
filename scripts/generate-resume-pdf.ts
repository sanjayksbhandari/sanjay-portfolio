/**
 * Generate a recruiter-ready PDF resume from verified Content Engine data.
 * Never invents facts — only site + journey entries.
 *
 *   npx tsx scripts/generate-resume-pdf.ts
 */
import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { site } from "../src/config/site";
import { journeyEntries } from "../src/content/experience";

const OUT = join(process.cwd(), "public/resume/sanjay-singh-bhandari-resume.pdf");

mkdirSync(dirname(OUT), { recursive: true });

const doc = new PDFDocument({
  margin: 54,
  size: "LETTER",
  info: {
    Title: `${site.name} — Resume`,
    Author: site.name,
    Subject: site.title,
  },
});

const stream = createWriteStream(OUT);
doc.pipe(stream);

doc.font("Helvetica-Bold").fontSize(18).fillColor("#242320").text(site.name);
doc.moveDown(0.25);
doc.font("Helvetica").fontSize(11).fillColor("#5c5b57").text(site.title);
doc.text(`${site.yearsExperience} years · ${site.location}`);
doc.text(`LinkedIn: ${site.social.linkedin}`);
doc.moveDown(0.75);
doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor("#e4e3df").stroke();
doc.moveDown(0.75);

doc.font("Helvetica-Bold").fontSize(12).fillColor("#242320").text("Profile");
doc.moveDown(0.35);
doc.font("Helvetica").fontSize(10).fillColor("#3f3e3b").text(site.description, {
  align: "left",
  lineGap: 2,
});
doc.moveDown(0.9);

doc.font("Helvetica-Bold").fontSize(12).fillColor("#242320").text("Experience");
doc.moveDown(0.45);

for (const entry of journeyEntries) {
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#242320").text(entry.title);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#5c5b57")
    .text(`${entry.company} · ${entry.dateRange} · ${entry.durationLabel}`);
  if (entry.location) {
    doc.fontSize(9).text(entry.location);
  }
  doc.moveDown(0.3);
  for (const bullet of entry.scope) {
    doc.font("Helvetica").fontSize(10).fillColor("#3f3e3b").text(`•  ${bullet}`, {
      indent: 8,
      lineGap: 1.5,
    });
  }
  doc.moveDown(0.65);
}

doc.font("Helvetica-Bold").fontSize(12).fillColor("#242320").text("Core focus");
doc.moveDown(0.35);
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#3f3e3b")
  .text(
    "Enterprise Java platforms · Authentication & OAuth2 · Microservices · Trading & financial systems · Engineering leadership · AI engineering (LangChain, RAG, Python)",
    { lineGap: 2 }
  );

doc.moveDown(1);
doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor("#7c7b76")
  .text(
    `Generated from verified portfolio content · ${site.url} · ${new Date().toISOString().slice(0, 10)}`,
    { align: "left" }
  );

doc.end();

stream.on("finish", () => {
  console.log(`Wrote ${OUT}`);
});
stream.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
