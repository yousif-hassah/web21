# -*- coding: utf-8 -*-
import re

# Read file
with open('02.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix button texts in renderPendingOrders function
content = re.sub(
    r'(onclick="confirmOrder.*?class="[^"]*">\s*)[^<]+(\s*</button>)',
    r'\1تأكيد الدفع\2',
    content,
    count=1
)

content = re.sub(
    r'(onclick="cancelOrder.*?class="[^"]*">\s*)[^<]+(\s*</button>)',
    r'\1إلغاء\2',
    content,
    count=1
)

# Fix button texts in renderShopOrders function  
content = re.sub(
    r'(onclick="confirmShopOrder.*?class="[^"]*">\s*)[^<]+(\s*</button>)',
    r'\1تأكيد الطلب\2',
    content,
    count=1
)

content = re.sub(
    r'(onclick="cancelShopOrder.*?class="[^"]*">\s*)[^<]+(\s*</button>)',
    r'\1إلغاء\2',
    content,
    count=1
)

# Save file
with open('02.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ تم إصلاح أزرار الطلبات بنجاح!')
