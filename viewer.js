
"use strict";

const modelViewer = document.getElementById("watan-model");
const modelStatus = document.getElementById("model-status");

if (modelViewer && modelStatus) {
  modelViewer.addEventListener("load", () => {
    modelStatus.textContent = "";
    modelStatus.classList.remove("status-error");
  });

  modelViewer.addEventListener("error", () => {
    modelStatus.textContent =
      "مدل بارگذاری نشد. مسیر GLTF و فایل‌های بافت آن را بررسی کن.";
    modelStatus.classList.add("status-error");

    console.error(
      "خطا در بارگذاری مدل:",
      modelViewer.getAttribute("src")
    );
  });
}
