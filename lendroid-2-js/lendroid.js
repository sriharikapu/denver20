"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
var services_1 = require("./services");
var Lendroid = (function () {
    function Lendroid(initParams) {
        if (initParams === void 0) { initParams = {}; }
        this.params = initParams;
    }
    Lendroid.prototype.enable = function (provider, type) {
        return __awaiter(this, void 0, void 0, function () {
            var prov, _a, _b, initialized, accounts, network, err_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        prov = provider || window.web3.currentProvider || window.ethereum;
                        if (!(prov && prov.enable)) return [3, 2];
                        _b = (_a = console).log;
                        return [4, prov.enable()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        initialized = !!this.web3;
                        this.web3 = new web3_1.default(prov);
                        this.web3Utils = new services_1.Web3Utils(this.web3);
                        return [4, this.web3.eth.getAccounts()];
                    case 3:
                        accounts = _c.sent();
                        this.address = accounts[0];
                        this.params.type = type;
                        return [4, this.web3.eth.net.getId()];
                    case 4:
                        network = _c.sent();
                        if (initialized) {
                            this.contracts.onNetworkChange(network, this.address);
                        }
                        else {
                            this.init();
                        }
                        return [3, 6];
                    case 5:
                        err_1 = _c.sent();
                        services_1.Logger.error(services_1.LOGGER_CONTEXT.METAMASK_ERROR, err_1);
                        return [3, 6];
                    case 6:
                        setTimeout(function () {
                            return window.ethereum.on('accountsChanged', function (acc) {
                                if (_this.contracts && _this.address !== acc[0]) {
                                    _this.address = acc[0];
                                    _this.contracts.onUpdateAddress(_this.address);
                                }
                            });
                        }, 1000);
                        return [2];
                }
            });
        });
    };
    Lendroid.prototype.init = function () {
        services_1.Logger.info(services_1.LOGGER_CONTEXT.INIT, this.params);
        this.contracts = new services_1.Contracts(__assign({ web3Utils: this.web3Utils, address: this.address }, this.params));
    };
    return Lendroid;
}());
exports.Lendroid = Lendroid;
//# sourceMappingURL=lendroid.js.map