"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var cookieParser = require("cookie-parser");
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var socketio = __importStar(require("socket.io"));
var userRoute_1 = __importDefault(require("./src/routes/userRoute"));
var taskRoute_1 = __importDefault(require("./src/routes/taskRoute"));
var http_1 = require("http");
dotenv.config();
if (!process.env.PORT) {
    console.log("Error to get ports");
    process.exit(1);
}
var uri = "mongodb+srv://amasha:amasha1234@cluster0.muszfeu.mongodb.net/?retryWrites=true&w=majority";
//CONNECTING TO DATABASE
mongoose_1.default.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connected to MONGODB");
    }
});
var PORT = parseInt(process.env.PORT, 10);
var options = {
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4200",
    preflightContinue: false,
};
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socketio.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
app.use(express_1.default.json());
app.use(cookieParser());
app.use((0, cors_1.default)(options));
io.on("connection", function (socket) {
    socket.on("message", function (msg) {
        console.log(msg);
        socket.broadcast.emit("message-broadcast", msg);
    });
    console.log("a user connected to socket");
});
httpServer.listen(8000, function () {
    console.log('Listen at 8000');
});
var authorisedRoute = express_1.default.Router();
//ADD API PREFIX FOR ROOT
app.use("/api", authorisedRoute);
authorisedRoute.get("/", function (req, res) {
    return res.send("Welcome to default response of Product API");
});
authorisedRoute.use("/user", userRoute_1.default);
authorisedRoute.use("/task", taskRoute_1.default);
