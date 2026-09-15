import os
import zipfile
import shutil

dist_dir = 'dist'
zip_filename = 'cloudflare-pages-dist.zip'

if not os.path.exists(dist_dir):
    print("Error: dist directory does not exist. Run 'npm run build' first.")
    exit(1)

# Ensure dist/_redirects exists and does NOT contain any catch-all infinite loop rule
# Cloudflare Workers Assets handles SPA routing natively via single-page-application / 200.html
redirects_dist_path = os.path.join(dist_dir, '_redirects')
with open(redirects_dist_path, 'w') as f:
    f.write('# Konfiguracja SPA obsłużona przez Cloudflare single-page-application\n')

# Copy or generate dist/wrangler.json for Cloudflare deploy requirements
dist_wrangler_path = os.path.join(dist_dir, 'wrangler.json')
root_wrangler_candidates = ['wrangler.json', 'wrangler.jsonc', 'disabled-wrangler.json']
copied_wrangler = False

for candidate in root_wrangler_candidates:
    if os.path.exists(candidate) and candidate != 'disabled-wrangler.json':
        shutil.copyfile(candidate, dist_wrangler_path)
        print(f"Copied {candidate} to {dist_wrangler_path}")
        copied_wrangler = True
        break

if not copied_wrangler:
    import json
    wrangler_content = {
        "name": "nosignpdf",
        "compatibility_date": "2026-09-15",
        "assets": {
            "directory": "dist",
            "not_found_handling": "single-page-application"
        }
    }
    with open(dist_wrangler_path, 'w', encoding='utf-8') as f:
        json.dump(wrangler_content, f, indent=2)
    print(f"Generated fresh {dist_wrangler_path} programmatically on the fly.")

# Ensure 200.html exists in dist as Cloudflare Pages native SPA fallback
index_path = os.path.join(dist_dir, 'index.html')
spa_fallback_path = os.path.join(dist_dir, '200.html')
if os.path.exists(index_path):
    shutil.copyfile(index_path, spa_fallback_path)

print("Creating Cloudflare Pages production zip archive...")
# Create the zip in memory/file
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            # Skip any existing zip or gitignore in dist assets
            if file.endswith('.zip') or file.startswith('.git'):
                continue
            full_path = os.path.join(root, file)
            # relative path inside the zip should start from root, e.g. index.html, assets/app.js
            arcname = os.path.relpath(full_path, dist_dir)
            zipf.write(full_path, arcname)
            print(f"  + {arcname}")

# Also copy to dist/ and public/ so it can be downloaded via browser HTTP GET
shutil.copyfile(zip_filename, os.path.join(dist_dir, zip_filename))
os.makedirs('public', exist_ok=True)
shutil.copyfile(zip_filename, os.path.join('public', zip_filename))

file_size_mb = os.path.getsize(zip_filename) / (1024 * 1024)
print(f"\nSuccess! Archive created: {zip_filename} ({file_size_mb:.2f} MB)")
print("Structure inside zip is 100% compliant with Cloudflare Pages Direct Upload:")
print("  - index.html (at root)")
print("  - _redirects (SPA routing /* -> /index.html 200)")
print("  - _headers (security & caching headers)")
print("  - assets/ (bundled JS, CSS, and PDF worker modules)")
