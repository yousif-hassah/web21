# -*- coding: utf-8 -*-
import re

# قراءة الملف
with open('02.js', 'r', encoding='utf-8') as f:
    content = f.read()

# البحث عن جميع النصوص المشوهة (التي تحتوي على Ø أو Ù)
mojibake_pattern = r'[ØÙ][^\s<>"\',;)]+(?:\s+[ØÙ][^\s<>"\',;)]+)*'
matches = re.findall(mojibake_pattern, content)

# طباعة المطابقات
print("🔍 النصوص المشوهة التي تم العثور عليها:")
print("=" * 50)
unique_matches = set(matches)
for i, match in enumerate(unique_matches, 1):
    print(f"{i}. {match}")

print(f"\n📊 إجمالي النصوص المشوهة: {len(unique_matches)}")

# حفظ النتائج
with open('mojibake_found.txt', 'w', encoding='utf-8') as f:
    for match in unique_matches:
        f.write(f"{match}\n")

print("\n✅ تم حفظ القائمة في mojibake_found.txt")
