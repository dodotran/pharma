/*
  Warnings:

  - You are about to drop the `_ImageProductToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `ImageProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ImageProductToProduct" DROP CONSTRAINT "_ImageProductToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageProductToProduct" DROP CONSTRAINT "_ImageProductToProduct_B_fkey";

-- AlterTable
ALTER TABLE "ImageProduct" ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ImageProductToProduct";

-- AddForeignKey
ALTER TABLE "ImageProduct" ADD CONSTRAINT "ImageProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
