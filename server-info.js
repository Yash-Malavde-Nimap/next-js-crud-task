export const server = "DEV";
export const Links = {
  "DEV": {
    name: "LMS",
    title: "LMS",
    basename: "/",
    api_url: "http://localhost:3001",
    domain: "http://localhost:3000",
  },
};

export const PORTAL = {
  ...Links[server],
};
