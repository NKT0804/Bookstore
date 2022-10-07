import ImportData from "./../ImportData.js";
import orderRouter from "./orderRoutes.js";
import productRouter from "./productRoutes.js";
import userRouter from "./userRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import publisherRouter from "./publisherRoutes.js";
import cartRouter from "./cartRoutes.js";
import authorRouter from "./authorRoutes.js";
import sliderRouter from "./sliderRoutes.js";
import commentRouter from "./commentRoutes.js";
import refreshTokenRouter from "./refreshTokenRoutes.js";

const routes = (app) => {
    app.use("/api/v1/import", ImportData);
    app.use("/api/v1/order", orderRouter);
    app.use("/api/v1/product", productRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/category", categoryRouter);
    app.use("/api/v1/publisher", publisherRouter);
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/comment", commentRouter);
    app.use("/api/v1/author", authorRouter);
    app.use("/api/v1/slider", sliderRouter);
    app.use("/api/v1/refresh-token", refreshTokenRouter);
    app.use("/api/v1/config/paypal", (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID);
    });
};
export default routes;
