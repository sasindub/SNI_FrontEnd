# 🚀 Railway Backend Integration - Complete!

Your SNI frontend is now configured to connect to your Railway backend!

---

## ✅ What Was Done

### 1. Created Centralized API Configuration
**File:** `src/config/api.js`
- Centralized API base URL configuration
- `apiFetch()` helper function that automatically includes `credentials: 'include'`
- Reads from environment variable `REACT_APP_API_URL`

### 2. Updated All API Calls

| File | Changes |
|------|---------|
| `src/pages/AdminLogin.js` | ✅ Login & auth check endpoints |
| `src/pages/AdminDashboard.js` | ✅ Fetch warranties, logout, auth check |
| `src/components/AddWarrantyModal.js` | ✅ Add/edit warranty endpoints |
| `src/components/OrderModal.js` | ✅ Submit order endpoint |

### 3. Created Documentation
- `ENV_SETUP_INSTRUCTIONS.md` - Detailed setup guide
- `RAILWAY_SETUP_SUMMARY.md` - This file

---

## 🎯 Next Steps (Required!)

### Step 1: Create `.env` File

Create a file named `.env` in the root directory:

```env
REACT_APP_API_URL=https://snibackend-production.up.railway.app
```

### Step 2: Restart Development Server

**CRITICAL:** You must restart the server after creating `.env`:

```bash
# Press Ctrl+C to stop the server, then:
npm start
```

### Step 3: Test the Connection

1. Go to http://localhost:3000/admin
2. Login with your admin credentials
3. You should now be connected to your Railway backend!

---

## 🔧 Configuration Options

### Production (Default)
```env
REACT_APP_API_URL=https://snibackend-production.up.railway.app
```

### Local Development
```env
REACT_APP_API_URL=http://localhost:5000
```

Just change the URL in `.env` and restart the server!

---

## 📝 Key Features

✅ **Automatic Credentials** - All requests include `credentials: 'include'` for session management  
✅ **Centralized Config** - One place to change the API URL  
✅ **Environment Variables** - Easy switching between dev/prod  
✅ **No Breaking Changes** - All existing functionality preserved  

---

## 🐛 Troubleshooting

**Problem:** "Network Error" or "Failed to Fetch"
- ✅ Verify `.env` file exists in root directory
- ✅ Check Railway backend is running
- ✅ Restart development server

**Problem:** Session not persisting
- ✅ Already configured with `credentials: 'include'`
- ✅ Check browser cookies are enabled
- ✅ Verify backend CORS settings

**Problem:** Environment variable not loading
- ✅ File must be named exactly `.env`
- ✅ Must be in root directory (same level as `package.json`)
- ✅ Variable must start with `REACT_APP_`
- ✅ **Must restart server after creating/modifying `.env`**

---

## 📦 Deploying to Production

When deploying to Vercel, Netlify, or other hosting platforms:

1. Set environment variable in hosting dashboard:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://snibackend-production.up.railway.app`

2. Deploy your app - it will automatically connect to Railway backend

---

## 🎉 You're All Set!

Once you create the `.env` file and restart the server, your frontend will be connected to your Railway backend!

For detailed information, see `ENV_SETUP_INSTRUCTIONS.md`.

