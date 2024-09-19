"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var aws_ddb_1 = require("./ddb/aws-ddb");
var ro_data_1 = require("./ddb/data/ro_data");
var TABLE_NAME = 'ocs-routeorder-rolloff-poc';
var ddbUtil = new aws_ddb_1.DDBUtil();
function testROs() {
    return __awaiter(this, void 0, void 0, function () {
        var OBJECTID;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                //Put RO ROUTEORDER#191353576
                return [4 /*yield*/, ddbUtil.putItem({
                        TableName: TABLE_NAME,
                        Item: ro_data_1.ro_191353576
                    })];
                case 1:
                    //Put RO ROUTEORDER#191353576
                    _b.sent();
                    OBJECTID = 'OBJECTID';
                    return [4 /*yield*/, ddbUtil.getItem({
                            TableName: TABLE_NAME,
                            Key: (_a = {},
                                _a[OBJECTID] = 'ROUTEORDER#191353576',
                                _a)
                        })];
                case 2:
                    _b.sent();
                    //Get ROs by date
                    console.log("Get ROs by date");
                    return [4 /*yield*/, ddbUtil.getItems({
                            TableName: TABLE_NAME,
                            IndexName: 'DATEPLANNED-SITE_ID-index',
                            KeyConditionExpression: ' DATEPLANNED = :key_value',
                            ExpressionAttributeValues: {
                                ':key_value': '2022-09-13T00:00:00Z'
                            }
                        })
                        //Get ROs by date and site ID
                    ];
                case 3:
                    _b.sent();
                    //Get ROs by date and site ID
                    console.log("Get ROs by date and site ID");
                    return [4 /*yield*/, ddbUtil.getItems({
                            TableName: TABLE_NAME,
                            IndexName: 'DATEPLANNED-SITE_ID-index',
                            KeyConditionExpression: ' DATEPLANNED = :key_value and SITE_ID = :key_value_1',
                            ExpressionAttributeValues: {
                                ':key_value': '2022-09-13T00:00:00Z',
                                ':key_value_1': 'S02935'
                            }
                        })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
testROs();
//# sourceMappingURL=index.js.map