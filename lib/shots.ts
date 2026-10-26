// screenshots live in public/assets/shots as <name>-960.webp and <name>-1920.webp
export const shotSrc = (name: string, width: 960 | 1920 = 1920) => `/assets/shots/${name}-${width}.webp`;
export const shotSrcSet = (name: string) => `${shotSrc(name, 960)} 960w, ${shotSrc(name, 1920)} 1920w`;
