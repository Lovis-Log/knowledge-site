---
slug: "06-bitwise-operations-and-structures"
title: "位运算与结构"
summary: "位运算、集合的位串表示、结构体与链表，附完整代码与综合例题。"
updatedAt: "2026-11-21"
content_type: "reference"
group: "course"
displayNumber: "6"
tags:
  - "C++"
sources:
  - kind: article
    title: "第六章位运算与结构.pptx"
    url: "https://docs.google.com/presentation/d/1Jcjk1rVuvj7cUwVDVTLVVQiLvOG5z5OK/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

# 第 6 章 位运算与结构

## 6.1 位运算

### 6.1.1 位运算符

计算机的存储器用二进制表示数据，以每 8 位为 1 字节编址；同一个数可以按不同字节长度的类型存放。每个数位只有 0 和 1 两种取值，位运算就是直接对数据中的每一位做操作，而不是把整个数当作一个整体做算术运算。位运算符的操作数必须是整数类型（`char`、`short`、`int`、`long`、`bool`、枚举等），不能用于 `float`、`double` 等浮点类型。

C++ 提供 6 个位运算符和 5 个复合赋值运算符：

| 运算符 | 名称 | 规则 |
| --- | --- | --- |
| `&` | 按位与 | 左右操作数对应位都为 1 时，结果位才为 1 |
| `\|` | 按位或 | 左右操作数对应位中有一个为 1 时，结果位就为 1 |
| `^` | 按位异或 | 左右操作数对应位不同（恰好一个为 1）时，结果位为 1 |
| `~` | 按位取反 | 单目运算符，0 变 1、1 变 0 |
| `<<` | 左移 | 各位左移，右边腾出的位补 0 |
| `>>` | 右移 | 各位右移，左边腾出的位按规则补 0 或符号位 |
| `&=` | 按位与赋值 | `a &= b` 等价于 `a = a & b` |
| `\|=` | 按位或赋值 | `a \|= b` 等价于 `a = a \| b` |
| `^=` | 按位异或赋值 | `a ^= b` 等价于 `a = a ^ b` |
| `<<=` | 左移赋值 | `a <<= b` 等价于 `a = a << b` |
| `>>=` | 右移赋值 | `a >>= b` 等价于 `a = a >> b` |

#### 按位与 `&`

`&` 把两个操作数的每一位分别做逻辑与：只有两个对应位都是 1，结果位才是 1。

| b1 | b2 | b1 & b2 |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

```cpp
  10    0000 1010
& 29    0001 1101
--------------
   8    0000 1000
```

`10 & 29 = 8`。按位与最常见的用途是“取某几位”和“清零某几位”：想保留哪些位，就把掩码的对应位设成 1；想清零哪些位，就把掩码的对应位设成 0。

#### 按位或 `|`

`|` 把对应位分别做逻辑或：只要有一个为 1，结果位就是 1。

| b1 | b2 | b1 \| b2 |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

```cpp
  10    0000 1010
| 29    0001 1101
--------------
  31    0001 1111
```

`10 | 29 = 31`。按位或常用于“把某些位置 1”，例如把第 `k` 位置 1 写成 `x |= (1u << k)`。

#### 按位异或 `^`

`^` 把对应位分别做“不同则为 1”的运算：

| b1 | b2 | b1 ^ b2 |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

```cpp
  10    0000 1010
^ 29    0001 1101
--------------
  23    0001 0111
```

`10 ^ 29 = 23`。异或有三条常用性质：

- `x ^ x = 0`：同一个值异或两次抵消；
- `x ^ 0 = x`：任何值与 0 异或不变；
- 异或满足交换律和结合律，所以 `(a ^ b) ^ b = a`。

这三条性质是后面“异或加密”和“异或交换”的依据。

#### 按位取反 `~`

`~` 是单目运算符，把所有 0 变 1、1 变 0。以 8 位示例：

```cpp
~ 0000 1010
-----------
  1111 0101
```

`1111 0101` 按补码解释是 `-11`，所以 `~10 = -11`。负数在计算机中用补码表示：取反再加 1 得到相反数；反过来，`~x` 在数学上等于 `-x - 1`（对二进制补码成立）。这一点在初学者里最容易混：`~` 不是“求相反数”，`-x` 才是。

#### 左移 `<<`

```cpp
value << shift
```

`value` 是要操作的整数，`shift` 是移动的位数。每左移一位，相当于把原数乘以 2（只要结果不溢出）；左移 2 位相当于乘以 4。例如 `27 << 2` 等于 `27 * 4 = 108`。

```cpp
x = x << 2;   // 把 x 左移 2 位
y <<= 2;      // 等价于 y = y << 2
```

左移后右边空出的位补 0。需要记住两个边界：

- `shift` 必须是非负且小于操作数位宽；移位位数等于或超过位宽是未定义行为；
- 对有符号类型，左移结果超出可表示范围时是未定义行为，不要依赖“溢出后回绕”的结果。初学阶段只对非负整数做左移最稳妥。

#### 右移 `>>`

```cpp
value >> shift
```

右移把各位向右移动，左边空出的位按操作数类型决定：

- 无符号类型：高位补 0，叫逻辑右移；
- 有符号类型：标准没有规定补 0 还是补符号位，常见实现是“算术右移”，即高位补符号位。对负数右移不要假设结果一定是某个值。

```cpp
int q = 43;
q = q >> 2;    // 43 / 4 取整，得 10
```

对正数，右移 `k` 位相当于除以 $2^k$ 后向下取整；对负数，算术右移也趋向负无穷，但具体行为依赖实现。

#### 复合赋值运算符

5 个位运算复合赋值运算符与其他复合赋值运算符形式一致。若有 `int a, b;`，则：

```cpp
a &= b;    // 等价于 a = a & b
a |= b;    // 等价于 a = a | b
a ^= b;    // 等价于 a = a ^ b
a <<= b;   // 等价于 a = a << b
a >>= b;   // 等价于 a = a >> b
```

复合赋值只写一次左操作数，避免 `a = a & b` 里重复书写和可能的副作用；但优先级仍然是赋值类最低，右边先算完再写回。

#### 位运算的优先级

位运算符之间，优先级从高到低是：

| 优先级 | 运算符 | 说明 |
| --- | --- | --- |
| 1（最高） | `~` | 单目取反 |
| 2 | `<<`、`>>` | 移位 |
| 3 | `&` | 按位与 |
| 4 | `^` | 按位异或 |
| 5（最低） | `\|` | 按位或 |

关系运算（`<`、`>`、`<=`、`>=`）和相等运算（`==`、`!=`）的优先级又高于 `&`，逻辑与 `&&`、逻辑或 `||` 则低于 `|`，赋值运算符最低。因此下面两个写法含义完全不同：

```cpp
if (a & 1 == 1)      // 实际是 a & (1 == 1)，不是判断最低位
if ((a & 1) == 1)    // 正确：先算按位与，再比较
```

记不住时不要背表，直接加括号。位运算与比较、逻辑运算混用时，括号是成本最低的防错手段。

#### 掩码

掩码是一个“某些位为 1、其他位为 0”的特殊值。把数据与掩码做 `&`，就能只保留掩码为 1 的那些位，或者检查某一位是否为 1。

```cpp
unsigned bitMask = 1u << 31;    // 只有最高位为 1
cout << (value & bitMask ? '1' : '0');
```

`value & bitMask` 的结果要么是 0（该位为 0），要么是 `bitMask`（该位为 1）。在条件表达式里它可直接当作“非零为真”使用。课件里写的是 `1 << 31`。构造第 31 位掩码时使用无符号常量。对 32 位 `unsigned`，`1u << 31` 得到最高位为 1 的无符号值。

#### 例6.1 按二进制位串形式输出无符号整数的值

```cpp
#include <iostream>
using namespace std;

void bitDisplay(unsigned int number);   // 函数声明

int main()
{
    unsigned int number;
    cout << "Enter an unsigned integer: ";
    cin >> number;
    cout << "Binary representation: ";
    bitDisplay(number);
    cout << endl;
}

void bitDisplay(unsigned value)
{
    unsigned c;
    unsigned bitMask = 1u << 31;        // 掩码，最高位置 1
    cout << value << '=';
    for (c = 1; c <= 32; c++)
    {
        cout << (value & bitMask ? '1' : '0');   // 输出 value 的最高位
        value <<= 1;                             // value 左移 1 位
        if (c % 8 == 0) cout << ' ';             // 每 8 位加一个空格
    }
    cout << endl;
}
```

以输入 `214` 为例，输出为：

```text
214=00000000 00000000 00000000 11010110
```

**解析**　这段代码的关键不是“把数转成字符串”，而是用掩码逐位“读”出每一位。

`bitMask` 只有最高位是 1（第 31 位，从 0 开始数）。`value & bitMask` 只可能得到两个结果：`0` 或 `bitMask`。条件运算符把它变成字符 `'0'` 或 `'1'`，于是每次循环输出当前最高位。

输出完最高位后，`value <<= 1` 把整个数左移一位，原来的次高位被移到最高位，下一轮继续用同一个 `bitMask` 检查。这样循环 32 次，就按从高到低的顺序输出了 32 位。`c % 8 == 0` 在每输出 8 位后插入空格，纯粹为了便于阅读。

为什么形参用 `unsigned`？因为右移、左移和最高位掩码在无符号类型上规则最清楚：无符号左移补 0，不会出现符号位带来的歧义；`1u << 31` 会得到无符号的最高位掩码。若把 `value` 换成 `int`，负数经过 32 次左移后行为会更复杂，不适合作为“逐位显示”的示例。

#### 例6.2 位运算测试

```cpp
#include <iostream>
using namespace std;

void bitDisplay(unsigned value);

int main()
{
    unsigned n1, n2;
    n1 = 214;   n2 = 5;

    cout << n1 << "=\t";        bitDisplay(n1);
    cout << n2 << "=\t";        bitDisplay(n2);
    cout << n1 << '&' << n2 << "=\t";   bitDisplay(n1 & n2);
    cout << n1 << '|' << n2 << "=\t";   bitDisplay(n1 | n2);
    cout << n1 << '^' << n2 << "=\t";   bitDisplay(n1 ^ n2);
    cout << n1 << "<<" << n2 << "=\t";  bitDisplay(n1 << n2);
    cout << n1 << ">>" << n2 << "=\t";  bitDisplay(n1 >> n2);
    cout << '~' << n1 << "=\t";         bitDisplay(~n1);
}

void bitDisplay(unsigned value)
{
    unsigned c;
    unsigned bitMask = 1u << 31;
    cout << value << '=';
    for (c = 1; c <= 32; c++)
    {
        cout << (value & bitMask ? '1' : '0');
        value <<= 1;
        if (c % 8 == 0) cout << ' ';
    }
    cout << endl;
}
```

按代码计算，各结果如下（十进制）：

| 表达式 | 结果 | 说明 |
| --- | --- | --- |
| `214 & 5` | `4` | 只保留两者都为 1 的位 |
| `214 \| 5` | `215` | 把所有为 1 的位合并 |
| `214 ^ 5` | `211` | 只保留不同的位 |
| `214 << 5` | `6848` | 相当于 `214 * 32`，未溢出 |
| `214 >> 5` | `6` | 相当于 `214 / 32` 取整 |
| `~214` | `4294967081` | 按 32 位无符号解释的结果 |

**解析**　`214` 的二进制是 `00000000 00000000 00000000 11010110`，`5` 是 `00000000 00000000 00000000 00000101`。

- `&`：只有最低位和从低往高第 3 位（值为 4）同时为 1，结果为 `4`；
- `|`：把 `11010110` 与 `00000101` 的所有 1 合并，得 `11010111`，即 `215`；
- `^`：两者不同的位留下，得 `11010011`，即 `211`；
- `<< 5`：左移 5 位等于乘以 $2^5=32$，`214 * 32 = 6848`；
- `>> 5`：右移 5 位等于除以 32 取整，`214 / 32 = 6`；
- `~214`：按 32 位取反得到 `11111111 11111111 11111111 00101001`，按无符号解释是 `4294967081`。

这里有一个显示上的小细节：`main` 里已经输出了一次 `n1` 和等号，`bitDisplay` 内部又输出一次 `value` 和等号，所以控制台上每行会出现两个相同的数（例如 `214=	214=...`）。这不是错误，只是示例把“标签”和“数值”都打印了一遍；如果只想要一行干净的结果，把 `main` 里的 `cout << n1 << "=\t"` 去掉即可。

`~n1` 的结果之所以是 `4294967081` 而不是 `-215`，是因为 `n1` 是 `unsigned`，`~n1` 也在无符号域内解释。若对 `int` 型 `214` 取反，结果会是 `-215`。同一个位模式，类型不同，解释就不同。

#### 例6.3 检查一个数的二进制表示中 1 的个数

```cpp
#include <iostream>
using namespace std;

int countOnes(unsigned int number)
{
    int count = 0;
    while (number)
    {
        count += number & 1;
        number >>= 1;
    }
    return count;
}

int main()
{
    unsigned int number;
    cout << "Enter a number: ";
    cin >> number;
    cout << "Number of 1s in binary representation: "
         << countOnes(number) << endl;
}
```

以输入 `214` 为例，输出：

```text
Number of 1s in binary representation: 5
```

**解析**　`number & 1` 只保留最低位：最低位是 1 时结果为 1，是 0 时结果为 0。`count += number & 1` 就等价于“如果最低位是 1，计数器加 1”。

每判断完最低位，`number >>= 1` 把整个数右移一位，原来的次低位变成新的最低位，下一轮继续判断。`while (number)` 在 `number` 变成 0 时结束，所以循环次数等于这个数的有效二进制位数，而不是固定 32 次。

为什么用无符号？因为对负数右移时，标准没有规定高位补什么；如果补符号位，`number` 可能永远不为 0，循环就停不下来。用 `unsigned` 可以保证每次右移都补 0，最终一定收敛到 0。

#### 例6.4 颠倒输入整数的二进制位顺序

```cpp
#include <iostream>
using namespace std;

unsigned int reverseBits(unsigned int n)
{
    unsigned int result = 0;
    for (int i = 0; i < 32; i++)       // 固定处理 32 位
    {
        result <<= 1;                  // 为下一位腾出最低位
        result |= (n & 1);             // 把 n 的最低位放到 result 的最低位
        n >>= 1;                       // n 右移，准备处理下一位
    }
    return result;
}

void bitDisplay(unsigned value)
{
    unsigned c;
    unsigned bitMask = 1u << 31;
    cout << value << '=';
    for (c = 1; c <= 32; c++)
    {
        cout << (value & bitMask ? '1' : '0');
        value <<= 1;
        if (c % 8 == 0) cout << ' ';
    }
    cout << endl;
}

int main()
{
    unsigned int number;
    cout << "Enter an unsigned integer: ";
    cin >> number;
    bitDisplay(number);
    cout << "Reversed binary representation: " << reverseBits(number) << endl;
    bitDisplay(reverseBits(number));
}
```

以输入 `214` 为例：

```text
214=00000000 00000000 00000000 11010110
Reversed binary representation: 1795162112
1795162112=01101011 00000000 00000000 00000000
```

**解析**　要把 32 位顺序完全颠倒，可以固定循环 32 次，每次从 `n` 的**最低位**取一位，放到 `result` 的**最低位**，然后让 `result` 左移、`n` 右移。

顺序很重要：

1. `result <<= 1`：先把已经收集好的位整体左移，空出最低位；
2. `result |= (n & 1)`：把 `n` 当前最低位写入这个空位；
3. `n >>= 1`：丢掉已经取走的位，让下一位来到最低位。

如果先写 `result |= (n & 1)` 再左移，第一位会被移到第 1 位而不是留在最低位，最终结果会整体错位。循环 32 次而不是 `while (n)`，是因为前导 0 也要参与颠倒：`214` 的有效位只有 8 位，但它的前 24 个 0 反过来后会变成结果末尾的 24 个 0，不能省略。

#### 例6.5 验证数据恢复

```cpp
#include <iostream>
using namespace std;

// 加密函数，使用异或运算符
int encrypt(int data, int key)
{
    return data ^ key;
}

// 解密函数，使用异或运算符恢复原始数据
int decrypt(int encryptedData, int key)
{
    return encryptedData ^ key;   // 因为 (a ^ b) ^ b = a
}

int main()
{
    int originalData = 123;    // 原始数据
    int key = 42;              // 异或密钥

    int encryptedData = encrypt(originalData, key);
    cout << "Original Data: " << originalData << endl;
    cout << "Encrypted Data: " << encryptedData << endl;

    int decryptedData = decrypt(encryptedData, key);
    cout << "Decrypted Data: " << decryptedData << endl;
}
```

运行结果：

```text
Original Data: 123
Encrypted Data: 81
Decrypted Data: 123
```

**解析**　`123 ^ 42 = 81`，`81 ^ 42 = 123`。原因是异或满足 `(a ^ b) ^ b = a`：第一次异或把 `key` 的 1 位“翻转”了一次，第二次用同一个 `key` 再翻转同样的位，就回到原值。

这套“加密”只适合用来演示异或的可逆性，不能当作真正的加密算法：密钥只有 42，攻击者拿到密文后很容易试出来；真实加密需要密钥管理、随机性、抗选择明文攻击等设计。

#### 例6.6 整型变量值交换

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 123, b = 456;
    cout << "Before swap: a = " << a << ", b = " << b << endl;

    a = a ^ b;
    b = a ^ b;    // 此时 b 是 a 的原始值
    a = a ^ b;    // 此时 a 是 b 的原始值

    cout << "After swap: a = " << a << ", b = " << b << endl;
}
```

运行结果：

```text
Before swap: a = 123, b = 456
After swap: a = 456, b = 123
```

**解析**　设原始值为 $a_0$、$b_0$。

1. `a = a ^ b` 后，`a` 变成 $a_0 \oplus b_0$；
2. `b = a ^ b` 时，右边的 `a` 已经是 $a_0 \oplus b_0$，所以 `b` 变成 $(a_0 \oplus b_0) \oplus b_0 = a_0$；
3. `a = a ^ b` 时，`a` 还是 $a_0 \oplus b_0$，`b` 已经是 $a_0$，所以 `a` 变成 $(a_0 \oplus b_0) \oplus a_0 = b_0$。

三步之后两个变量互换。这个方法的优点是原地交换、不需要临时变量，也不会像加法交换那样有溢出问题；缺点是可读性差，而且**要求 `a` 和 `b` 是两个不同的对象**。如果写成 `a ^= a;` 或用同一个变量自我交换，它会把自己清零。实际编程中优先用 `std::swap`，异或交换主要用于理解位运算性质。

#### 位运算易错点

- **把 `&` 当成 `&&`、把 `|` 当成 `||`**：`&&`、`||` 是逻辑运算，结果只有 0/1，且带短路；`&`、`|` 是逐位运算，结果是整数。`5 && 2` 为真（1），`5 & 2` 为 0。
- **优先级看反**：`==` 的优先级高于 `&`、`^`、`|`，所以 `a & 1 == 1` 实际是 `a & (1 == 1)`，不是 `(a & 1) == 1`。写位运算判断时一律加括号。
- **`~` 与 `-` 混淆**：`~x` 是逐位取反，不是算术相反数。对有符号补码整数，`~x` 的数值等于 `-x - 1`；对无符号整数，结果是 `UINT_MAX - x`。同一个位模式，类型不同，解释不同。
- **移位位数越界**：`x << 32`（对 32 位类型）是未定义行为，不是“移回原位”。移位前确认 `0 <= shift < 位宽`。
- **有符号数右移**：负数右移的补位规则由实现决定，不要把它当成可移植的除法。
- **`1 << 31`**：`1` 是有符号 `int`，掩码应使用无符号类型。对 32 位 `unsigned`，写作 `1u << 31`。
- **`x & 1` 与 `x % 2`**：对负数，`%` 可能得到 -1，而 `x & 1` 仍然只看最低位；判断奇偶用 `x & 1` 更直接，但要注意类型和语义。
- **异或交换同一对象**：`a ^= b; b ^= a; a ^= b;` 只在 `a`、`b` 是不同对象时成立。

### 6.1.2 使用位运算符实现集合运算

#### 集合的位串表示

把一个无符号整数的每一位看成一个“开关”，就可以表示一个全集为 $\{1,2,\ldots,32\}$ 的整数集合：

- 第 $i-1$ 位为 1，表示元素 $i$ 在集合中；
- 第 $i-1$ 位为 0，表示元素 $i$ 不在集合中；
- 位序从低位到高位，对应元素从 1 到 32。

例如：

| 集合 | 二进制位串（低 8 位） | 十进制 |
| --- | --- | --- |
| $\{1,3,6\}$ | `0010 0101` | `37` |
| $\{1,2,5,7\}$ | `0101 0011` | `83` |
| $\{2,3,5,7,8\}$ | `1101 0110` | `214` |

这里要注意课件表格中的一处不一致：课件把 $\{1,2,5,7\}$ 写成十进制 `101`，但同一行的位串 `01010011` 实际是 `83`。按“第 $i-1$ 位对应元素 $i$”的规则，$\{1,2,5,7\}$ 应是 $1+2+16+64=83$；`101` 对应的是 $\{1,3,6,7\}$。后文按位串规则计算，待核对项里也会列出这一点。

#### 集合运算与位运算的对应

设 `A`、`B` 是全集中的两个集合，`x` 是元素：

| 集合运算 | 位运算写法 | 说明 |
| --- | --- | --- |
| 并集 $A \cup B$ | `A \| B` | 任一集合中有的元素都保留 |
| 交集 $A \cap B$ | `A & B` | 两个集合都有的元素才保留 |
| 差集 $A-B$ | `A & ~B`，或 `A & ~(A & B)` | 属于 A 但不属于 B |
| 包含 $A \subseteq B$ | `(A \| B) == B` | A 的每个元素都在 B 中 |
| 补集 $\sim A$ | `~A` | 全集中不在 A 的元素 |
| 属于 $x \in A$ | `(A & (1u << (x - 1))) != 0` | 第 $x-1$ 位是否为 1 |
| 空集 | `A == 0` | 所有位都为 0 |

差集的两种写法等价：

$$
A \& \sim(A \& B) = A \& (\sim A \mid \sim B) = (A \& \sim A) \mid (A \& \sim B) = A \& \sim B
$$

课件表格里“属于”一栏写成 `A<<(x-1)&A==1<<(x-1)`，这有两处问题：一是 `A` 应为 `1`（或 `1u`），二是 `==` 的优先级高于 `&`，不加括号会被解析成 `(1 << (x-1)) & (A == (1 << (x-1)))`，结果完全不对。实际代码里用 `if (S & bitMask)` 或 `(A & (1u << (x-1))) != 0` 才是安全的。

#### 例6.7 用无符号整数和位运算实现集合的基本运算

头文件 `setH.h` 只放声明：

```cpp
// setH.h
#include <iostream>
using namespace std;

unsigned putX(unsigned& S, unsigned x);   // 元素 x 并入集合 S
void setPut(unsigned& S);                 // 输入集合 S 的元素
void setDisplay(unsigned S);              // 输出集合 S 中的全部元素
unsigned Com(unsigned A, unsigned B);     // 求并集 A ∪ B
unsigned setInt(unsigned A, unsigned B);  // 求交集 A ∩ B
unsigned setDiff(unsigned A, unsigned B); // 求差集 A - B
bool Inc(unsigned A, unsigned B);         // 判蕴含 A ⊆ B
bool In(unsigned S, unsigned x);          // 判属于 x ∈ S
bool Null(unsigned S);                    // 判空集
```

函数实现：

```cpp
// setOperate.cpp
#include "setH.h"

void setPut(unsigned& S)          // 输入集合元素，输入 0 结束
{
    unsigned x;
    cin >> x;
    while (x)
    {
        putX(S, x);
        cin >> x;
    }
}

void setDisplay(unsigned S)       // 输出集合 S 中的全部元素
{
    unsigned c;
    unsigned bitMask = 1;
    if (Null(S))
    {
        cout << "{  }\n";
        return;
    }
    cout << "{ ";
    for (c = 1; c <= 32; c++)
    {
        if (S & bitMask)
            cout << c << ", ";
        bitMask <<= 1;
    }
    cout << "\b\b }\n";           // 擦除最后一个逗号
}

unsigned putX(unsigned& S, unsigned x)   // 元素 x 并入集合 S
{
    unsigned bitMask = 1;
    bitMask <<= x - 1;
    S |= bitMask;
    return S;
}

unsigned Com(unsigned A, unsigned B)     // 求并集 A ∪ B
{
    return A | B;
}

unsigned setInt(unsigned A, unsigned B)  // 求交集 A ∩ B
{
    return A & B;
}

unsigned setDiff(unsigned A, unsigned B) // 求差集 A - B
{
    return A & (~(A & B));
}

bool Inc(unsigned A, unsigned B)         // 判蕴含 A ⊆ B
{
    if ((A | B) == B)
        return true;
    return false;
}

bool In(unsigned S, unsigned x)          // 判属于 x ∈ S
{
    unsigned bitMask = 1;
    bitMask <<= x - 1;
    if (S & bitMask)
        return true;
    return false;
}

bool Null(unsigned S)                    // 判空集
{
    if (S == 0)
        return true;
    return false;
}
```

主程序：

```cpp
// main.cpp
#include "setH.h"

int main()
{
    unsigned A = 0, B = 0;
    unsigned x;

    cout << "Input the elements of set A, 1-32, until input 0 :\n";
    setPut(A);
    cout << "Input the elements of set B, 1-32, until input 0 :\n";
    setPut(B);

    cout << "A = ";  setDisplay(A);
    cout << "B = ";  setDisplay(B);

    cout << "Input x: ";
    cin >> x;
    cout << "Put " << x << " in A = ";
    setDisplay(putX(A, x));

    cout << "A+B = ";  setDisplay(Com(A, B));
    cout << "A*B = ";  setDisplay(setInt(A, B));
    cout << "A-B = ";  setDisplay(setDiff(A, B));

    if (Inc(A, B))
        cout << "A <= B\n";
    else
        cout << "not A <= B\n";

    cout << "Input x: ";
    cin >> x;
    if (In(A, x))
        cout << x << " in A\n";
    else
        cout << x << " not in A\n";
}
```

**解析**　这套代码把“集合”完全映射成了 32 个二进制位。

`putX` 是核心：元素 `x` 对应第 `x-1` 位，所以先让 `bitMask = 1`，再左移 `x-1` 位，得到“只有第 `x-1` 位为 1”的掩码，最后 `S |= bitMask` 把这一位置 1。`S` 用引用 `unsigned&`，函数内的修改会直接写回调用方的集合；返回值只是为了支持 `setDisplay(putX(A, x))` 这种链式写法。

`setDisplay` 从低位到高位扫描：`bitMask` 从 1 开始，每轮左移一位；`S & bitMask` 非零说明当前位对应的元素在集合中，输出元素编号 `c`。循环结束后最后一项后面多了一个逗号和空格，课件用 `"\b\b"` 把光标退回两格，再用 `" }"` 覆盖掉。这个技巧只在支持退格的控制台里好看；更稳妥的写法是用一个 `bool first` 标记，只在输出第一个元素前不加逗号，或者在循环里判断“是否最后一项”。

`Inc` 用 `(A | B) == B` 判断包含：如果 A 的所有位都能被 B 覆盖，二者并起来还是 B。`In` 与 `putX` 用同样的掩码，只是把“置 1”换成了“测试”。`Null` 直接判断整个整数是否为 0。

输入用 0 作为结束标记，因此元素 0 不能作为集合元素；这也正好避开了 `x - 1` 在 `x = 0` 时无符号下溢的问题。全集固定为 1～32，输入超出范围时没有检查，`putX` 会移位越界，这是该示例的局限。

#### 例6.8 用数组和位运算实现集合的基本运算

一个 `unsigned` 只能表示 32 个元素。如果全集是 $\{1,2,\ldots,32N\}$，就用长度为 `N` 的 `unsigned` 数组，每个数组元素负责 32 个元素。

头文件：

```cpp
// setH.h
#include <iostream>
using namespace std;

const unsigned N = 4;                 // 数组长度，全集为 1..128
typedef unsigned setType[N];          // setType 是“长度为 N 的无符号整数数组”

void setPut(setType S);               // 输入集合 S 的元素
void setDisplay(const setType S);     // 输出集合 S 中的全部元素
void putX(setType S, unsigned x);     // 元素 x 并入集合 S
void Com(setType C, const setType A, const setType B);     // C = A ∪ B
void setInt(setType C, const setType A, const setType B);  // C = A ∩ B
void setDiff(setType C, const setType A, const setType B); // C = A - B
bool Inc(const setType A, const setType B);                // 判蕴含
bool In(const setType S, unsigned x);                      // 判属于
bool Null(const setType S);                                // 判空集
```

函数实现：

```cpp
// setOperate.cpp
#include "setH.h"

void setPut(setType S)                 // 输入集合元素，输入 0 结束
{
    unsigned x;
    cin >> x;
    while (x)
    {
        putX(S, x);
        cin >> x;
    }
}

void setDisplay(const setType S)       // 输出集合 S 中的全部元素
{
    unsigned c, i;
    unsigned bitMask;
    if (Null(S))
    {
        cout << "{    }\n";
        return;
    }
    cout << "{ ";
    for (i = 0; i < N; i++)            // 处理每个数组元素
    {
        bitMask = 1;                   // 每个元素都从最低位开始
        for (c = 1; c <= 32; c++)      // 按位处理
        {
            if (S[i] & bitMask)
                cout << i * 32 + c << ", ";
            bitMask <<= 1;
        }
    }
    cout << "\b\b }\n";                // 擦除最后的逗号
}

void putX(setType S, unsigned x)       // 元素 x 并入集合 S
{
    unsigned bitMask = 1;
    bitMask <<= ((x - 1) % 32);
    S[(x - 1) / 32] |= bitMask;
}

void Com(setType C, const setType A, const setType B)   // C = A ∪ B
{
    for (int i = 0; i < N; i++)
        C[i] = A[i] | B[i];
}

void setInt(setType C, const setType A, const setType B) // C = A ∩ B
{
    for (int i = 0; i < N; i++)
        C[i] = A[i] & B[i];
}

void setDiff(setType C, const setType A, const setType B) // C = A - B
{
    for (int i = 0; i < N; i++)
        C[i] = A[i] & (~(A[i] & B[i]));
}

bool Inc(const setType A, const setType B)   // 判蕴含 A ⊆ B
{
    bool t = true;
    for (int i = 0; i < N; i++)
    {
        if ((A[i] | B[i]) != B[i])
            t = false;
    }
    return t;
}

bool In(const setType S, unsigned x)         // 判属于 x ∈ S
{
    unsigned bitMask = 1;
    bitMask <<= ((x - 1) % 32);
    if (S[(x - 1) / 32] & bitMask)
        return true;
    return false;
}

bool Null(const setType S)                   // 判空集
{
    bool t = true;
    for (int i = 0; i < N; i++)
    {
        if (S[i])
            t = false;
    }
    return t;
}
```

主程序：

```cpp
// main.cpp
#include "setH.h"

int main()
{
    setType A = { 0 }, B = { 0 }, C = { 0 };
    unsigned x;

    cout << "Input the elements of set A, 1-" << 32 * N
         << " , until input 0 :\n";
    setPut(A);
    cout << "Input the elements of set B, 1-" << 32 * N
         << " , until input 0 :\n";
    setPut(B);

    cout << "A = ";  setDisplay(A);
    cout << "B = ";  setDisplay(B);

    cout << "Input x: ";
    cin >> x;
    putX(A, x);
    cout << "Put " << x << " in A = ";
    setDisplay(A);

    cout << "C = A+B = ";  Com(C, A, B);      setDisplay(C);
    cout << "C = A*B = ";  setInt(C, A, B);   setDisplay(C);
    cout << "C = A-B = ";  setDiff(C, A, B);  setDisplay(C);

    if (Inc(A, B))
        cout << "A <= B\n";
    else
        cout << "not A <= B\n";

    cout << "Input x: ";
    cin >> x;
    if (In(A, x))
        cout << x << " in A\n";
    else
        cout << x << " not in A\n";
}
```

**解析**　数组版的核心是把“第 `x-1` 位”拆成两个下标：

- 它落在第几个数组元素：`(x - 1) / 32`；
- 它在该元素内的第几位：`(x - 1) % 32`。

`putX` 先算出元素内偏移，把 `bitMask` 左移到对应位，再对 `S[(x - 1) / 32]` 做 `|=`。`In` 用同样的两个下标，只做 `&` 测试。`setDisplay` 反向还原：外层 `i` 是数组下标，内层 `c` 是位号，元素编号就是 `i * 32 + c`。

`setType` 是数组类型，作为函数参数时自动退化为“指向元素类型的指针”，所以 `void f(setType S)` 实际接收的是 `unsigned*`，函数内对 `S[i]` 的修改会作用到调用方的数组。`const setType S` 则退化为“指向 const unsigned 的指针”，表示函数不修改数组内容。这一点和普通数组参数完全一致。

各集合运算都是逐元素做位运算：并集 `A[i] | B[i]`、交集 `A[i] & B[i]`、差集 `A[i] & ~(A[i] & B[i])`。`Inc` 必须检查所有 `N` 个元素，只要有一个元素不满足 `(A[i] | B[i]) == B[i]`，包含关系就不成立；`Null` 也必须检查所有元素，不能只看 `S[0]`。

`A = { 0 }` 只显式初始化第一个元素，其余元素按聚合初始化规则补 0，所以整个数组都是空集。`N = 4` 时全集是 1～128；输入元素超过 128 时，`(x - 1) / 32` 会越界，示例没有做范围检查。

#### 集合运算易错点

- **元素编号与位号差 1**：元素 `i` 对应第 `i-1` 位。写 `1 << i` 会整体错一位；正确是 `1u << (i - 1)`。
- **`x = 0` 不能参与移位**：`x - 1` 在无符号运算中会下溢成很大的数，移位行为未定义。示例用 0 作输入结束标记，必须在 `putX` 之前判断掉。
- **`==` 与 `&` 的优先级**：判断“某位是否为 1”要写 `(A & mask) != 0`，不能写 `A & mask == 1`。
- **差集公式**：`A & ~(A & B)` 与 `A & ~B` 等价；不要写成 `A & ~A & B` 之类的错误组合。
- **补集的范围**：`~A` 是对整个 `unsigned` 取反，包含全集之外的位；如果全集不是 32 位，需要再用全集掩码截断。
- **数组版的下标**：`(x-1)/32` 是数组下标，`(x-1)%32` 是位号，两者不能颠倒；`S[(x-1)%32]` 会访问错误的数组元素。
- **输出末尾逗号**：`\b\b` 依赖控制台退格，不是可移植的格式化方法；换环境可能显示成乱码或无效。

## 6.2 结构

结构把若干个数据成员组合成一个整体。它有三个基本特征：

- 成员数目固定；
- 各成员可以有不同的数据类型；
- 一个结构变量在内存中占有一片连续的存储空间。

结构适合表示“一条记录”，例如一个学生的姓名、学号、年龄、地址、电话。数组要求所有元素同类型，结构则允许把不同类型的东西打包在一起。

### 6.2.1 定义结构

结构类型的定义形式：

```cpp
struct 标识符
{
    类型 成员1;
    类型 成员2;
    ...
    类型 成员n;
};
```

例如：

```cpp
struct student
{
    char name[50];
    int studentNo;
    int age;
    char *address;
    char phone[20];
};
```

`struct student` 整体是一个类型名，可以像 `int`、`double` 一样用来定义变量。C++ 里可以直接写 `student`，不必像 C 那样每次写 `struct student`；如果要在 C 中使用，通常配合 `typedef`。

结构的成员可以是基本类型、数组、指针、其他已定义的结构，甚至指向自身类型的指针；但**不能是自身类型的对象**。例如：

```cpp
struct node
{
    int data;
    node* next;    // 合法：指向自身类型的指针
};

struct bad
{
    int data;
    bad inner;     // 非法：成员不能是自身类型的对象
};
```

原因是结构的大小必须在编译期确定。如果成员是自身对象，大小会无限递归；指针的大小固定，所以可以指向自身。

#### 定义结构的三种变量声明方式

**（1）定义类型的同时声明变量**

```cpp
struct student
{
    char name[50];
    int studentNo;
    int age;
    char *address;
    char phone[20];
} student1, student2, *pStu;
```

**（2）定义类型之后，用类型标识符声明变量**

```cpp
student student1, student2, *pStu;
```

**（3）声明结构变量的同时初始化**

```cpp
student student1 = {"zhangsan", 20240001, 18, "Guangzhou", "13876543210"};
```

初始化列表按成员声明顺序依次赋值。`name` 是字符数组，可以用字符串字面量初始化；`phone` 也是字符数组，同理。`address` 在课件里是 `char*`，用 `"Guangzhou"` 初始化在 C++11 及以后不能通过编译（字符串字面量是 `const char[N]` 数组，退化后的指针带有 `const` 限定）。更稳妥的写法是把成员改成 `const char* address;`，或者改成 `char address[50];`。这一点在“易错点”里再展开。

#### 结构变量的内存布局

结构变量占有一片连续内存，成员按声明顺序依次存放；由于对齐要求，成员之间可能有填充字节，所以“各成员大小之和”不一定等于整个结构的大小。具体偏移和对齐由编译器和平台决定，不要手算后写死。

```cpp
student student1 = {"Wang Li", 231083456, 19, "guangzhou", "87111111"};
student* pStu = &student1;
```

`student1` 是整块结构对象，`pStu` 存放这块对象的起始地址。通过 `pStu` 可以访问整个结构，也可以访问其中的成员。

### 6.2.2 访问结构

结构成员的访问有两种方式：

- 用结构变量名加圆点运算符：`结构变量名.成员`；
- 用指向结构的指针：`(*指针).成员` 或 `指针->成员`。

#### 用变量名访问

```cpp
struct date
{
    int year;
    int month;
    int day;
};

struct student
{
    char name[50];
    int studentNo;
    int age;
    date birth;          // 成员可以是另一个已定义的结构类型
    char *address;
    char phone[20];
};

student student1;
```

各成员的访问形式：

```cpp
student1.name
student1.studentNo
student1.age
student1.birth.year
student1.birth.month
student1.birth.day
student1.address
student1.phone
```

嵌套结构的访问是逐层用圆点：先找到 `student1.birth` 这个 `date` 对象，再取它的 `year`。圆点运算符从左到右结合，`student1.birth.year` 就是 `(student1.birth).year`。

#### 用指针访问

```cpp
student student1, *pStu = &student1;
```

两种等价写法：

```cpp
(*pStu).name
pStu->name
```

`(*pStu).name` 先解引用得到 `student1`，再取成员；`pStu->name` 是 `(*pStu).name` 的简写。`->` 左边必须是指针，右边必须是成员名。

不能写 `*pStu.name`。圆点 `.` 的优先级高于解引用 `*`，它会被解析成 `*(pStu.name)`，而 `pStu` 是指针，根本没有成员 `name`，编译会报错。

#### 例6.9 使用变量和指针访问结构成员

```cpp
#include <iostream>
#include <cstring>          // 课件未列出；MSVC 下 strcpy_s 需要
using namespace std;

struct Student
{
    char name[50];
    int score;
};

int main()
{
    // 使用变量访问结构成员
    Student student1;
    const char* name1 = "Li Lei";
    int score1 = 95;
    strcpy_s(student1.name, name1);   // 复制名字到结构
    student1.score = score1;

    cout << "Using variable:\n";
    cout << "Student1 Name: " << student1.name
         << ", Score: " << student1.score << endl;

    // 使用指针访问结构成员
    Student student2;
    Student* ptr = &student2;
    const char* name2 = "Wang Fang";
    int score2 = 88;
    strcpy_s(ptr->name, name2);       // 通过指针复制名字
    ptr->score = score2;

    cout << "Using pointer:\n";
    cout << "Student2 Name: " << ptr->name
         << ", Score: " << ptr->score << endl;
}
```

运行结果：

```text
Using variable:
Student1 Name: Li Lei, Score: 95
Using pointer:
Student2 Name: Wang Fang, Score: 88
```

**解析**　`student1.name` 是字符数组，不能直接用 `=` 赋值。数组名在赋值表达式里不是可修改的左值，必须逐字符复制，或者用 `strcpy`/`strcpy_s` 这类函数。`strcpy_s(student1.name, name1)` 把 `name1` 指向的字符串复制到 `student1.name`，并依赖编译器推断目标数组大小；标准 C11 的 `strcpy_s` 需要三个参数（目标、目标容量、源），两参数形式是 MSVC 的模板重载，换编译器可能不可用。

`ptr->name` 与 `(*ptr).name` 完全等价。`ptr` 指向 `student2`，所以 `ptr->score = score2` 改的是 `student2.score`，不是 `ptr` 本身。输出时 `ptr->name` 是数组名，传给 `cout` 会退化为首字符地址，按字符串输出。

#### 例6.10 结构整体赋值

```cpp
#include <iostream>
using namespace std;

struct weather
{
    double temp;
    double wind;
} yesterday;

int main()
{
    weather today;
    yesterday.temp = 23.5;
    yesterday.wind = 3.1;
    today = yesterday;       // 结构变量整体赋值
    cout << "Temp = " << today.temp << endl;
    cout << "Wind = " << today.wind << endl;
}
```

运行结果：

```text
Temp = 23.5
Wind = 3.1
```

**解析**　同类型的结构变量可以整体赋值，编译器会按成员逐个复制，等价于：

```cpp
today.temp = yesterday.temp;
today.wind = yesterday.wind;
```

“同类型”指用同一个类型标识符说明的变量。下面两个结构即使成员完全一样，也不是同一类型，不能整体赋值：

```cpp
struct weather1 { double temp; double wind; } yesterday;
struct weather2 { double temp; double wind; } today;
// today = yesterday;   // 错误：weather1 与 weather2 是不同类型
```

结构整体赋值是“浅复制”：如果成员里有指针，复制的是指针值，两个结构会指向同一块动态内存，而不是各自拥有一份。需要深复制时，必须自己分配新内存并复制内容。

另外，结构变量不能直接用 `==` 比较，C++ 没有为结构自动生成逐成员比较；要比较就自己写函数，逐成员比较。

### 6.2.3 结构数组

数组的元素类型是结构类型时，称为结构数组。定义和访问遵循数组与结构两套规则：

```cpp
struct S_type
{
    int a;
    double x;
};

S_type S_ary[10];
```

`S_ary` 是一个有 10 个元素的数组，每个元素都是一个 `S_type` 结构，包含 `a` 和 `x` 两个成员：

```cpp
S_ary[0].a    S_ary[0].x
S_ary[1].a    S_ary[1].x
...
S_ary[9].a    S_ary[9].x
```

结构数组在内存中也是连续的：先完整存放 `S_ary[0]`，再存放 `S_ary[1]`，依此类推；每个元素内部再按成员顺序存放。因此 `S_ary[i]` 是一个结构对象，`S_ary[i].a` 才是它的成员。

#### 结构数组的初始化

可以在声明时初始化：

```cpp
struct Point
{
    int x;
    int y;
};

Point points[] = {
    {0, 0},
    {1, 1},
    {2, 2},
    {3, 3},
    {4, 4}
};
```

也可以在声明后逐个成员赋值：

```cpp
Point points[5];
points[0].x = 0;
points[0].y = 0;
// 初始化其他元素...
```

声明时初始化用嵌套花括号：外层是数组，内层是每个结构的成员列表。省略数组长度时，编译器按初始化列表的元素个数推导。

#### 例6.11 使用结构数组存储和操作点的坐标

```cpp
#include <iostream>
using namespace std;

struct Point
{
    int x;
    int y;
};

int main()
{
    Point points[5] = {
        {0, 0},
        {1, 1},
        {2, 2},
        {3, 3},
        {4, 4}
    };

    // 遍历数组并打印每个点的坐标
    for (int i = 0; i < 5; ++i)
    {
        cout << "Point " << i << ": ("
             << points[i].x << ", " << points[i].y << ")\n";
    }

    // 更新数组中的一个点
    points[2].x = 100;
    points[2].y = 100;

    cout << "After update:\n";
    for (int i = 0; i < 5; ++i)
    {
        cout << "Point " << i << ": ("
             << points[i].x << ", " << points[i].y << ")\n";
    }
}
```

运行结果：

```text
Point 0: (0, 0)
Point 1: (1, 1)
Point 2: (2, 2)
Point 3: (3, 3)
Point 4: (4, 4)
After update:
Point 0: (0, 0)
Point 1: (1, 1)
Point 2: (100, 100)
Point 3: (3, 3)
Point 4: (4, 4)
```

**解析**　`points[i]` 是第 `i` 个结构对象，`points[i].x`、`points[i].y` 是它的成员。修改 `points[2].x = 100;` 只改第 3 个元素的 `x`，其他元素不受影响。

这里用 `Point points[5]` 并显式给出 5 个初值，数组长度和初始化列表一致。若写成 `Point points[] = {...}`，长度由列表推导；若只写 `Point points[5];` 而不初始化，成员是未初始化的内置类型，读取前必须赋值。

### 6.2.4 结构与函数

课件把这一小节也标成了“6.2.3 结构与函数”，与“6.2.3 结构数组”同号；按内容顺序，这里应为 6.2.4，待核对项里会列出。

结构可以像基本类型一样作为函数参数和返回值：

- **值传递**：把整个结构复制给形参，函数内修改的是副本，不影响实参；结构越大，复制开销越大。
- **引用传递**：形参是实参的别名，函数内修改会写回实参；加 `const` 可以防止误改，同时避免复制。
- **指针传递**：形参是指向结构的指针，通过 `->` 访问成员；调用时传地址，函数内可以修改原对象，但要注意空指针。
- **返回结构**：函数可以返回一个结构对象，把多个相关结果打包成一个值；返回的是副本（可能被编译器优化），语义比“多个输出参数”更清楚。

#### 例6.12 直角坐标到极坐标的转换

```cpp
#include <iostream>
#include <cmath>          // sqrt、atan2
using namespace std;

const double PI = 3.14;

// 极坐标结构体
struct PolarCoord
{
    double r;          // 极径
    double theta;      // 极角，弧度
};

// 直角坐标到极坐标的转换函数
PolarCoord cartesianToPolar(double x, double y)
{
    PolarCoord polar;
    polar.r = sqrt(x * x + y * y);   // 极径
    polar.theta = atan2(y, x);       // 极角，atan2 返回弧度
    return polar;
}

// 展示极坐标
void displayPolarCoord(const PolarCoord& polar)
{
    double thetaDegrees = polar.theta * 180.0 / PI;   // 弧度转角度
    cout << "Polar coordinates: (r = " << polar.r
         << ", theta = " << thetaDegrees << " degrees)" << endl;
}

int main()
{
    double x, y;
    cout << "Enter the Cartesian coordinates (x and y): ";
    cin >> x >> y;

    PolarCoord polar = cartesianToPolar(x, y);
    displayPolarCoord(polar);
}
```

以输入 `3 4` 为例，输出约为：

```text
Polar coordinates: (r = 5, theta = 53.1301 degrees)
```

**解析**　`cartesianToPolar` 在函数内定义一个局部 `PolarCoord polar`，算好 `r`、`theta` 后 `return polar`。返回的是结构值，调用方拿到的是复制出来的对象；局部对象在函数结束时销毁，但复制已经完成，所以安全。若函数返回 `PolarCoord&` 或 `PolarCoord*` 指向这个局部对象，函数结束后就是悬空引用/野指针。

`atan2(y, x)` 与 `atan(y / x)` 的区别在于：`atan2` 同时看 `x`、`y` 的符号，能返回正确的象限角，范围是 $(-π, π]$；`atan` 只看比值，无法区分第二、三象限，而且 `x = 0` 时会除零。求极角应优先用 `atan2`。

`displayPolarCoord` 的参数是 `const PolarCoord&`：加引用避免复制整个结构，加 `const` 表示函数不修改它。若写成 `PolarCoord polar` 值传递，每次调用都会复制一份；若写成 `PolarCoord&` 但不加 `const`，函数内部可能误改实参，调用方也无法从签名看出这一点。

`PI = 3.14` 是课件的近似值，算出来的角度会有微小误差；要更精确可以用 `acos(-1.0)`，C++20 也可以用 `std::numbers::pi`。

#### 例6.13 使用结构指针实现直角坐标到极坐标的转换

```cpp
#include <iostream>
#include <cmath>
using namespace std;

const double PI = 3.14;

struct PolarCoord
{
    double r;
    double theta;
};

// 通过指针把结果写回调用方的结构
void cartesianToPolar(double x, double y, PolarCoord* polar)
{
    polar->r = sqrt(x * x + y * y);
    polar->theta = atan2(y, x);
}

// 展示极坐标，参数为结构指针
void displayPolarCoord(PolarCoord* polar)
{
    double thetaDegrees = polar->theta * 180.0 / PI;
    cout << "Polar coordinates: (r = " << polar->r
         << ", theta = " << thetaDegrees << " degrees)" << endl;
}

int main()
{
    double x, y;
    cout << "Enter the Cartesian coordinates (x and y): ";
    cin >> x >> y;

    PolarCoord polar;                  // 由调用方分配结构对象
    cartesianToPolar(x, y, &polar);    // 传入地址
    displayPolarCoord(&polar);
}
```

**解析**　与例6.12 相比，这里不再返回结构，而是让调用方先准备一个 `PolarCoord polar`，把它的地址传给函数。函数内通过 `polar->r`、`polar->theta` 直接写回这个对象。

这种“输出参数”写法适合以下情况：

- 需要返回多个结果，或结果结构较大，想避免返回时的复制；
- 调用方已经有一个结构对象，想让函数填充它；
- 函数还需要返回一个状态码（例如成功/失败），结构结果通过指针带出。

代价是调用方必须保证指针有效。`cartesianToPolar(x, y, nullptr)` 会在函数内解引用空指针；更安全的替代是引用参数 `PolarCoord& polar`，引用必须绑定到有效对象，不需要检查空指针。若坚持用指针，函数开头应判断 `if (polar == nullptr) return;`。

`displayPolarCoord(PolarCoord* polar)` 只是读取，不修改；更推荐的写法是 `const PolarCoord* polar` 或 `const PolarCoord& polar`，让签名表达“只读”。

#### 结构与函数易错点

- **值传递改不了实参**：`void f(Student s) { s.score = 100; }` 只改副本；要改实参用 `Student&` 或 `Student*`。
- **返回局部结构的引用/指针**：`PolarCoord& f() { PolarCoord p; return p; }` 返回悬空引用；返回结构值 `PolarCoord f()` 才是安全的。
- **`->` 与 `.` 混用**：`p.x` 中 `p` 必须是非指针对象；`p->x` 中 `p` 必须是指针。`(*p).x` 与 `p->x` 等价。
- **`const` 的位置**：`const PolarCoord&` 是“指向 const 对象的引用”，保护实参；`PolarCoord& const` 没有意义（引用本身不能改绑）。
- **大结构复制**：值传递会复制整个结构，结构很大时优先 `const&`；但函数需要独立副本并修改时，值传递反而更合适。
- **结构不能直接比较**：没有自动的 `==`/`!=`，要逐成员比较。
- **字符数组成员不能整体赋值**：`s.name = "abc"` 非法，必须 `strcpy` 或 `std::string`。

## 6.3 链表

### 6.3.1 动态链表存储

程序表示数据，不仅要存放基本信息，还要表示数据元素之间的关系。线性表是最简单的数据组织形式：元素排成一列，除第一个外每个元素有唯一前驱，除最后一个外每个元素有唯一后继。

数组用连续内存存放元素，适合随机访问，但插入、删除要移动大量元素，而且长度在定义时固定。链表用“结点 + 指针”表示关系：每个结点存放数据，并存放指向下一个结点的指针；结点可以在程序运行时动态创建和撤销，不必连续存放。

单向链表的结点类型：

```cpp
struct node
{
    char name[20];
    double salary;
    node* next;
};
```

更一般的写法：

```cpp
struct node
{
    dataType data;    // 数据成员，类型可以是任意 C++ 类型
    node* next;       // 指向下一个同类型结点
};
```

`next` 是指向自身结构类型的指针，这叫“自引用”。`data` 可以是任意类型，但不能是 `node` 自身对象；原因和结构定义一样：对象成员会让结构大小无限递归，指针大小固定。

链表结构示意：

```text
head → [数据 | next] → [数据 | next] → [数据 | next] → nullptr
```

`head` 是头指针，存放第一个结点的地址；最后一个结点的 `next` 为 `nullptr`，表示链表结束。各结点的内存地址不一定相邻，靠 `next` 串起来。

### 6.3.2 建立和遍历链表

建立链表的一般过程：

```text
生成头结点；
while（未结束）
{
    生成新结点；
    把新结点插入链表；
}
```

#### 例6.14 建立和遍历单向链表

```cpp
#include <iostream>
using namespace std;

// 链表结点结构体
struct node
{
    int data;
    node* next;
};

node* head = nullptr;      // 全局头指针

node* CreateList()
{
    node* s = nullptr;
    node* p = nullptr;     // p 始终指向当前链表尾结点
    int data;

    cout << "Enter the elements of the list (enter 0 to stop): ";
    while (cin >> data && data != 0)
    {
        s = new node;
        s->data = data;
        s->next = nullptr;

        if (head == nullptr)       // 第一个结点
        {
            head = s;
            p = s;
        }
        else                       // 后续结点接到表尾
        {
            p->next = s;
            p = s;
        }
    }
    if (p != nullptr)
        p->next = nullptr;         // 尾结点的 next 置空

    return head;
}

void PrintList(node* ptr)
{
    while (ptr != nullptr)
    {
        cout << ptr->data << " ";
        ptr = ptr->next;
    }
    cout << endl;
}

int main()
{
    head = CreateList();
    cout << "The created list is: ";
    PrintList(head);
}
```

以输入 `3 5 7 0` 为例，输出：

```text
The created list is: 3 5 7
```

**解析**　`CreateList` 用两个指针：`s` 指向刚创建的新结点，`p` 指向当前链表的最后一个结点。

每读入一个非零数据：

1. `new node` 分配一个新结点；
2. 写入 `data`，并把 `next` 先置为 `nullptr`；
3. 如果链表还是空的（`head == nullptr`），新结点既是头也是尾，`head = s; p = s;`；
4. 否则把新结点接到当前尾结点后面：`p->next = s;`，然后 `p = s;` 让 `p` 继续指向新的尾。

第 3 步的“空表特判”不能省。如果不判断，直接写 `p->next = s`，第一次循环时 `p` 还是 `nullptr`，会解引用空指针。

`p->next = s; p = s;` 的顺序也不能反。若先 `p = s`，再 `p->next = s`，等于让新结点指向自己，形成自环，原来的链表就丢了。

`if (p != nullptr) p->next = nullptr;` 在正常流程里是多余的：每个新结点的 `next` 已经在创建时置空，`p` 最终指向最后一个结点，它的 `next` 本来就是 `nullptr`。保留它是为了防御“循环没有执行”或以后改动代码的情况；如果输入直接是 0，`p` 仍为 `nullptr`，这个判断也不会解引用空指针。

`PrintList` 用 `ptr` 遍历，每轮输出 `ptr->data` 后执行 `ptr = ptr->next`。这里必须用 `ptr = ptr->next`，不能写 `ptr++`：链表结点不连续，`ptr++` 只是按 `sizeof(node)` 移动地址，不会到达下一个结点。

这个示例把 `head` 定义成全局变量，`CreateList` 直接改全局 `head`。好处是函数不用返回头指针；坏处是全局状态难以复用，第二次调用 `CreateList` 时 `head` 还指着旧链表，而函数内 `p` 从 `nullptr` 开始，会走到 `p->next = s` 并解引用空指针。实际使用时应把 `head` 放在 `main` 里，通过参数传入或返回，避免全局变量。

### 6.3.3 插入结点

#### 在表头插入

```cpp
s->next = head;
head = s;
```

新结点的 `next` 先指向原头结点，再让 `head` 指向新结点。顺序不能反：如果先 `head = s`，再 `s->next = head`，此时 `head` 已经等于 `s`，结果是 `s->next = s`，形成自环，原链表丢失。

#### 在 `*p` 之后插入 `*s`

```cpp
s->next = p->next;
p->next = s;
```

先让新结点接管 `p` 原来的后继，再让 `p` 指向新结点。顺序同样不能反：如果先 `p->next = s`，再 `s->next = p->next`，此时 `p->next` 已经是 `s`，结果是 `s->next = s`，自环，`p` 原来的后继丢失。

这两条语句是链表插入的核心。可以记成“先接后断”：新结点先接上后面的链，再让前驱指向新结点。

#### 在 `*p` 之前插入 `*s`

单向链表只能沿 `next` 前进，不能从 `p` 直接找到它的前驱。方法有两种。

**方法一：先找到 `p` 的前驱 `q`**

```cpp
s->next = p;
q->next = s;
```

`q` 是 `p` 的前驱。若 `p` 是头结点，`q` 不存在，应改成 `s->next = head; head = s;`。

**方法二：先插到 `p` 之后，再交换数据**

```cpp
s->next = p->next;
p->next = s;

t = p->data;
p->data = s->data;
s->data = t;
```

这样物理上新结点在 `p` 后面，但 `p` 和 `s` 的数据交换后，逻辑上“新值”出现在 `p` 的位置，`p` 原来的值被推到后面，看起来就像在 `p` 之前插入。

方法二不需要找前驱，但有几个限制：

- 数据成员必须可交换/可赋值；如果成员是 `const`、数组或某些不可赋值类型，交换会失败；
- 结点的“身份”变了：原来指向 `p` 的外部指针，现在看到的是新值；如果有其他指针指向 `p`，语义会变；
- 对于“按值查找”的链表，方法二会改变结点里存的值，可能影响其他索引结构。

所以方法二适合“数据可交换、结点身份不重要”的场合；需要保持结点身份时，老老实实找前驱。

#### 例6.15 用插入法生成一个有序链表

```cpp
#include <iostream>
using namespace std;

struct list
{
    int data;
    list* next;
};

// 头指针用引用传递，函数内可以直接修改调用方的 head
void insert(list*& head, int num)
{
    list* s = new list;
    s->data = num;
    s->next = nullptr;

    // 空表，或新值比当前最小值还小/相等：插到表头
    if (head == nullptr || head->data >= s->data)
    {
        s->next = head;
        head = s;
        return;
    }

    // 找第一个大于等于 num 的结点 curr，prev 是它的前驱
    list* prev = nullptr;
    list* curr = head;
    while (curr != nullptr && curr->data < s->data)
    {
        prev = curr;
        curr = curr->next;
    }

    // 把 s 插到 curr 之前
    s->next = curr;
    if (prev == nullptr)
        head = s;          // 防御性分支；正常流程已在上面 return
    else
        prev->next = s;
}

void showlist(list* head)
{
    cout << "Now the items of list are:\n";
    list* current = head;
    while (current != nullptr)
    {
        cout << current->data << '\t';
        current = current->next;
    }
    cout << endl;
}

int main()
{
    int k;
    list* head = nullptr;      // 局部头指针
    cin >> k;
    while (k != 0)
    {
        insert(head, k);       // 传头指针的引用
        cin >> k;
    }
    showlist(head);
}
```

以输入 `5 3 9 1 7 0` 为例，输出：

```text
Now the items of list are:
1    3    5    7    9
```

**解析**　`insert` 的目标是让链表始终保持升序。它分三种情况：

1. **空表**：`head == nullptr`，新结点就是第一个结点；
2. **新值最小（或与当前最小值相等）**：`head->data >= s->data`，插到表头，`s->next = head; head = s;`；
3. **其他**：从 `head` 开始找第一个 `data >= num` 的结点 `curr`，`prev` 记录 `curr` 的前驱。找到后 `s->next = curr; prev->next = s;`，把 `s` 插到 `curr` 前面；如果 `curr` 一直走到 `nullptr`，说明 `num` 比所有结点都大，`s` 插到表尾。

为什么 `head` 要用 `list*&`？因为插入表头时函数要执行 `head = s`，改变调用方的头指针。如果写成 `void insert(list* head, int num)`，`head` 只是指针值的副本，函数内 `head = s` 只改副本，调用方的 `head` 仍然指向旧表头（或仍是 `nullptr`）。当第一个结点插入空表时，调用方永远看不到这个结点，整条链表就“丢了”，同时 `new` 出来的内存也无法释放。这是链表函数最常见的错误。

`prev == nullptr` 这个分支在正常流程里其实到不了：如果 `head != nullptr` 且 `head->data < s->data`，循环至少执行一次，第一次就把 `prev = head`，所以循环结束后 `prev` 一定非空。保留它是防御性写法；也可以直接写 `prev->next = s;`，但前提是确认上面的表头分支已经覆盖了所有 `prev` 为空的情况。

比较用 `>=` 还是 `>` 会影响相等元素的顺序：用 `>=` 时，新来的相等元素插到已有序元素前面，相等元素的相对顺序会反转；用 `>` 则插到后面，保持稳定。若题目要求“稳定”，应改为 `head->data > s->data`，循环条件改为 `curr->data <= s->data`。

`showlist` 的参数 `list* head` 是值传递，函数内只遍历、不修改头指针，所以不需要引用。它用 `current` 而不是直接改 `head`，是为了保留调用方传进来的头指针值。

**关于 `current++`**：不能写 `current++`。`current` 是 `list*`，`++` 让指针加上 `sizeof(list)` 个字节，指向内存中“下一个结构大小的位置”，而不是下一个结点。链表结点是 `new` 出来的，地址不一定连续，`current++` 会指向无效内存。必须写 `current = current->next`。

### 6.3.4 删除结点

#### 删除头结点

```cpp
if (head != nullptr)
{
    node* p = head;
    head = head->next;
    delete p;
}
```

先保存原头结点，再让 `head` 后移，最后释放原头结点。顺序不能反：如果先 `delete head`，再读 `head->next`，就是访问已释放内存。

#### 删除结点 `*p`

已知 `p` 的前驱 `q`：

```cpp
q->next = p->next;
delete p;
```

先让前驱绕过 `p`，再释放 `p`。如果 `p` 是头结点，没有前驱，应改为 `head = p->next; delete p;`。

#### 只给 `p`，不给前驱

单向链表没有指向前驱的指针，只给 `p` 时，常规做法是“把后继的数据抄过来，再删后继”：

```cpp
if (p->next != nullptr)
{
    node* temp = p->next;
    p->data = temp->data;
    p->next = temp->next;
    delete temp;
}
```

这样逻辑上删除了 `p` 位置的值：`p` 保留原来的地址，但装的是后继的值，后继被释放。

限制：

- 不能删除最后一个结点，因为 `p->next == nullptr`，没有后继可抄；
- 如果有其他指针指向 `temp`，删除后它们会悬空；
- `data` 必须可赋值；如果成员是 `const` 或数组，抄不过去。

所以这只是“值删除”的应急办法，不是真正的“删除任意结点”。

#### 释放整条链表

```cpp
node* temp;
while (head != nullptr)
{
    temp = head;
    head = head->next;
    delete temp;
}
```

必须在 `delete` 之前保存 `head->next`，否则释放后无法再前进。循环结束时 `head` 为 `nullptr`，链表全部释放。

#### 例6.16 删除单向链表中的重复元素

```cpp
#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node* next;
};

Node* createList()
{
    Node* head = nullptr;
    Node* tail = nullptr;
    Node* newNode;
    int data;

    cout << "Enter the elements of the list (enter 0 to stop): ";
    while (cin >> data && data != 0)
    {
        newNode = new Node;
        newNode->data = data;
        newNode->next = nullptr;

        if (head == nullptr)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            tail->next = newNode;
            tail = newNode;
        }
    }
    return head;
}

Node* removeDuplicates(Node* head)
{
    if (head == nullptr || head->next == nullptr)
        return head;

    Node* current = head;
    while (current != nullptr)
    {
        Node* runner = current;
        while (runner->next != nullptr)
        {
            if (current->data == runner->next->data)
            {
                Node* temp = runner->next;
                runner->next = temp->next;
                delete temp;
            }
            else
            {
                runner = runner->next;
            }
        }
        current = current->next;
    }
    return head;
}

void printList(Node* head)
{
    Node* current = head;
    while (current != nullptr)
    {
        cout << current->data << " ";
        current = current->next;
    }
    cout << endl;
}

int main()
{
    Node* head = createList();
    cout << "The original list is: ";
    printList(head);

    head = removeDuplicates(head);
    cout << "The list after removing duplicates is: ";
    printList(head);

    // 释放链表内存
    Node* temp;
    while (head != nullptr)
    {
        temp = head;
        head = head->next;
        delete temp;
    }
}
```

以输入 `1 2 2 3 3 3 0` 为例，输出：

```text
The original list is: 1 2 2 3 3 3
The list after removing duplicates is: 1 2 3
```

**解析**　`removeDuplicates` 用两层循环：

- 外层 `current` 依次指向每个结点，作为“保留的基准值”；
- 内层 `runner` 从 `current` 开始，检查 `runner->next` 是否与 `current->data` 相同。

如果相同，就删除 `runner->next`：

```cpp
Node* temp = runner->next;
runner->next = temp->next;
delete temp;
```

删除后**不要**执行 `runner = runner->next`。因为 `runner->next` 已经被改成 `temp->next`，下一轮循环会自然检查这个新的后继；如果此时再前进，就会跳过紧跟在后面的重复元素。只有“不相等”时才让 `runner = runner->next`。

外层每处理完一个 `current`，执行 `current = current->next`。由于 `current` 之后的重复结点已经被清理，`current` 只需要继续往后走。这个算法的时间复杂度是 $O(n^2)$，空间复杂度是 $O(1)$。

`if (head == nullptr || head->next == nullptr) return head;` 处理空表和只有一个结点的情况：没有重复可删，直接返回。主程序在删除完成后再次遍历释放链表；`removeDuplicates` 已经释放了被删除的结点，最后这个循环释放剩余结点，不会重复释放。

#### 链表易错点

- **丢失头指针**：插入/删除表头时，函数必须能修改调用方的 `head`，用 `list*&` 或返回新的头指针；只传 `list*` 会只改副本。
- **插入顺序反了**：`s->next = p->next; p->next = s;` 必须先接后断；反过来会自环并丢失后续链。
- **删除后继续用 `p`**：`delete p` 后 `p` 是悬空指针，不能再读 `p->data` 或 `p->next`；需要先保存后继。
- **释放链表不保存后继**：`delete head` 前必须先 `temp = head; head = head->next;`。
- **`current++`**：链表结点不连续，`++` 不会到下一个结点；必须 `current = current->next`。
- **空表/单结点未处理**：删除头结点、删除重复元素、遍历、释放都要先判断 `head == nullptr`。
- **重复 `new` 不 `delete`**：每个 `new` 都要有对应的 `delete`；删除结点时别忘了释放，程序结束前释放整条链。
- **头结点与头指针混淆**：`head` 是指针变量，不是结点；`head->next` 才是第二个结点。若使用“带头结点”的链表，空表时 `head` 仍指向一个哑结点，判断条件会不同。

## 6.4 应用举例

### 6.4.1 例6.17 学生成绩表按关键字排序

问题：用一个结构数组存储若干学生的姓名、学号、成绩，按成绩关键字排序。

分析：定义 `Student` 结构数组 `allone`，用 `inputStudents` 输入、`outputStudents` 输出、`sortStudentsByScore` 按 `score` 排序。

```cpp
#include <iostream>
#include <iomanip>          // setw、setprecision
using namespace std;

struct Student
{
    char name[20];          // 姓名
    unsigned int id;        // 学号
    double score;           // 成绩
};

const int SIZE = 6;
Student allone[SIZE];

void sortStudentsByScore(Student students[], int size);

void inputStudents(Student students[], int size)
{
    for (int i = 0; i < size; i++)
    {
        cout << i << ": Name: ";
        cin.ignore();                       // 忽略上一次输入留下的换行符
        cin.getline(students[i].name, 10);   // 读取姓名
        cout << "ID: ";
        cin >> students[i].id;
        cout << "Score: ";
        cin >> students[i].score;
        cout << endl;
    }
}

void outputStudents(const Student students[], int size)
{
    cout << "Sorted by score:\n";
    for (int i = 0; i < size; i++)
        cout << left << setw(10) << students[i].name
             << right << setw(5) << students[i].id
             << setw(10) << fixed << setprecision(2) << students[i].score
             << endl;
}

int main()
{
    inputStudents(allone, SIZE);
    cout << "Sort by score:\n";
    sortStudentsByScore(allone, SIZE);
    outputStudents(allone, SIZE);
}

void sortStudentsByScore(Student students[], int size)
{
    for (int i = 1; i < size; i++)
    {
        for (int j = 0; j < size - i; j++)
        {
            if (students[j].score > students[j + 1].score)
            {
                Student temp = students[j];      // 结构变量整体交换
                students[j] = students[j + 1];
                students[j + 1] = temp;
            }
        }
    }
}
```

课件没有给出可直接提取的运行结果；输出格式是“姓名左对齐 10 列、学号右对齐 5 列、成绩右对齐 10 列并保留两位小数”，并按成绩从低到高排列。

**解析**　排序本身是冒泡排序：外层 `i` 控制趟数，内层 `j` 从 0 到 `size - i - 1`，比较相邻两个学生的 `score`。如果前一个成绩大于后一个，就交换整个 `Student` 结构。

这里交换的是整个结构，不是只交换 `score`。因为排序的关键字是成绩，但输出要保留姓名和学号，所以三个成员必须一起移动；只交换 `score` 会让姓名、学号与成绩错位。

`Student temp = students[j];` 调用结构的复制，把三个成员整体复制到 `temp`；随后两次赋值也是逐成员复制。对小结构没问题，但结构很大时复制成本高，后面的例6.18 会用索引数组避免整体交换。

`inputStudents` 里 `cin.ignore()` 是一个容易出错的点。`cin >>` 读到数字后会把换行符留在输入缓冲区，下一次 `getline` 会先读到这个换行符，结果姓名是空串。`cin.ignore()` 默认丢弃一个字符，正好吃掉换行符。但这段代码把 `cin.ignore()` 放在每次 `getline` 之前，**第一次循环时并没有“上一次输入留下的换行符”**：程序刚启动，缓冲区是空的，`ignore()` 会等待用户输入并丢掉用户输入的第一个字符。如果第一个姓名是 `Li Lei`，实际读进 `name` 的会是 `i Lei`。这是课件的缺陷。

更稳妥的写法是：只在“刚读完数字”之后清一次换行符，例如把 `cin.ignore()` 放到循环末尾，或者用：

```cpp
cin >> students[i].id;
cin >> students[i].score;
cin.ignore(numeric_limits<streamsize>::max(), '\n');   // 清到行尾，需包含 <limits>
```

并在循环第一轮之前不要调用 `ignore()`。如果姓名不允许有空格，也可以直接用 `cin >> students[i].name`，就不需要处理换行符；但这样只能读一个单词。

`cin.getline(students[i].name, 10)` 的第二个参数是“最多读取的字符数（含结尾 `'\0'`）”，所以最多读 9 个字符。`name` 数组有 20 个字符，容量够，不会越界，但超过 9 个字符的姓名会被截断；更严重的是，如果一行姓名超过 9 个字符且没有在 9 个字符内遇到换行，`getline` 会置 `failbit`，后面的 `cin >> id` 会直接失败。若想读满 20 个字符，应写 `cin.getline(students[i].name, 20)`；若姓名长度不固定，用 `std::string` 和 `getline(cin, name)` 更省心。

`outputStudents` 的参数是 `const Student students[]`，表示函数只读数组，不修改学生数据。`left`、`right` 控制对齐，`setw(10)` 设置下一个输出的宽度，`fixed` 和 `setprecision(2)` 让成绩固定两位小数。`setw` 只对紧接着的一个输出有效，所以每个字段都要单独写。

### 6.4.2 例6.18 用辅助数组对结构数组的数据进行关键字排序

问题：结构变量的整体交换降低了排序效率。

解决：使用索引机制，建立结构指针数组。排序时只交换指针，不移动结构本身；输出时通过指针访问原数据。

方法：

1. 建立索引数组，每个元素指向结构数组的一个元素；
2. 以关键字比较，交换索引；
3. 通过索引访问数据。

#### 指针索引版

```cpp
#include <iostream>
using namespace std;

struct Student
{
    char name[10];
    unsigned int id;
    double score;
};

void Input(Student all[], const int n);
void Sort(Student* pi[], const int n);
void Output(Student* pi[], const int n);

int main()
{
    Student allone[100];        // 结构数组
    Student* index[100];        // 索引数组：元素是结构指针
    int total;

    for (int i = 0; i < 100; i++)
        index[i] = allone + i;  // 初始指向对应结构元素

    cout << "输入学生人数：";
    cin >> total;
    cout << "输入学生信息：\n";
    Input(allone, total);

    cout << "以成绩作为关键字排序\n";
    Sort(index, total);

    cout << "输出排序后信息：\n";
    Output(index, total);
}

void Input(Student all[], const int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << i << "姓名：";
        cin >> all[i].name;
        cout << "学号：";
        cin >> all[i].id;
        cout << "成绩：";
        cin >> all[i].score;
    }
}

void Sort(Student* pi[], const int n)
{
    int i, j;
    Student* temp;
    for (i = 1; i < n; i++)
    {
        for (j = 0; j < n - i; j++)     // 课件写 n-1-i，会少比较一次
        {
            if (pi[j]->score > pi[j + 1]->score)
            {
                temp = pi[j];           // 只交换指针
                pi[j] = pi[j + 1];
                pi[j + 1] = temp;
            }
        }
    }
}

void Output(Student* pi[], const int n)
{
    for (int i = 0; i < n; i++)
        cout << pi[i]->name << '\t'
             << pi[i]->id << '\t'
             << pi[i]->score << endl;
}
```

**解析**　`allone` 是真正存放学生数据的结构数组，`index` 是“结构指针数组”。初始化时 `index[i] = allone + i`，让第 `i` 个索引指向第 `i` 个学生。

排序比较的是 `pi[j]->score` 和 `pi[j+1]->score`：通过指针读到原结构里的成绩。发生逆序时，交换的是 `pi[j]` 和 `pi[j+1]` 两个指针，学生结构本身一动不动。这样交换成本从“复制整个结构”降为“复制一个指针”，结构越大越划算。

排序结束后，`index[0]` 指向成绩最低的学生，`index[1]` 指向第二低……但 `allone` 的物理顺序没变。输出必须通过 `pi[i]->name`、`pi[i]->id`、`pi[i]->score` 访问，不能再用 `allone[i]`，否则输出的还是未排序的原数组。

`Sort` 的内层循环边界要注意：课件写的是 `j < n - 1 - i`。当 `i = 1` 时，`n - 1 - i = n - 2`，第一趟只比较 `n-2` 次，而冒泡第一趟需要 `n-1` 次；每趟都少一次，可能留下未排好的元素。正确写法是 `j < n - i`（`i` 从 1 开始），或者 `j < n - 1 - i` 且 `i` 从 0 开始。本文代码采用前者。

课件另一处笔误是交换时写 `pi[j + 1] = tmp;`，但 `tmp` 没有定义；后一页已改成 `temp`。这是幻灯片动画之间的不一致，实际代码必须用已声明的 `temp`。

#### 整数下标索引版

如果索引数组不存指针，而存结构数组的下标，也可以达到同样效果：

```cpp
void Sort(Student all[], int index[], const int n)
{
    int i, j;
    int temp;                  // 现在交换的是下标，不是指针
    for (i = 1; i < n; i++)
    {
        for (j = 0; j < n - i; j++)
        {
            // all[index[j]] 才是对应的学生
            if (all[index[j]].score > all[index[j + 1]].score)
            {
                temp = index[j];
                index[j] = index[j + 1];
                index[j + 1] = temp;
            }
        }
    }
}

void Output(Student all[], int index[], const int n)
{
    for (int i = 0; i < n; i++)
        cout << all[index[i]].name << '\t'
             << all[index[i]].id << '\t'
             << all[index[i]].score << endl;
}
```

**解析**　整数下标版的 `index` 初始化为 `{0, 1, 2, ..., n-1}`。比较时先 `all[index[j]]` 找到学生，再取 `.score`；交换的是 `index[j]` 这个整数。输出时同样用 `all[index[i]]` 双重下标。

指针版和下标版的区别：

- 指针版 `pi[j]->score` 一步解引用；下标版 `all[index[j]].score` 先取下标再取元素，多一次下标运算。
- 指针版索引直接保存地址；下标版保存整数，数组重新分配或移动后下标仍有效，指针可能失效。
- 两者排序的比较次数不变，仍是 $O(n^2)$；省下的是交换时的结构复制。

#### 例6.18 易错点

- **索引数组未初始化**：`index[i]` 必须先指向 `allone[i]`，否则排序比较的是野指针。
- **输出仍用原数组**：排序只改索引，`allone` 的物理顺序没变；输出必须走 `index`。
- **循环边界少一次**：`j < n - 1 - i` 配合 `i = 1` 会少比较，正确是 `j < n - i`。
- **交换变量名写错**：课件有 `tmp` 未定义的笔误，实际要用 `temp`。
- **索引越界**：`index` 只初始化了前 `total` 个有效，排序和输出只应使用 `0..total-1`；不要访问 `total` 之后的元素。
- **结构数组容量**：`allone[100]` 固定 100，输入人数不能超过 100；示例没有检查。

### 6.4.3 例6.19 反序建立字符链表并输出大写字母

问题：输入一行字符，按输入字符的反序建立字符结点的单向链表，并输出链表中的大写字母。

分析：从字符串末尾向前扫描，把每个字符追加到链表尾部，这样链表头存放的是原字符串的最后一个字符，整条链表就是反序的。输出时遍历链表，判断字符是否在 `'A'` 到 `'Z'` 之间。

```cpp
#include <iostream>
#include <cstring>          // strlen
using namespace std;

struct CharNode
{
    char data;
    CharNode* next;
};

CharNode* create(const char* str)
{
    CharNode* head = nullptr;
    CharNode* tail = nullptr;
    CharNode* newNode = nullptr;
    int length = strlen(str);

    for (int i = length - 1; i >= 0; --i)
    {
        newNode = new CharNode;
        newNode->data = str[i];
        newNode->next = nullptr;

        if (head == nullptr)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            tail->next = newNode;
            tail = newNode;
        }
    }
    return head;
}

void show(CharNode* head)
{
    CharNode* current = head;
    while (current != nullptr)
    {
        if (current->data >= 'A' && current->data <= 'Z')
            cout << current->data;
        current = current->next;
    }
    cout << endl;
}

int main()
{
    char input[100];
    cout << "Please input a line of characters:";
    cin.getline(input, 100);

    CharNode* list = create(input);
    cout << "The uppercase letters in the list are:";
    show(list);

    // 释放链表
    CharNode* current = list;
    while (current != nullptr)
    {
        CharNode* temp = current;
        current = current->next;
        delete temp;
    }
}
```

以输入 `Hello World` 为例，输出：

```text
The uppercase letters in the list are:WH
```

**解析**　`create` 从 `length - 1` 开始倒着扫描字符串。第一次循环取最后一个字符，创建第一个结点，`head` 和 `tail` 都指向它；之后每取一个字符，就接到 `tail` 后面并更新 `tail`。因此链表顺序是“原字符串从尾到头”。

`show` 遍历整条链表，用 `current->data >= 'A' && current->data <= 'Z'` 判断大写字母。这个判断依赖字符编码的连续性：在 ASCII 中 `'A'` 到 `'Z'` 是连续的，所以区间判断有效；如果源文件或运行环境使用非 ASCII 编码，最好用 `isupper`（需要 `<cctype>`）。输出顺序是链表顺序，也就是原字符串的反序；`Hello World` 中的大写字母是 `H` 和 `W`，反序后先遇到 `W` 再遇到 `H`，所以输出 `WH`。如果题目要求按原字符串顺序输出大写字母，应该在建表时正序建，或者输出时再反转。

`strlen` 返回 `size_t`，赋给 `int` 在短字符串上没问题；如果字符串长度超过 `INT_MAX` 会有问题，但这里 `input` 只有 100 个字符。`cin.getline(input, 100)` 最多读 99 个字符，留一个给 `'\0'`，不会越界。

空字符串时 `length = 0`，`for` 的初值 `i = -1`，条件 `i >= 0` 不成立，循环不执行，`create` 返回 `nullptr`；`show(nullptr)` 的 `while` 不执行，输出空行。释放循环也不会执行。这条边界是安全的。

### 6.4.4 例6.20 约瑟夫问题

问题：$n$ 个人围成一个环，从第 $i$ 个人开始，由 1 到 `interval` 不断报数，凡报到 `interval` 的人出列，然后从下一个人重新报数，直到环空为止。

例如 $n=8$、$i=1$、`interval=3`，出列序列为：

```text
3    6    1    5    2    8    4    7
```

分析：用单向循环链表表示环。每个结点存一个人的编号，最后一个结点的 `next` 指回头结点。处理时用两个指针 `p` 和 `prev`：`p` 指向当前报数的人，`prev` 指向 `p` 的前驱；数到第 `interval` 个人时，输出并删除 `p`，然后 `p` 移到下一个人。

```cpp
#include <iostream>
using namespace std;

struct Jonse
{
    int code;          // 结点编号
    Jonse* next;       // 指向下一个结点
};

// 创建包含 n 个结点的循环链表
Jonse* Create(int n)
{
    Jonse* h = new Jonse;
    Jonse* p = h;
    for (int i = 1; i <= n; i++)
    {
        p->code = i;
        if (i < n)
        {
            p->next = new Jonse;
            p = p->next;
        }
    }
    p->next = h;       // 尾结点指回头结点，形成环
    return h;
}

// 显示循环链表中的所有结点
void ShowList(Jonse* h)
{
    Jonse* p = h;
    do
    {
        cout << p->code << '\t';
        p = p->next;
    } while (p != h);
    cout << endl;
}

// 约瑟夫处理：从第 i 个开始，每数到第 d 个出列
void Out(Jonse* h, int i, int d)
{
    Jonse* p;
    Jonse* prev;
    int k;

    p = h;
    // 先找到尾结点，作为头结点的前驱
    for (prev = h; prev->next != h; prev = prev->next)
        ;

    // 移动到开始报数的位置：第 i 个结点
    for (k = 1; k < i; k++)
    {
        prev = p;
        p = p->next;
    }

    // 环中多于一个结点时继续
    while (p != p->next)
    {
        // 从当前 p 开始数 d 个，p 停在出列者
        for (k = 1; k < d; k++)
        {
            prev = p;
            p = p->next;
        }

        cout << p->code << '\t';       // 输出出列者

        prev->next = p->next;          // 前驱绕过 p
        Jonse* temp = p;
        p = p->next;                   // p 移到下一个人
        delete temp;                   // 释放出列结点
    }

    // 只剩最后一个结点
    cout << p->code << endl;
    delete p;
}

int main()
{
    Jonse* head;
    int num, val, beg;

    cout << "\nplease input the number of total:\n";
    cin >> num;
    head = Create(num);
    ShowList(head);

    cout << "\nplease input the code of begin:\n";
    cin >> beg;
    cout << "\nplease input interval of counting:\n";
    cin >> val;

    cout << "the new list is:\n";
    Out(head, beg, val);
}
```

以 `num=8, beg=1, val=3` 为例，`ShowList` 输出 `1 2 3 4 5 6 7 8`，`Out` 输出：

```text
3    6    1    5    2    8    4    7
```

**解析**　`Create` 先 `new` 一个头结点 `h`，`p` 指向它。循环 `i = 1..n`：把当前结点编号设为 `i`；如果 `i < n`，再 `new` 下一个结点并让 `p` 前进。循环结束时 `p` 指向第 `n` 个结点，执行 `p->next = h` 形成循环。

`ShowList` 用 `do-while` 而不是 `while`：循环链表没有 `nullptr` 结尾，必须先输出当前结点，再前进，直到回到 `h`。如果用 `while (p != h)`，一开始 `p == h`，循环一次都不执行。

`Out` 的关键是让 `prev` 始终是 `p` 的前驱：

1. 先用 `for (prev = h; prev->next != h; prev = prev->next);` 找到尾结点。因为 `h` 的前驱就是尾结点。
2. `for (k = 1; k < i; k++) { prev = p; p = p->next; }` 从第 1 个走到第 `i` 个。走 `i-1` 步，`p` 指向第 `i` 个人，`prev` 指向他的前驱。
3. 外层 `while (p != p->next)`：只要环中还有两个及以上结点，就继续。当 `p->next == p` 时，环中只剩 `p` 一个，退出循环，单独输出并删除。
4. 内层 `for (k = 1; k < d; k++)` 从当前 `p` 开始数 `d` 个：`p` 已经在第 1 个位置，所以只需再走 `d-1` 步，`p` 停在应出列的人，`prev` 仍是他前驱。
5. 输出 `p->code`，执行 `prev->next = p->next` 把 `p` 从环中摘掉；保存 `temp = p`，先让 `p = p->next`（下一个人），再 `delete temp`。顺序不能反：如果先 `delete p`，再读 `p->next` 就是访问已释放内存。
6. 删除后，`prev->next` 正好等于新的 `p`，所以下一轮 `prev` 仍是 `p` 的前驱，不需要重新找。

`i` 和 `d` 都是 1 基的：`i=1` 表示从第 1 个人开始，`d=3` 表示数到第 3 个人出列。若 `i` 超出 `1..n`，或 `d < 1`，这套代码没有做参数检查，可能死循环或提前删除；实际使用时应先校验。

边界情况：

- `n = 1`：`Create` 创建一个结点，`p->next = h` 形成自环；`ShowList` 输出 1；`Out` 的 `while (p != p->next)` 直接跳过，输出 1 并删除。若 `i > 1`，移动循环会绕着这个自环走 `i-1` 步，最终仍停在同一个结点，不会越界。
- `n = 0`：`Create` 仍会 `new` 一个头结点，循环不执行，`p->next = h` 让这个未初始化 `code` 的结点自环；`ShowList` 会输出垃圾值。约瑟夫问题要求 $n \ge 1$，应在输入时检查。
- `d = 1`：内层 `for` 不执行，每次删除当前 `p`，然后 `p = p->next`；这相当于从起点开始逐个出列，逻辑上成立。
- `Out` 会销毁整条链表，调用后 `head` 悬空，不能再 `ShowList` 或再次 `Out`。

## 本章小结

本章有两条主线：**按位操作**和**用结构/指针组织数据**。

位运算直接处理整数的二进制位。`&`、`|`、`^`、`~` 分别对应逐位的与、或、异或、取反；`<<`、`>>` 移动位，左移在数值上近似乘 $2^k$，右移近似除 $2^k$，但要注意溢出、移位位数范围和有无符号的差异。掩码用来“只取某些位”或“只改某些位”。异或的可逆性可以用来做简单的加密演示和原地交换，但异或交换要求两个变量是不同对象。

集合可以用一个整数的二进制位表示：元素 $i$ 对应第 $i-1$ 位。并集是 `|`，交集是 `&`，差集是 `A & ~B`，包含是 `(A | B) == B`，属于是 `(A & (1u << (x-1))) != 0`，空集是 `A == 0`。一个整数只能表示 32 个元素，元素更多时用无符号整数数组，把“第几个数组元素”和“元素内第几位”拆成 `/32` 和 `%32`。

结构用 `struct` 定义，由数目固定、类型可以不同的成员组成；结构变量占一片连续内存。成员用 `.` 访问，结构指针用 `->` 或 `(*p).成员` 访问。同类型结构可以整体赋值（逐成员复制），但不能直接用 `==` 比较；字符数组不能整体赋值，指针成员的整体赋值是浅复制。

结构可以作为函数参数和返回值。值传递复制整个结构，适合“函数需要独立副本”的场合；引用/指针传递避免复制，并能修改实参；返回结构值可以打包多个结果，返回局部结构的引用/指针则会悬空。结构较大时优先 `const&`。

链表用结点里的 `next` 指针表示线性关系，结点可以动态创建、不必连续。插入的核心是“先接后断”：在 `p` 后插入 `s` 要写 `s->next = p->next; p->next = s;`；在表头插入要写 `s->next = head; head = s;`。删除要找到前驱，`q->next = p->next; delete p;`；删除头结点要更新 `head`。修改头指针的函数要用 `list*&` 或返回新头指针，否则只改副本。遍历必须 `p = p->next`，不能 `p++`。
