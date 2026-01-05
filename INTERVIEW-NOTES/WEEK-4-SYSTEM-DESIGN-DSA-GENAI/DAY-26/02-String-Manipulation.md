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

/**
 * STRING REVERSE KYA HAI?
 * 
 * String Reverse matlab string ke characters ko ulta karna (reverse order mein).
 * Pehla character last par, last character pehle par.
 * 
 * Simple Definition:
 * - String ko reverse order mein convert karna
 * - "hello" → "olleh"
 * - Characters ko swap karna start se end tak
 * 
 * Real-life Analogy:
 * 1. Mirror Reflection:
 *    - Jaise mirror mein aapka reflection ulta dikhta hai
 *    - Left right ulta ho jata hai
 *    - String reverse bhi waise hi kaam karta hai
 * 
 * 2. Reading Backwards:
 *    - Book ko ulta padhna
 *    - Last page se pehli page tak
 *    - String reverse = characters ko ulta padhna
 * 
 * Methods to Reverse String:
 * 
 * 1. BUILT-IN METHOD (Simple):
 *    - split('') → convert to array
 *    - reverse() → reverse array
 *    - join('') → convert back to string
 *    - Easy but creates new strings (more memory)
 * 
 * 2. TWO POINTERS (Efficient):
 *    - Left pointer start se, right pointer end se
 *    - Characters swap karte hain
 *    - Most efficient: O(n) time, O(1) space
 * 
 * 3. RECURSIVE (Elegant):
 *    - Recursive approach
 *    - Last character + reverse of rest
 *    - More memory (call stack)
 * 
 * Time Complexity: O(n) - n characters process karna padta hai
 * Space Complexity: 
 *   - Built-in: O(n) - new strings create
 *   - Two pointers: O(1) - in-place (if array allowed)
 *   - Recursive: O(n) - call stack
 */

// Method 1: Built-in (Simple but creates new strings)
function reverse1(str) {
  // Step 1: String ko character array mein convert karo
  // 'hello' → ['h', 'e', 'l', 'l', 'o']
  const chars = str.split('');
  
  // Step 2: Array ko reverse karo
  // ['h', 'e', 'l', 'l', 'o'] → ['o', 'l', 'l', 'e', 'h']
  chars.reverse();
  
  // Step 3: Array ko wapas string mein convert karo
  // ['o', 'l', 'l', 'e', 'h'] → 'olleh'
  return chars.join('');
}

// One-liner version
function reverse1Short(str) {
  return str.split('').reverse().join('');
}

console.log(reverse1('hello')); // Output: 'olleh'
console.log(reverse1('world')); // Output: 'dlrow'

// Method 2: Two Pointers (Most Efficient)
function reverse2(str) {
  // Step 1: String ko array mein convert (JavaScript strings immutable)
  const arr = str.split('');
  
  // Step 2: Two pointers initialize
  let left = 0;              // Start se
  let right = arr.length - 1; // End se
  
  // Step 3: Jab tak pointers meet nahi karte, swap karo
  while (left < right) {
    // Swap characters
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;   // Left pointer aage
    right--;  // Right pointer piche
  }
  
  // Step 4: Array ko string mein convert karo
  return arr.join('');
}

// Example with step-by-step:
// String: 'hello'
// Array: ['h', 'e', 'l', 'l', 'o']
// 
// Iteration 1: left=0, right=4
//   Swap arr[0] and arr[4]: ['o', 'e', 'l', 'l', 'h']
//   left=1, right=3
// 
// Iteration 2: left=1, right=3
//   Swap arr[1] and arr[3]: ['o', 'l', 'l', 'e', 'h']
//   left=2, right=2
// 
// left === right, STOP
// Result: 'olleh'

console.log(reverse2('hello')); // Output: 'olleh'
console.log(reverse2('racecar')); // Output: 'racecar' (palindrome)

// Method 3: Recursive (Elegant but more memory)
function reverse3(str) {
  // Base case: Agar string 1 ya 0 characters ki hai
  if (str.length <= 1) {
    return str;
  }
  
  // Recursive case:
  // Last character + reverse of remaining string
  // 'hello' → 'o' + reverse('hell')
  //         → 'o' + ('l' + reverse('hel'))
  //         → 'o' + ('l' + ('l' + reverse('he')))
  //         → ... → 'olleh'
  return reverse3(str.slice(1)) + str[0];
}

// Step-by-step:
// reverse3('hello')
//   = reverse3('ello') + 'h'
//   = (reverse3('llo') + 'e') + 'h'
//   = ((reverse3('lo') + 'l') + 'e') + 'h'
//   = (((reverse3('o') + 'l') + 'l') + 'e') + 'h'
//   = (((('o') + 'l') + 'l') + 'e') + 'h'
//   = 'olleh'

console.log(reverse3('hello')); // Output: 'olleh'

// Method 4: Using Loop (Simple iteration)
function reverse4(str) {
  let reversed = '';
  
  // End se start tak traverse karo
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  
  return reversed;
}

console.log(reverse4('hello')); // Output: 'olleh'

// Method 5: Using reduce (Functional style)
function reverse5(str) {
  return str.split('').reduce((reversed, char) => char + reversed, '');
}

console.log(reverse5('hello')); // Output: 'olleh'

// ============================================
// PALINDROME CHECK
// ============================================

/**
 * PALINDROME KYA HAI?
 * 
 * Palindrome ek string hai jo ulta-sidha same padhti hai.
 * Agar aap string ko reverse karo to wahi string milegi.
 * 
 * Simple Definition:
 * - String jo same padhti hai forward aur backward
 * - "racecar" = "racecar" (reverse bhi same)
 * - "madam" = "madam"
 * - "A man a plan a canal Panama" (spaces/uppercase ignore)
 * 
 * Real-life Analogy:
 * 1. Mirror Words:
 *    - Jaise mirror mein word same dikhta hai
 *    - Palindrome bhi same forward aur backward
 * 
 * 2. Symmetry:
 *    - Symmetrical pattern
 *    - Center se dono sides same
 * 
 * Types of Palindromes:
 * 
 * 1. STRICT PALINDROME:
 *    - Exact match (case-sensitive)
 *    - "racecar" (all lowercase)
 * 
 * 2. CASE-INSENSITIVE:
 *    - Ignore case differences
 *    - "RaceCar" = "racecaR" (same)
 * 
 * 3. ALPHANUMERIC ONLY:
 *    - Ignore spaces, punctuation
 *    - "A man a plan a canal Panama"
 *    - Only letters/numbers check
 * 
 * Algorithm Approach:
 * - Two pointers: start se aur end se
 * - Compare characters while moving toward center
 * - Agar koi bhi mismatch to false
 * - Agar sab match to true
 * 
 * Time Complexity: O(n) - n/2 comparisons
 * Space Complexity: O(1) - constant space (two pointers)
 */

// Example 1: Basic Palindrome Check (Case-sensitive)
function isPalindromeBasic(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    // Agar characters match nahi karte to false
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  // Agar sab match kare to true
  return true;
}

console.log(isPalindromeBasic('racecar')); // true
console.log(isPalindromeBasic('hello')); // false
console.log(isPalindromeBasic('a')); // true (single character)

// Example 2: Palindrome with Case-Insensitive and Alphanumeric Only
function isPalindrome(str) {
  // Step 1: Non-alphanumeric characters remove karo aur lowercase karo
  // "A man a plan a canal Panama" → "amanaplanacanalpanama"
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // Step 2: Two pointers se compare karo
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false; // Not palindrome
    }
    left++;
    right--;
  }
  
  return true; // Palindrome
}

// Example with step-by-step:
// String: "A man a plan a canal Panama"
// Cleaned: "amanaplanacanalpanama"
// 
// left=0, right=19: 'a' === 'a' ✓
// left=1, right=18: 'm' === 'm' ✓
// left=2, right=17: 'a' === 'a' ✓
// ...
// All match → Palindrome ✓

console.log(isPalindrome('A man a plan a canal Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome('racecar')); // true

// Example 3: Palindrome using Reverse (Simple but less efficient)
function isPalindromeReverse(str) {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindromeReverse('racecar')); // true

// Example 4: Recursive Palindrome Check
function isPalindromeRecursive(str) {
  // Clean string first
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  function check(l, r) {
    // Base case: Single character or empty
    if (l >= r) return true;
    
    // Check if characters match
    if (cleaned[l] !== cleaned[r]) return false;
    
    // Recursive call for inner substring
    return check(l + 1, r - 1);
  }
  
  return check(0, cleaned.length - 1);
}

console.log(isPalindromeRecursive('racecar')); // true

// Example 5: Find Longest Palindromic Substring (Extension)
function longestPalindrome(s) {
  let maxLen = 0;
  let start = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1; // Length of palindrome
  }
  
  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome (center at i)
    const len1 = expandAroundCenter(i, i);
    // Even length palindrome (center between i and i+1)
    const len2 = expandAroundCenter(i, i + 1);
    
    const len = Math.max(len1, len2);
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }
  
  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome('babad')); // 'bab' or 'aba'
console.log(longestPalindrome('cbbd')); // 'bb'

// ============================================
// LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
// ============================================

/**
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS KYA HAI?
 * 
 * Yeh problem mein humein longest substring find karni hai jisme koi character repeat nahi hota.
 * Har character unique hona chahiye substring mein.
 * 
 * Simple Definition:
 * - Longest substring jisme sab characters unique hain
 * - No repeating characters
 * - "abcabcbb" → longest = "abc" (length 3)
 * - "bbbbb" → longest = "b" (length 1)
 * 
 * Real-life Analogy:
 * 1. Unique Visitors:
 *    - Jaise aap track karte ho ki consecutive unique visitors kitne the
 *    - Agar duplicate visitor aaya to count restart
 *    - Maximum consecutive unique visitors track karna
 * 
 * 2. Queue System:
 *    - Queue mein unique items track karna
 *    - Agar duplicate item aaya to naya queue start
 *    - Maximum unique items in queue
 * 
 * Algorithm Approach: Sliding Window Technique
 * 
 * Key Insight:
 * - Sliding window use karte hain
 * - Window expand karte hain (right pointer move)
 * - Window shrink karte hain agar duplicate mile (left pointer move)
 * - Character position track karte hain (Map/Set use)
 * 
 * Algorithm Steps:
 * 1. Map/Set banaye characters track karne ke liye
 * 2. Two pointers: start (window start) aur end (window end)
 * 3. End pointer ko move karo (window expand)
 * 4. Agar character already map mein hai aur current window mein hai:
 *    - Start pointer ko move karo (window shrink)
 * 5. Character ko map mein add/update karo
 * 6. Maximum length track karo
 * 
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(min(n, m)) - m = character set size
 */

function longestSubstring(s) {
  // Step 1: Map banaye characters aur unki positions track karne ke liye
  const charMap = new Map(); // Character → Last index
  let maxLength = 0;
  let start = 0; // Window ka start
  
  // Step 2: End pointer ko move karo (window expand)
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    
    // Step 3: Check karo ki character already window mein hai ya nahi
    if (charMap.has(char) && charMap.get(char) >= start) {
      // Agar character already window mein hai to window shrink karo
      // Start ko duplicate character ke next position par move karo
      start = charMap.get(char) + 1;
    }
    
    // Step 4: Character ki current position update karo
    charMap.set(char, end);
    
    // Step 5: Maximum length update karo
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}

// Example with step-by-step:
// String: "abcabcbb"
// 
// end=0, char='a': charMap={a:0}, start=0, length=1, maxLength=1
// end=1, char='b': charMap={a:0, b:1}, start=0, length=2, maxLength=2
// end=2, char='c': charMap={a:0, b:1, c:2}, start=0, length=3, maxLength=3
// end=3, char='a': 'a' found at 0, start=0+1=1, charMap={a:3, b:1, c:2}, length=3, maxLength=3
// end=4, char='b': 'b' found at 1, start=1+1=2, charMap={a:3, b:4, c:2}, length=3, maxLength=3
// end=5, char='c': 'c' found at 2, start=2+1=3, charMap={a:3, b:4, c:5}, length=3, maxLength=3
// end=6, char='b': 'b' found at 4, start=4+1=5, charMap={a:3, b:6, c:5}, length=2, maxLength=3
// end=7, char='b': 'b' found at 6, start=6+1=7, charMap={a:3, b:7, c:5}, length=1, maxLength=3
// 
// Result: 3 (substring "abc")

console.log(longestSubstring('abcabcbb')); // Output: 3 ('abc')
console.log(longestSubstring('bbbbb')); // Output: 1 ('b')
console.log(longestSubstring('pwwkew')); // Output: 3 ('wke')

// Example 2: Using Set (Alternative approach)
function longestSubstringSet(s) {
  const charSet = new Set();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < s.length; right++) {
    // Agar character set mein hai to window shrink karo
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    
    // Character add karo
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

console.log(longestSubstringSet('abcabcbb')); // Output: 3

// Example 3: Return the actual substring (not just length)
function longestSubstringActual(s) {
  const charMap = new Map();
  let maxLength = 0;
  let start = 0;
  let resultStart = 0;
  
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    
    charMap.set(char, end);
    
    if (end - start + 1 > maxLength) {
      maxLength = end - start + 1;
      resultStart = start;
    }
  }
  
  return s.substring(resultStart, resultStart + maxLength);
}

console.log(longestSubstringActual('abcabcbb')); // Output: 'abc'
console.log(longestSubstringActual('pwwkew')); // Output: 'wke'

// ============================================
// ANAGRAM CHECK
// ============================================

/**
 * ANAGRAM KYA HAI?
 * 
 * Anagram ek word ya phrase hai jo dusre word ke characters ko rearrange karke banaya gaya hai.
 * Dono strings mein same characters same frequency mein hone chahiye.
 * 
 * Simple Definition:
 * - Do strings jinki character frequency same hai
 * - Characters rearrange ho sakte hain par frequency same
 * - "listen" aur "silent" - anagrams (same characters)
 * - "evil" aur "vile" - anagrams
 * - "hello" aur "world" - not anagrams (different characters)
 * 
 * Real-life Analogy:
 * 1. Scrabble:
 *    - Jaise Scrabble mein same tiles se different words banate ho
 *    - Same letters, different arrangement
 *    - Anagram bhi waise hi - same characters, different order
 * 
 * 2. Word Jumble:
 *    - Jumbled words solve karte waqt
 *    - Letters ko rearrange karke word banana
 *    - Anagram check = same letters check karna
 * 
 * Key Properties:
 * - Same length honi chahiye
 * - Same characters (frequency same)
 * - Different order allowed
 * - Case-sensitive ya case-insensitive (depends on problem)
 * 
 * Algorithm Approaches:
 * 
 * 1. CHARACTER FREQUENCY COUNTING (Most Common):
 *    - Dono strings ki character frequency count karo
 *    - Frequencies compare karo
 *    - Time: O(n), Space: O(1) for limited charset
 * 
 * 2. SORTING (Simple but slower):
 *    - Dono strings ko sort karo
 *    - Compare sorted strings
 *    - Time: O(n log n), Space: O(n)
 * 
 * 3. SINGLE MAP OPTIMIZATION:
 *    - Ek map use karo
 *    - First string ke liye increment
 *    - Second string ke liye decrement
 *    - Sab zero hone chahiye
 */

// Example 1: Using Two Frequency Maps
function isAnagram(str1, str2) {
  // Step 1: Length check (anagram ke liye length same honi chahiye)
  if (str1.length !== str2.length) {
    return false;
  }
  
  // Step 2: Frequency maps banaye
  const freq1 = {}; // str1 ki frequency
  const freq2 = {}; // str2 ki frequency
  
  // Step 3: str1 ki character frequency count karo
  for (let char of str1) {
    freq1[char] = (freq1[char] || 0) + 1;
  }
  
  // Step 4: str2 ki character frequency count karo
  for (let char of str2) {
    freq2[char] = (freq2[char] || 0) + 1;
  }
  
  // Step 5: Freq  uencies compare karo
  for (let char in freq1) {
    if (freq1[char] !== freq2[char]) {
      return false; // Frequencies match nahi kar rahi
    }
  }
  
  return true; // Sab frequencies match
}

// Example with step-by-step:
// str1 = "listen", str2 = "silent"
// 
// freq1: {l:1, i:1, s:1, t:1, e:1, n:1}
// freq2: {s:1, i:1, l:1, e:1, n:1, t:1}
// 
// Compare:
// l: 1 === 1 ✓
// i: 1 === 1 ✓
// s: 1 === 1 ✓
// t: 1 === 1 ✓
// e: 1 === 1 ✓
// n: 1 === 1 ✓
// 
// Result: true (anagrams)

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world')); // false
console.log(isAnagram('evil', 'vile')); // true

// Example 2: Optimized Version (Single Map - More Efficient)
function isAnagramOptimized(str1, str2) {
  // Step 1: Length check
  if (str1.length !== str2.length) {
    return false;
  }
  
  // Step 2: Single frequency map
  const freq = {};
  
  // Step 3: str1 ke characters ke liye increment
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Step 4: str2 ke characters ke liye decrement
  for (let char of str2) {
    // Agar character map mein nahi hai to anagram nahi hai
    if (!freq[char]) {
      return false;
    }
    freq[char]--; // Decrement frequency
  }
  
  // Step 5: Sab frequencies zero honi chahiye (already checked in loop)
  return true;
}

// Step-by-step:
// str1 = "listen", str2 = "silent"
// 
// After str1: freq = {l:1, i:1, s:1, t:1, e:1, n:1}
// 
// Processing str2:
// 's': freq['s'] = 1 → 0 ✓
// 'i': freq['i'] = 1 → 0 ✓
// 'l': freq['l'] = 1 → 0 ✓
// 'e': freq['e'] = 1 → 0 ✓
// 'n': freq['n'] = 1 → 0 ✓
// 't': freq['t'] = 1 → 0 ✓
// 
// Result: true (all frequencies become 0)

console.log(isAnagramOptimized('listen', 'silent')); // true
console.log(isAnagramOptimized('rat', 'car')); // false

// Example 3: Using Sorting (Simple but O(n log n))
function isAnagramSort(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  // Sort both strings and compare
  const sorted1 = str1.split('').sort().join('');
  const sorted2 = str2.split('').sort().join('');
  
  return sorted1 === sorted2;
}

console.log(isAnagramSort('listen', 'silent')); // true
// 'listen' → sorted → 'eilnst'
// 'silent' → sorted → 'eilnst'
// Same → anagrams

// Example 4: Case-Insensitive Anagram
function isAnagramCaseInsensitive(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  const freq = {};
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  for (let char of s1) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  for (let char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  
  return true;
}

console.log(isAnagramCaseInsensitive('Listen', 'Silent')); // true
console.log(isAnagramCaseInsensitive('Hello', 'hello')); // true

// ============================================
// VALID PARENTHESES
// ============================================

/**
 * VALID PARENTHESES KYA HAI?
 * 
 * Valid Parentheses check karta hai ki string mein brackets properly balanced hain ya nahi.
 * Har opening bracket ka corresponding closing bracket same order mein hona chahiye.
 * 
 * Simple Definition:
 * - Brackets properly matched hone chahiye
 * - Opening bracket ke baad closing bracket same type ka
 * - Nested brackets allowed (but properly closed)
 * - "()[]{}" → valid
 * - "([)]" → invalid (wrong order)
 * 
 * Real-life Analogy:
 * 1. Nesting Boxes:
 *    - Jaise boxes ko nested karte ho
 *    - Jo box pehle khola wo baad mein band karna
 *    - Last opened = First closed (LIFO)
 * 
 * 2. Stack of Plates:
 *    - Plates ko stack karte ho
 *    - Top plate pehle nikalti hai
 *    - Last in, First out (LIFO principle)
 * 
 * Rules for Valid Parentheses:
 * 1. Har opening bracket ka closing bracket hona chahiye
 * 2. Brackets correct order mein close hone chahiye
 * 3. Nested brackets allowed
 * 4. Empty string valid hota hai
 * 
 * Types of Brackets:
 * - Round: ( )
 * - Curly: { }
 * - Square: [ ]
 * 
 * Algorithm Approach: Stack Data Structure
 * 
 * Why Stack?
 * - LIFO (Last In First Out) principle
 * - Last opened bracket pehle close hona chahiye
 * - Stack perfect fit hai
 * 
 * Algorithm Steps:
 * 1. Stack initialize karo
 * 2. Har character ke liye:
 *    - Agar opening bracket: Stack mein push karo
 *    - Agar closing bracket: 
 *      - Stack empty hai to invalid
 *      - Stack top match nahi karta to invalid
 *      - Match karta hai to pop karo
 * 3. End mein stack empty honi chahiye
 * 
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(n) - Stack space
 */

function isValidParentheses(s) {
  // Step 1: Stack initialize karo
  const stack = [];
  
  // Step 2: Closing brackets ke liye opening brackets ka mapping
  const pairs = {
    ')': '(',  // ')' ke liye '(' match
    '}': '{',  // '}' ke liye '{' match
    ']': '['   // ']' ke liye '[' match
  };
  
  // Step 3: Har character process karo
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      // Opening bracket: Stack mein push karo
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      // Closing bracket: Check karo
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        // Agar stack empty hai ya top element match nahi karta
        return false; // Invalid
      }
    }
  }
  
  // Step 4: Stack empty honi chahiye (sab brackets close hone chahiye)
  return stack.length === 0;
}

// Example with step-by-step:
// String: "()[]{}"
// 
// char='(': opening → stack=[ '(' ]
// char=')': closing, stack.top='(' matches ')' → stack.pop() → stack=[]
// char='[': opening → stack=[ '[' ]
// char=']': closing, stack.top='[' matches ']' → stack.pop() → stack=[]
// char='{': opening → stack=[ '{' ]
// char='}': closing, stack.top='{' matches '}' → stack.pop() → stack=[]
// 
// Stack empty → Valid ✓

console.log(isValidParentheses('()[]{}')); // true
console.log(isValidParentheses('([)]')); // false
console.log(isValidParentheses('()')); // true
console.log(isValidParentheses('(((')); // false (not closed)
console.log(isValidParentheses(')))')); // false (no opening)

// Example 2: More Detailed Version with Debugging
function isValidParenthesesDetailed(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char in pairs) {
      // Closing bracket
      if (stack.length === 0) {
        return false; // No opening bracket for this closing
      }
      
      const top = stack.pop();
      if (top !== pairs[char]) {
        return false; // Mismatch
      }
    } else {
      // Opening bracket
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}

console.log(isValidParenthesesDetailed('({[]})')); // true

// Example 3: Using Map (Alternative)
function isValidParenthesesMap(s) {
  const stack = [];
  const opening = new Set(['(', '{', '[']);
  const closing = new Map([
    [')', '('],
    ['}', '{'],
    [']', '[']
  ]);
  
  for (let char of s) {
    if (opening.has(char)) {
      stack.push(char);
    } else if (closing.has(char)) {
      if (stack.length === 0 || stack.pop() !== closing.get(char)) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

console.log(isValidParenthesesMap('()[]{}')); // true

// ============================================
// LONGEST COMMON PREFIX
// ============================================

/**
 * LONGEST COMMON PREFIX KYA HAI?
 * 
 * Longest Common Prefix (LCP) ek array of strings mein sabse lamba common prefix find karta hai.
 * Prefix = string ka starting portion
 * 
 * Simple Definition:
 * - Sab strings ka common starting part
 * - "flower", "flow", "flight" → common prefix = "fl"
 * - "dog", "racecar", "car" → common prefix = "" (no common)
 * 
 * Real-life Analogy:
 * 1. Shared Beginning:
 *    - Jaise sab files ka common folder name
 *    - "/home/user/documents" → "/home/user" common
 *    - Strings ka common beginning part
 * 
 * 2. Family Tree:
 *    - Common ancestor find karna
 *    - Sab branches ka shared root
 *    - Common prefix = shared beginning
 * 
 * Algorithm Approaches:
 * 
 * 1. HORIZONTAL SCANNING (Most Common):
 *    - Pehli string ko prefix assume karo
 *    - Baaki strings se compare karke shorten karo
 *    - Time: O(S) where S = sum of all characters
 * 
 * 2. VERTICAL SCANNING:
 *    - Har position par sab characters compare
 *    - Character-by-character check
 *    - Time: O(S)
 * 
 * 3. DIVIDE AND CONQUER:
 *    - Array ko divide karo
 *    - Recursively solve
 *    - Time: O(S)
 * 
 * Key Points:
 * - Prefix string ke start se hota hai
 * - Sab strings mein common hona chahiye
 * - Empty array = empty prefix
 * - Single string = whole string is prefix
 */

// Example 1: Horizontal Scanning (Most Common)
function longestCommonPrefix(strs) {
  // Step 1: Empty array check
  if (strs.length === 0) {
    return '';
  }
  
  // Step 2: Pehli string ko prefix assume karo
  let prefix = strs[0];
  
  // Step 3: Baaki strings se compare karo
  for (let i = 1; i < strs.length; i++) {
    // Step 4: Jab tak current string prefix se start nahi hoti, prefix ko shorten karo
    while (strs[i].indexOf(prefix) !== 0) {
      // indexOf(prefix) !== 0 means prefix current string ke start mein nahi hai
      prefix = prefix.slice(0, prefix.length - 1); // Last character remove
      
      // Agar prefix empty ho gaya to return
      if (prefix === '') {
        return '';
      }
    }
  }
  
  return prefix;
}

// Example with step-by-step:
// Array: ['flower', 'flow', 'flight']
// 
// prefix = 'flower' (first string)
// 
// i=1, strs[1]='flow':
//   'flow'.indexOf('flower') = -1 (not found) → shorten
//   prefix = 'flowe'
//   'flow'.indexOf('flowe') = -1 → shorten
//   prefix = 'flow'
//   'flow'.indexOf('flow') = 0 ✓ (found at start)
// 
// i=2, strs[2]='flight':
//   'flight'.indexOf('flow') = -1 → shorten
//   prefix = 'flo'
//   'flight'.indexOf('flo') = -1 → shorten
//   prefix = 'fl'
//   'flight'.indexOf('fl') = 0 ✓ (found at start)
// 
// Result: 'fl'

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // 'fl'
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ''
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])); // 'inters'

// Example 2: Vertical Scanning (Character-by-character)
function longestCommonPrefixVertical(strs) {
  if (strs.length === 0) return '';
  
  // Step 1: Pehli string ka length check karo (minimum length)
  const firstStr = strs[0];
  
  // Step 2: Har position par sab strings ke characters compare karo
  for (let i = 0; i < firstStr.length; i++) {
    const char = firstStr[i];
    
    // Step 3: Baaki strings mein same position par same character check karo
    for (let j = 1; j < strs.length; j++) {
      // Agar character match nahi karta ya string khatam ho gayi
      if (i >= strs[j].length || strs[j][i] !== char) {
        return firstStr.slice(0, i); // Prefix till here
      }
    }
  }
  
  return firstStr; // Whole first string is prefix
}

console.log(longestCommonPrefixVertical(['flower', 'flow', 'flight'])); // 'fl'

// Example 3: Divide and Conquer
function longestCommonPrefixDivideConquer(strs) {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];
  
  const mid = Math.floor(strs.length / 2);
  const left = longestCommonPrefixDivideConquer(strs.slice(0, mid));
  const right = longestCommonPrefixDivideConquer(strs.slice(mid));
  
  return commonPrefix(left, right);
}

function commonPrefix(str1, str2) {
  const minLen = Math.min(str1.length, str2.length);
  for (let i = 0; i < minLen; i++) {
    if (str1[i] !== str2[i]) {
      return str1.slice(0, i);
    }
  }
  return str1.slice(0, minLen);
}

console.log(longestCommonPrefixDivideConquer(['flower', 'flow', 'flight'])); // 'fl'

// Example 4: Using Sort (Optimization)
function longestCommonPrefixSort(strs) {
  if (strs.length === 0) return '';
  
  // Sort karo - first aur last string compare karo
  // Sorted array mein first aur last strings sabse zyada different hongi
  strs.sort();
  
  const first = strs[0];
  const last = strs[strs.length - 1];
  
  let i = 0;
  while (i < first.length && first[i] === last[i]) {
    i++;
  }
  
  return first.slice(0, i);
}

console.log(longestCommonPrefixSort(['flower', 'flow', 'flight'])); // 'fl'

// ============================================
// STRING COMPRESSION
// ============================================

/**
 * STRING COMPRESSION KYA HAI?
 * 
 * String Compression matlab consecutive repeating characters ko compress karna.
 * Character aur uska count store karte hain.
 * 
 * Simple Definition:
 * - Consecutive repeating characters ko compress karna
 * - "aabcccccaaa" → "a2bc5a3"
 * - Character + count format
 * - Agar count 1 hai to sirf character (no number)
 * 
 * Real-life Analogy:
 * 1. Run-Length Encoding:
 *    - Jaise image compression mein same pixels ko compress karte ho
 *    - "5 blue pixels" instead of "blue blue blue blue blue"
 *    - String compression bhi waise hi kaam karta hai
 * 
 * 2. Counting Objects:
 *    - Jaise aap count karte ho: "2 apples, 3 bananas"
 *    - Instead of "apple apple banana banana banana"
 *    - Compressed format: count + item
 * 
 * Compression Format:
 * - Character + count (if count > 1)
 * - Single characters don't need count
 * - "aa" → "a2"
 * - "a" → "a" (no count for single)
 * 
 * Algorithm Steps:
 * 1. String traverse karo
 * 2. Consecutive characters count karo
 * 3. Character + count append karo (if count > 1)
 * 4. Single characters ko as-is append karo
 * 
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(n) - Output string
 */

function compress(str) {
  // Step 1: Compressed string initialize
  let compressed = '';
  let count = 1; // Current character count
  
  // Step 2: String traverse karo
  for (let i = 0; i < str.length; i++) {
    // Step 3: Check karo ki next character same hai ya nahi
    if (str[i] === str[i + 1]) {
      // Agar next character same hai to count increase karo
      count++;
    } else {
      // Agar next character different hai to append karo
      compressed += str[i]; // Character add
      
      // Agar count > 1 hai to count bhi add karo
      if (count > 1) {
        compressed += count;
      }
      
      // Count reset karo next character ke liye
      count = 1;
    }
  }
  
  // Step 4: Compressed string chhoti hai to return, warna original
  return compressed.length < str.length ? compressed : str;
}

// Example with step-by-step:
// String: "aabcccccaaa"
// 
// i=0, char='a', next='a': count=2
// i=1, char='a', next='b': Append 'a' + count(2) → compressed="a2", count=1
// i=2, char='b', next='c': Append 'b' → compressed="a2b", count=1
// i=3, char='c', next='c': count=2
// i=4, char='c', next='c': count=3
// i=5, char='c', next='c': count=4
// i=6, char='c', next='c': count=5
// i=7, char='c', next='a': Append 'c' + count(5) → compressed="a2bc5", count=1
// i=8, char='a', next='a': count=2
// i=9, char='a', next='a': count=3
// i=10, char='a', next=undefined: Append 'a' + count(3) → compressed="a2bc5a3"
// 
// Result: "a2bc5a3"

console.log(compress('aabcccccaaa')); // Output: 'a2bc5a3'
console.log(compress('abc')); // Output: 'abc' (no compression, length same)
console.log(compress('aabbcc')); // Output: 'a2b2c2'

// Example 2: In-Place Compression (Array modification)
function compressInPlace(chars) {
  let writeIndex = 0;
  let count = 1;
  
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && chars[i] === chars[i + 1]) {
      count++;
    } else {
      chars[writeIndex++] = chars[i];
      
      if (count > 1) {
        const countStr = count.toString();
        for (let j = 0; j < countStr.length; j++) {
          chars[writeIndex++] = countStr[j];
        }
      }
      count = 1;
    }
  }
  
  return writeIndex; // New length
}

const chars = ['a', 'a', 'b', 'c', 'c', 'c'];
const newLength = compressInPlace(chars);
console.log(chars.slice(0, newLength)); // ['a', '2', 'b', 'c', '3']

// Example 3: Compression with Custom Format
function compressCustom(str) {
  let result = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // Always include count (even if 1)
      result += `${str[i]}${count}`;
      count = 1;
    }
  }
  
  return result;
}

console.log(compressCustom('aabcccccaaa')); // 'a2b1c5a3'

// ============================================
// GROUP ANAGRAMS
// ============================================

/**
 * GROUP ANAGRAMS KYA HAI?
 * 
 * Group Anagrams problem mein humein strings ko groups mein organize karna hai
 * jahan har group mein anagrams hote hain.
 * 
 * Simple Definition:
 * - Strings ko anagram groups mein organize karna
 * - Same anagrams ek group mein
 * - "eat", "tea", "ate" → same group (anagrams)
 * - "tan", "nat" → same group
 * - "bat" → separate group
 * 
 * Real-life Analogy:
 * 1. Organizing Files:
 *    - Jaise aap similar files ko ek folder mein rakhte ho
 *    - Anagrams = similar files (same letters)
 *    - Group = folder
 * 
 * 2. Dictionary:
 *    - Dictionary mein words organize hote hain
 *    - Similar words together
 *    - Anagrams ek group mein
 * 
 * Algorithm Approach:
 * 
 * Key Insight:
 * - Anagrams ko sort karne par same string milti hai
 * - "eat" sorted → "aet"
 * - "tea" sorted → "aet"
 * - Same sorted string = anagrams
 * 
 * Steps:
 * 1. Har string ko sort karo (key generate karo)
 * 2. Map use karo (key → list of anagrams)
 * 3. Sorted string ko key banaye
 * 4. Original string ko us key ke list mein add karo
 * 5. Map ke values return karo
 * 
 * Time Complexity: O(n * k log k)
 *   - n = number of strings
 *   - k = average string length
 *   - k log k = sorting each string
 * 
 * Space Complexity: O(n * k) - Map storage
 */

function groupAnagrams(strs) {
  // Step 1: Map banaye anagrams group karne ke liye
  const map = new Map(); // Key: sorted string, Value: array of anagrams
  
  // Step 2: Har string process karo
  for (let str of strs) {
    // Step 3: String ko sort karke key generate karo
    // "eat" → ['e','a','t'] → sort → ['a','e','t'] → join → "aet"
    const key = str.split('').sort().join('');
    
    // Step 4: Agar key map mein nahi hai to naya array banaye
    if (!map.has(key)) {
      map.set(key, []);
    }
    
    // Step 5: Original string ko us key ke list mein add karo
    map.get(key).push(str);
  }
  
  // Step 6: Map ke values (arrays) ko return karo
  return Array.from(map.values());
}

// Example with step-by-step:
// Input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
// 
// str='eat': key='aet' → map={'aet': ['eat']}
// str='tea': key='aet' → map={'aet': ['eat', 'tea']}
// str='tan': key='ant' → map={'aet': ['eat', 'tea'], 'ant': ['tan']}
// str='ate': key='aet' → map={'aet': ['eat', 'tea', 'ate'], 'ant': ['tan']}
// str='nat': key='ant' → map={'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat']}
// str='bat': key='abt' → map={'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat'], 'abt': ['bat']}
// 
// Result: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// Example 2: Using Character Frequency as Key (Alternative)
function groupAnagramsFrequency(strs) {
  const map = new Map();
  
  for (let str of strs) {
    // Character frequency count karke key banaye
    const freq = Array(26).fill(0);
    for (let char of str) {
      freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    const key = freq.join(','); // Frequency array ko string mein convert
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }
  
  return Array.from(map.values());
}

console.log(groupAnagramsFrequency(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// Example 3: Using Object as Key (Simpler)
function groupAnagramsObject(strs) {
  const map = {};
  
  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(str);
  }
  
  return Object.values(map);
}

console.log(groupAnagramsObject(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// ============================================
// MINIMUM WINDOW SUBSTRING
// ============================================

/**
 * MINIMUM WINDOW SUBSTRING KYA HAI?
 * 
 * Minimum Window Substring problem mein humein string 's' mein sabse chhoti substring
 * find karni hai jisme string 't' ke sab characters present hain (with required frequency).
 * 
 * Simple Definition:
 * - String 's' mein sabse chhoti substring find karna
 * - Jo string 't' ke sab characters contain kare
 * - "ADOBECODEBANC", "ABC" → minimum window = "BANC"
 * - All characters of 't' must be in window with correct frequency
 * 
 * Real-life Analogy:
 * 1. Shopping List:
 *    - Jaise aap shopping list ke items dhundhte ho
 *    - Minimum shops jahan sab items mil jaye
 *    - Window = shop range, Items = characters
 * 
 * 2. Recipe Ingredients:
 *    - Recipe ke sab ingredients ek place se lana
 *    - Minimum distance travel karna
 *    - Window = place range
 * 
 * Algorithm Approach: Sliding Window (Variable Size)
 * 
 * Key Concepts:
 * - need: Target characters ki required frequency
 * - window: Current window mein characters ki frequency
 * - valid: Kitne characters properly satisfied (frequency match)
 * 
 * Algorithm Steps:
 * 1. need map banaye (target characters ki frequency)
 * 2. window map banaye (current window ki frequency)
 * 3. Right pointer expand karo (window expand)
 * 4. Character frequency update karo
 * 5. valid count track karo (kitne characters satisfy)
 * 6. Jab valid == need.length: Window shrink karo
 * 7. Minimum window track karo
 * 
 * Time Complexity: O(|s| + |t|)
 *   - |s| = source string length
 *   - |t| = target string length
 * 
 * Space Complexity: O(|s| + |t|) - Maps
 */

function minWindow(s, t) {
  // Step 1: need map banaye (target characters ki required frequency)
  const need = {};
  for (let char of t) {
    need[char] = (need[char] || 0) + 1;
  }
  
  // Step 2: window map banaye (current window ki frequency)
  const window = {};
  
  // Step 3: Variables initialize
  let left = 0;
  let right = 0;
  let valid = 0; // Kitne characters properly satisfy ho rahe hain
  let start = 0; // Result substring ka start
  let minLen = Infinity; // Minimum length
  
  // Step 4: Right pointer expand karo (window expand)
  while (right < s.length) {
    const char = s[right];
    right++; // Window expand
    
    // Step 5: Agar character 'need' mein hai to window update karo
    if (need[char]) {
      window[char] = (window[char] || 0) + 1;
      
      // Agar character ki frequency requirement match ho gayi
      if (window[char] === need[char]) {
        valid++; // Ek character satisfy ho gaya
      }
    }
    
    // Step 6: Window shrink karo jab tak valid condition satisfy hai
    while (valid === Object.keys(need).length) {
      // Step 7: Minimum window update karo
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      // Step 8: Left character remove karo (window shrink)
      const leftChar = s[left];
      left++; // Window shrink
      
      // Step 9: Agar removed character 'need' mein hai to window update
      if (need[leftChar]) {
        // Agar frequency requirement match thi to valid decrease
        if (window[leftChar] === need[leftChar]) {
          valid--; // Character ab satisfy nahi ho raha
        }
        window[leftChar]--; // Frequency decrease
      }
    }
  }
  
  // Step 10: Result return karo
  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

// Example with step-by-step:
// s = "ADOBECODEBANC", t = "ABC"
// need = {A:1, B:1, C:1}
// 
// right=0, char='A': window={A:1}, valid=1, window expand
// right=1, char='D': window expand (D not in need)
// right=2, char='O': window expand
// right=3, char='B': window={A:1, B:1}, valid=2, window expand
// right=4, char='E': window expand
// right=5, char='C': window={A:1, B:1, C:1}, valid=3 (all satisfied!)
// 
// valid == need.length (3 == 3), shrink window:
//   left=0, leftChar='A': window={B:1, C:1}, valid=2, minLen=6, start=0
// 
// Continue expanding and shrinking...
// Final: start=9, minLen=4, result="BANC"

console.log(minWindow('ADOBECODEBANC', 'ABC')); // Output: 'BANC'
console.log(minWindow('a', 'a')); // Output: 'a'
console.log(minWindow('a', 'aa')); // Output: '' (not possible)

// Example 2: With Detailed Comments
function minWindowDetailed(s, t) {
  const need = {};
  const window = {};
  
  // Build need map
  for (let char of t) {
    need[char] = (need[char] || 0) + 1;
  }
  
  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    // Update window
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }
    
    // Shrink window
    while (valid === Object.keys(need).length) {
      // Update minimum
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      const d = s[left];
      left++;
      
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  
  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

console.log(minWindowDetailed('ADOBECODEBANC', 'ABC')); // 'BANC'
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

