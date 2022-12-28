-- AlterTable
ALTER TABLE "Volunteer_activation_request" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

CREATE OR REPLACE FUNCTION new_request() RETURNS TRIGGER
	AS $$
	BEGIN
	UPDATE "Volunteer_activation_request" SET "createdAt" = NOW() WHERE id = new.id;
	RETURN new;
	END;
	$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_new_request ON "Volunteer_activation_request";
CREATE TRIGGER tr_new_request AFTER INSERT ON "Volunteer_activation_request"
FOR EACH ROW EXECUTE PROCEDURE new_request();


CREATE OR REPLACE FUNCTION update_request() RETURNS TRIGGER
	AS $$
	BEGIN
	UPDATE "Volunteer_activation_request" SET "updatedAt" = NOW() WHERE status = new.status;
	RETURN new;
	END;
	$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_request ON "Volunteer_activation_request";
CREATE TRIGGER tr_update_request AFTER UPDATE OF "status" ON "Volunteer_activation_request"
FOR EACH ROW EXECUTE PROCEDURE update_request();
