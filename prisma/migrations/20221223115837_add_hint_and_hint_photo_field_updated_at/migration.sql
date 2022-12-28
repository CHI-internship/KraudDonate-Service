-- AlterTable
ALTER TABLE "Volunteer_hint" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Volunteer_hint_photo" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- Create function for trigger
CREATE FUNCTION createUpdatedAt() RETURNS trigger AS $updated_at$
    BEGIN
        NEW."updatedAt" := current_timestamp;
        RETURN NEW;
    END;
$updated_at$ LANGUAGE plpgsql;

-- Create trigger for Volunteer_hint
CREATE TRIGGER updated_at BEFORE UPDATE ON public."Volunteer_hint" 
FOR EACH ROW EXECUTE FUNCTION createUpdatedAt();

-- Create trigger for Volunteer_hint_photo
CREATE TRIGGER updated_at BEFORE UPDATE ON public."Volunteer_hint_photo" 
FOR EACH ROW EXECUTE FUNCTION createUpdatedAt();