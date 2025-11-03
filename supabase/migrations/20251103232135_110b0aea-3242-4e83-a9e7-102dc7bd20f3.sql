-- Enable real-time updates for admin CRUD operations
-- Add all admin-managed tables to the supabase_realtime publication

ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE project_images;
ALTER PUBLICATION supabase_realtime ADD TABLE insights_articles;
ALTER PUBLICATION supabase_realtime ADD TABLE case_studies;
ALTER PUBLICATION supabase_realtime ADD TABLE resources;