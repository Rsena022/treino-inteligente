import urllib.request
import re
import json

folder_id = "1IuJVFY6p-6d6YaJcdJcakvmcNgQ1H2oF"
url = f"https://drive.google.com/drive/folders/{folder_id}"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print("HTML length:", len(html))
        
        # Save HTML snippet to inspect
        with open("drive_folder.html", "w", encoding="utf-8") as f:
            f.write(html)
            
        print("Saved drive_folder.html successfully.")
except Exception as e:
    print("Error fetching folder:", e)
