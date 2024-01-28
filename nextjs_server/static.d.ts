import { StaticImageData } from "next/image";
import { ReactComponentElement } from "react";

declare module '*.jpg' {
    const value: string;
    export default value;
  }
declare module '*.JPG' {
    const value: string;
    export default value;
  }
declare module '*.json' {
    const value: Array;
    export default value;
  }
declare module '*.svg' {
    const value: ReactComponentElement;
    export default value;
  }
declare module '*.webp' {
    const value: string;
    export default value;
  }
declare module '*.png' {
    const value: StaticImageData;
    export default value;
  }
  