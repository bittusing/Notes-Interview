# STRING MANIPULATION

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**String Manipulation kya hai?**
- String Manipulation strings ko modify, search, transform karna hai
- Strings character array hote hain
- Common operations: reverse, substring, search, replace
- Interview mein bahut common
- Multiple techniques available

**Real-life Analogy:**
- String = Sentence (characters ka sequence)
- Manipulation = Words ko change, rearrange, search karna
- Characters = Individual letters

**String Operations:**
- **Reverse:** String ko ulta karna
- **Substring:** Part extract karna
- **Search:** Pattern find karna
- **Replace:** Characters replace karna
- **Anagram:** Characters rearrange karna

### String Techniques

**1. Two Pointers:**
- Start aur end se traverse
- Palindrome check
- Reverse operations

**2. Sliding Window:**
- Substring problems
- Longest substring
- Pattern matching

**3. Character Frequency:**
- Hash map use
- Anagram problems
- Character counting

---

## B) Easy English Theory

### What is String Manipulation?

String Manipulation involves modifying, searching, and transforming strings. Strings are sequences of characters. Common operations: Reverse, substring extraction, pattern search, character replacement, anagram checking. Techniques: Two pointers (palindromes, reverse), sliding window (substrings), character frequency (anagrams). Time complexity varies by operation.

---

## C) Why This Concept Exists

### The Problem

**Without String Manipulation:**
- Can't process text data
- No pattern matching
- Difficult text operations
- Limited functionality

### The Solution

**String Manipulation Provides:**
1. **Text Processing:** Handle text data
2. **Pattern Matching:** Find patterns
3. **Transformation:** Modify strings
4. **Validation:** Check formats

---

## D) Practical Example (Code)

```javascript
// ============================================
// STRING REVERSE
// ============================================

// Method 1: Built-in
function reverse1(str) {
  return str.split('').reverse().join('');
}

// Method 2: Two pointers
function reverse2(str) {
  const arr = str.split('');
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  return arr.join('');
}

// Method 3: Recursive
function reverse3(str) {
  if (str.length <= 1) return str;
  return reverse3(str.slice(1)) + str[0];
}

// Time: O(n), Space: O(1) for two pointers
reverse2('hello'); // 'olleh'

// ============================================
// PALINDROME CHECK
// ============================================

function isPalindrome(str) {
  // Remove non-alphanumeric and lowercase
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Time: O(n), Space: O(1)
isPalindrome('A man a plan a canal Panama'); // true

// ============================================
// LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
// ============================================

function longestSubstring(s) {
  const charMap = new Map();
  let maxLength = 0;
  let start = 0;
  
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    
    // If character seen and within current window
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    
    charMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}

// Time: O(n), Space: O(min(n, m)) where m is charset size
longestSubstring('abcabcbb'); // 3 ('abc')

// ============================================
// ANAGRAM CHECK
// ============================================

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  const freq1 = {};
  const freq2 = {};
  
  // Count frequencies
  for (let char of str1) {
    freq1[char] = (freq1[char] || 0) + 1;
  }
  
  for (let char of str2) {
    freq2[char] = (freq2[char] || 0) + 1;
  }
  
  // Compare frequencies
  for (let char in freq1) {
    if (freq1[char] !== freq2[char]) {
      return false;
    }
  }
  
  return true;
}

// Optimized version (single map)
function isAnagramOptimized(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  const freq = {};
  
  // Increment for str1
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Decrement for str2
  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  
  return true;
}

// Time: O(n), Space: O(1) - limited charset
isAnagram('listen', 'silent'); // true

// ============================================
// VALID PARENTHESES
// ============================================

function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Time: O(n), Space: O(n)
isValidParentheses('()[]{}'); // true
isValidParentheses('([)]'); // false

// ============================================
// LONGEST COMMON PREFIX
// ============================================

function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  
  let prefix = strs[0];
  
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  
  return prefix;
}

// Time: O(S) where S is sum of all characters
longestCommonPrefix(['flower', 'flow', 'flight']); // 'fl'

// ============================================
// STRING COMPRESSION
// ============================================

function compress(str) {
  let compressed = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + (count > 1 ? count : '');
      count = 1;
    }
  }
  
  return compressed.length < str.length ? compressed : str;
}

// Time: O(n), Space: O(n)
compress('aabcccccaaa'); // 'a2b1c5a3'

// ============================================
// GROUP ANAGRAMS
// ============================================

function groupAnagrams(strs) {
  const map = new Map();
  
  for (let str of strs) {
    // Sort characters to get key
    const key = str.split('').sort().join('');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }
  
  return Array.from(map.values());
}

// Time: O(n * k log k) where k is avg string length
groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// ============================================
// MINIMUM WINDOW SUBSTRING
// ============================================

function minWindow(s, t) {
  const need = {};
  const window = {};
  
  // Count characters needed
  for (let char of t) {
    need[char] = (need[char] || 0) + 1;
  }
  
  let left = 0;
  let right = 0;
  let valid = 0;
  let start = 0;
  let minLen = Infinity;
  
  while (right < s.length) {
    const char = s[right];
    right++;
    
    // Update window
    if (need[char]) {
      window[char] = (window[char] || 0) + 1;
      if (window[char] === need[char]) {
        valid++;
      }
    }
    
    // Shrink window
    while (valid === Object.keys(need).length) {
      // Update result
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      const leftChar = s[left];
      left++;
      
      if (need[leftChar]) {
        if (window[leftChar] === need[leftChar]) {
          valid--;
        }
        window[leftChar]--;
      }
    }
  }
  
  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

// Time: O(|s| + |t|), Space: O(|s| + |t|)
minWindow('ADOBECODEBANC', 'ABC'); // 'BANC'
```

---

## E) Internal Working

**String Representation:**
- Character array internally
- Immutable in some languages
- Operations create new strings
- Memory considerations

**Pattern Matching:**
- Brute force: O(n*m)
- KMP: O(n+m)
- Rabin-Karp: Average O(n+m)

---

## F) Interview Questions & Answers

### Q1: How do you reverse a string?

**Answer:**
Methods: Built-in (split, reverse, join - simple but creates new strings), Two pointers (swap characters from both ends - O(n) time, O(1) space if in-place), Recursive (reverse substring + first character - O(n) time, O(n) space). Two pointers most efficient for in-place reversal.

### Q2: How do you check if two strings are anagrams?

**Answer:**
Anagram check: Count character frequencies in both strings, compare frequencies. Optimized: Use single map, increment for first string, decrement for second, all should be zero. Time O(n), Space O(1) for limited charset. Alternative: Sort both strings and compare (O(n log n)).

### Q3: Explain sliding window for string problems.

**Answer:**
Sliding window maintains window of characters, expands right pointer, shrinks left pointer when condition met. Use for: Longest substring without repeating characters, minimum window substring, substring with all characters. Benefits: O(n) time instead of O(n²), efficient for substring problems.

---

## G) Common Mistakes

### Mistake 1: String Immutability

```javascript
// ❌ WRONG - Strings are immutable
let str = 'hello';
str[0] = 'H'; // Doesn't work

// ✅ CORRECT - Create new string
str = 'H' + str.slice(1);
```

**Why it breaks:** Strings immutable, can't modify in place.

---

## H) When to Use & When NOT to Use

Use string manipulation for text processing, pattern matching, validation. Use two pointers for palindromes, sliding window for substrings. Don't use inefficient methods when better algorithms exist.

---

## I) 2-Minute Interview Explanation

**Interviewer:** "Explain String Manipulation."

**You:**
"String manipulation involves modifying, searching, transforming strings. Common operations: Reverse (two pointers O(n)), palindrome check (two pointers), longest substring (sliding window O(n)), anagram check (frequency counting O(n)), valid parentheses (stack O(n)).

Techniques: Two pointers for palindromes/reverse, sliding window for substrings, character frequency for anagrams, stack for matching problems. Strings often immutable, operations create new strings."

---

## J) Mini Practice Task

Implement: String reverse, palindrome check, longest substring without repeating, anagram check, valid parentheses, string compression.

---

**END OF TOPIC: STRING MANIPULATION**

