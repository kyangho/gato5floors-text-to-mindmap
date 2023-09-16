/*
  Warnings:

  - You are about to drop the `keyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `note` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "keyword";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shareStatus" TEXT NOT NULL,
    "summary" TEXT NOT NULL
);
INSERT INTO "new_note" ("createdAt", "id", "name", "shareStatus", "summary") SELECT "createdAt", "id", "name", "shareStatus", "summary" FROM "note";
DROP TABLE "note";
ALTER TABLE "new_note" RENAME TO "note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
