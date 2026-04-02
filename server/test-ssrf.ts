import { URL } from 'url';

function validateWebhookUrl(webhookUrl: string) {
  try {
    const parsedUrl = new URL(webhookUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    // Comprehensive SSRF protection: block IP formats and internal ranges
    const isFullIpRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const isShortenedIpRegex = /^([0-9]{1,3}\.){1,2}[0-9]{1,3}$/;
    const isIpv6Regex = /^\[?(?:[0-9a-fA-F]*:[0-9a-fA-F]*)+\]?$/;
    const isNumericIpRegex = /^[0-9]+$|^0x[0-9a-fA-F]+$/;

    const isLoopbackOrPrivate = /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.|0\.0\.0\.0)/;

    const forbiddenHostnames = ['localhost'];

    if (
      forbiddenHostnames.includes(hostname) ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      (isFullIpRegex.test(hostname) && isLoopbackOrPrivate.test(hostname)) ||
      // Block shortened IPs like 127.1 that might resolve to loopback
      isShortenedIpRegex.test(hostname) ||
      // Block raw decimal/hex/octal IP formats that might resolve to loopback/private
      isNumericIpRegex.test(hostname) ||
      // Block IPv6 formats
      isIpv6Regex.test(hostname) ||
      hostname === '[::1]' || hostname === '::1'
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

const testUrls = [
  'http://example.com',
  'https://webhook.site/test',
  'http://10.example.com', // Should be ALLOWED
  'http://localhost',
  'http://127.0.0.1',
  'http://127.1',
  'http://2130706433', // 127.0.0.1
  'http://0x7f000001', // 127.0.0.1
  'http://[::1]',
  'http://[fe80::1]',
  'http://10.0.0.1',
  'http://192.168.1.1',
  'http://169.254.169.254',
  'http://internal.service.local',
  'http://0.0.0.0'
];

testUrls.forEach(url => {
  console.log(`${url}: ${validateWebhookUrl(url) ? 'ALLOWED' : 'BLOCKED'}`);
});
