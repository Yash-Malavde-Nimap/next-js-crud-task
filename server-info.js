export const server = "DEV"
export const Links = {
    "DEV":{
      name: "LMS",
      title: "LMS",
      basename: "/",
      api_url: "http://localhost:3001",
      domain: "http://localhost:3000",
   },
//    "STAGING":{
//       name: "",
//       title: "",
//       basename: "/",
//       api_url: "",
//       domain:  "",
//    },
//    "PROD":{
//      name: "",
//      title: "",
//      basename: "/",
//      api_url: "",
//      domain: "",
//    }
}

export const PORTAL = {
  ...Links[server]
};