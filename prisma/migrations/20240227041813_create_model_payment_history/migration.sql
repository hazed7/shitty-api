-- CreateTable
CREATE TABLE "payment_history" (
    "id" UUID NOT NULL,
    "payment_id" UUID NOT NULL,
    "status" "payment_status" NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
