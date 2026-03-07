import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const startedRef = useRef(false);
  const stoppedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const scanner = new Html5Qrcode("reader");

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 15,
        // Remove fixed aspectRatio — let the container define the shape
        qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
          const size = Math.min(viewfinderWidth, viewfinderHeight) * 0.8;
          return { width: size, height: size };
        },
      },
      (decodedText: string) => {
        if (stoppedRef.current) return;
        console.log("QR scanned:", decodedText);
        window.open(decodedText, "_blank");
        stoppedRef.current = true;
        scanner.stop().then(() => {
          navigate("/");
        });
      },
      () => {}
    );

    return () => {
      if (!stoppedRef.current) {
        stoppedRef.current = true;
        scanner.stop().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <div
        id="reader"
        style={{
          /*
           * On mobile (portrait): go nearly full-width and let height follow.
           * On desktop: cap at 900px wide with a 16:9 ratio.
           * The key fix is using min() so the box never overflows the viewport
           * height, which was causing the tiny-box-at-bottom bug on mobile.
           */
          width: "min(75vw, 700px)",
          height: "min(calc(min(85vh, 1000px) * 9 / 16), 90vh)",
          overflow: "hidden",
          borderRadius: "12px",
          border: "2px solid #fff",
        }}
      />
    </div>
  );
}

export default Scanner;