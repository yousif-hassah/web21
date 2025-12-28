# -*- coding: utf-8 -*-
import re

# Read file
with open('02.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Comprehensive mapping of mojibake to English
replacements = {
    # Console logs
    'ðŸš€ بدء تهيئة Supabase...': '🚀 Initializing Supabase...',
    'âœ… تم تهيئة Supabase بنجاح': '✅ Supabase initialized successfully',
    'ðŸ"„ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ù…Ù† Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...': '📄 Loading customers from database...',
    'âœ… ØªÙ… ØªØ­Ù…ÙŠÙ„': '✅ Loaded',
    'Ø¹Ù…ÙŠÙ„ Ø¨Ù†Ø¬Ø§Ø­': 'customers successfully',
    'âŒ Ø®Ø·Ø£ ÙÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡:': '❌ Error loading customers:',
    'ðŸ"‹ Ø¹Ø±Ø¶ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©': '📋 Rendering pending orders',
    'ðŸ›' Ø¹Ø±Ø¶ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ù…ØªØ¬Ø±': '🛒 Rendering shop orders',
    'ðŸ'¥ Ø¹Ø±Ø¶ Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡': '👥 Rendering customers table',
    'ðŸŽ¯ Ø¥Ø¹Ø¯Ø§Ø¯ Ù…Ø³ØªÙ…Ø¹Ø§Øª Ø§Ù„Ø£Ø­Ø¯Ø§Ø«...': '🎯 Setting up event listeners...',
    'ðŸ½ï¸ Ø¹Ø±Ø¶ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©': '🍽️ Rendering menu items',
    'ðŸª Ø¹Ø±Ø¶ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…ØªØ¬Ø±': '🏪 Rendering shop items',
    'âŒ Ø­Ø§ÙˆÙŠ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯': '❌ Menu items container not found',
    'âŒ Ø­Ø§ÙˆÙŠ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…ØªØ¬Ø± ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯': '❌ Shop items container not found',
    
    # Button labels - Arabic to English
    'تأكيد الدفع': 'Confirm Payment',
    'إلغاء': 'Cancel',
    'تأكيد الطلب': 'Confirm Order',
    'تحديد': 'Select',
    'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø¯ÙØ¹': 'Confirm Payment',
    'Ø¥Ù„ØºØ§Ø¡': 'Cancel',
    'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨': 'Confirm Order',
    'ØªØ­Ø¯ÙŠØ¯': 'Select',
    
    # Labels and headers
    'المنتجات:': 'Products:',
    'لا يوجد عنوان': 'No address',
    'Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª:': 'Products:',
    'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¹Ù†ÙˆØ§Ù†': 'No address',
    
    # Error messages
    'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø§Ø³Ù… Ø£Ùˆ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ': 'Please enter name or phone number',
    'âŒ Ø®Ø·Ø£ ÙÙŠ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„:': '❌ Login error:',
    'ðŸ"¢ Ø¥Ø´Ø¹Ø§Ø±': '📢 Notification',
    'âŒ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø©': '❌ Notification elements not found',
    
    # Success messages
    'âœ… ØªÙ… Ø­ÙØ¸ Ø§Ù„Ø°Ù…Ù… Ø¨Ù†Ø¬Ø§Ø­!': '✅ Record saved successfully!',
    'âœ… ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø¹Ù…ÙŠÙ„ Ø¨Ù†Ø¬Ø§Ø­!': '✅ Customer created successfully!',
    'ðŸŽ‰ Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ùƒ ÙÙŠ Twenty One Cafe!': '🎉 Welcome to Twenty One Cafe!',
    'âœ… ØªÙ… ØªÙ‡ÙŠØ¦Ø© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ù†Ø¬Ø§Ø­': '✅ App initialized successfully',
    'âœ… ØªÙ… Ø¥Ø¹Ø¯Ø§Ø¯ Ø¬Ù…ÙŠØ¹ Ù…Ø³ØªÙ…Ø¹Ø§Øª Ø§Ù„Ø£Ø­Ø¯Ø§Ø«': '✅ All event listeners set up',
}

# Apply replacements
changes_count = 0
for mojibake, english in replacements.items():
    if mojibake in content:
        content = content.replace(mojibake, english)
        changes_count += 1

# Remove any remaining mojibake patterns
# Find all console.log with mojibake
import re
mojibake_pattern = r'console\.(log|error)\(["\']([^"\']*[ØÙ][^"\']*)["\']\)'
matches = re.findall(mojibake_pattern, content)

if matches:
    print(f"⚠️ Found {len(matches)} console messages with mojibake")
    for match in matches[:10]:  # Show first 10
        print(f"  - {match[1][:50]}...")

# Save file
with open('02.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Fixed {changes_count} mojibake texts")
print("📝 All Arabic texts replaced with English")
print("🔄 Please refresh the browser (Ctrl + F5)")
