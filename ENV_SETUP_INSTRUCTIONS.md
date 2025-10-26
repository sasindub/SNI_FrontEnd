# Backend Configuration Setup

## Quick Start

Your frontend is now configured to connect to your Railway backend!

### Step 1: Create `.env` File

Create a file named `.env` in the root directory of this project (same level as `package.json`).

Add the following content:

```env
# Backend API URL - Production
REACT_APP_API_URL=https://snibackend-production.up.railway.app
```

### Step 2: For Local Development (Optional)

If you want to test with a local backend, update the `.env` file:

```env
# Backend API URL - Local Development
REACT_APP_API_URL=http://localhost:5000
```

### Step 3: Restart Development Server

**IMPORTANT:** After creating or modifying the `.env` file, you MUST restart the development server:

```bash
# Stop the server (Ctrl+C) and restart:
npm start
```

---

## What Changed?

All API calls now use the centralized configuration from `src/config/api.js`:

### Files Updated:
1. ✅ `src/pages/AdminLogin.js` - Login and auth check
2. ✅ `src/pages/AdminDashboard.js` - Warranty management
3. ✅ `src/components/AddWarrantyModal.js` - Add/edit warranties
4. ✅ `src/components/OrderModal.js` - Product orders

### New Files Created:
- `src/config/api.js` - Centralized API configuration with `apiFetch()` helper

---

## Key Features

### Automatic Credential Handling
All API calls now automatically include `credentials: 'include'` for proper session management with cookies.

### Easy Environment Switching
Switch between production and local development by just changing the `.env` file:

**Production:**
```env
REACT_APP_API_URL=https://snibackend-production.up.railway.app
```

**Local Development:**
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Testing the Connection

1. Create the `.env` file as described above
2. Restart the development server: `npm start`
3. Open http://localhost:3000 in your browser
4. Navigate to the Admin Login page: http://localhost:3000/admin
5. Try logging in with your admin credentials

If everything is configured correctly, you should be able to:
- ✅ Login to the admin dashboard
- ✅ View warranties
- ✅ Add/edit warranties
- ✅ Search and filter warranties

---

## Troubleshooting

### "Network Error" or "Failed to Fetch"
- Verify the Railway backend URL is correct
- Check if the backend is running on Railway
- Make sure you restarted the development server after creating `.env`

### "CORS Error"
- Ensure your Railway backend has CORS configured correctly
- The backend should allow requests from your frontend domain
- Check the backend's CORS settings include `credentials: true`

### Session Not Persisting
- Verify `credentials: 'include'` is working (already configured in `api.js`)
- Check browser cookies are enabled
- Ensure backend is setting cookies with proper `SameSite` attributes

### Environment Variable Not Loading
- File must be named exactly `.env` (not `.env.txt` or similar)
- Must be in the root directory (same level as `package.json`)
- Must restart development server after creating/modifying `.env`
- Variable name must start with `REACT_APP_` for Create React App

---

## Production Deployment

When deploying your frontend to production (e.g., Vercel, Netlify, etc.):

1. Set the environment variable in your hosting platform:
   - Variable name: `REACT_APP_API_URL`
   - Value: `https://snibackend-production.up.railway.app`

2. The app will automatically use the correct backend URL

---

## Additional Notes

- The `.env` file is already in `.gitignore` and will not be committed to version control
- Keep your Railway backend URL secure
- Update the URL in `.env` if you redeploy your backend with a different URL

