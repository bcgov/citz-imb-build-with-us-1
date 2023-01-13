-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
BEGIN;

CREATE TABLE IF NOT EXISTS public."user"
(
    guid text NOT NULL,
    points integer NOT NULL DEFAULT 0,
    job_role text,
    created_on date NOT NULL DEFAULT NOW(),
    group_id integer,
    mentor_guid text,
    PRIMARY KEY (guid)
);

CREATE TABLE IF NOT EXISTS public."group"
(
    id integer NOT NULL,
    name text NOT NULL,
    leader_guid text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.user_badges
(
    badge_id integer NOT NULL,
    user_guid text NOT NULL,
    earned_date date,
    PRIMARY KEY (badge_id, user_guid)
);

CREATE TABLE IF NOT EXISTS public.badge
(
    id integer NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.user_attributes
(
    attribute_id integer NOT NULL,
    user_guid text NOT NULL,
    PRIMARY KEY (attribute_id, user_guid)
);

CREATE TABLE IF NOT EXISTS public.attribute
(
    id integer NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.discovered_user
(
    user_guid text NOT NULL,
    discovered_user_guid text NOT NULL,
    PRIMARY KEY (user_guid, discovered_user_guid)
);

CREATE TABLE IF NOT EXISTS public.user_journeys
(
    user_guid text NOT NULL,
    journey_id integer NOT NULL,
    PRIMARY KEY (user_guid, journey_id)
);

CREATE TABLE IF NOT EXISTS public.journey
(
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    completion_points integer NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.task
(
    id integer NOT NULL,
    journey_id integer NOT NULL,
    name text NOT NULL,
    description text,
    completion_points integer NOT NULL DEFAULT 0,
    step integer,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.task_progress
(
    task_id integer NOT NULL,
    user_guid text NOT NULL,
    is_completed boolean NOT NULL DEFAULT false,
    start_date date NOT NULL DEFAULT NOW(),
    completion_date date,
    PRIMARY KEY (task_id, user_guid)
);

CREATE TABLE IF NOT EXISTS public.helped_user
(
    helpee_guid text NOT NULL,
    helper_guid text NOT NULL,
    task_id integer NOT NULL,
    date_helped date NOT NULL DEFAULT NOW(),
    PRIMARY KEY (helpee_guid, helper_guid, task_id)
);

ALTER TABLE IF EXISTS public."user"
    ADD FOREIGN KEY (group_id)
    REFERENCES public."group" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."user"
    ADD FOREIGN KEY (mentor_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."group"
    ADD FOREIGN KEY (leader_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_badges
    ADD FOREIGN KEY (user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_badges
    ADD FOREIGN KEY (badge_id)
    REFERENCES public.badge (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_attributes
    ADD FOREIGN KEY (user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_attributes
    ADD FOREIGN KEY (attribute_id)
    REFERENCES public.attribute (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.discovered_user
    ADD FOREIGN KEY (user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.discovered_user
    ADD FOREIGN KEY (discovered_user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_journeys
    ADD FOREIGN KEY (journey_id)
    REFERENCES public.journey (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_journeys
    ADD FOREIGN KEY (user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task
    ADD FOREIGN KEY (journey_id)
    REFERENCES public.journey (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task_progress
    ADD FOREIGN KEY (task_id)
    REFERENCES public.task (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task_progress
    ADD FOREIGN KEY (user_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.helped_user
    ADD FOREIGN KEY (helpee_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.helped_user
    ADD FOREIGN KEY (helper_guid)
    REFERENCES public."user" (guid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.helped_user
    ADD FOREIGN KEY (task_id)
    REFERENCES public.task (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
