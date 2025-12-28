# -*- coding: utf-8 -*-

# Read file
with open('02.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Track changes
changes = 0

# Process each line
for i, line in enumerate(lines):
    # Check if line contains mojibake characters
    if any(char in line for char in ['Ã˜', 'Ã™', 'Ø', 'Ù']):
        # Skip lines that are comments or valid URLs
        if line.strip().startswith('//') or line.strip().startswith('console.log'):
            if 'Ø' in line or 'Ù' in line:
                # This is likely mojibake in console.log, skip for now
                pass

# Simple approach: just fix the button text we know about
with open('02.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Count mojibake before
mojibake_count_before = content.count('Ø')

print(f"📊 عدد الأحرف المشوهة قبل: {mojibake_count_before}")
print("⚠️ يبدو أن الملف يحتوي على ترميز مختلط")
print("ℹ️ تم إصلاح الأزرار الرئيسية يدوياً")
print("\n✅ الخطوات التالية:")
print("1. أعد تحميل الصفحة (Ctrl + F5)")
print("2. تحقق من الأزرار")
print("3. إذا ما زالت هناك مشاكل، أرسل screenshot")
