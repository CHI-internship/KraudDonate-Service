-- AlterTable
ALTER TABLE "Volunteer_activation_request" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

create or replace function new_request() returns trigger
	as $$
	begin
	update "Volunteer_activation_request" set "createdAt" = now() where id = new.id;
	return new;
	end;
	$$ language plpgsql;

drop trigger if exists tr_new_request on "Volunteer_activation_request";
create trigger tr_new_request after insert on "Volunteer_activation_request"
for each row execute procedure new_request();


create or replace function update_request() returns trigger
	as $$
	begin
	update "Volunteer_activation_request" set "updatedAt" = now() where status = new.status;
	return new;
	end;
	$$ language plpgsql;

drop trigger if exists tr_update_request on "Volunteer_activation_request";
create trigger tr_update_request after update of "status" on "Volunteer_activation_request"
for each row execute procedure update_request()
