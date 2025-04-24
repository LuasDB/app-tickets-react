import { useLocation } from "react-router-dom";

export function useBasePath() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const basePath = segments[0] || "";

  return `/${basePath}`;
}