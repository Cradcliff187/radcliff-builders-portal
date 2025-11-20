import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AdminUser {
  email: string;
  password: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting admin user creation process...');

    // Create Supabase admin client with service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const admins: AdminUser[] = [
      { email: 'matt@radcliffcg.com', password: 'Admin123!' },
      { email: 'tony@radcliffcg.com', password: 'Admin123!' }
    ];

    const results = [];

    for (const admin of admins) {
      console.log(`Creating user: ${admin.email}`);
      
      // Create the user with auto-confirm
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true, // Auto-confirm email
      });

      if (userError) {
        console.error(`Error creating user ${admin.email}:`, userError);
        results.push({
          email: admin.email,
          success: false,
          error: userError.message
        });
        continue;
      }

      console.log(`User created successfully: ${admin.email}, ID: ${userData.user.id}`);

      // Insert admin role into user_roles table
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userData.user.id,
          role: 'admin'
        });

      if (roleError) {
        console.error(`Error assigning admin role to ${admin.email}:`, roleError);
        results.push({
          email: admin.email,
          success: false,
          userId: userData.user.id,
          error: `User created but role assignment failed: ${roleError.message}`
        });
        continue;
      }

      console.log(`Admin role assigned successfully to ${admin.email}`);

      results.push({
        email: admin.email,
        success: true,
        userId: userData.user.id,
        message: 'User created and admin role assigned successfully'
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        results,
        message: 'Admin user creation process completed'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-admin-users function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
