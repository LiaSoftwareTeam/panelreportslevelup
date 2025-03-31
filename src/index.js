import app from "./app.js";
import router from "./router/router.js";

app.listen(4001, () => {
  console.log("Running...");
});

app.use(router)