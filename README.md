# alreadyaired.github.io

## Home2 preview page

The alternate homepage is available at https://alreadyaired.github.io/home2/ after deployment. It is deliberately absent from site navigation; the existing homepage remains at `/`.

The existing GitHub Pages workflow publishes `dist/` when changes are pushed to `main`. Commit and push the changes, then wait for **Deploy static content to Pages** to finish successfully in the Actions tab. A local commit alone does not publish the page.

Home2 source is in `dist/home2/` and uses shared styles, scripts, images and fonts already in `dist/`. Its own stylesheet and scripts have content-versioned URLs to refresh cached files after this update. `dist/.nojekyll` marks the deployed artifact as plain static content and preserves folders such as `_next`.
