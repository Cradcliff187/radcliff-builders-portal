-- Enable pg_net extension for HTTP requests from database
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger contact email sending
CREATE OR REPLACE FUNCTION public.trigger_send_contact_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_id bigint;
  supabase_url text;
  service_role_key text;
BEGIN
  -- Get Supabase URL and service role key from environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- If settings are not available, use default from secrets
  IF supabase_url IS NULL THEN
    supabase_url := 'https://osothwrzhvgojhomaysk.supabase.co';
  END IF;
  
  -- Make async HTTP request to edge function
  SELECT INTO request_id net.http_post(
    url := supabase_url || '/functions/v1/send-contact-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'organization', NEW.organization,
      'email', NEW.email,
      'phone', NEW.phone,
      'project_scope', NEW.project_scope,
      'message', NEW.message,
      'submission_id', NEW.id,
      'created_at', NEW.created_at
    )
  );
  
  -- Log the request (optional, for debugging)
  RAISE LOG 'Contact email triggered for submission %', NEW.id;
  
  RETURN NEW;
END;
$$;

-- Create trigger on contact_submissions table
DROP TRIGGER IF EXISTS on_contact_submission_created ON public.contact_submissions;

CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_contact_email();