# Cleanup Unused Assets Plan

The goal is to remove 2.9GB+ of unused media files (photos/videos) from the `public` folder while ensuring that all assets currently referenced in the code remain intact. This will significantly speed up deployments and Git operations.

## User Review Required

> [!IMPORTANT]
> I will be deleting files from the `public` directory. I will only delete files that are **NOT** referenced by name in any `.tsx`, `.ts`, `.css`, or `.module.css` files.
> 
> **Are there any files you want to keep even if they aren't currently used in the code (e.g., assets for future features)?**

## Proposed Changes

1.  **Phase 1: Research (Audit)**
    - List all files in the `public` directory (recursive).
    - Search the entire `src` directory for strings matching those filenames.
    - Compile a "Keep List" (referenced files) and a "Delete List" (unreferenced files).

2.  **Phase 2: Cleanup**
    - Delete files in the "Delete List".
    - Specifically targeted folders: `public/client-media/` and any other bloated directories.
    - Ensure `.gitignore` is correctly updated to prevent accidental re-adding of raw media.

3.  **Phase 3: Git Optimization**
    - Perform a clean `git add .` and `git commit` now that the heavy assets are gone.
    - Push to GitHub/Vercel.

## Open Questions

- Should I specifically focus on the `public/client-media` folder, or audit the entire `public` directory?
- Are there any dynamic asset paths (e.g., `images/${id}.jpg`) that I should be careful about?

## Verification Plan

### Automated Verification
- I will run a script to compare the list of files in `public` against the "Keep List" to ensure no accidental deletions.
- I will run `npm run build` after cleanup to confirm all imports/references are still valid.

### Manual Verification
- The user can verify that the local repository size has decreased significantly.
