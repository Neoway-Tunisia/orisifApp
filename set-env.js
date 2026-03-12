const fs = require('fs');
const path = require('path');

// Configure the path to the environment file
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Create the directory if it doesn't exist
const envDir = path.dirname(envFilePath);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Get variables from environment (provided by Netlify or local terminal)
const supabaseUrl = process.env['SUPABASE_URL'] || '';
const supabaseKey = process.env['SUPABASE_KEY'] || '';

// Define the content of the file
const envConfigFile = `export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseKey: '${supabaseKey}'
};
`;

// Write the file
console.log('Generating environment.ts with Netlify variables...');
fs.writeFileSync(envFilePath, envConfigFile);
console.log('environment.ts successfully generated.');
