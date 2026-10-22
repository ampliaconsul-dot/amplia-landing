import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "linear-gradient(135deg, #1f7c75 0%, #145a55 55%, #0f3b57 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, border: "10px solid #3fa79b" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, letterSpacing: 4 }}>AMPLÍA</span>
            <span style={{ fontSize: 16, letterSpacing: 10, color: "#a8e0d6" }}>CONSULTORÍA</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 800, maxWidth: 950 }}>
            TU ALIADO CONFIABLE EN LA GESTIÓN PÚBLICA
          </span>
          <span style={{ fontSize: 28, color: "#a8e0d6" }}>
            Asesoría jurídica y de gestión pública para Ayuntamientos de Sonora
          </span>
        </div>
      </div>
    ),
    size,
  );
}
