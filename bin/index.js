"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var state_controller_1 = require("../api/stateList/state.controller");
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://powerschool:1234@cluster0.hdiz6.mongodb.net/poc?retryWrites=true&w=majority').then(function (res) {
    console.log("Connected successfully");
});
var app = express_1.default();
var server = http_1.createServer(app);
//Setup Http-Logger Morgan Middleware
app.use(morgan_1.default('dev'));
//Setup CORS Middleware for Handling CORS Errors
app.use(cors_1.default());
//Import Employee Routes
//Setup Static Folder Path
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
//Setup Body-Parser & Cookie-Parser Middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.get('/search', state_controller_1.StateController);
app.use('/*', function (req, res) {
    res.send({ message: "invalid request " });
});
//Setup Port & Listening to Server
var port = process.env.PORT || 5000;
server.listen(port, function () { return console.log("server running on port " + port + "!!"); });
