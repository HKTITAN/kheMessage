# Deploy kheMessage

Deploy changes to production (Vercel).

## Pre-Deployment Checklist

1. **Test locally** - All features working
2. **Test both themes** - Light and dark mode
3. **Test offline** - PWA functionality
4. **Check mobile** - Responsive design
5. **Validate HTML** - No syntax errors
6. **Check console** - No errors or warnings

## Deployment Steps

### Option 1: Vercel CLI

```bash
npx vercel
```

For production:

```bash
npx vercel --prod
```

### Option 2: GitHub Actions (Automatic)

1. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

2. **Push to main/master**
   ```bash
   git push origin main
   ```

3. **Monitor GitHub Actions**
   - Check `.github/workflows/deploy.yaml`
   - Wait for deployment to complete
   - Production deploys on push to main/master
   - Preview deploys on pull requests

4. **Verify production**
   - Visit https://msg.khe.money
   - Test the new changes
   - Check different browsers

## Required GitHub Secrets

For GitHub Actions to deploy to Vercel:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Personal access token from [Vercel account tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | From `.vercel/project.json` after first local deploy |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` after first local deploy |

Run `npx vercel` once locally to generate `.vercel/project.json`.

## Rollback

If issues are found:

1. **Revert commit**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Or checkout previous version**
   ```bash
   git checkout <commit-hash> -- index.html
   git commit -m "revert: rollback to previous version"
   git push origin main
   ```

3. **Vercel dashboard**: Use the project's Deployments tab to promote a previous deployment.

## Service Worker Updates

If changing cached assets:

1. Update `CACHE_VERSION` in `sw.js`
2. Users may need to refresh twice
3. Consider adding update notification
