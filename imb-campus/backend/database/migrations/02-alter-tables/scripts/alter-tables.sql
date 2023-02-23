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
    