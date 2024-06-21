export const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Tugas Akhir Rehan Maulana Express API with Swagger",
        version: "0.1.0",
        description:
          "Ini adalah API Tugas Akhir dan terdokumentasikan dengan Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Rehan Maulana",
          url: "https://portofolio-rehan.vercel.app/",
          email: "rehanmaul111@gmail.com",
        },
      },
      servers: [
        {
          url: "https://tugas-akhir-tawny.vercel.app/api/v1",
        },
      ],
    },
    apis: ["api-docs/*.js"],
  };
  