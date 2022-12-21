-- AlterTable
ALTER TABLE "Volunteer_activation_request" DROP COLUMN "document",
ADD COLUMN     "documents" TEXT[];
