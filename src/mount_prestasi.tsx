import * as React from "react";
import { createRoot } from "react-dom/client";
import { PrestasiSection } from "./components/ui/prestasi-section";

const el = document.getElementById("prestasi-root");
if (el) createRoot(el).render(<PrestasiSection />);
