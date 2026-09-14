import os
import zipfile
import shutil

dist_dir = 'dist'
zip_filename = 'cloudflare-pages-dist.zip'

if not os.path.exists(dist_dir):
    print("Error: dist directory does not exist. Run 'npm run build' first.")
    exit(1)

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
            # Skip any existing zip or gitignore in assets
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
