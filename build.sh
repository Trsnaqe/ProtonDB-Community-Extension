#!/bin/bash

if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Install it using:"
    echo "  Ubuntu/Debian: sudo apt-get install jq"
    echo "  Fedora: sudo dnf install jq"
    echo "  MacOS: brew install jq"
    exit 1
fi

increment_version() {
    local version=$1
    local type=$2
    
    IFS='.' read -r -a parts <<< "$version"
    local major="${parts[0]}"
    local minor="${parts[1]}"
    local patch="${parts[2]}"
    
    if [ "$type" == "--major" ]; then
        major=$((major + 1))
        minor=0
        patch=0
    elif [ "$type" == "--minor" ]; then
        minor=$((minor + 1))
        patch=0
    else
        patch=$((patch + 1))
    fi
    
    echo "$major.$minor.$patch"
}

get_short_version() {
    local version=$1
    IFS='.' read -r -a parts <<< "$version"
    echo "${parts[0]}.${parts[1]}"
}

update_html_files() {
    local old_version=$1
    local new_version=$2
    local files=("index.html" "src/popup/index.html")
    
    for file in "${files[@]}"; do
        if [ ! -f "$file" ]; then
            echo "Warning: $file not found"
            continue
        fi
        
        temp_file="$file.tmp"
        > "$temp_file"  # Clear or create the temp file
        
        while IFS= read -r line; do
            if echo "$line" | grep -q "class=version-text\|class=\"version-text\""; then
                # Replace entire line with new version
                echo "        <p class=version-text>v${new_version}</p>" >> "$temp_file"
            else
                echo "$line" >> "$temp_file"
            fi
        done < "$file"
        
        mv "$temp_file" "$file"
        echo "Updated version in $file to v${new_version}"
    done
}

# Parse command line arguments
build_type="--patch"
if [ "$#" -eq 1 ]; then
    if [ "$1" == "--major" ] || [ "$1" == "--minor" ] || [ "$1" == "--patch" ]; then
        build_type="$1"
    else
        echo "Invalid argument. Use --major, --minor, or --patch"
        exit 1
    fi
fi

# Get current version and calculate new version
current_version=$(jq -r '.version' manifest.json)
new_version=$(increment_version "$current_version" "$build_type")

echo "Updating version from $current_version to $new_version..."

# Update version in manifest files
jq ".version = \"$new_version\"" manifest.json > manifest.json.tmp && mv manifest.json.tmp manifest.json
jq ".version = \"$new_version\"" manifest_firefox.json > manifest_firefox.json.tmp && mv manifest_firefox.json.tmp manifest_firefox.json

# Update version in HTML files
update_html_files "$current_version" "$new_version"

# Create Chrome ZIP
echo "Creating Chrome package..."
rm -f ProtonDB-Community-Extension-Chrome-V*.zip
zip -r "ProtonDB-Community-Extension-Chrome-V${new_version}.zip" . \
    -x "*.git*" ".git/*" "*.zip" ".vscode/*" "manifest_firefox.json" "build.sh" "node_modules/*" "reorganize.sh" "CONTRIBUTING.md" "*.md"

# Create Firefox ZIP
echo "Creating Firefox package..."
rm -f ProtonDB-Community-Extension-Firefox-V*.zip
cp manifest_firefox.json manifest_firefox_temp.json
mv manifest.json manifest_temp.json
mv manifest_firefox_temp.json manifest.json

zip -r "ProtonDB-Community-Extension-Firefox-V${new_version}.zip" . \
    -x "*.git*" ".git/*" "*.zip" ".vscode/*" "manifest_firefox.json" "build.sh" "node_modules/*" "reorganize.sh" "CONTRIBUTING.md" "*.md"

# Restore original manifest
mv manifest_temp.json manifest.json

echo "✅ Version updated from $current_version to $new_version"
echo "✅ Created ProtonDB-Community-Extension-Chrome-V${new_version}.zip"
echo "✅ Created ProtonDB-Community-Extension-Firefox-V${new_version}.zip" 