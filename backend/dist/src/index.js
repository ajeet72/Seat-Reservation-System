"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getSeats_1 = require("./getSeats");
const bookSeats_1 = require("./bookSeats");
const resetSeats_1 = require("./resetSeats");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/getseats', getSeats_1.default);
app.use('/bookseats', bookSeats_1.default);
app.use('/resetseats', resetSeats_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map