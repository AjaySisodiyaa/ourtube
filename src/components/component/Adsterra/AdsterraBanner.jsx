import { useEffect, useRef } from "react";

const AdsterraBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      // Create the first script (atOptions)
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key': '892476ebb2d0277d9fd801e76400c7b8',
          'format': 'iframe',
          'height': 60,
          'width': 468,
          'params': {}
        };
      `;
      adRef.current.appendChild(script1);

      // Create the second script (invoke.js)
      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src =
        "//www.highperformanceformat.com/892476ebb2d0277d9fd801e76400c7b8/invoke.js";
      script2.async = true;
      adRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        overflowX: "scroll",
      }}
      ref={adRef}
    ></div>
  );
};

export default AdsterraBanner;
