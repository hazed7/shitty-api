/*
  Warnings:

  - You are about to drop the `payment_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment_history" DROP CONSTRAINT "payment_history_payment_id_fkey";

-- DropTable
DROP TABLE "payment_history";
