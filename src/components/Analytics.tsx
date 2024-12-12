import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageView } from "../utils/analytics";

export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    pageView(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;
