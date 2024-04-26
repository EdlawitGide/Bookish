import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xvnfjarutiahidaawqtu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bmZqYXJ1dGlhaGlkYWF3cXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDQ5NjksImV4cCI6MjAyOTY4MDk2OX0.pnXEEweBOkTieWp74ImiaOjE_W5h1M2JBk9xmRov32s";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
