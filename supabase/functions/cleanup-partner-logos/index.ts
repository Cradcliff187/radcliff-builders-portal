import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const confirm = url.searchParams.get('confirm') === 'true';
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const bucket = 'company-assets';
    const targets = ['logos', 'partners'];
    
    // Helper to recursively list all files in a path
    async function listAllFiles(path: string): Promise<string[]> {
      const files: string[] = [];
      const { data, error } = await supabase.storage.from(bucket).list(path);
      
      if (error) {
        console.error(`Error listing ${path}:`, error);
        return files;
      }
      
      if (!data) return files;
      
      for (const item of data) {
        const fullPath = path ? `${path}/${item.name}` : item.name;
        
        if (item.id === null) {
          // It's a folder, recurse
          const subFiles = await listAllFiles(fullPath);
          files.push(...subFiles);
        } else {
          // It's a file
          files.push(fullPath);
        }
      }
      
      return files;
    }
    
    // Collect all files from target directories
    const before: Record<string, string[]> = {};
    const allFilesToDelete: string[] = [];
    
    for (const target of targets) {
      const files = await listAllFiles(target);
      before[target] = files;
      allFilesToDelete.push(...files);
    }
    
    console.log('Files found (before):', before);
    console.log('Total files to delete:', allFilesToDelete.length);
    
    if (!confirm) {
      // Dry run - just show what would be deleted
      return new Response(
        JSON.stringify({
          dryRun: true,
          bucket,
          targets,
          before,
          totalFiles: allFilesToDelete.length,
          message: 'This is a dry run. Add ?confirm=true to actually delete these files.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Actually delete the files
    const deletedPaths: string[] = [];
    const errors: any[] = [];
    
    if (allFilesToDelete.length > 0) {
      const { data: deleteData, error: deleteError } = await supabase.storage
        .from(bucket)
        .remove(allFilesToDelete);
      
      if (deleteError) {
        console.error('Error deleting files:', deleteError);
        errors.push(deleteError);
      } else {
        deletedPaths.push(...allFilesToDelete);
        console.log('Successfully deleted:', deleteData);
      }
    }
    
    // Check what remains (should be empty)
    const after: Record<string, string[]> = {};
    for (const target of targets) {
      const files = await listAllFiles(target);
      after[target] = files;
    }
    
    console.log('Files remaining (after):', after);
    
    return new Response(
      JSON.stringify({
        dryRun: false,
        bucket,
        targets,
        before,
        deletedPaths,
        deletedCount: deletedPaths.length,
        errors,
        after,
        success: errors.length === 0 && deletedPaths.length === allFilesToDelete.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
