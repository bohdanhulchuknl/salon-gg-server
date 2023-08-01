const allowedOrigins = [
    "http://localhost:5173",
    "https://salon-gg-client.vercel.app",
  ];
  

export const corsOptions = {
    origin: (origin:any, callback:any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

