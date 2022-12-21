-- CreateEnum
CREATE TYPE "VolunteerRequestStatus" AS ENUM ('open', 'rejected', 'approved');

-- AlterTable
ALTER TABLE "Volunteer_activation_request" DROP COLUMN "status",
ADD COLUMN     "status" "VolunteerRequestStatus" NOT NULL DEFAULT 'open';
