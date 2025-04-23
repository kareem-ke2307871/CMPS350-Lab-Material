/*
  Warnings:

  - You are about to alter the column `accountBalance` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "transId" TEXT NOT NULL PRIMARY KEY,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "accountBalance" INTEGER NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountNo" TEXT NOT NULL,
    CONSTRAINT "transaction_accountNo_fkey" FOREIGN KEY ("accountNo") REFERENCES "account" ("accountNo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("accountBalance", "accountNo", "amount", "dateCreated", "transId", "transType") SELECT "accountBalance", "accountNo", "amount", "dateCreated", "transId", "transType" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
