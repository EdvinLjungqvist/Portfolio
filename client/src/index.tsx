import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./hooks/ThemeProvider";
import Loader from "./components/Loader";
import "./i18n.ts";
import "./index.css";

const root = createRoot(document.getElementById("root"));
const App = lazy(() => import("./App"));

root.render(
    <StrictMode>
        <Router>
            <HelmetProvider>
                <ThemeProvider>
                    <Suspense fallback={<Loader />}>
                        <App />
                    </Suspense>
                </ThemeProvider>
            </HelmetProvider>
        </Router>
    </StrictMode>
);
