/*
  Warnings:

  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "room_reservations_schedule" DROP CONSTRAINT "room_reservations_schedule_time_id_fkey";

-- DropTable
DROP TABLE "Time";

-- CreateTable
CREATE TABLE "times" (
    "id" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room_reservations_schedule" ADD CONSTRAINT "room_reservations_schedule_time_id_fkey" FOREIGN KEY ("time_id") REFERENCES "times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
