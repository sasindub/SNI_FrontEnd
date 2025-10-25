/**
 * Debug utility to help troubleshoot authentication issues
 * Use this in browser console to check cookie and auth status
 */

export const debugAuth = async () => {
  console.log('🔍 Auth Debug Information:');
  console.log('========================');
  
  // Check cookies
  console.log('\n📦 Cookies:');
  console.log(document.cookie || 'No cookies found');
  
  // Check API URL
  const API_URL = process.env.REACT_APP_API_URL || 'https://snibackend-production.up.railway.app';
  console.log('\n🌐 API URL:', API_URL);
  
  // Test auth endpoint
  console.log('\n🔐 Testing /api/admin/check-auth...');
  try {
    const response = await fetch(`${API_URL}/api/admin/check-auth`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    
    // Check response headers
    console.log('\n📨 Response Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });
    
    return data;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
};

// Export for use in console
if (typeof window !== 'undefined') {
  window.debugAuth = debugAuth;
}

export default debugAuth;

