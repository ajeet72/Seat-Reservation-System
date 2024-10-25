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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const seats = [];
        // Create 10 rows with 7 seats in each row
        for (let row = 1; row <= 10; row++) {
            for (let seat = 1; seat <= 7; seat++) {
                seats.push({ row_number: row, seat_number: seat });
            }
        }
        // Create 1 row (row 11) with 3 seats
        for (let seat = 1; seat <= 3; seat++) {
            seats.push({ row_number: 11, seat_number: seat });
        }
        // Insert seat data into the database
        yield prisma.seat.createMany({
            data: seats,
        });
        console.log("Seats have been created!");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map