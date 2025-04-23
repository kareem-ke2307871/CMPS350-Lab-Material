/*
  Warnings:

  - You are about to drop the column `accountBalance` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `balance` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "transId" TEXT NOT NULL PRIMARY KEY,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "balance" REAL NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountNo" TEXT NOT NULL,
    CONSTRAINT "transaction_accountNo_fkey" FOREIGN KEY ("accountNo") REFERENCES "account" ("accountNo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("accountNo", "amount", "dateCreated", "transId", "transType") SELECT "accountNo", "amount", "dateCreated", "transId", "transType" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
