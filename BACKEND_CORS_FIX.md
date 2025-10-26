# 🔧 Backend CORS & Cookie Configuration Fix

## Problem Diagnosis

Your login flow is:
1. ✅ POST `/api/admin/login` → Returns 200 OK
2. ❌ **Session cookie is NOT saved by browser**
3. ❌ GET `/api/admin/check-auth` → Returns `authenticated: false` (no cookie sent)
4. ❌ User redirected back to login page

**Root Cause:** Cross-origin cookie blocking between:
- Frontend: `http://localhost:3000`
- Backend: `https://snibackend-production.up.railway.app`

---

## ✅ Backend Fix Required

Your Flask backend needs these configurations:

### 1. CORS Configuration

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# ❌ WRONG - Will not work with credentials
# CORS(app, origins="*", supports_credentials=True)

# ✅ CORRECT - Specific origin with credentials
CORS(app, 
     origins=["http://localhost:3000", "https://your-frontend-domain.com"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)
```

### 2. Session Cookie Configuration

```python
from flask import Flask, session
from flask_session import Session
from datetime import timedelta

app = Flask(__name__)

# Session configuration for cross-origin
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SESSION_TYPE'] = 'filesystem'  # or 'redis', 'mongodb', etc.
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)

# ✅ CRITICAL: Cookie settings for cross-origin
app.config['SESSION_COOKIE_SECURE'] = True        # HTTPS only
app.config['SESSION_COOKIE_HTTPONLY'] = True      # Prevent XSS
app.config['SESSION_COOKIE_SAMESITE'] = 'None'    # Allow cross-origin
app.config['SESSION_COOKIE_DOMAIN'] = None        # Let browser handle it

Session(app)
```

### 3. Complete Example Backend Configuration

```python
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from datetime import timedelta
import os

app = Flask(__name__)

# Secret key (use environment variable in production)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Session configuration
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)

# ✅ CRITICAL: Cookie settings for cross-origin
app.config['SESSION_COOKIE_SECURE'] = True        # Required for SameSite=None
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'    # Allow cross-origin
app.config['SESSION_COOKIE_NAME'] = 'sni_session'

Session(app)

# CORS configuration - Allow specific origins with credentials
CORS(app, 
     origins=[
         "http://localhost:3000",           # Local development
         "http://localhost:3001",           # Alternative port
         "https://your-frontend-domain.com" # Production frontend
     ],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# Login endpoint
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Your authentication logic here
    if authenticate_user(username, password):
        # ✅ Set session
        session['user_id'] = user_id
        session['username'] = username
        session.permanent = True
        
        return jsonify({
            'success': True,
            'message': 'Login successful'
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401

# Check auth endpoint
@app.route('/api/admin/check-auth', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'success': True,
            'user': {
                'username': session.get('username')
            }
        }), 200
    else:
        return jsonify({
            'authenticated': False,
            'success': True,
            'user': None
        }), 200

# Logout endpoint
@app.route('/api/admin/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
```

---

## 🚀 Deploy to Railway

After making these changes:

1. **Update your backend code** with the fixes above
2. **Set environment variable** on Railway:
   ```
   SECRET_KEY=your-super-secret-key-here
   ```
3. **Redeploy** your backend on Railway
4. **Test** the login flow again

---

## 🧪 How to Test

### Test 1: Check Response Headers

After login, check the response headers in browser DevTools:

**Look for:**
```
Set-Cookie: sni_session=...; Path=/; HttpOnly; Secure; SameSite=None
```

**Should have:**
- ✅ `Secure` flag
- ✅ `SameSite=None`
- ✅ `HttpOnly`

### Test 2: Check Cookies in Browser

After successful login:
1. Open DevTools → Application tab → Cookies
2. Look for `sni_session` under `https://snibackend-production.up.railway.app`
3. Cookie should exist and have:
   - Secure: ✅
   - SameSite: None
   - HttpOnly: ✅

### Test 3: Test the Flow

1. Go to http://localhost:3000/admin
2. Login with credentials
3. Should redirect to dashboard ✅
4. Refresh page → Should stay logged in ✅

---

## 📦 Required Python Packages

Make sure your `requirements.txt` includes:

```txt
Flask>=2.3.0
Flask-CORS>=4.0.0
Flask-Session>=0.5.0
```

Install with:
```bash
pip install Flask Flask-CORS Flask-Session
```

---

## 🔍 Debugging Tips

### If cookies still not working:

1. **Check Railway logs** for CORS errors
2. **Verify CORS origin** matches exactly (no trailing slash)
3. **Ensure HTTPS** on Railway backend
4. **Check browser console** for cookie warnings
5. **Try in incognito mode** to rule out cached cookies

### Browser DevTools Network Tab:

**Login request should show:**
```
Request URL: https://snibackend-production.up.railway.app/api/admin/login
Request Headers:
  Origin: http://localhost:3000
  
Response Headers:
  Access-Control-Allow-Origin: http://localhost:3000
  Access-Control-Allow-Credentials: true
  Set-Cookie: sni_session=...; Secure; HttpOnly; SameSite=None
```

---

## ⚠️ Important Notes

1. **SameSite=None requires HTTPS**: Railway provides HTTPS by default ✅
2. **Specific origins required**: Cannot use `*` with `supports_credentials=True`
3. **Session storage**: Use filesystem or Redis for production
4. **Environment variables**: Store SECRET_KEY in Railway environment variables

---

## 🎯 Quick Checklist

- [ ] Update CORS with specific origins
- [ ] Set `SESSION_COOKIE_SECURE = True`
- [ ] Set `SESSION_COOKIE_SAMESITE = 'None'`
- [ ] Set `supports_credentials=True` in CORS
- [ ] Add SECRET_KEY environment variable on Railway
- [ ] Redeploy backend
- [ ] Test login flow
- [ ] Verify cookie is set in browser DevTools

---

Once you update your backend with these settings, the login will work perfectly! 🚀

