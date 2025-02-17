import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChangeBodyColor = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.body.style.backgroundColor = "#e95322";
        break;

      default:
        document.body.style.backgroundColor = "#f5cb58";
    }
    // При очищенні компонента
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [location.pathname]);

  return null;
};

export default ChangeBodyColor;
