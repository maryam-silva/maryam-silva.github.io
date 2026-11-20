import * as React from "react";
import { createRoot } from "react-dom/client";
import { KepengurusanSection } from "./components/ui/kepengurusan-section";

const el = document.getElementById("kepengurusan-root");
if (el) createRoot(el).render(<KepengurusanSection />);
