# Guide de Déploiement Orisif sur Netlify

Ce guide explique comment déployer l'application Angular Orisif sur Netlify.

## Option 1 : Déploiement via GitHub (Recommandé)

Cette option permet de mettre à jour automatiquement le site à chaque fois que vous "pushez" du code.

### 1. Préparer votre dépôt Git
Initialisez un dépôt Git et poussez votre code sur GitHub, GitLab ou Bitbucket.
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE_NOM/orisif-app.git
git push -u origin main
```

### 2. Connecter à Netlify
1. Connectez-vous à [Netlify](https://app.netlify.com/).
2. Cliquez sur **"Add new site"** > **"Import an existing project"**.
3. Choisissez votre fournisseur (ex: GitHub) et sélectionnez votre dépôt `orisif-app`.

### 3. Configurer le Build
Netlify devrait détecter automatiquement les paramètres Angular. Vérifiez les valeurs suivantes :
- **Build command:** `npm run build`
- **Publish directory:** `dist/orisif-app/browser` (Vérifiez le nom exact dans votre dossier `dist` après un build local)

### 4. Gérer les routes Angular
Angular est une Single Page Application (SPA). Pour que les pages (ex: `/catalogue`) fonctionnent après un rafraîchissement, vous avez besoin d'un fichier `_redirects`.
*Note : J'ai déjà créé ce fichier dans `src/_redirects`.*

---

## Option 2 : Déploiement Manuel via CLI

Si vous ne souhaitez pas utiliser GitHub.

### 1. Installer Netlify CLI
```bash
npm install netlify-cli -g
```

### 2. Builder l'application localement
```bash
npm run build
```

### 3. Déployer
```bash
netlify deploy --prod --dir=dist/orisif-app/browser
```

---

## Notes Importantes

### 5. Configurer les Variables d'Environnement
Pour que Supabase fonctionne sans exposer vos clés sur GitHub :
1. Dans Netlify, allez dans **Site settings** > **Environment variables**.
2. Ajoutez les variables suivantes :
   - `SUPABASE_URL` : L'URL de votre projet Supabase.
   - `SUPABASE_KEY` : Votre clé API (anon).

---

## Développement Local
Comme le fichier `environment.ts` est maintenant ignoré par Git, vous devez le générer une première fois pour travailler localement :
```bash
# Windows (PowerShell)
$env:SUPABASE_URL="votre_url"; $env:SUPABASE_KEY="votre_cle"; node set-env.js

# Linux/Mac
SUPABASE_URL=votre_url SUPABASE_KEY=votre_cle node set-env.js
```


### Build Memory Limit
Si le build échoue sur Netlify à cause de la mémoire, vous pouvez ajouter une variable d'environnement dans Netlify :
- **Key:** `NODE_OPTIONS`
- **Value:** `--max-old-space-size=4096`
